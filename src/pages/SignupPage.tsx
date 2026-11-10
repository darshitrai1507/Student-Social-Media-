import React, { useState } from 'react';
import {
  GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle,
  ArrowRight, ArrowLeft, User, Building2, BookOpen, Check, Sparkles, Database, Smartphone
} from 'lucide-react';
import { useAuth, SignupData } from '../context/AuthContext';
import { BranchType, YearOfStudy } from '../types';
import { CloudConnectionModal } from '../components/modals/CloudConnectionModal';

interface SignupPageProps {
  onGoToLogin: () => void;
}

const BRANCHES: BranchType[] = [
  'Computer Science Engineering',
  'Information Technology',
  'Artificial Intelligence and Machine Learning',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other',
];

const YEARS: YearOfStudy[] = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

const POPULAR_COLLEGES = [
  'Jabalpur Engineering College (JEC)',
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'NIT Trichy',
  'NIT Warangal',
  'VIT Vellore',
  'BITS Pilani',
  'Delhi Technological University',
  'Jadavpur University',
  'Anna University',
  'Pune Institute of Computer Technology',
  'Other',
];

type Step = 1 | 2 | 3;

export const SignupPage: React.FC<SignupPageProps> = ({ onGoToLogin }) => {
  const { signup, isCloudConnected, refreshCloudStatus } = useAuth();

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [college, setCollege] = useState('');
  const [customCollege, setCustomCollege] = useState('');
  const [branch, setBranch] = useState<BranchType>('Computer Science Engineering');
  const [year, setYear] = useState<YearOfStudy>('First Year');
  const [bio, setBio] = useState('');

  const resolvedCollege = college === 'Other' ? customCollege : college;

  // Auto-generate username from name
  const handleNameChange = (val: string) => {
    setName(val);
    if (!username) {
      setUsername(val.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
    }
  };

  const validateStep1 = () => {
    if (!name.trim()) return 'Please enter your full name.';
    if (!username.trim() || username.length < 3) return 'Username must be at least 3 characters.';
    if (!/^[a-z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores.';
    if (!email.trim() || !email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const validateStep2 = () => {
    if (!college) return 'Please select your college.';
    if (college === 'Other' && !customCollege.trim()) return 'Please enter your college name.';
    return null;
  };

  const nextStep = () => {
    setError('');
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data: SignupData = {
      name,
      username,
      email,
      password,
      college: resolvedCollege,
      branch,
      year,
      bio,
    };

    const result = await signup(data);
    setLoading(false);
    if (!result.success) setError(result.error || 'Signup failed. Please try again.');
  };

  const steps = [
    { label: 'Account', icon: User },
    { label: 'College', icon: Building2 },
    { label: 'Profile', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/30 flex items-center justify-center p-4 py-10">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-brand-600 to-violet-600 p-7 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight">StudentSphere</span>
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
            <h1 className="text-xl font-bold">Join your campus network 🎓</h1>
            <p className="text-white/70 text-sm mt-1">Create your account in 3 quick steps.</p>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-5">
              {steps.map((s, i) => {
                const stepNum = (i + 1) as Step;
                const done = step > stepNum;
                const active = step === stepNum;
                return (
                  <React.Fragment key={s.label}>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      active ? 'bg-white text-indigo-700' :
                      done ? 'bg-white/30 text-white' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {done ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                      {s.label}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px ${done ? 'bg-white/50' : 'bg-white/20'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Body */}
          <div className="p-7">
            <form onSubmit={step === 3 ? handleSubmit : e => { e.preventDefault(); nextStep(); }}>

              {/* ── Step 1: Account Info ───────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        value={name}
                        onChange={e => handleNameChange(e.target.value)}
                        placeholder="e.g. Aryan Sharma"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">@</span>
                      <input
                        value={username}
                        onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="your_username"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Only letters, numbers, and underscores.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@college.edu"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
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
                    {/* Password strength bar */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${
                              password.length >= i * 3
                                ? password.length >= 10 ? 'bg-emerald-500' : password.length >= 6 ? 'bg-amber-400' : 'bg-red-400'
                                : 'bg-slate-200'
                            }`} />
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {password.length < 6 ? 'Too short' : password.length < 10 ? 'Fair' : 'Strong ✓'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all ${
                          confirmPassword && confirmPassword !== password ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-indigo-400'
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: College Info ───────────────────────────────── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">College / University *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={college}
                        onChange={e => setCollege(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all bg-white appearance-none"
                        required
                      >
                        <option value="">Select your college…</option>
                        {POPULAR_COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {college === 'Other' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">College Name *</label>
                      <input
                        value={customCollege}
                        onChange={e => setCustomCollege(e.target.value)}
                        placeholder="Enter your college full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Branch / Department *</label>
                    <div className="grid grid-cols-1 gap-2">
                      {BRANCHES.map(b => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBranch(b)}
                          className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                            branch === b
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Year of Study *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {YEARS.map(y => (
                        <button
                          type="button"
                          key={y}
                          onClick={() => setYear(y)}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                            year === y
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Profile (optional) ─────────────────────────── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">@{username}</p>
                      <p className="text-xs text-indigo-600 mt-0.5">{year} · {branch.split(' ').slice(0, 2).join(' ')}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Short Bio <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder={`e.g. ${year} student at ${resolvedCollege || 'my college'} passionate about technology and innovation.`}
                      rows={3}
                      maxLength={160}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all resize-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 text-right">{bio.length}/160</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <p className="text-xs font-semibold text-slate-700">Account Summary</p>
                    {[
                      { label: 'College', value: resolvedCollege || '—' },
                      { label: 'Branch', value: branch },
                      { label: 'Year', value: year },
                      { label: 'Email', value: email },
                    ].map(r => (
                      <div key={r.label} className="flex items-start gap-2">
                        <span className="text-[11px] text-slate-500 w-14 shrink-0">{r.label}</span>
                        <span className="text-[11px] font-medium text-slate-800 break-all">{r.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-0.5 accent-indigo-600" required />
                    <label htmlFor="terms" className="text-xs text-slate-600">
                      I agree to the{' '}
                      <span className="text-indigo-600 cursor-pointer hover:underline">Terms of Service</span>{' '}
                      and{' '}
                      <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span>.
                    </label>
                  </div>
                </div>
              )}

              {/* ── Error ───────────────────────────────────────────────── */}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 mt-4">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* ── Navigation Buttons ──────────────────────────────────── */}
              <div className="flex gap-2 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => { setStep((step - 1) as Step); setError(''); }}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Creating account…
                    </>
                  ) : step < 3 ? (
                    <>Continue <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Create Account 🎓</>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-500 mt-5">
              Already have an account?{' '}
              <button
                onClick={onGoToLogin}
                className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
              >
                Sign in
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
