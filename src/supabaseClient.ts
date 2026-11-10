import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};

export interface SupabaseConfigInfo {
  isConfigured: boolean;
  url: string;
  source: 'env' | 'localStorage' | 'none';
}

export function getSupabaseCredentials(): { url: string; key: string; source: 'env' | 'localStorage' | 'none' } {
  const envUrl = metaEnv.VITE_SUPABASE_URL;
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('placeholder')) {
    return { url: envUrl.trim(), key: envKey.trim(), source: 'env' };
  }

  try {
    const customUrl = localStorage.getItem('studentsphere_supabase_url');
    const customKey = localStorage.getItem('studentsphere_supabase_key');
    if (customUrl && customKey && !customUrl.includes('placeholder') && customUrl.startsWith('http')) {
      return { url: customUrl.trim(), key: customKey.trim(), source: 'localStorage' };
    }
  } catch {
    // Ignore localStorage access issues
  }

  return {
    url: 'https://placeholder-project.supabase.co',
    key: 'placeholder-anon-key',
    source: 'none',
  };
}

const initialCreds = getSupabaseCredentials();

export let isSupabaseConfigured = initialCreds.source !== 'none';

export let supabase: SupabaseClient = createClient(initialCreds.url, initialCreds.key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function getSupabaseConfig(): SupabaseConfigInfo {
  const creds = getSupabaseCredentials();
  return {
    isConfigured: creds.source !== 'none',
    url: creds.url,
    source: creds.source,
  };
}

export function setCustomSupabaseConfig(url: string, key: string): boolean {
  if (!url || !key || !url.startsWith('https://')) return false;

  try {
    localStorage.setItem('studentsphere_supabase_url', url.trim());
    localStorage.setItem('studentsphere_supabase_key', key.trim());

    isSupabaseConfigured = true;
    supabase = createClient(url.trim(), key.trim(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export function clearCustomSupabaseConfig(): void {
  try {
    localStorage.removeItem('studentsphere_supabase_url');
    localStorage.removeItem('studentsphere_supabase_key');
  } catch {
    // Ignore
  }
  const creds = getSupabaseCredentials();
  isSupabaseConfigured = creds.source !== 'none';
  supabase = createClient(creds.url, creds.key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
