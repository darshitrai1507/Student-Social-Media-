import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { Home, Compass, Sparkles, MessageSquare, User, Calendar } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, unreadMessagesCount, mentorshipRequests, currentUser } = useApp();

  const pendingRequestsCount = mentorshipRequests.filter(r => r.status === 'pending' && r.menteeId === currentUser.id).length;

  const items = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { 
      id: 'mentorship' as NavTab, 
      label: 'Mentors', 
      icon: Sparkles, 
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined 
    },
    { 
      id: 'messages' as NavTab, 
      label: 'Chat', 
      icon: MessageSquare, 
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined 
    },
    { id: 'events' as NavTab, label: 'Events', icon: Calendar },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'text-brand-600 font-semibold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-500'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
