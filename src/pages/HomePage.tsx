import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { 
  Sparkles, 
  Compass, 
  PlusCircle, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Users, 
  UserPlus, 
  Check, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Community, Mentor, CampusEvent, User, Post } from '../types';

export const HomePage: React.FC = () => {
  const { 
    currentUser, 
    posts, 
    communities, 
    mentors, 
    events, 
    users, 
    setActiveTab, 
    viewCommunity, 
    viewUserProfile, 
    toggleJoinCommunity, 
    openRequestMentorshipModal, 
    toggleConnectStudent, 
    setIsCreatePostOpen, 
    setIsEditProfileOpen 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Following' | 'Communities' | 'Mentorship'>('All');

  // Filter posts
  const filteredPosts: Post[] = posts.filter((p: Post) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Following') {
      return p.category === 'Following' || p.authorId === currentUser.id;
    }
    if (activeCategory === 'Communities') {
      return !!p.communityId;
    }
    if (activeCategory === 'Mentorship') {
      return p.category === 'Mentorship' || p.authorBadge === 'Mentor' || p.authorBadge === 'Senior';
    }
    return true;
  });

  // Recommended communities (not joined yet)
  const recommendedCommunities: Community[] = communities.filter((c: Community) => !c.joined).slice(0, 3);
  // Recommended mentors
  const recommendedMentors: Mentor[] = mentors.filter((m: Mentor) => m.userId !== currentUser.id).slice(0, 3);
  // Upcoming events
  const upcomingEvents: CampusEvent[] = events.slice(0, 3);
  // Suggested peers with shared interests
  const suggestedPeers: User[] = users
    .filter((u: User) => u.id !== currentUser.id && u.roleBadge === 'Student')
    .slice(0, 3);

  // Time-of-day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900 via-indigo-900 to-accent-950 text-white p-6 sm:p-7 shadow-card mb-6">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-brand-200 border border-white/15 backdrop-blur-xs">
              🎓 Digital Campus
            </span>
            <span className="text-xs text-brand-200 font-medium">
              {currentUser.college}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {greeting}, {currentUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-brand-100/90 mt-1.5 leading-relaxed">
            Welcome to your student hub. Connect with seniors, collaborate on projects, participate in clubs, and discover campus opportunities.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('mentorship')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-brand-900 font-semibold text-xs shadow-sm hover:bg-brand-50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Find a Senior Mentor</span>
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-xs transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-brand-300" />
              <span>Discover Communities</span>
            </button>

            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              <span>Start Discussion</span>
            </button>
          </div>
        </div>

        {/* Ambient background blur circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 -mb-12 w-60 h-60 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* Main Grid: Left Feed (2 cols) & Right Widgets (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Feed (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Profile Completion Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold text-sm border border-brand-200">
                <span>85%</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-900">Complete your student profile</h3>
                  <Badge role="Verified" size="xs" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add your GitHub project links and verify your semester to unlock mentor badge eligibility.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="text-xs font-semibold px-3 py-1.5 text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors whitespace-nowrap self-end sm:self-center"
            >
              Edit Profile →
            </button>
          </div>

          {/* Quick Post Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle flex items-center gap-3">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
            <div 
              onClick={() => setIsCreatePostOpen(true)}
              className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-400 cursor-pointer transition-colors"
            >
              Share an update, project, or question with your campus...
            </div>
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs transition-colors flex-shrink-0"
              title="Create Post"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Feed Filter Categories */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            {[
              { id: 'All', label: 'All Discussions' },
              { id: 'Following', label: 'Following' },
              { id: 'Communities', label: 'My Communities' },
              { id: 'Mentorship', label: 'Senior Guidance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs">
                No posts in this feed yet. Start the conversation!
              </div>
            ) : (
              filteredPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>

        </div>

        {/* Right Column: Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recommended Communities Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand-600" />
                Recommended Communities
              </h3>
              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                See all
              </button>
            </div>

            <div className="space-y-3">
              {recommendedCommunities.map((c: Community) => (
                <div key={c.id} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div 
                    onClick={() => viewCommunity(c.id)}
                    className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                  >
                    <img src={c.icon} alt={c.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{c.memberCount} members</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleJoinCommunity(c.id)}
                    className="px-2.5 py-1 text-xs font-semibold bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    {c.isPrivate ? 'Request' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Seniors & Mentors Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                Recommended Mentors
              </h3>
              <button
                onClick={() => setActiveTab('mentorship')}
                className="text-xs font-semibold text-violet-600 hover:text-violet-700"
              >
                Browse
              </button>
            </div>

            <div className="space-y-3">
              {recommendedMentors.map((m: Mentor) => (
                <div key={m.id} className="p-2.5 rounded-xl border border-slate-100 hover:border-violet-200 bg-slate-50/50 hover:bg-violet-50/30 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div 
                      onClick={() => viewUserProfile(m.userId)}
                      className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                    >
                      <Avatar src={m.avatar} name={m.name} size="sm" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 truncate">{m.name}</span>
                          <Badge role="Mentor" size="xs" />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {m.currentCompanyOrOffer || `${m.branch} 4th Yr`}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openRequestMentorshipModal(m)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors flex-shrink-0 shadow-xs"
                    >
                      Request
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.areasOfGuidance.slice(0, 2).map((area: string) => (
                      <span key={area} className="text-[10px] px-1.5 py-0.2 bg-white text-violet-700 border border-violet-100 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming College Events Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Upcoming Campus Events
              </h3>
              <button
                onClick={() => setActiveTab('events')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((e: CampusEvent) => (
                <div 
                  key={e.id}
                  onClick={() => setActiveTab('events')}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{e.title}</h4>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 flex-shrink-0">
                      {e.eventType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    📅 {e.date}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    📍 {e.venue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Peers Based on Shared Interests */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-600" />
                Suggested Classmates
              </h3>
            </div>

            <div className="space-y-3">
              {suggestedPeers.map((peer: User) => (
                <div key={peer.id} className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div 
                    onClick={() => viewUserProfile(peer.id)}
                    className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                  >
                    <Avatar src={peer.avatar} name={peer.name} size="sm" showOnline online={peer.onlineStatus} />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate block">{peer.name}</span>
                      <p className="text-[11px] text-slate-500 truncate">{peer.branch}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnectStudent(peer.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors flex-shrink-0 ${
                      peer.connectionStatus === 'connected'
                        ? 'bg-slate-100 text-slate-600'
                        : peer.connectionStatus === 'pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-brand-50 hover:bg-brand-100 text-brand-700'
                    }`}
                  >
                    {peer.connectionStatus === 'connected' ? 'Connected' : peer.connectionStatus === 'pending' ? 'Pending' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
