import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { EventCard } from '../components/events/EventCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { 
  Users, 
  Share2, 
  Plus, 
  FileText, 
  Download, 
  Calendar, 
  Info, 
  Shield, 
  Check, 
  Lock, 
  Clock, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Upload,
  X
} from 'lucide-react';
import { Post, CampusEvent, CommunityRule, CommunityMember, CommunityResource } from '../types';

export const CommunityDetailPage: React.FC = () => {
  const { 
    selectedCommunityId, 
    communities, 
    posts, 
    events, 
    communityDetailTab, 
    setCommunityDetailTab, 
    toggleJoinCommunity, 
    setIsCreatePostOpen, 
    setPreselectedPostCommunityId,
    viewUserProfile,
    setActiveTab,
    showToast,
    addCommunityResource
  } = useApp();

  const [resourceUploadModal, setResourceUploadModal] = useState(false);
  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resSubject, setResSubject] = useState('');
  const [resType, setResType] = useState<'pdf' | 'doc' | 'link' | 'code' | 'zip'>('pdf');

  const community = communities.find(c => c.id === selectedCommunityId) || communities[0];

  // Community-specific posts
  const communityPosts: Post[] = posts.filter(p => p.communityId === community.id);

  // Community-specific events
  const communityEvents: CampusEvent[] = events.filter(e => e.communityId === community.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Link to ${community.name} copied!`, 'info');
  };

  const handleOpenCreatePost = () => {
    setPreselectedPostCommunityId(community.id);
    setIsCreatePostOpen(true);
  };

  const handleUploadResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;
    addCommunityResource(community.id, {
      title: resTitle.trim(),
      description: resDesc.trim() || 'Shared campus resource for peer study.',
      fileType: resType,
      subject: resSubject.trim() || 'Engineering Coursework'
    });
    setResTitle('');
    setResDesc('');
    setResSubject('');
    setResourceUploadModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Back button */}
      <button
        onClick={() => setActiveTab('explore')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore Communities</span>
      </button>

      {/* Community Header Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        
        {/* Cover Image */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-900">
          <img 
            src={community.coverImage} 
            alt={community.name} 
            className="w-full h-full object-cover opacity-85" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 shadow-sm backdrop-blur-xs transition-colors"
              title="Share Community"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="p-5 sm:p-6 pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-4">
            
            <div className="flex items-end gap-4">
              <img 
                src={community.icon} 
                alt={community.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white flex-shrink-0" 
              />
              <div className="pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {community.name}
                  </h1>
                  <Badge role={community.isPrivate ? 'Private' : 'Public'} size="xs" />
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {community.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {community.college} • {community.memberCount} members ({community.activeMemberCount} online)
                </p>
              </div>
            </div>

            {/* Join / Leave / Request Action */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {community.joined ? (
                <>
                  <button
                    onClick={handleOpenCreatePost}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Post</span>
                  </button>

                  <button
                    onClick={() => toggleJoinCommunity(community.id)}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Joined</span>
                  </button>
                </>
              ) : community.isPrivate ? (
                community.requestPending ? (
                  <button
                    onClick={() => toggleJoinCommunity(community.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Request Pending</span>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleJoinCommunity(community.id)}
                    className="w-full sm:w-auto px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Request to Join</span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => toggleJoinCommunity(community.id)}
                  className="w-full sm:w-auto px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Join Community</span>
                </button>
              )}
            </div>

          </div>

          {/* Description & Tags */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
            {community.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {community.branches.map(b => (
              <span key={b} className="text-[11px] px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                {b.replace(' Engineering', '')}
              </span>
            ))}
            {community.interests.map(i => (
              <span key={i} className="text-[11px] px-2.5 py-0.5 bg-brand-50 text-brand-700 rounded-md font-medium">
                #{i}
              </span>
            ))}
          </div>

        </div>

        {/* 5 Tabs Header */}
        <div className="px-6 border-t border-slate-100 flex items-center gap-6 overflow-x-auto">
          {[
            { id: 'discussions', label: `Discussions (${communityPosts.length})` },
            { id: 'members', label: 'Members' },
            { id: 'resources', label: `Resources (${community.resources.length})` },
            { id: 'events', label: `Events (${communityEvents.length})` },
            { id: 'about', label: 'About & Rules' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCommunityDetailTab(tab.id as any)}
              className={`py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                communityDetailTab === tab.id
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Tab 1: Discussions */}
      {communityDetailTab === 'discussions' && (
        <div className="space-y-4">
          {community.joined && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Have a question or discussion topic for {community.name}?
              </span>
              <button
                onClick={handleOpenCreatePost}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post in Community</span>
              </button>
            </div>
          )}

          {communityPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
              <p className="font-bold text-sm text-slate-800">No discussions yet in this community</p>
              <p className="text-xs text-slate-400">Be the first to ask a question, share a project, or post notes.</p>
              <button
                onClick={handleOpenCreatePost}
                className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl"
              >
                Create First Post
              </button>
            </div>
          ) : (
            communityPosts.map((p: Post) => (
              <PostCard key={p.id} post={p} />
            ))
          )}
        </div>
      )}

      {/* Tab 2: Members */}
      {communityDetailTab === 'members' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Community Leadership & Moderators</h3>
            <p className="text-xs text-slate-500 mb-4">Admins and mentors steering this guild</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div 
                onClick={() => viewUserProfile('user-ananya')}
                className="p-3.5 rounded-xl border border-brand-200 bg-brand-50/40 flex items-center gap-3 cursor-pointer hover:bg-brand-50 transition-colors"
              >
                <Avatar src={community.moderatorAvatar} name={community.moderatorName} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{community.moderatorName}</span>
                    <Badge role="Club Admin" size="xs" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">Lead Moderator</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 mb-1">Active Members ({community.memberCount})</h3>
            <p className="text-xs text-slate-500 mb-4">Students connected in this campus circle</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {community.members.map((m: CommunityMember) => (
                <div 
                  key={m.userId}
                  onClick={() => viewUserProfile(m.userId)}
                  className="p-3 rounded-xl border border-slate-150 hover:bg-slate-50 flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <Avatar src={m.avatar} name={m.name} size="sm" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate block">{m.name}</span>
                    <p className="text-[11px] text-slate-500 truncate">{m.branch} • {m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Resources (MUST BE PART OF COMMUNITY!) */}
      {communityDetailTab === 'resources' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Community Study Resources & Notes</h3>
              <p className="text-xs text-slate-500">Handwritten lecture notes, reference PDFs, PYQs, and project files curated for {community.name}</p>
            </div>

            <button
              onClick={() => setResourceUploadModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Share Resource</span>
            </button>
          </div>

          {community.resources.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No resources shared yet</p>
              <p className="text-xs text-slate-400">Share your study notes, cheat sheets, or previous year questions with peers.</p>
              <button
                onClick={() => setResourceUploadModal(true)}
                className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl"
              >
                Upload First Resource
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {community.resources.map((res: CommunityResource) => (
                <div 
                  key={res.id}
                  className="p-4 rounded-xl border border-slate-200/90 hover:border-brand-200 hover:bg-slate-50/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0 font-bold text-xs uppercase">
                      {res.fileType}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{res.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{res.description}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 flex-wrap">
                        <span className="font-semibold text-slate-600">{res.subject}</span>
                        {res.semester && <span>• {res.semester}</span>}
                        <span>• Uploaded by {res.uploaderName}</span>
                        <span>• {res.fileSize}</span>
                        <span>• {res.downloadsCount} downloads</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Downloading "${res.title}"...`, 'info')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 text-slate-700 text-xs font-semibold transition-colors flex-shrink-0 self-end sm:self-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Events */}
      {communityDetailTab === 'events' && (
        <div className="space-y-4">
          {communityEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
              No upcoming events scheduled for this community currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {communityEvents.map((e: CampusEvent) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: About & Rules */}
      {communityDetailTab === 'about' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2">Community Mission & Guidelines</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-600" />
              Community Code of Conduct ({community.rules.length} Rules)
            </h3>
            <div className="space-y-2.5">
              {community.rules.map((rule: CommunityRule, idx: number) => (
                <div key={rule.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-900 block mb-0.5">
                    {idx + 1}. {rule.title}
                  </span>
                  <p className="text-xs text-slate-500">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal Simulator */}
      {resourceUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-dropdown border border-slate-200/90 w-full max-w-md overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Upload Study Resource</h3>
              <button onClick={() => setResourceUploadModal(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleUploadResourceSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={e => setResTitle(e.target.value)}
                  placeholder="e.g. Operating Systems Concurrency Notes"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Subject / Course</label>
                <input
                  type="text"
                  value={resSubject}
                  onChange={e => setResSubject(e.target.value)}
                  placeholder="e.g. CS-402 Operating Systems"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">File Type</label>
                <select
                  value={resType}
                  onChange={e => setResType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option value="pdf">PDF Document (.pdf)</option>
                  <option value="code">Source Code (.zip, .cpp, .py)</option>
                  <option value="doc">Study Sheet / Doc</option>
                  <option value="link">External Tutorial Link</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={resDesc}
                  onChange={e => setResDesc(e.target.value)}
                  placeholder="Notes content summary..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResourceUploadModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!resTitle.trim()}
                  className="px-4 py-1.5 bg-brand-600 text-white font-semibold text-xs rounded-xl"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
