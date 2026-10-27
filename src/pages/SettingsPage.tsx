import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Sparkles, 
  Lock, 
  ShieldAlert, 
  Check, 
  Save, 
  AlertTriangle,
  Eye,
  MessageSquare
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, setIsEditProfileOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'moderation'>('profile');

  // Mock moderation logs
  const [mockReports, setMockReports] = useState([
    {
      id: 'rep-1',
      target: 'Commercial crypto bot promo in JEC Web Dev',
      reporter: 'Priya Verma',
      type: 'Post',
      reason: 'Spam or commercial advertising',
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: 'rep-2',
      target: 'Offensive language in Cricket discussion',
      reporter: 'Siddharth Saxena',
      type: 'Comment',
      reason: 'Harassment or offensive language',
      status: 'resolved',
      timestamp: '1 day ago'
    }
  ]);

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const handleResolveReport = (id: string, action: 'removed' | 'dismissed') => {
    setMockReports(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    showToast(`Report ${action === 'removed' ? 'action taken: content removed' : 'dismissed'}`, 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Settings & Privacy Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your campus identity, visibility preferences, notification alerts, and moderation safeguards.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'Identity & Bio', icon: User },
          { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'moderation', label: 'Campus Safety & Moderation', icon: ShieldAlert },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile & Bio */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Student Profile Information</h3>
              <p className="text-xs text-slate-500">View and update your academic identity, skills, and projects</p>
            </div>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Edit Profile Modal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</span>
              <span className="text-sm font-bold text-slate-800">{currentUser.name}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Campus Email (Mock)</span>
              <span className="text-sm font-bold text-slate-800">aryan.sharma@jecjabalpur.ac.in</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">College & Branch</span>
              <span className="text-xs font-medium text-slate-800">{currentUser.college} • {currentUser.branch}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Academic Year</span>
              <span className="text-xs font-medium text-slate-800">{currentUser.year}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Privacy & Safety */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Privacy & Contact Visibility</h3>
            <p className="text-xs text-slate-500">Configure who can find your profile and send direct messages.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Profile Visibility</span>
                <p className="text-[11px] text-slate-500">Who can view your full projects, achievements, and club affiliations</p>
              </div>
              <select
                value={localSettings.profileVisibility}
                onChange={e => setLocalSettings({ ...localSettings, profileVisibility: e.target.value as any })}
                className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-xl font-medium"
              >
                <option value="Campus Only">Campus Students Only</option>
                <option value="Public">Public (Inter-College)</option>
                <option value="Private">Private / Connections Only</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Direct Messaging Permissions</span>
                <p className="text-[11px] text-slate-500">Control who can initiate private 1-on-1 chats with you</p>
              </div>
              <select
                value={localSettings.allowDirectMessages}
                onChange={e => setLocalSettings({ ...localSettings, allowDirectMessages: e.target.value as any })}
                className="text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-xl font-medium"
              >
                <option value="Everyone">All Verified Students</option>
                <option value="Connections Only">Connected Classmates Only</option>
                <option value="None">Nobody (Mute DMs)</option>
              </select>
            </div>

            <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-violet-950 block">Senior Mentorship Availability</span>
                <p className="text-[11px] text-violet-700">Display "Request Mentorship" button on your student profile</p>
              </div>
              <button
                type="button"
                onClick={() => setLocalSettings({ ...localSettings, mentorshipAvailable: !localSettings.mentorshipAvailable })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.mentorshipAvailable ? 'bg-violet-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.mentorshipAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Privacy Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Notification Alerts</h3>
            <p className="text-xs text-slate-500">Choose what campus updates trigger in-app and email badges</p>
          </div>

          <div className="space-y-3">
            {[
              { 
                key: 'pushNotifications' as const, 
                title: 'In-App Bell Notifications', 
                desc: 'Alerts when someone comments on your post, joins your community, or messages you.' 
              },
              { 
                key: 'emailNotifications' as const, 
                title: 'Mentorship Request Alerts', 
                desc: 'Immediate notifications when a junior requests guidance or a mentor accepts.' 
              },
              { 
                key: 'eventReminders' as const, 
                title: 'Upcoming Event Reminders', 
                desc: 'Reminders 24 hours prior to workshops, hackathons, or club fests you registered for.' 
              },
            ].map(item => (
              <div key={item.key} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, [item.key]: !localSettings[item.key] })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings[item.key] ? 'bg-brand-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Campus Safety & Moderation Dashboard */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-sm text-slate-900">Campus Safety & Moderation Log</h3>
              <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                Admin Console Simulator
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Demonstrates how student reports on harassment, academic plagiarism, or spam are audited and resolved by college moderators.
            </p>
          </div>

          <div className="space-y-3">
            {mockReports.map(rep => (
              <div key={rep.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rep.target}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">{rep.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      rep.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-rose-700 font-medium mt-1">Reason: {rep.reason}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Reported by {rep.reporter} • {rep.timestamp}</p>
                </div>

                {rep.status === 'pending' && (
                  <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleResolveReport(rep.id, 'removed')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                    >
                      Remove Content
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'dismissed')}
                      className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 leading-relaxed">
            ℹ️ <strong>Prototype Safety Notice:</strong> All reporting actions are stored in local demo state. Production deployments will incorporate automated profanity filtering, multi-sig moderation reviews, and institutional single-sign-on (SSO).
          </div>
        </div>
      )}

    </div>
  );
};
