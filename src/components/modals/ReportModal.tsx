import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, reportTarget, submitReport } = useApp();
  const [reason, setReason] = useState('Spam or commercial promotion');
  const [details, setDetails] = useState('');

  if (!isReportModalOpen || !reportTarget) return null;

  const reasons = [
    'Spam or commercial advertising',
    'Harassment, bullying, or hate speech',
    'Plagiarism or academic dishonesty',
    'Impersonation of faculty/student',
    'Inappropriate or offensive content',
    'Other campus guideline violation'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(`${reason}: ${details}`);
    setDetails('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h2 className="font-bold text-sm text-slate-900">Report Inappropriate Content</h2>
          </div>
          <button 
            onClick={() => setIsReportModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-slate-600">
            You are reporting <strong className="text-slate-900">{reportTarget.title}</strong> ({reportTarget.type}). Our campus moderation council reviews reports within 24 hours.
          </p>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Select Violation Reason
            </label>
            <div className="space-y-1.5">
              {reasons.map(r => (
                <label 
                  key={r}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                    reason === r ? 'bg-rose-50 border-rose-200 text-rose-900 font-medium' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Additional Context (Optional)
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Provide any additional details or links..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-rose-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Submit Report
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
