import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/navigation/Sidebar';
import { TopNav } from './components/navigation/TopNav';
import { MobileNav } from './components/navigation/MobileNav';

// Pages
import { HomePage } from './pages/HomePage';
import { ExploreCommunitiesPage } from './pages/ExploreCommunitiesPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { MyCommunitiesPage } from './pages/MyCommunitiesPage';
import { MessagesPage } from './pages/MessagesPage';
import { EventsPage } from './pages/EventsPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Modals & Feedback
import { CreatePostModal } from './components/modals/CreatePostModal';
import { CreateCommunityModal } from './components/modals/CreateCommunityModal';
import { RequestMentorshipModal } from './components/modals/RequestMentorshipModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { ReportModal } from './components/modals/ReportModal';
import { ToastContainer } from './components/common/ToastContainer';

export const AppContent: React.FC = () => {
  const { activeTab, selectedCommunityId } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return selectedCommunityId ? <CommunityDetailPage /> : <ExploreCommunitiesPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'my-communities':
        return selectedCommunityId ? <CommunityDetailPage /> : <MyCommunitiesPage />;
      case 'messages':
        return <MessagesPage />;
      case 'events':
        return <EventsPage />;
      case 'profile':
        return <StudentProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-brand-100 selection:text-brand-900">
      <div className="flex-1 flex w-full">
        {/* Persistent Left Sidebar on Desktop */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          {/* Sticky Top Navigation */}
          <TopNav />

          {/* Current Page Content */}
          <main className="flex-1">
            {renderActivePage()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <CreatePostModal />
      <CreateCommunityModal />
      <RequestMentorshipModal />
      <EditProfileModal />
      <GlobalSearchModal />
      <ReportModal />

      {/* Feedback Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
