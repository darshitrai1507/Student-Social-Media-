import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-dropdown border transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
            t.type === 'success'
              ? 'bg-white border-emerald-200 text-slate-800'
              : t.type === 'error'
              ? 'bg-white border-rose-200 text-slate-800'
              : 'bg-white border-indigo-200 text-slate-800'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />}
          {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />}

          <p className="text-sm font-medium flex-1 text-slate-700 leading-snug">{t.message}</p>

          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
