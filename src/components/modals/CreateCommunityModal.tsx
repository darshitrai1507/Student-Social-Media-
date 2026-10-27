import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Users, Shield, Plus, Trash2, Check } from 'lucide-react';
import { BranchType, CommunityType, YearOfStudy } from '../../types';

export const CreateCommunityModal: React.FC = () => {
  const { isCreateCommunityOpen, setIsCreateCommunityOpen, createCommunity, currentUser } = useApp();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [college, setCollege] = useState(currentUser.college);
  const [icon, setIcon] = useState('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&auto=format&fit=crop&q=80');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80');
  const [type, setType] = useState<CommunityType>('Technical');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState<BranchType[]>([currentUser.branch]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Web Development']);
  const [interestInput, setInterestInput] = useState('');
  const [rules, setRules] = useState<{ id: string; title: string; description: string }[]>([
    { id: 'r1', title: 'Respectful Communication', description: 'Be supportive and welcoming to all members.' },
    { id: 'r2', title: 'No Spam or Self-Promotion', description: 'Keep all discussions relevant to the community purpose.' }
  ]);
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');

  if (!isCreateCommunityOpen) return null;

  const ALL_BRANCHES: BranchType[] = [
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence and Machine Learning',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other'
  ];

  const ALL_TYPES: CommunityType[] = [
    'Technical',
    'Academic',
    'College Club',
    'Hobby',
    'Career and Placement',
    'Project Collaboration',
    'Sports and Cultural'
  ];

  const toggleBranch = (b: BranchType) => {
    if (selectedBranches.includes(b)) {
      if (selectedBranches.length > 1) {
        setSelectedBranches(selectedBranches.filter(item => item !== b));
      }
    } else {
      setSelectedBranches([...selectedBranches, b]);
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !selectedInterests.includes(interestInput.trim())) {
      setSelectedInterests([...selectedInterests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (tag: string) => {
    setSelectedInterests(selectedInterests.filter(t => t !== tag));
  };

  const handleAddRule = () => {
    if (newRuleTitle.trim()) {
      setRules([
        ...rules,
        {
          id: `r-${Date.now()}`,
          title: newRuleTitle.trim(),
          description: newRuleDesc.trim() || 'Follow community standards.'
        }
      ]);
      setNewRuleTitle('');
      setNewRuleDesc('');
    }
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCommunity({
      name: name.trim(),
      tagline: tagline.trim() || 'Campus Student Community',
      description: description.trim() || 'A new space for campus collaboration.',
      college,
      icon,
      coverImage,
      type,
      isPrivate,
      branches: selectedBranches,
      interests: selectedInterests,
      rules
    });

    setIsCreateCommunityOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Create a New Community</h2>
            <p className="text-xs text-slate-500">Build a dedicated campus space for clubs, branches, or shared interests</p>
          </div>
          <button 
            onClick={() => setIsCreateCommunityOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Community Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Jabalpur Open Source Enthusiasts, AI Innovators Hub"
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Short Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="A concise 1-sentence description that summarizes your mission"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Detailed Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is this community about? What activities, projects, and discussions will take place?"
                className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Type & Privacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Community Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as CommunityType)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              >
                {ALL_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                College Affiliation
              </label>
              <input
                type="text"
                value={college}
                onChange={e => setCollege(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Privacy Switch */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-slate-900">
                  {isPrivate ? 'Private Community (Approval Required)' : 'Public Community (Open to All)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isPrivate 
                  ? 'Students must request to join. Moderators review and approve members.' 
                  : 'Any verified student can join instantly and read discussions.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isPrivate ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPrivate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Branch Eligibility */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Target Branches (Select all applicable)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_BRANCHES.map(b => {
                const isSelected = selectedBranches.includes(b);
                const shortLabel = b.replace(' Engineering', '');
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBranch(b)}
                    className={`px-2.5 py-1.5 text-[11px] rounded-lg font-medium border text-left transition-colors truncate ${
                      isSelected
                        ? 'bg-brand-50 border-brand-300 text-brand-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : ''}{shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interests Tags */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Interest Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={e => setInterestInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                placeholder="e.g. Next.js, Robotics, Python, Game Dev (press enter)"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedInterests.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(tag)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Community Rules */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Community Rules ({rules.length})
            </label>
            <div className="space-y-2 mb-2">
              {rules.map(r => (
                <div key={r.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{r.title}</p>
                    <p className="text-[11px] text-slate-500">{r.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(r.id)}
                    className="text-slate-400 hover:text-rose-500 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newRuleTitle}
                onChange={e => setNewRuleTitle(e.target.value)}
                placeholder="Rule title (e.g. Constructive feedback only)"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddRule}
                disabled={!newRuleTitle.trim()}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Add Rule
              </button>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateCommunityOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Create Community
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
