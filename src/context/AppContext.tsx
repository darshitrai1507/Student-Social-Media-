import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Community, 
  Post, 
  Mentor, 
  MentorshipRequest, 
  CampusEvent, 
  Conversation, 
  Message, 
  NotificationItem, 
  UserSettings,
  Comment,
  RoleBadge,
  NoteItem
} from '../types';
import { 
  CURRENT_USER, 
  MOCK_USERS, 
  MOCK_COMMUNITIES, 
  MOCK_POSTS, 
  MOCK_MENTORS, 
  MOCK_MENTORSHIP_REQUESTS, 
  MOCK_EVENTS, 
  MOCK_CONVERSATIONS, 
  MOCK_MESSAGES, 
  MOCK_NOTIFICATIONS, 
  DEFAULT_USER_SETTINGS,
  MOCK_NOTES_AND_PYQS
} from '../data/mockData';

export type NavTab = 
  | 'home' 
  | 'explore' 
  | 'mentorship' 
  | 'notes-pyqs'
  | 'my-communities' 
  | 'messages' 
  | 'events' 
  | 'profile' 
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  communities: Community[];
  posts: Post[];
  mentors: Mentor[];
  mentorshipRequests: MentorshipRequest[];
  events: CampusEvent[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  notifications: NotificationItem[];
  settings: UserSettings;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  
  // Navigation & View
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedCommunityId: string | null;
  communityDetailTab: 'discussions' | 'members' | 'resources' | 'events' | 'about';
  setCommunityDetailTab: (tab: 'discussions' | 'members' | 'resources' | 'events' | 'about') => void;
  viewCommunity: (communityId: string, tab?: 'discussions' | 'members' | 'resources' | 'events' | 'about') => void;
  selectedUserId: string | null;
  viewUserProfile: (userId: string) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  
  // Modals
  isCreateCommunityOpen: boolean;
  setIsCreateCommunityOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  preselectedPostCommunityId: string | null;
  setPreselectedPostCommunityId: (id: string | null) => void;
  isRequestMentorshipOpen: boolean;
  setIsRequestMentorshipOpen: (open: boolean) => void;
  selectedMentorForRequest: Mentor | null;
  openRequestMentorshipModal: (mentor: Mentor) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  reportTarget: { type: string; id: string; title: string } | null;
  openReportModal: (type: string, id: string, title: string) => void;
  
  // Global Search Modal
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Actions
  toggleJoinCommunity: (communityId: string) => void;
  createCommunity: (data: Partial<Community>) => void;
  createPost: (data: { content: string; communityId?: string; image?: string; pollQuestion?: string; pollOptions?: string[] }) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  sendMentorshipRequest: (data: { mentor: Mentor; guidanceCategory: string; helpDescription: string; preferredMode: 'Chat' | 'Video Call' | 'Resume Review' }) => void;
  respondMentorshipRequest: (requestId: string, status: 'accepted' | 'declined') => void;
  toggleConnectStudent: (userId: string) => void;
  sendMessage: (conversationId: string, text: string, attachment?: { type: 'image' | 'file'; name: string; url: string; size?: string }) => void;
  startChatWithUser: (user: User) => void;
  toggleRegisterEvent: (eventId: string) => void;
  toggleInterestEvent: (eventId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  submitReport: (reason: string) => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Community resource upload simulator
  addCommunityResource: (communityId: string, resource: { title: string; description: string; fileType: 'pdf' | 'doc' | 'link' | 'code' | 'zip'; subject: string; semester?: string }) => void;

  // Notes & PYQ Repository
  notes: NoteItem[];
  uploadNote: (note: Partial<NoteItem>) => void;
  toggleLikeNote: (noteId: string) => void;
  incrementNoteDownload: (noteId: string) => void;
  isUploadNoteOpen: boolean;
  setIsUploadNoteOpen: (open: boolean) => void;
  selectedNoteForPreview: NoteItem | null;
  setSelectedNoteForPreview: (note: NoteItem | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'studentsphere_state_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage or defaults
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'currentUser');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'communities');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITIES;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'mentors');
    return saved ? JSON.parse(saved) : MOCK_MENTORS;
  });

  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'mentorshipRequests');
    return saved ? JSON.parse(saved) : MOCK_MENTORSHIP_REQUESTS;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'events');
    return saved ? JSON.parse(saved) : MOCK_EVENTS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'conversations');
    return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'messages');
    return saved ? JSON.parse(saved) : MOCK_MESSAGES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'settings');
    return saved ? JSON.parse(saved) : DEFAULT_USER_SETTINGS;
  });

  // Navigation State
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [communityDetailTab, setCommunityDetailTab] = useState<'discussions' | 'members' | 'resources' | 'events' | 'about'>('discussions');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>('conv-priya');

  // Modals State
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [preselectedPostCommunityId, setPreselectedPostCommunityId] = useState<string | null>(null);
  const [isRequestMentorshipOpen, setIsRequestMentorshipOpen] = useState(false);
  const [selectedMentorForRequest, setSelectedMentorForRequest] = useState<Mentor | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ type: string; id: string; title: string } | null>(null);
  
  // Search
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'mentorshipRequests', JSON.stringify(mentorshipRequests));
  }, [mentorshipRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'settings', JSON.stringify(settings));
  }, [settings]);

  // Derived counts
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  // Navigation handlers
  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    if (tab !== 'explore' && tab !== 'my-communities') {
      setSelectedCommunityId(null);
    }
    if (tab !== 'profile') {
      setSelectedUserId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCommunity = (communityId: string, tab: 'discussions' | 'members' | 'resources' | 'events' | 'about' = 'discussions') => {
    setSelectedCommunityId(communityId);
    setCommunityDetailTab(tab);
    setActiveTabState('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewUserProfile = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTabState('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Community Actions
  const toggleJoinCommunity = (communityId: string) => {
    const targetComm = communities.find(c => c.id === communityId);
    if (!targetComm) return;

    if (targetComm.isPrivate && !targetComm.joined) {
      if (targetComm.requestPending) {
        // Cancel request
        setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, requestPending: false } : c));
        showToast(`Cancelled join request to ${targetComm.name}`, 'info');
      } else {
        // Request to join
        setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, requestPending: true } : c));
        showToast(`Request to join "${targetComm.name}" submitted to moderators!`, 'success');
      }
      return;
    }

    const isCurrentlyJoined = targetComm.joined;
    const newJoinedStatus = !isCurrentlyJoined;
    const newMemberCount = isCurrentlyJoined ? targetComm.memberCount - 1 : targetComm.memberCount + 1;

    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return {
          ...c,
          joined: newJoinedStatus,
          memberCount: newMemberCount,
          requestPending: false
        };
      }
      return c;
    }));

    setCurrentUser(prev => {
      const currentList = prev.joinedCommunities || [];
      const updatedList = newJoinedStatus 
        ? [...currentList, communityId]
        : currentList.filter(id => id !== communityId);
      return { ...prev, joinedCommunities: updatedList };
    });

    if (newJoinedStatus) {
      showToast(`Welcome! You joined ${targetComm.name}`, 'success');
    } else {
      showToast(`Left ${targetComm.name}`, 'info');
    }
  };

  const createCommunity = (data: Partial<Community>) => {
    const newId = `comm-user-${Date.now()}`;
    const newCommunity: Community = {
      id: newId,
      name: data.name || 'New Student Community',
      slug: (data.name || 'new-community').toLowerCase().replace(/\s+/g, '-'),
      tagline: data.tagline || data.description?.slice(0, 70) || 'A new campus community',
      description: data.description || 'Community formed for student collaboration.',
      icon: data.icon || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&auto=format&fit=crop&q=80',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
      college: data.college || currentUser.college,
      branches: data.branches && data.branches.length > 0 ? data.branches : [currentUser.branch],
      years: data.years && data.years.length > 0 ? data.years : ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
      interests: data.interests && data.interests.length > 0 ? data.interests : ['General'],
      type: data.type || 'Technical',
      isPrivate: !!data.isPrivate,
      memberCount: 1,
      activeMemberCount: 1,
      moderatorName: currentUser.name,
      moderatorAvatar: currentUser.avatar,
      joined: true,
      rules: data.rules || [
        { id: 'r1', title: 'Campus Code of Conduct', description: 'Be respectful, collaborative, and inclusive.' }
      ],
      resources: [],
      members: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          college: currentUser.college,
          branch: currentUser.branch,
          year: currentUser.year,
          role: 'Founder',
          joinedDate: 'Just now'
        }
      ]
    };

    setCommunities(prev => [newCommunity, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      joinedCommunities: [...(prev.joinedCommunities || []), newId]
    }));

    showToast(`"${newCommunity.name}" created successfully!`, 'success');
    viewCommunity(newId);
  };

  const addCommunityResource = (communityId: string, resource: { title: string; description: string; fileType: 'pdf' | 'doc' | 'link' | 'code' | 'zip'; subject: string; semester?: string }) => {
    const newResource = {
      id: `res-${Date.now()}`,
      communityId,
      title: resource.title,
      description: resource.description,
      fileType: resource.fileType,
      subject: resource.subject,
      semester: resource.semester || 'Semester 4',
      uploaderName: currentUser.name,
      uploaderAvatar: currentUser.avatar,
      date: 'Today',
      fileSize: '3.4 MB',
      downloadsCount: 1,
      url: '#'
    };

    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        return {
          ...c,
          resources: [newResource, ...c.resources]
        };
      }
      return c;
    }));

    showToast('Resource uploaded to community!', 'success');
  };

  // ── Notes & PYQs state ──────────────────────────────────────────────────
  const [notes, setNotes] = useState<NoteItem[]>(MOCK_NOTES_AND_PYQS);
  const [isUploadNoteOpen, setIsUploadNoteOpen] = useState(false);
  const [selectedNoteForPreview, setSelectedNoteForPreview] = useState<NoteItem | null>(null);

  const toggleLikeNote = (noteId: string) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === noteId
          ? { ...n, isLiked: !n.isLiked, likesCount: n.isLiked ? n.likesCount - 1 : n.likesCount + 1 }
          : n
      )
    );
  };

  const incrementNoteDownload = (noteId: string) => {
    setNotes(prev =>
      prev.map(n => n.id === noteId ? { ...n, downloadsCount: n.downloadsCount + 1 } : n)
    );
    showToast('Download started!', 'info');
  };

  const uploadNote = (data: Partial<NoteItem>) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: data.title || 'Untitled',
      subject: data.subject || 'General',
      subjectCode: data.subjectCode || '',
      branch: data.branch || 'All Branches',
      semester: data.semester || 'Semester 1',
      category: data.category || 'Handwritten Notes',
      description: data.description || '',
      fileType: data.fileType || 'pdf',
      fileSize: data.fileSize || '1 MB',
      uploaderName: currentUser.name,
      uploaderAvatar: currentUser.avatar,
      uploaderBranch: currentUser.branch,
      uploaderYear: currentUser.year || '3rd Year',
      uploadedAt: 'Just now',
      downloadsCount: 0,
      likesCount: 0,
      isLiked: false,
      verifiedBySenior: false,
      tags: data.tags || [],
    };
    setNotes(prev => [newNote, ...prev]);
    setIsUploadNoteOpen(false);
    showToast('Study material uploaded successfully!', 'success');
  };

  // Post Actions
  const createPost = (data: { content: string; communityId?: string; image?: string; pollQuestion?: string; pollOptions?: string[] }) => {
    const targetComm = communities.find(c => c.id === data.communityId);
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorCollege: 'JEC',
      authorBranch: currentUser.branch.includes('Computer Science') ? 'CSE' : currentUser.branch.slice(0, 3).toUpperCase(),
      authorYear: currentUser.year === 'First Year' ? '1st Year' : currentUser.year === 'Second Year' ? '2nd Year' : currentUser.year === 'Third Year' ? '3rd Year' : '4th Year',
      authorBadge: currentUser.roleBadge,
      communityId: data.communityId,
      communityName: targetComm ? targetComm.name : undefined,
      content: data.content,
      timestamp: 'Just now',
      image: data.image,
      category: data.communityId ? 'Communities' : 'All',
      likesCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: [],
      poll: data.pollQuestion && data.pollOptions && data.pollOptions.length > 1 ? {
        question: data.pollQuestion,
        totalVotes: 0,
        options: data.pollOptions.map((opt, i) => ({ id: `opt-${i}`, text: opt, votes: 0 }))
      } : undefined
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('Post published successfully!', 'success');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  const toggleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isBookmarked = !p.isBookmarked;
        showToast(isBookmarked ? 'Post saved to your bookmarks' : 'Post removed from bookmarks', 'info');
        return { ...p, isBookmarked };
      }
      return p;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorCollege: 'JEC',
      authorBranch: 'CSE',
      authorYear: '2nd Year',
      authorBadge: currentUser.roleBadge,
      content: text.trim(),
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    showToast('Comment posted!', 'success');
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll && !p.poll.userVotedOptionId) {
        const updatedOptions = p.poll.options.map(opt => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...p,
          poll: {
            ...p.poll,
            totalVotes: p.poll.totalVotes + 1,
            userVotedOptionId: optionId,
            options: updatedOptions
          }
        };
      }
      return p;
    }));
    showToast('Vote submitted!', 'success');
  };

  // Mentorship Actions
  const openRequestMentorshipModal = (mentor: Mentor) => {
    setSelectedMentorForRequest(mentor);
    setIsRequestMentorshipOpen(true);
  };

  const sendMentorshipRequest = (data: { mentor: Mentor; guidanceCategory: string; helpDescription: string; preferredMode: 'Chat' | 'Video Call' | 'Resume Review' }) => {
    const newRequest: MentorshipRequest = {
      id: `req-${Date.now()}`,
      mentorId: data.mentor.id,
      mentorName: data.mentor.name,
      mentorAvatar: data.mentor.avatar,
      mentorRole: data.mentor.currentCompanyOrOffer || `${data.mentor.branch} Senior`,
      menteeId: currentUser.id,
      menteeName: currentUser.name,
      menteeAvatar: currentUser.avatar,
      menteeCollege: currentUser.college,
      menteeBranch: currentUser.branch,
      menteeYear: currentUser.year,
      guidanceCategory: data.guidanceCategory,
      helpDescription: data.helpDescription,
      preferredMode: data.preferredMode,
      status: 'pending',
      createdAt: 'Today'
    };

    setMentorshipRequests(prev => [newRequest, ...prev]);
    setIsRequestMentorshipOpen(false);
    showToast(`Mentorship request sent to ${data.mentor.name}!`, 'success');
  };

  const respondMentorshipRequest = (requestId: string, status: 'accepted' | 'declined') => {
    setMentorshipRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
    showToast(`Request marked as ${status}`, status === 'accepted' ? 'success' : 'info');
  };

  // Student Connection
  const toggleConnectStudent = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const current = u.connectionStatus || 'none';
        const nextStatus = current === 'connected' ? 'none' : current === 'pending' ? 'none' : 'pending';
        showToast(
          nextStatus === 'pending' ? `Connection request sent to ${u.name}` :
          nextStatus === 'none' ? `Disconnected from ${u.name}` : `Connected with ${u.name}`,
          'info'
        );
        return { ...u, connectionStatus: nextStatus };
      }
      return u;
    }));
  };

  // Messaging Actions
  const sendMessage = (conversationId: string, text: string, attachment?: { type: 'image' | 'file'; name: string; url: string; size?: string }) => {
    if (!text.trim() && !attachment) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now',
      isMine: true,
      attachment
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim() || (attachment ? `Sent ${attachment.name}` : ''),
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));
  };

  const startChatWithUser = (user: User) => {
    const existingConv = conversations.find(c => c.participant.id === user.id);
    if (existingConv) {
      setSelectedConversationId(existingConv.id);
      setActiveTabState('messages');
      return;
    }

    const newConvId = `conv-${user.id}`;
    const newConv: Conversation = {
      id: newConvId,
      participant: user,
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      onlineStatus: user.onlineStatus ?? true
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConvId]: [
        {
          id: `m-init-${Date.now()}`,
          conversationId: newConvId,
          senderId: user.id,
          text: `Hi Aryan! Glad to connect on StudentSphere.`,
          timestamp: 'Just now',
          isMine: false
        }
      ]
    }));

    setSelectedConversationId(newConvId);
    setActiveTabState('messages');
  };

  // Events Actions
  const toggleRegisterEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextReg = !e.isRegistered;
        showToast(nextReg ? `Registered for "${e.title}"!` : `Cancelled registration for "${e.title}"`, nextReg ? 'success' : 'info');
        return {
          ...e,
          isRegistered: nextReg,
          attendeeCount: nextReg ? e.attendeeCount + 1 : Math.max(0, e.attendeeCount - 1)
        };
      }
      return e;
    }));
  };

  const toggleInterestEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextInterest = !e.isInterested;
        showToast(nextInterest ? `Marked "${e.title}" as interested!` : `Removed interest`, 'info');
        return { ...e, isInterested: nextInterest };
      }
      return e;
    }));
  };

  // Notifications Actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Profile and Settings Actions
  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    showToast('Profile updated successfully!', 'success');
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    showToast('Settings saved', 'success');
  };

  // Reporting
  const openReportModal = (type: string, id: string, title: string) => {
    setReportTarget({ type, id, title });
    setIsReportModalOpen(true);
  };

  const submitReport = (reason: string) => {
    setIsReportModalOpen(false);
    showToast(`Thank you. Your report regarding "${reportTarget?.title}" has been submitted to campus moderators for review.`, 'info');
    setReportTarget(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      communities,
      posts,
      mentors,
      mentorshipRequests,
      events,
      conversations,
      messages,
      notifications,
      settings,
      unreadNotificationsCount,
      unreadMessagesCount,
      activeTab,
      setActiveTab,
      selectedCommunityId,
      communityDetailTab,
      setCommunityDetailTab,
      viewCommunity,
      selectedUserId,
      viewUserProfile,
      selectedConversationId,
      setSelectedConversationId,
      isCreateCommunityOpen,
      setIsCreateCommunityOpen,
      isCreatePostOpen,
      setIsCreatePostOpen,
      preselectedPostCommunityId,
      setPreselectedPostCommunityId,
      isRequestMentorshipOpen,
      setIsRequestMentorshipOpen,
      selectedMentorForRequest,
      openRequestMentorshipModal,
      isEditProfileOpen,
      setIsEditProfileOpen,
      isReportModalOpen,
      setIsReportModalOpen,
      reportTarget,
      openReportModal,
      isGlobalSearchOpen,
      setIsGlobalSearchOpen,
      globalSearchQuery,
      setGlobalSearchQuery,
      toggleJoinCommunity,
      createCommunity,
      createPost,
      toggleLikePost,
      toggleBookmarkPost,
      addComment,
      votePoll,
      sendMentorshipRequest,
      respondMentorshipRequest,
      toggleConnectStudent,
      sendMessage,
      startChatWithUser,
      toggleRegisterEvent,
      toggleInterestEvent,
      markNotificationRead,
      markAllNotificationsRead,
      updateCurrentUser,
      updateSettings,
      submitReport,
      toasts,
      showToast,
      removeToast,
      addCommunityResource,
      notes,
      uploadNote,
      toggleLikeNote,
      incrementNoteDownload,
      isUploadNoteOpen,
      setIsUploadNoteOpen,
      selectedNoteForPreview,
      setSelectedNoteForPreview,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
