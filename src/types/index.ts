export type BranchType = 
  | 'Computer Science Engineering'
  | 'Information Technology'
  | 'Artificial Intelligence and Machine Learning'
  | 'Electronics and Communication Engineering'
  | 'Electrical Engineering'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Other';

export type YearOfStudy = 'First Year' | 'Second Year' | 'Third Year' | 'Fourth Year';

export type CommunityType = 
  | 'Academic'
  | 'Technical'
  | 'College Club'
  | 'Hobby'
  | 'Career and Placement'
  | 'Project Collaboration'
  | 'Sports and Cultural';

export type RoleBadge = 'Student' | 'Senior' | 'Mentor' | 'Club Admin';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  stars?: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  iconName?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage?: string;
  college: string;
  branch: BranchType;
  year: YearOfStudy;
  roleBadge: RoleBadge;
  bio: string;
  skills: string[];
  interests: string[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  joinedCommunities: string[]; // community IDs
  clubs: string[];
  isMentor: boolean;
  mentorAvailability?: 'Available' | 'Limited' | 'Busy';
  mentorAreas?: string[];
  mentorBio?: string;
  connectionStatus?: 'none' | 'pending' | 'connected';
  mutualConnections?: number;
  onlineStatus?: boolean;
}

export interface CommunityResource {
  id: string;
  communityId: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'link' | 'code' | 'zip';
  subject: string;
  semester?: string;
  uploaderName: string;
  uploaderAvatar?: string;
  date: string;
  fileSize?: string;
  downloadsCount: number;
  url: string;
}

export interface CommunityMember {
  userId: string;
  name: string;
  avatar: string;
  college: string;
  branch: BranchType;
  year: YearOfStudy;
  role: 'Founder' | 'Admin' | 'Moderator' | 'Senior' | 'Mentor' | 'Member';
  joinedDate: string;
}

export interface CommunityRule {
  id: string;
  title: string;
  description: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  coverImage: string;
  college: string;
  branches: BranchType[];
  years: YearOfStudy[];
  interests: string[];
  type: CommunityType;
  isPrivate: boolean;
  memberCount: number;
  activeMemberCount: number;
  moderatorName: string;
  moderatorAvatar: string;
  rules: CommunityRule[];
  resources: CommunityResource[];
  members: CommunityMember[];
  isClub?: boolean;
  clubRecruitmentStatus?: 'Open' | 'Closed' | 'Interviewing';
  joined?: boolean;
  requestPending?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorCollege: string;
  authorBranch: string;
  authorYear: string;
  authorBadge?: RoleBadge;
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorCollege: string;
  authorBranch: string;
  authorYear: string;
  authorBadge?: RoleBadge;
  communityId?: string;
  communityName?: string;
  content: string;
  timestamp: string;
  image?: string;
  category: 'All' | 'Following' | 'Communities' | 'Mentorship';
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: Comment[];
  poll?: Poll;
  postType?: 'general' | 'question' | 'project' | 'announcement';
}

export interface Mentor {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  college: string;
  branch: BranchType;
  year: YearOfStudy;
  skills: string[];
  areasOfGuidance: string[];
  bio: string;
  currentCompanyOrOffer?: string;
  availability: 'Available' | 'Limited' | 'Busy';
  rating: number;
  reviewCount: number;
  activeMenteesCount: number;
  linkedin?: string;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorRole?: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar: string;
  menteeCollege: string;
  menteeBranch: BranchType;
  menteeYear: YearOfStudy;
  guidanceCategory: string;
  helpDescription: string;
  preferredMode: 'Chat' | 'Video Call' | 'Resume Review';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  isOnline: boolean;
  meetingLink?: string;
  communityId: string;
  communityName: string;
  organizerName: string;
  eventType: 'Technical' | 'Hackathon' | 'College Fest' | 'Club Meeting' | 'Coding Competition' | 'Guest Lecture' | 'Cultural' | 'Mentorship';
  college: string;
  attendeeCount: number;
  isRegistered: boolean;
  isInterested: boolean;
  coverImage: string;
  tags: string[];
}

export interface MessageAttachment {
  type: 'image' | 'file';
  name: string;
  url: string;
  size?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  attachment?: MessageAttachment;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onlineStatus: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'mentorship' | 'comment' | 'community' | 'event' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetTab?: string;
  targetId?: string;
}

export interface UserSettings {
  profileVisibility: 'Public' | 'Campus Only' | 'Private';
  mentorshipAvailable: boolean;
  allowDirectMessages: 'Everyone' | 'Connections Only' | 'None';
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  blockedUsers: string[];
}
