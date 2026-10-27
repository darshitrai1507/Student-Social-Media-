import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Users, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  ArrowRight,
  School,
  Tag
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    users, 
    communities, 
    mentors, 
    events, 
    posts,
    viewCommunity,
    viewUserProfile,
    setActiveTab,
    openRequestMentorshipModal
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'students' | 'communities' | 'mentors' | 'events' | 'posts'>('all');

  if (!isGlobalSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results
  const matchingStudents = useMemo(() => {
    if (!trimmed) return [];
    return users.filter(u => 
      u.name.toLowerCase().includes(trimmed) ||
      u.branch.toLowerCase().includes(trimmed) ||
      u.skills.some(s => s.toLowerCase().includes(trimmed)) ||
      u.interests.some(i => i.toLowerCase().includes(trimmed))
    ).slice(0, 4);
  }, [trimmed, users]);

  const matchingCommunities = useMemo(() => {
    if (!trimmed) return [];
    return communities.filter(c => 
      c.name.toLowerCase().includes(trimmed) ||
      c.description.toLowerCase().includes(trimmed) ||
      c.type.toLowerCase().includes(trimmed) ||
      c.branches.some(b => b.toLowerCase().includes(trimmed)) ||
      c.interests.some(i => i.toLowerCase().includes(trimmed))
    ).slice(0, 4);
  }, [trimmed, communities]);

  const matchingMentors = useMemo(() => {
    if (!trimmed) return [];
    return mentors.filter(m => 
      m.name.toLowerCase().includes(trimmed) ||
      m.skills.some(s => s.toLowerCase().includes(trimmed)) ||
      m.areasOfGuidance.some(a => a.toLowerCase().includes(trimmed))
    ).slice(0, 3);
  }, [trimmed, mentors]);

  const matchingEvents = useMemo(() => {
    if (!trimmed) return [];
    return events.filter(e => 
      e.title.toLowerCase().includes(trimmed) ||
      e.description.toLowerCase().includes(trimmed) ||
      e.communityName.toLowerCase().includes(trimmed) ||
      e.tags.some(t => t.toLowerCase().includes(trimmed))
    ).slice(0, 3);
  }, [trimmed, events]);

  const matchingPosts = useMemo(() => {
    if (!trimmed) return [];
    return posts.filter(p => 
      p.content.toLowerCase().includes(trimmed) ||
      p.authorName.toLowerCase().includes(trimmed) ||
      (p.communityName && p.communityName.toLowerCase().includes(trimmed))
    ).slice(0, 3);
  }, [trimmed, posts]);

  const totalResults = matchingStudents.length + matchingCommunities.length + matchingMentors.length + matchingEvents.length + matchingPosts.length;

  const handleClose = () => {
    setIsGlobalSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[82vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type to search students, mentors, communities, clubs, events..."
            className="flex-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="text-xs px-2.5 py-1 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg font-medium"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs bg-slate-50/60">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'communities', label: `Communities (${matchingCommunities.length})` },
            { id: 'mentors', label: `Mentors (${matchingMentors.length})` },
            { id: 'students', label: `Students (${matchingStudents.length})` },
            { id: 'events', label: `Events (${matchingEvents.length})` },
            { id: 'posts', label: `Discussions (${matchingPosts.length})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeFilter === f.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!trimmed ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Quick Campus Search</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Try searching for <span className="text-brand-600 font-medium">"Web Development"</span>, <span className="text-brand-600 font-medium">"Placement"</span>, <span className="text-brand-600 font-medium">"Priya Verma"</span>, or <span className="text-brand-600 font-medium">"Docker"</span>.
                </p>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching campus records found for "{query}". Try a different branch, skill, or keyword.
            </div>
          ) : (
            <>
              {/* Communities Results */}
              {(activeFilter === 'all' || activeFilter === 'communities') && matchingCommunities.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-600" />
                    Communities & Clubs
                  </h4>
                  <div className="space-y-1.5">
                    {matchingCommunities.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          viewCommunity(c.id);
                          handleClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={c.icon} alt={c.name} className="w-9 h-9 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                                {c.name}
                              </span>
                              <Badge role={c.isPrivate ? 'Private' : 'Public'} size="xs" />
                            </div>
                            <p className="text-[11px] text-slate-500 truncate max-w-md">{c.tagline}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 group-hover:translate-x-1 transition-transform">
                          {c.memberCount} members →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors Results */}
              {(activeFilter === 'all' || activeFilter === 'mentors') && matchingMentors.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    Senior Mentors
                  </h4>
                  <div className="space-y-1.5">
                    {matchingMentors.map(m => (
                      <div
                        key={m.id}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors"
                      >
                        <div 
                          onClick={() => {
                            viewUserProfile(m.userId);
                            handleClose();
                          }}
                          className="flex items-center gap-3 min-w-0 cursor-pointer group"
                        >
                          <Avatar src={m.avatar} name={m.name} size="sm" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                                {m.name}
                              </span>
                              <Badge role="Mentor" size="xs" />
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {m.currentCompanyOrOffer || `${m.branch} • ${m.year}`}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            openRequestMentorshipModal(m);
                            handleClose();
                          }}
                          className="px-2.5 py-1 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-semibold rounded-lg flex-shrink-0 transition-colors"
                        >
                          Request
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Students Results */}
              {(activeFilter === 'all' || activeFilter === 'students') && matchingStudents.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-600" />
                    Students
                  </h4>
                  <div className="space-y-1.5">
                    {matchingStudents.map(u => (
                      <div
                        key={u.id}
                        onClick={() => {
                          viewUserProfile(u.id);
                          handleClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar src={u.avatar} name={u.name} size="sm" showOnline online={u.onlineStatus} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                                {u.name}
                              </span>
                              <Badge role={u.roleBadge} size="xs" />
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {u.branch} • {u.year}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-brand-600 transition-colors">
                          View profile →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Results */}
              {(activeFilter === 'all' || activeFilter === 'events') && matchingEvents.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Campus Events
                  </h4>
                  <div className="space-y-1.5">
                    {matchingEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => {
                          setActiveTab('events');
                          handleClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors block truncate">
                            {e.title}
                          </span>
                          <p className="text-[11px] text-slate-500 truncate">
                            {e.date} • {e.venue}
                          </p>
                        </div>
                        <span className="text-xs text-emerald-600 font-semibold flex-shrink-0">
                          {e.attendeeCount} attending
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {(activeFilter === 'all' || activeFilter === 'posts') && matchingPosts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    Discussions
                  </h4>
                  <div className="space-y-1.5">
                    {matchingPosts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setActiveTab('home');
                          handleClose();
                        }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar src={p.authorAvatar} name={p.authorName} size="xs" />
                          <span className="text-xs font-semibold text-slate-800">{p.authorName}</span>
                          {p.communityName && (
                            <span className="text-[10px] text-slate-400">in {p.communityName}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{p.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
