import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MentorCard } from '../components/mentorship/MentorCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Users, 
  GraduationCap, 
  Send,
  Calendar,
  Briefcase
} from 'lucide-react';
import { BranchType, YearOfStudy, Mentor, MentorshipRequest, User } from '../types';

export const MentorshipPage: React.FC = () => {
  const { 
    mentors, 
    mentorshipRequests, 
    currentUser, 
    respondMentorshipRequest, 
    startChatWithUser, 
    viewUserProfile,
    users,
    openRequestMentorshipModal,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState<'find' | 'my-mentors' | 'incoming' | 'sent'>('find');
  
  // Search and Filters for Find a Mentor
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guidance Areas');
  const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All Availability');

  const GUIDANCE_CATEGORIES = [
    'All Guidance Areas',
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

  const BRANCHES = [
    'All Branches',
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence and Machine Learning',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  // Mentors filtered
  const filteredMentors: Mentor[] = useMemo(() => {
    return mentors.filter((m: Mentor) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesBio = m.bio.toLowerCase().includes(q);
        const matchesSkill = m.skills.some((s: string) => s.toLowerCase().includes(q));
        const matchesCompany = (m.currentCompanyOrOffer || '').toLowerCase().includes(q);
        if (!matchesName && !matchesBio && !matchesSkill && !matchesCompany) return false;
      }

      if (selectedCategory !== 'All Guidance Areas') {
        if (!m.areasOfGuidance.includes(selectedCategory)) return false;
      }

      if (selectedBranch !== 'All Branches') {
        if (m.branch !== selectedBranch) return false;
      }

      if (selectedAvailability !== 'All Availability') {
        if (m.availability !== selectedAvailability) return false;
      }

      return true;
    });
  }, [mentors, searchQuery, selectedCategory, selectedBranch, selectedAvailability]);

  // Mentorship Requests Split
  const mySentRequests = mentorshipRequests.filter((r: MentorshipRequest) => r.menteeId === currentUser.id);
  const myAcceptedMentors = mentorshipRequests.filter((r: MentorshipRequest) => r.menteeId === currentUser.id && r.status === 'accepted');
  const incomingRequestsForDemo = mentorshipRequests.filter((r: MentorshipRequest) => r.menteeId !== currentUser.id || r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-violet-200 border border-white/15 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-300" />
            Senior-Junior Connect Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Campus Mentorship Network
          </h1>
          <p className="text-xs sm:text-sm text-violet-100/90 mt-1.5 leading-relaxed">
            Connect 1-on-1 with placed seniors, ICPC qualifiers, and club leads. Get guidance on subjects, coding roadmaps, resumes, and campus life.
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-violet-200">
            <span>🤝 100% Voluntary Mentorship</span>
            <span>•</span>
            <span>⭐ Peer-to-Peer Verified</span>
          </div>
        </div>

        {/* Decorative blur shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Navigation Sections Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'find', label: `Find a Mentor (${filteredMentors.length})` },
          { id: 'my-mentors', label: `My Mentors (${myAcceptedMentors.length})` },
          { id: 'sent', label: `Sent Requests (${mySentRequests.length})` },
          { id: 'incoming', label: `Mentor Inbox (${incomingRequestsForDemo.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeSection === tab.id
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: FIND A MENTOR */}
      {activeSection === 'find' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search mentors by name, company, or skills..."
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                />
              </div>

              {/* Guidance Area */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                >
                  {GUIDANCE_CATEGORIES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Branch */}
              <div>
                <select
                  value={selectedBranch}
                  onChange={e => setSelectedBranch(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                >
                  {BRANCHES.map(b => (
                    <option key={b} value={b}>{b.replace(' Engineering', '')}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <select
                  value={selectedAvailability}
                  onChange={e => setSelectedAvailability(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                >
                  <option value="All Availability">All Availability Statuses</option>
                  <option value="Available">🟢 Available</option>
                  <option value="Limited">🟡 Limited Availability</option>
                  <option value="Busy">🔴 Busy</option>
                </select>
              </div>

            </div>
          </div>

          {/* Mentors Grid */}
          {filteredMentors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
              No mentors match your active criteria. Try broadening your branch or guidance area selection.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMentors.map((m: Mentor) => (
                <MentorCard key={m.id} mentor={m} />
              ))}
            </div>
          )}

        </div>
      )}

      {/* SECTION 2: MY MENTORS (Active Relationships) */}
      {activeSection === 'my-mentors' && (
        <div className="space-y-4">
          {myAcceptedMentors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-violet-400 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900">No active mentors yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse our directory of verified seniors and send a mentorship request with your specific questions.
              </p>
              <button
                onClick={() => setActiveSection('find')}
                className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-semibold"
              >
                Find a Mentor
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myAcceptedMentors.map((req: MentorshipRequest) => {
                const targetUser = users.find((u: User) => u.name === req.mentorName);
                return (
                  <div key={req.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar src={req.mentorAvatar} name={req.mentorName} size="md" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-sm text-slate-900">{req.mentorName}</h4>
                              <Badge role="Mentor" size="xs" />
                            </div>
                            <p className="text-xs text-brand-700 font-medium">{req.mentorRole}</p>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Active Mentorship
                        </span>
                      </div>

                      <div className="p-3 bg-violet-50/50 rounded-xl border border-violet-100 text-xs mb-3 space-y-1">
                        <span className="font-bold text-violet-900 block">Focus: {req.guidanceCategory}</span>
                        <p className="text-slate-600 text-[11px] line-clamp-2">"{req.helpDescription}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          if (targetUser) {
                            startChatWithUser(targetUser);
                          } else {
                            showToast('Opening conversation...', 'info');
                          }
                        }}
                        className="flex-1 py-2 px-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Mentor</span>
                      </button>

                      <button
                        onClick={() => {
                          if (targetUser) viewUserProfile(targetUser.id);
                        }}
                        className="py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: SENT REQUESTS */}
      {activeSection === 'sent' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Sent Mentorship Inquiries</h3>
            <p className="text-xs text-slate-500">Track the status of your guidance requests to campus seniors</p>
          </div>

          {mySentRequests.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              You haven't submitted any mentorship requests yet.
            </div>
          ) : (
            <div className="space-y-3">
              {mySentRequests.map((r: MentorshipRequest) => (
                <div key={r.id} className="p-4 rounded-xl border border-slate-150 hover:border-slate-200 bg-slate-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Avatar src={r.mentorAvatar} name={r.mentorName} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{r.mentorName}</span>
                        <span className="text-[11px] text-slate-400">• {r.guidanceCategory}</span>
                        <span className="text-[10px] text-slate-400">• {r.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">"{r.helpDescription}"</p>
                      <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
                        Format: {r.preferredMode}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-end sm:self-center">
                    {r.status === 'accepted' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Accepted
                      </span>
                    ) : r.status === 'declined' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        Declined
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Review
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: INCOMING REQUESTS (Mentor Dashboard Simulator) */}
      {activeSection === 'incoming' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Incoming Student Inquiries</h3>
                <span className="text-[10px] font-semibold bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full">
                  Mentor View Demo
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Review and accept or decline mentorship requests from junior students
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {incomingRequestsForDemo.map((r: MentorshipRequest) => (
              <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <Avatar src={r.menteeAvatar} name={r.menteeName} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{r.menteeName}</span>
                      <span className="text-[11px] text-slate-500">({r.menteeBranch} • {r.menteeYear})</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {r.guidanceCategory}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mt-1.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-150">
                      "{r.helpDescription}"
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
                      <span>Preferred Mode: {r.preferredMode}</span>
                      <span>•</span>
                      <span>{r.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  {r.status === 'accepted' ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Accepted
                    </span>
                  ) : r.status === 'declined' ? (
                    <span className="text-xs font-semibold text-slate-400">
                      Declined
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => respondMentorshipRequest(r.id, 'accepted')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => respondMentorshipRequest(r.id, 'declined')}
                        className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium rounded-xl transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
