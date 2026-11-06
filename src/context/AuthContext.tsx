import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BranchType, YearOfStudy, RoleBadge } from '../types';
import { CURRENT_USER } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  passwordHash?: string;
  profile: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  currentUserProfile: User | null;
  user: User | null; // Convenient alias for currentUserProfile
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateAuthProfile: (updates: Partial<User>) => void;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
  college: string;
  branch: BranchType;
  year: YearOfStudy;
  bio?: string;
}

// ── Storage Keys ──────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  AUTH_SESSION: 'studentsphere_auth_session',
  REGISTERED_USERS: 'studentsphere_registered_users',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const fakeHash = (pw: string) => btoa(pw + '_ss_salt_2026');

export const generateAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=200&bold=true&rounded=true`;

/** Converts a Supabase Auth user object into StudentSphere's dynamic User profile */
export function buildUserProfileFromSupabaseUser(sbUser: SupabaseUser): User {
  const meta = sbUser.user_metadata || {};
  const name = meta.full_name || meta.name || sbUser.email?.split('@')[0] || 'Student';
  const email = sbUser.email || '';
  const avatar = meta.avatar_url || meta.avatar || generateAvatar(name);
  const username = meta.username || (email ? email.split('@')[0] : name.toLowerCase().replace(/\s+/g, '_'));
  const college = meta.college || 'Jabalpur Engineering College (JEC)';
  const branch = (meta.branch as BranchType) || 'Computer Science Engineering';
  const year = (meta.year as YearOfStudy) || 'Second Year';
  const roleBadge = (meta.roleBadge as RoleBadge) || 'Student';
  const bio = meta.bio || `${year} student at ${college} studying ${branch}.`;

  return {
    id: sbUser.id,
    name,
    username,
    email,
    avatar,
    coverImage: meta.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    college,
    branch,
    year,
    roleBadge,
    bio,
    skills: meta.skills || ['React', 'TypeScript', 'Node.js', 'Python'],
    interests: meta.interests || ['Web Development', 'Startups and Entrepreneurship'],
    projects: meta.projects || [],
    achievements: meta.achievements || [],
    joinedCommunities: meta.joinedCommunities || ['comm-jec-webdev', 'comm-cp-dsa'],
    clubs: meta.clubs || ['Coding Club'],
    isMentor: Boolean(meta.isMentor),
    mentorAvailability: meta.mentorAvailability || 'Available',
    mentorAreas: meta.mentorAreas || ['Coding and development'],
    mentorBio: meta.mentorBio || '',
    connectionStatus: 'none',
    onlineStatus: true,
  };
}

/** Seed default demo account */
const DEMO_ACCOUNT: AuthUser = {
  id: CURRENT_USER.id,
  email: 'aryan@jec.edu',
  passwordHash: fakeHash('demo1234'),
  profile: CURRENT_USER,
};

function getRegisteredUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    const stored: AuthUser[] = raw ? JSON.parse(raw) : [];
    if (!stored.find(u => u.email === DEMO_ACCOUNT.email)) {
      stored.push(DEMO_ACCOUNT);
    }
    return stored;
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function saveRegisteredUsers(users: AuthUser[]) {
  localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
}

function getStoredSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(getStoredSession);

  // Sync with active Supabase session & listen to auth state changes
  useEffect(() => {
    let mounted = true;

    async function syncActiveSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase getSession notice:', error.message);
        }
        if (mounted && session?.user) {
          const profile = buildUserProfileFromSupabaseUser(session.user);
          setAuthUser({
            id: session.user.id,
            email: session.user.email || '',
            profile,
          });
        }
      } catch (err) {
        console.warn('Supabase session initialization note:', err);
      }
    }

    syncActiveSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const profile = buildUserProfileFromSupabaseUser(session.user);
          setAuthUser({
            id: session.user.id,
            email: session.user.email || '',
            profile,
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthUser(null);
          localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Persist local session on change
  useEffect(() => {
    if (authUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(authUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
  }, [authUser]);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Try active Supabase login if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (email.toLowerCase() !== DEMO_ACCOUNT.email.toLowerCase()) {
            return { success: false, error: error.message };
          }
        } else if (data?.user) {
          const profile = buildUserProfileFromSupabaseUser(data.user);
          const newAuth: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            profile,
          };
          setAuthUser(newAuth);
          return { success: true };
        }
      } catch (err: any) {
        if (email.toLowerCase() !== DEMO_ACCOUNT.email.toLowerCase()) {
          return { success: false, error: err?.message || 'Login failed.' };
        }
      }
    }

    // 2. Demo account / local credentials fallback
    await new Promise(r => setTimeout(r, 400));
    const users = getRegisteredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) return { success: false, error: 'No account found with this email.' };
    if (found.passwordHash && found.passwordHash !== fakeHash(password)) {
      return { success: false, error: 'Incorrect password.' };
    }

    setAuthUser(found);
    return { success: true };
  };

  // ── Signup ───────────────────────────────────────────────────────────────
  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    // 1. Try Supabase Auth sign up if configured
    if (isSupabaseConfigured) {
      try {
        const { data: sbData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.name,
              name: data.name,
              username: data.username,
              college: data.college,
              branch: data.branch,
              year: data.year,
              bio: data.bio,
              avatar: generateAvatar(data.name),
            },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (sbData?.user) {
          const profile = buildUserProfileFromSupabaseUser(sbData.user);
          const newAuthUser: AuthUser = {
            id: sbData.user.id,
            email: data.email,
            profile,
          };
          setAuthUser(newAuthUser);
          const users = getRegisteredUsers();
          saveRegisteredUsers([...users.filter(u => u.email !== data.email), newAuthUser]);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Signup failed.' };
      }
    }

    // 2. Local fallback registration
    await new Promise(r => setTimeout(r, 500));
    const users = getRegisteredUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    if (users.find(u => u.profile.username.toLowerCase() === data.username.toLowerCase())) {
      return { success: false, error: 'This username is already taken.' };
    }

    const newProfile: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      username: data.username,
      email: data.email,
      avatar: generateAvatar(data.name),
      college: data.college,
      branch: data.branch,
      year: data.year,
      roleBadge: 'Student' as RoleBadge,
      bio: data.bio || `${data.year} student at ${data.college} studying ${data.branch}.`,
      skills: [],
      interests: [],
      projects: [],
      achievements: [],
      joinedCommunities: [],
      clubs: [],
      isMentor: false,
      mentorAreas: [],
      mentorBio: '',
      connectionStatus: 'none',
      onlineStatus: true,
    };

    const newAuthUser: AuthUser = {
      id: newProfile.id,
      email: data.email,
      passwordHash: fakeHash(data.password),
      profile: newProfile,
    };

    saveRegisteredUsers([...users, newAuthUser]);
    setAuthUser(newAuthUser);
    return { success: true };
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Supabase signOut notice:', err);
    }
    setAuthUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  };

  // ── Update Profile ───────────────────────────────────────────────────────
  const updateAuthProfile = (updates: Partial<User>) => {
    if (!authUser) return;
    const updatedUser: AuthUser = {
      ...authUser,
      profile: { ...authUser.profile, ...updates },
    };
    setAuthUser(updatedUser);
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.id === authUser.id);
    if (idx !== -1) {
      users[idx] = updatedUser;
      saveRegisteredUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!authUser,
      authUser,
      currentUserProfile: authUser?.profile ?? null,
      user: authUser?.profile ?? null,
      login,
      signup,
      logout,
      updateAuthProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
