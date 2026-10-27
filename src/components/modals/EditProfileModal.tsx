import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save, Plus, Trash2, Sparkles, User, Briefcase } from 'lucide-react';
import { ProjectItem } from '../../types';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, currentUser, updateCurrentUser } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [skills, setSkills] = useState<string[]>(currentUser.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>(currentUser.interests || []);
  const [interestInput, setInterestInput] = useState('');
  const [isMentor, setIsMentor] = useState(currentUser.isMentor || false);
  const [mentorAvailability, setMentorAvailability] = useState<'Available' | 'Limited' | 'Busy'>(
    currentUser.mentorAvailability || 'Available'
  );
  const [mentorBio, setMentorBio] = useState(currentUser.mentorBio || '');

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>(currentUser.projects || []);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');

  if (!isEditProfileOpen) return null;

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (s: string) => {
    setSkills(skills.filter(item => item !== s));
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (i: string) => {
    setInterests(interests.filter(item => item !== i));
  };

  const handleAddProject = () => {
    if (newProjTitle.trim()) {
      setProjects([
        ...projects,
        {
          id: `proj-${Date.now()}`,
          title: newProjTitle.trim(),
          description: newProjDesc.trim() || 'A campus student project.',
          techStack: newProjTech ? newProjTech.split(',').map(s => s.trim()) : ['React']
        }
      ]);
      setNewProjTitle('');
      setNewProjDesc('');
      setNewProjTech('');
    }
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim(),
      bio: bio.trim(),
      avatar: avatar.trim(),
      skills,
      interests,
      projects,
      isMentor,
      mentorAvailability,
      mentorBio: mentorBio.trim()
    });
    setIsEditProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Edit Student Profile</h2>
            <p className="text-xs text-slate-500">Update your academic bio, skills, showcase projects, and mentorship preferences</p>
          </div>
          <button 
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img 
              src={avatar} 
              alt={name} 
              className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-xs" 
            />
            <div className="flex-1 w-full space-y-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Academic Bio */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="What are you studying? What are your engineering passions and goals?"
              className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
          </div>

          {/* Skills Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Skills & Tech Stack
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="e.g. React, C++, Docker, PyTorch (press enter)"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-800 border border-brand-200/50 rounded-md text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-brand-500 hover:text-brand-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Campus Interests
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
                placeholder="e.g. Web Development, Robotics, Music (press enter)"
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Add Interest
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {interests.map(int => (
                <span
                  key={int}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs"
                >
                  #{int}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(int)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Mentorship Settings */}
          <div className="p-4 bg-violet-50/50 border border-violet-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-bold text-violet-900">
                  Senior Mentorship Program
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMentor(!isMentor)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isMentor ? 'bg-violet-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isMentor ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-600">
              Opt in to help juniors with first-year advice, subject doubts, coding guidance, and interview prep.
            </p>

            {isMentor && (
              <div className="space-y-3 pt-2 border-t border-violet-100">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Current Availability Status
                  </label>
                  <select
                    value={mentorAvailability}
                    onChange={e => setMentorAvailability(e.target.value as any)}
                    className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium"
                  >
                    <option value="Available">🟢 Available (Accepting Requests)</option>
                    <option value="Limited">🟡 Limited (1-2 mentees only)</option>
                    <option value="Busy">🔴 Busy (Exam / Project Season)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Mentorship Bio & Offerings
                  </label>
                  <input
                    type="text"
                    value={mentorBio}
                    onChange={e => setMentorBio(e.target.value)}
                    placeholder="e.g. Available for resume critiques and 1st year survival advice"
                    className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Featured Projects ({projects.length})
            </label>
            <div className="space-y-2 mb-3">
              {projects.map(p => (
                <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.techStack.map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(p.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 border border-dashed border-slate-300 rounded-xl space-y-2 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-700 block">Add New Project</span>
              <input
                type="text"
                value={newProjTitle}
                onChange={e => setNewProjTitle(e.target.value)}
                placeholder="Project Title (e.g. Smart Campus Navigation)"
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
              <input
                type="text"
                value={newProjDesc}
                onChange={e => setNewProjDesc(e.target.value)}
                placeholder="Brief summary of what it does and why you built it"
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
              <input
                type="text"
                value={newProjTech}
                onChange={e => setNewProjTech(e.target.value)}
                placeholder="Comma separated tech stack (e.g. React, Node.js, Leaflet)"
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddProject}
                disabled={!newProjTitle.trim()}
                className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 disabled:opacity-50 text-brand-700 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
