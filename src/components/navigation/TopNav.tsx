import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Plus, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  User, 
  Settings, 
  Sparkles, 
  LogOut,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const TopNav: React.FC = () => {
  const { 
    currentUser, 
    notifications, 
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    viewCommunity,
    viewUserProfile,
    setIsCreatePostOpen,
    setIsCreateCommunityOpen,
    setIsGlobalSearchOpen
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredNotifs = notifFilter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    setIsNotificationsOpen(false);
    if (notif.targetTab === 'mentorship') {
      setActiveTab('mentorship');
    } else if (notif.targetTab === 'events' && notif.targetId) {
      setActiveTab('events');
    } else if (notif.targetTab === 'explore' && notif.targetId) {
      viewCommunity(notif.targetId);
    } else if (notif.targetTab === 'messages') {
      setActiveTab('messages');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Mobile / Left Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-base">
              StudentSphere
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <div 
            onClick={() => setIsGlobalSearchOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/70 rounded-xl cursor-pointer text-slate-500 transition-colors group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            <span className="text-xs sm:text-sm text-slate-400 font-normal truncate">
              Search students, mentors, communities, events...
            </span>
            <kbd className="hidden md:inline-block ml-auto text-[10px] font-medium bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
              Ctrl + K
            </kbd>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg sm:hidden"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Create Button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs rounded-lg transition-colors border border-brand-200/60"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post</span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-dropdown border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-brand-600 hover:text-brand-700 font-medium hover:underline flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex px-4 pt-2 gap-2 border-b border-slate-100">
                  <button
                    onClick={() => setNotifFilter('all')}
                    className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
                      notifFilter === 'all'
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setNotifFilter('unread')}
                    className={`pb-2 text-xs font-medium border-b-2 transition-colors ${
                      notifFilter === 'unread'
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Unread ({unreadNotificationsCount})
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {filteredNotifs.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      No notifications to show
                    </div>
                  ) : (
                    filteredNotifs.map(n => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-brand-50/40' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          !n.read ? 'bg-brand-600' : 'bg-transparent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 leading-tight">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1.5 block">
                            {n.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
            >
              <Avatar 
                src={currentUser.avatar} 
                name={currentUser.name} 
                size="sm" 
                showOnline 
                online 
              />
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-dropdown border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900 leading-none">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {currentUser.college}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge role={currentUser.roleBadge} size="xs" />
                    <span className="text-[11px] text-slate-500 font-medium">
                      2nd Year CSE
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    View My Profile
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('mentorship');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    Mentorship Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setIsCreateCommunityOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  >
                    <Plus className="w-4 h-4 text-slate-400" />
                    Create a Community
                  </button>

                  <div className="px-4 py-2 text-[11px] text-slate-400 border-t border-slate-100 mt-1">
                    Demo Mode • StudentSphere Prototype
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
