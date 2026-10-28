import React from 'react';
import { Download, Heart, FileText, Archive, File, ShieldCheck, BookOpen, Tag } from 'lucide-react';
import { NoteItem } from '../../types';
import { Avatar } from '../common/Avatar';

interface NoteCardProps {
  note: NoteItem;
  onLike: (id: string) => void;
  onDownload: (id: string) => void;
  onPreview: (note: NoteItem) => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'PYQ':              { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  'Handwritten Notes':{ bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  'Lab Manual':       { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Formula Sheet':    { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  'Syllabus':         { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
};

const FILE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  doc: <File className="w-5 h-5 text-blue-500" />,
  zip: <Archive className="w-5 h-5 text-amber-500" />,
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onLike, onDownload, onPreview }) => {
  const catStyle = CATEGORY_STYLES[note.category] ?? { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Top strip colour by category */}
      <div className={`h-1.5 w-full ${catStyle.bg.replace('bg-', 'bg-').replace('50', '400')}`} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-slate-100 shrink-0">
            {FILE_ICONS[note.fileType] ?? <FileText className="w-5 h-5 text-slate-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <button
              onClick={() => onPreview(note)}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600 transition-colors line-clamp-2 text-left"
            >
              {note.title}
            </button>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {note.subject}{note.subjectCode ? ` · ${note.subjectCode}` : ''}
            </p>
          </div>
        </div>

        {/* Description */}
        {note.description && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{note.description}</p>
        )}

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
            <BookOpen className="w-3 h-3" />
            {note.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <Tag className="w-3 h-3" />
            {note.branch}
          </span>
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {note.semester}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-auto">
          {/* Uploader */}
          <div className="flex items-center gap-2 min-w-0">
            <Avatar src={note.uploaderAvatar} name={note.uploaderName} size="xs" />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-medium text-slate-700 truncate">{note.uploaderName}</span>
                {note.verifiedBySenior && (
                  <span title="Verified Senior" role="img" aria-label="Verified Senior">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" aria-hidden="true" />
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">{note.uploadedAt}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onLike(note.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                note.isLiked
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${note.isLiked ? 'fill-rose-500' : ''}`} />
              <span>{note.likesCount}</span>
            </button>
            <button
              onClick={() => onDownload(note.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{note.downloadsCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
