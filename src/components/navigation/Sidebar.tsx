import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  Users, 
  Bookmark, 
  MessageSquare, 
  Calendar, 
  User as UserIcon, 
  Settings, 
  PlusCircle, 
  Sparkles,
  School,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    unreadMessagesCount,
    mentorshipRequests,
    setIsCreatePostOpen,
    setIsCreateCommunityOpen,
    communities
  } = useApp();

  const joinedCount = communities.filter(c => c.joined).length;
  const pendingRequestsCount = mentorshipRequests.filter(r => r.status === 'pending' && r.menteeId === currentUser.id).length;

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore Communities', icon: Compass },
    { id: 'mentorship', label: 'Mentorship', icon: Sparkles, badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} pending` : undefined },
    { id: 'my-communities', label: 'My Communities', icon: Users, badge: joinedCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notes-pyqs', label: 'Notes & PYQs', icon: BookOpen },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-200/80 sticky top-0 flex-shrink-0 z-30 select-none">
      {/* Brand Logo Header */}
      <div className="p-5 pb-3">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-brand-700 bg-clip-text text-transparent">
                StudentSphere
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-brand-50 text-brand-700 border border-brand-200 rounded">
                Campus
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[140px] font-medium">
              Jabalpur Eng. College
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
        <p className="px-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Menu
        </p>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-50/90 text-brand-700 font-semibold shadow-xs border border-brand-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  isActive
                    ? 'bg-brand-200/80 text-brand-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Action Buttons */}
        <div className="pt-4 px-2 space-y-2">
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Post</span>
          </button>

          <button
            onClick={() => setIsCreateCommunityOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 hover:bg-brand-50/50 rounded-xl text-xs font-medium transition-colors"
          >
            <School className="w-3.5 h-3.5" />
            <span>Create Community</span>
          </button>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div 
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
        >
          <Avatar 
            src={currentUser.avatar} 
            name={currentUser.name} 
            size="sm" 
            showOnline 
            online 
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-900 truncate">
                {currentUser.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {currentUser.branch.includes('Computer Science') ? '2nd Yr CSE' : currentUser.year}
            </p>
          </div>
          <Badge role={currentUser.roleBadge} size="xs" />
        </div>
      </div>
    </aside>
  );
};
