import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Send, MessageCircle, Video, FileText } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const RequestMentorshipModal: React.FC = () => {
  const { 
    isRequestMentorshipOpen, 
    setIsRequestMentorshipOpen, 
    selectedMentorForRequest, 
    sendMentorshipRequest,
    currentUser 
  } = useApp();

  const [guidanceCategory, setGuidanceCategory] = useState<string>(
    selectedMentorForRequest?.areasOfGuidance[0] || 'Placement preparation'
  );
  const [helpDescription, setHelpDescription] = useState('');
  const [preferredMode, setPreferredMode] = useState<'Chat' | 'Video Call' | 'Resume Review'>('Chat');

  if (!isRequestMentorshipOpen || !selectedMentorForRequest) return null;

  const categories = selectedMentorForRequest.areasOfGuidance.length > 0 
    ? selectedMentorForRequest.areasOfGuidance 
    : [
        'First-year college guidance',
        'Subject and semester guidance',
        'Coding and development',
        'Competitive programming',
        'Internships',
        'Resume and portfolio reviews',
        'Placement preparation',
        'Higher studies',
        'Hackathons and projects',
        'College clubs and campus life'
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpDescription.trim()) return;

    sendMentorshipRequest({
      mentor: selectedMentorForRequest,
      guidanceCategory,
      helpDescription: helpDescription.trim(),
      preferredMode
    });

    setHelpDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900">Request Mentorship</h2>
              <p className="text-[11px] text-slate-500">Connect with an experienced campus senior</p>
            </div>
          </div>
          <button 
            onClick={() => setIsRequestMentorshipOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          
          {/* Mentor Profile Snapshot */}
          <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-xl flex items-center gap-3">
            <Avatar 
              src={selectedMentorForRequest.avatar} 
              name={selectedMentorForRequest.name} 
              size="md" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {selectedMentorForRequest.name}
                </span>
                <Badge role="Mentor" size="xs" />
              </div>
              <p className="text-[11px] text-slate-600 truncate mt-0.5">
                {selectedMentorForRequest.currentCompanyOrOffer || `${selectedMentorForRequest.branch} • ${selectedMentorForRequest.year}`}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {selectedMentorForRequest.college}
              </p>
            </div>
          </div>

          {/* Guidance Category Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Guidance Category *
            </label>
            <select
              value={guidanceCategory}
              onChange={e => setGuidanceCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Preferred Communication Mode */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Preferred Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Chat', icon: MessageCircle, label: 'Chat Q&A' },
                { id: 'Resume Review', icon: FileText, label: 'Resume Review' },
                { id: 'Video Call', icon: Video, label: '15-min Call' }
              ].map(item => {
                const Icon = item.icon;
                const isSel = preferredMode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferredMode(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSel 
                        ? 'bg-violet-50 border-violet-300 text-violet-800 font-bold shadow-xs' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 text-xs'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mx-auto mb-1 ${isSel ? 'text-violet-600' : 'text-slate-400'}`} />
                    <span className="text-[11px] block">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Help Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              What specific help do you need? *
            </label>
            <textarea
              required
              rows={4}
              value={helpDescription}
              onChange={e => setHelpDescription(e.target.value)}
              placeholder="e.g. I am a 2nd year student preparing for summer intern tests. I have solved 200 DSA problems but struggle with DP. I would love feedback on how to prepare for interviews and review my resume..."
              className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Mentorship is voluntary. Specific, well-formulated questions receive quicker responses.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsRequestMentorshipOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!helpDescription.trim()}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Request</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
