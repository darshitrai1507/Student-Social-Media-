import React, { useState } from 'react';
import { X, Database, Globe, Key, CheckCircle, AlertTriangle, ExternalLink, HelpCircle, Shield } from 'lucide-react';
import { getSupabaseConfig, setCustomSupabaseConfig, clearCustomSupabaseConfig } from '../../supabaseClient';

interface CloudConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated?: () => void;
}

export const CloudConnectionModal: React.FC<CloudConnectionModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.source === 'localStorage' ? currentConfig.url : '');
  const [anonKey, setAnonKey] = useState('');
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();

    if (!cleanUrl || !cleanKey) {
      setError('Please provide both your Supabase Project URL and Anon Public Key.');
      return;
    }

    if (!cleanUrl.startsWith('https://') || !cleanUrl.includes('supabase.co')) {
      setError('URL should look like: https://your-project-id.supabase.co');
      return;
    }

    const success = setCustomSupabaseConfig(cleanUrl, cleanKey);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => {
        onConfigUpdated?.();
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      setError('Failed to save configuration. Please check your credentials.');
    }
  };

  const handleDisconnect = () => {
    clearCustomSupabaseConfig();
    onConfigUpdated?.();
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Cloud Database Connection</h2>
              <p className="text-xs text-white/80">Enable Cross-Device Sign In &amp; Cloud Storage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status pill */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            currentConfig.isConfigured
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            {currentConfig.isConfigured ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-bold text-sm">
                {currentConfig.isConfigured
                  ? 'Cloud Database Connected'
                  : 'Currently in Local Device-Only Mode'}
              </p>
              <p className="mt-1 text-slate-600 leading-relaxed">
                {currentConfig.isConfigured
                  ? `Connected via ${currentConfig.source === 'env' ? 'Netlify / Environment Variables' : 'Browser Configuration'}. User accounts are stored in the cloud and accessible from any device!`
                  : 'Accounts created now are saved only in this browser (localStorage). To sign in from other devices (phones, laptops, other browsers), connect your free Supabase database below.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                Supabase Project URL
              </label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://xyzprojectid.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">Found in Supabase Project Settings &rarr; API &rarr; Project URL</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-600" />
                Supabase Anon (Public) Key
              </label>
              <input
                type="password"
                value={anonKey}
                onChange={e => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">Found in Supabase Project Settings &rarr; API &rarr; Project API Keys &rarr; anon public</p>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">{error}</p>
            )}

            {savedSuccess && (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                Connected successfully! Reloading application...
              </p>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Connect Cloud Database
              </button>
              {currentConfig.source === 'localStorage' && (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="px-3 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                >
                  Disconnect
                </button>
              )}
            </div>
          </form>

          {/* Guide for Netlify */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>Recommended: Add to Netlify for All Users</span>
            </div>
            <ol className="text-[11px] text-slate-600 space-y-1.5 list-decimal list-inside bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <li>Log in to your <b>Netlify Dashboard</b> and open your site.</li>
              <li>Go to <b>Site configuration</b> &rarr; <b>Environment variables</b>.</li>
              <li>Add variable <b>VITE_SUPABASE_URL</b> = your project URL.</li>
              <li>Add variable <b>VITE_SUPABASE_ANON_KEY</b> = your anon key.</li>
              <li>Trigger a redeploy. Every device visiting your site connects automatically!</li>
            </ol>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Need database tables? Run <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700">supabase_setup.sql</code> in Supabase SQL Editor.</span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 font-semibold inline-flex items-center gap-1 hover:underline shrink-0 ml-2"
              >
                Supabase <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
