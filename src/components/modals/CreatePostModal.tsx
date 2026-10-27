import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Image, BarChart2, Plus, Trash2, Sparkles, Send } from 'lucide-react';
import { Avatar } from '../common/Avatar';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreatePostOpen, 
    setIsCreatePostOpen, 
    currentUser, 
    communities, 
    createPost,
    preselectedPostCommunityId,
    setPreselectedPostCommunityId
  } = useApp();

  const [content, setContent] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>(preselectedPostCommunityId || '');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showPollInput, setShowPollInput] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  if (!isCreatePostOpen) return null;

  const handleClose = () => {
    setIsCreatePostOpen(false);
    setPreselectedPostCommunityId(null);
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !pollQuestion.trim()) return;

    createPost({
      content: content.trim(),
      communityId: selectedCommunityId || undefined,
      image: imageUrl.trim() || undefined,
      pollQuestion: showPollInput && pollQuestion.trim() ? pollQuestion.trim() : undefined,
      pollOptions: showPollInput && pollQuestion.trim() 
        ? pollOptions.map(o => o.trim()).filter(Boolean) 
        : undefined
    });

    // Reset and close
    setContent('');
    setImageUrl('');
    setShowImageInput(false);
    setShowPollInput(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    handleClose();
  };

  const joinedCommunities = communities.filter(c => c.joined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="font-bold text-base text-slate-900">Create Campus Post</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Author & Destination */}
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-slate-900 block truncate">
                {currentUser.name}
              </span>
              <div className="mt-1 flex items-center gap-2">
                <select
                  value={selectedCommunityId}
                  onChange={e => setSelectedCommunityId(e.target.value)}
                  className="text-xs py-1 px-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                >
                  <option value="">🌐 General Feed (All Campus)</option>
                  {joinedCommunities.map(c => (
                    <option key={c.id} value={c.id}>
                      👥 {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            placeholder="Share a project update, ask a question to seniors, discuss an upcoming hackathon, or start a campus discussion..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 resize-none border-0 focus:ring-0 p-1 focus:outline-hidden"
            autoFocus
          />

          {/* Image Input */}
          {showImageInput && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <label className="text-xs font-medium text-slate-700 flex items-center justify-between">
                <span>Image or Screenshot Preview URL</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl('');
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or paste image URL"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-brand-500"
              />
              {imageUrl && (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 h-36 bg-slate-100">
                  <img src={imageUrl} alt="Attachment Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          {/* Poll Input */}
          {showPollInput && (
            <div className="p-3.5 bg-brand-50/50 border border-brand-100 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-brand-600" />
                  Create a Student Poll
                </span>
                <button
                  type="button"
                  onClick={() => setShowPollInput(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={pollQuestion}
                onChange={e => setPollQuestion(e.target.value)}
                placeholder="Ask a question (e.g. Which web framework are you learning?)"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-brand-500"
              />

              <div className="space-y-2">
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={e => handlePollOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePollOption(idx)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {pollOptions.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddPollOption}
                  className="text-xs text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add option
                </button>
              )}
            </div>
          )}

          {/* Action Attachments */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showImageInput ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Add Image"
              >
                <Image className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Image</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPollInput(!showPollInput)}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showPollInput ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Create Poll"
              >
                <BarChart2 className="w-4 h-4 text-brand-600" />
                <span className="hidden sm:inline">Poll</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!content.trim() && !pollQuestion.trim()}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
