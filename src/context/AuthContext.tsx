import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BranchType, YearOfStudy, RoleBadge } from '../types';
import { CURRENT_USER } from '../data/mockData';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string; // In a real app this would be server-side. Here we store a plain "hash" for demo.
  profile: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  currentUserProfile: User | null;
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

/** Simple deterministic "hash" for demo purposes — NEVER do this in production. */
const fakeHash = (pw: string) => btoa(pw + '_ss_salt_2026');

const generateAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=200&bold=true&rounded=true`;

/** Seed a default demo account that always exists */
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
    // Always ensure demo account exists
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

  // Persist session on change
  useEffect(() => {
    if (authUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(authUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
  }, [authUser]);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    const users = getRegisteredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) return { success: false, error: 'No account found with this email.' };
    if (found.passwordHash !== fakeHash(password)) return { success: false, error: 'Incorrect password.' };

    setAuthUser(found);
    return { success: true };
  };

  // ── Signup ───────────────────────────────────────────────────────────────
  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 800));

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

    const updatedUsers = [...users, newAuthUser];
    saveRegisteredUsers(updatedUsers);
    setAuthUser(newAuthUser);
    return { success: true };
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    setAuthUser(null);
  };

  // ── Update Profile ───────────────────────────────────────────────────────
  const updateAuthProfile = (updates: Partial<User>) => {
    if (!authUser) return;
    const updatedUser: AuthUser = {
      ...authUser,
      profile: { ...authUser.profile, ...updates },
    };
    setAuthUser(updatedUser);
    // Also persist in registered users list
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
