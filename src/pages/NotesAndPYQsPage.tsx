import React, { useState, useMemo } from 'react';
import {
  Search, Upload, BookOpen, Filter, X, ChevronDown, FileText,
  Download, Heart, ShieldCheck, Sparkles, BarChart2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NoteCard } from '../components/notes/NoteCard';
import { NoteItem } from '../types';

// ── Constants ──────────────────────────────────────────────────────────────
const BRANCHES = [
  'All Branches',
  'Computer Science Engineering',
  'Information Technology',
  'Artificial Intelligence and Machine Learning',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'First Year Common',
];

const SEMESTERS = ['All Semesters', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
const CATEGORIES = ['All', 'Handwritten Notes', 'PYQ', 'Lab Manual', 'Formula Sheet', 'Syllabus'];
const SORT_OPTIONS = ['Newest', 'Most Downloaded', 'Most Liked'];

// ── Upload Modal ────────────────────────────────────────────────────────────
interface UploadModalProps {
  onClose: () => void;
  onUpload: (data: Partial<NoteItem>) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [form, setForm] = useState<Partial<NoteItem>>({
    title: '',
    subject: '',
    subjectCode: '',
    branch: 'Computer Science Engineering',
    semester: 'Semester 1',
    category: 'Handwritten Notes',
    description: '',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    tags: [],
  });

  const set = (key: keyof NoteItem, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.subject) return;
    onUpload(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upload Study Material</h2>
              <p className="text-xs text-slate-500 mt-0.5">Share notes, PYQs, or resources with your campus</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Title *</label>
              <input
                value={form.title || ''}
                onChange={e => set('title', e.target.value)}
                placeholder="e.g. Data Structures Complete Notes – Unit 1-5"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Subject *</label>
                <input
                  value={form.subject || ''}
                  onChange={e => set('subject', e.target.value)}
                  placeholder="e.g. Data Structures"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Subject Code</label>
                <input
                  value={form.subjectCode || ''}
                  onChange={e => set('subjectCode', e.target.value)}
                  placeholder="e.g. CS301"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Category</label>
                <select
                  value={form.category || 'Handwritten Notes'}
                  onChange={e => set('category', e.target.value as NoteItem['category'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-white"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">File Type</label>
                <select
                  value={form.fileType || 'pdf'}
                  onChange={e => set('fileType', e.target.value as NoteItem['fileType'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-white"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">DOC / DOCX</option>
                  <option value="zip">ZIP</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Branch</label>
              <select
                value={form.branch || 'Computer Science Engineering'}
                onChange={e => set('branch', e.target.value as NoteItem['branch'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-white"
              >
                {BRANCHES.filter(b => b !== 'All Branches').map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Semester</label>
              <select
                value={form.semester || 'Semester 1'}
                onChange={e => set('semester', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-white"
              >
                {SEMESTERS.filter(s => s !== 'All Semesters').map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={form.description || ''}
                onChange={e => set('description', e.target.value)}
                placeholder="Briefly describe what's covered in this material..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 resize-none"
              />
            </div>

            {/* Mock file picker */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-colors">
              <Upload className="w-6 h-6 mx-auto mb-1.5 text-slate-400" />
              <p className="text-xs font-medium text-slate-600">Click to select file or drag & drop</p>
              <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOC, ZIP — max 50 MB</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Material
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ── Preview Modal ────────────────────────────────────────────────────────────
interface PreviewModalProps {
  note: NoteItem;
  onClose: () => void;
  onDownload: (id: string) => void;
  onLike: (id: string) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ note, onClose, onDownload, onLike }) => {
  const catColors: Record<string, string> = {
    'PYQ': 'bg-amber-100 text-amber-800',
    'Handwritten Notes': 'bg-blue-100 text-blue-800',
    'Lab Manual': 'bg-emerald-100 text-emerald-800',
    'Formula Sheet': 'bg-violet-100 text-violet-800',
    'Syllabus': 'bg-rose-100 text-rose-800',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[note.category] || 'bg-slate-100 text-slate-700'}`}>
              {note.category}
            </span>
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-base font-bold text-slate-900 mb-1">{note.title}</h2>
          <p className="text-sm text-slate-500 mb-3">{note.subject}{note.subjectCode ? ` · ${note.subjectCode}` : ''}</p>

          {note.description && (
            <p className="text-sm text-slate-700 leading-relaxed mb-4 bg-slate-50 rounded-xl p-3">{note.description}</p>
          )}

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Branch', value: note.branch },
              { label: 'Semester', value: note.semester },
              { label: 'File Type', value: note.fileType.toUpperCase() },
              { label: 'File Size', value: note.fileSize },
            ].map(r => (
              <div key={r.label} className="bg-slate-50 rounded-xl p-2.5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">{r.label}</p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">{r.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-5 p-3 bg-slate-50 rounded-xl">
            <img src={note.uploaderAvatar} alt={note.uploaderName} className="w-8 h-8 rounded-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(note.uploaderName)}&background=6366f1&color=fff`; }} />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-slate-800">{note.uploaderName}</span>
                {note.verifiedBySenior && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
              <p className="text-[11px] text-slate-500">{note.uploadedAt}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onLike(note.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                note.isLiked ? 'bg-rose-50 text-rose-600 border-rose-200' : 'text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${note.isLiked ? 'fill-rose-500' : ''}`} />
              {note.likesCount}
            </button>
            <button
              onClick={() => { onDownload(note.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Download ({note.fileType.toUpperCase()})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
export const NotesAndPYQsPage: React.FC = () => {
  const {
    notes,
    toggleLikeNote,
    incrementNoteDownload,
    uploadNote,
    isUploadNoteOpen,
    setIsUploadNoteOpen,
    selectedNoteForPreview,
    setSelectedNoteForPreview,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [showFilters, setShowFilters] = useState(false);

  // ── Filtering ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...notes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q) ||
        (n.subjectCode && n.subjectCode.toLowerCase().includes(q)) ||
        n.description?.toLowerCase().includes(q) ||
        n.uploaderName.toLowerCase().includes(q)
      );
    }
    if (selectedBranch !== 'All Branches') {
      result = result.filter(n => n.branch === selectedBranch || n.branch === 'All Branches' || n.branch === 'First Year Common');
    }
    if (selectedSemester !== 'All Semesters') {
      result = result.filter(n => n.semester === selectedSemester);
    }
    if (selectedCategory !== 'All') {
      result = result.filter(n => n.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'Most Downloaded': result.sort((a, b) => b.downloadsCount - a.downloadsCount); break;
      case 'Most Liked':      result.sort((a, b) => b.likesCount - a.likesCount); break;
      default:                break; // Newest = original order (already newest-first due to uploads prepending)
    }

    return result;
  }, [notes, searchQuery, selectedBranch, selectedSemester, selectedCategory, sortBy]);

  // ── Stats ──────────────────────────────────────────────────────────────
  const totalDownloads = notes.reduce((s, n) => s + n.downloadsCount, 0);
  const verifiedCount  = notes.filter(n => n.isVerified).length;
  const pyqCount       = notes.filter(n => n.category === 'PYQ').length;

  const hasActiveFilters = selectedBranch !== 'All Branches' || selectedSemester !== 'All Semesters' || selectedCategory !== 'All';

  const clearFilters = () => {
    setSelectedBranch('All Branches');
    setSelectedSemester('All Semesters');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-indigo-600 via-brand-600 to-violet-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-white/20 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white/80">Notes & PYQs</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Campus Study Repository</h1>
              <p className="text-white/75 text-sm mt-1.5 max-w-lg">
                Handwritten notes, previous year questions, lab manuals, and more — shared by verified seniors and students.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-5">
                {[
                  { icon: <FileText className="w-4 h-4" />, value: notes.length, label: 'Materials' },
                  { icon: <Download className="w-4 h-4" />, value: `${totalDownloads}+`, label: 'Downloads' },
                  { icon: <ShieldCheck className="w-4 h-4" />, value: verifiedCount, label: 'Verified' },
                  { icon: <Sparkles className="w-4 h-4" />, value: pyqCount, label: 'PYQs' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                    {s.icon}
                    <span className="font-bold text-sm">{s.value}</span>
                    <span className="text-white/70 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsUploadNoteOpen(true)}
              className="shrink-0 flex items-center gap-2 bg-white text-brand-700 hover:bg-white/90 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-black/10"
            >
              <Upload className="w-4 h-4" />
              Upload Material
            </button>
          </div>
        </div>
      </div>

      {/* ── Search + Filter Bar ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search notes, subjects, codes, or uploaders..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-slate-50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(f => !f)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {[selectedBranch !== 'All Branches', selectedSemester !== 'All Semesters', selectedCategory !== 'All'].filter(Boolean).length}
                </span>
              )}
            </button>
            {/* Sort */}
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Expandable filter panel */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap gap-3">
                {/* Branch */}
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={e => setSelectedBranch(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white cursor-pointer max-w-[180px]"
                  >
                    {BRANCHES.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                </div>

                {/* Semester */}
                <div className="relative">
                  <select
                    value={selectedSemester}
                    onChange={e => setSelectedSemester(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white cursor-pointer"
                  >
                    {SEMESTERS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                        selectedCategory === cat
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors border border-rose-200"
                  >
                    <X className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedBranch !== 'All Branches' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                  {selectedBranch}
                  <button onClick={() => setSelectedBranch('All Branches')}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {selectedSemester !== 'All Semesters' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                  {selectedSemester}
                  <button onClick={() => setSelectedSemester('All Semesters')}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Results Area ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Result count + sort (mobile) */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filtered.length}</span> material{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>
          {/* Sort (mobile only) */}
          <div className="relative sm:hidden">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-7 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none bg-white cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Category quick-filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-xl border transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onLike={toggleLikeNote}
                onDownload={incrementNoteDownload}
                onPreview={setSelectedNoteForPreview}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1.5">No materials found</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto mb-4">
              Try adjusting your filters or search query. You can also be the first to share material for this selection!
            </p>
            <div className="flex gap-2 justify-center">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear filters
                </button>
              )}
              <button
                onClick={() => setIsUploadNoteOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Material
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      {isUploadNoteOpen && (
        <UploadModal onClose={() => setIsUploadNoteOpen(false)} onUpload={uploadNote} />
      )}
      {selectedNoteForPreview && (
        <PreviewModal
          note={selectedNoteForPreview}
          onClose={() => setSelectedNoteForPreview(null)}
          onDownload={incrementNoteDownload}
          onLike={toggleLikeNote}
        />
      )}
    </div>
  );
};
