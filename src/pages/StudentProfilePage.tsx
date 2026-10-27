import React from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { 
  Sparkles, 
  MessageSquare, 
  UserPlus, 
  Check, 
  ExternalLink, 
  Github, 
  Award, 
  Users, 
  Edit3, 
  ShieldCheck, 
  Star,
  ArrowLeft
} from 'lucide-react';
import { User, Community, Mentor, ProjectItem, AchievementItem } from '../types';

export const StudentProfilePage: React.FC = () => {
  const { 
    selectedUserId, 
    currentUser, 
    users, 
    communities, 
    mentors, 
    startChatWithUser, 
    toggleConnectStudent, 
    openRequestMentorshipModal, 
    viewCommunity, 
    setIsEditProfileOpen,
    setActiveTab 
  } = useApp();

  // Find user to display: if selectedUserId exists, look it up; otherwise default to currentUser
  const user: User = (selectedUserId ? users.find((u: User) => u.id === selectedUserId) : currentUser) || currentUser;
  const isMe = user.id === currentUser.id;

  // Joined communities
  const userCommunities: Community[] = communities.filter((c: Community) => (user.joinedCommunities || []).includes(c.id));

  // Mentor profile if this user is a mentor
  const mentorRecord = mentors.find((m: Mentor) => m.userId === user.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {!isMe && (
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Profile Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        
        {/* Cover */}
        <div className="h-40 sm:h-52 w-full bg-gradient-to-r from-brand-800 to-indigo-900 relative">
          {user.coverImage ? (
            <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-brand-900 to-accent-900" />
          )}
        </div>

        {/* Info Row */}
        <div className="p-5 sm:p-6 pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
            
            <div className="flex items-end gap-4">
              <Avatar 
                src={user.avatar} 
                name={user.name} 
                size="2xl" 
                showOnline 
                online={user.onlineStatus} 
                className="border-4 border-white shadow-md bg-white"
              />
              <div className="pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name}</h1>
                  <Badge role={user.roleBadge} size="xs" />
                  <Badge role="Verified" size="xs" />
                </div>
                <p className="text-xs text-brand-700 font-semibold mt-0.5">
                  {user.branch} • {user.year}
                </p>
                <p className="text-[11px] text-slate-500">
                  {user.college}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isMe ? (
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => startChatWithUser(user)}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>

                  <button
                    onClick={() => toggleConnectStudent(user.id)}
                    className={`px-3.5 py-2 border rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      user.connectionStatus === 'connected'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : user.connectionStatus === 'pending'
                        ? 'border-amber-200 bg-amber-50 text-amber-700'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {user.connectionStatus === 'connected' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : user.connectionStatus === 'pending' ? (
                      <span>Pending</span>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  {user.isMentor && mentorRecord && (
                    <button
                      onClick={() => openRequestMentorshipModal(mentorRecord)}
                      className="px-3.5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Request Mentorship</span>
                    </button>
                  )}
                </>
              )}
            </div>

          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            {user.bio}
          </p>

          {/* Mentorship Availability Banner if Mentor */}
          {user.isMentor && (
            <div className="p-3.5 bg-violet-50/70 border border-violet-100 rounded-xl mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-violet-900 block">
                    Campus Senior Mentor ({user.mentorAvailability || 'Available'})
                  </span>
                  <p className="text-[11px] text-violet-700">
                    {user.mentorBio || 'Open to assisting juniors with coursework, career guidance, and interview prep.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Skills & Domains */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Skills & Engineering Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.map((s: string) => (
                <span key={s} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2 mt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Interests & Campus Domains
            </span>
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((i: string) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-brand-50 text-brand-700 rounded-lg font-medium">
                  #{i}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Grid: Projects (Left) & Communities/Achievements (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Featured Projects (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Featured Student Projects</h3>

            {(!user.projects || user.projects.length === 0) ? (
              <p className="text-xs text-slate-400 py-4 text-center">No projects added yet.</p>
            ) : (
              <div className="space-y-3">
                {user.projects.map((proj: ProjectItem) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{proj.title}</h4>
                      {proj.stars && (
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" /> {proj.stars}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack.map((t: string) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    {proj.github && (
                      <div className="pt-1 flex items-center gap-3 text-xs text-brand-600 font-medium">
                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <Github className="w-3.5 h-3.5" /> Source Code
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Communities Joined & Achievements (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Achievements & Honors
            </h3>
            {(!user.achievements || user.achievements.length === 0) ? (
              <p className="text-xs text-slate-400 py-2">No achievements listed.</p>
            ) : (
              <div className="space-y-2.5">
                {user.achievements.map((ach: AchievementItem) => (
                  <div key={ach.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">{ach.title}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">{ach.organization} • {ach.year}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Communities Joined */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-600" />
              Campus Communities Joined ({userCommunities.length})
            </h3>
            <div className="space-y-2">
              {userCommunities.map((c: Community) => (
                <div 
                  key={c.id} 
                  onClick={() => viewCommunity(c.id)}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <img src={c.icon} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate block">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
