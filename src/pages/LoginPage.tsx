import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Sparkles, Database, CheckCircle, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CloudConnectionModal } from '../components/modals/CloudConnectionModal';

interface LoginPageProps {
  onGoToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onGoToSignup }) => {
  const { login, isCloudConnected, refreshCloudStatus } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) setError(result.error || 'Login failed.');
  };

  const handleDemoLogin = async () => {
    setEmail('aryan@jec.edu');
    setPassword('demo1234');
    setError('');
    setLoading(true);
    const result = await login('aryan@jec.edu', 'demo1234');
    setLoading(false);
    if (!result.success) setError(result.error || 'Demo login failed.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/30 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-2xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Header gradient strip */}
          <div className="bg-gradient-to-r from-indigo-600 via-brand-600 to-violet-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight">StudentSphere</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span className="text-xs text-white/70">Your Digital Campus</span>
                  </div>
                </div>
              </div>

              {/* Cloud DB Status indicator button */}
              <button
                type="button"
                onClick={() => setIsCloudModalOpen(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all backdrop-blur-sm ${
                  isCloudConnected
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 hover:bg-emerald-500/30'
                    : 'bg-white/15 text-white/90 border border-white/20 hover:bg-white/25'
                }`}
                title="Configure Cloud Database"
              >
                <Database className="w-3 h-3" />
                <span>{isCloudConnected ? 'Cloud Active' : 'Connect Cloud'}</span>
              </button>
            </div>

            <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
            <p className="text-white/70 text-sm mt-1">Sign in to continue to your campus network.</p>
          </div>

          {/* Form */}
          <div className="p-7">
            {/* Cross-device cloud notification if not connected */}
            {!isCloudConnected && (
              <div 
                onClick={() => setIsCloudModalOpen(true)}
                className="mb-4 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover:border-indigo-300 transition-all cursor-pointer flex items-center gap-2.5 group"
              >
                <Smartphone className="w-4 h-4 text-indigo-600 shrink-0" />
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold text-indigo-900 group-hover:text-indigo-700">Want to sign in from any device?</p>
                  <p className="text-[11px] text-indigo-600/90">Connect free Supabase cloud database &rarr;</p>
                </div>
              </div>
            )}

            {/* Demo banner */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full mb-5 flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 transition-all group"
            >
              <div className="text-left">
                <p className="text-xs font-semibold text-amber-800">🚀 Try Demo Account</p>
                <p className="text-[11px] text-amber-600 mt-0.5">aryan@jec.edu · demo1234</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">College / Personal Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-500 mt-5">
              New to StudentSphere?{' '}
              <button
                onClick={onGoToSignup}
                className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => setIsCloudModalOpen(true)}
            className="text-[11px] text-slate-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5"
          >
            <Database className="w-3 h-3" />
            <span>Database Status: {isCloudConnected ? '🟢 Cloud Sync (Cross-Device)' : '🟡 Local Storage (Single-Device)'}</span>
          </button>
        </div>
      </div>

      {/* Cloud Configuration Modal */}
      <CloudConnectionModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        onConfigUpdated={() => refreshCloudStatus()}
      />
    </div>
  );
};
