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
  UserSettings 
} from '../types';

export const CURRENT_USER: User = {
  id: 'user-aryan',
  name: 'Aryan Sharma',
  username: 'aryansharma_dev',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  college: 'Jabalpur Engineering College (JEC)',
  branch: 'Computer Science Engineering',
  year: 'Second Year',
  roleBadge: 'Student',
  bio: '2nd Year CSE undergrad passionate about full-stack development, open-source systems, and building tools for students. Currently learning React, TypeScript, and Go.',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'Git', 'Data Structures'],
  interests: ['Web Development', 'Open Source', 'Competitive Programming', 'UI/UX Design', 'Startups and Entrepreneurship'],
  projects: [
    {
      id: 'proj-1',
      title: 'CampusRide — Peer Carpooling App',
      description: 'A micro-mobility coordination tool for college students traveling between city campus and hostels.',
      techStack: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
      github: 'https://github.com/aryan/campusride',
      link: 'https://campusride-demo.vercel.app',
      stars: 38
    },
    {
      id: 'proj-2',
      title: 'DevPulse — Developer Activity Visualizer',
      description: 'Chrome extension to track daily coding streak and LeetCode problem progression with automated Discord webhooks.',
      techStack: ['TypeScript', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/aryan/devpulse',
      stars: 84
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Runner Up — Smart MP Hackathon 2025',
      organization: 'Govt. of Madhya Pradesh & JEC',
      year: '2025'
    },
    {
      id: 'ach-2',
      title: 'Knight (1920 Rating) on LeetCode',
      organization: 'LeetCode',
      year: '2026'
    }
  ],
  joinedCommunities: ['comm-jec-webdev', 'comm-cp-dsa', 'comm-ai-ml', 'comm-music-club'],
  clubs: ['Coding Club', 'College Music Club'],
  isMentor: false,
  mentorAvailability: 'Limited',
  mentorAreas: ['First-year college guidance', 'Coding and development', 'Hackathons and projects'],
  mentorBio: 'Happy to help juniors navigate their first two semesters, choosing tech stacks, and prepping for hackathons!',
  connectionStatus: 'connected',
  onlineStatus: true
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user-priya',
    name: 'Priya Verma',
    username: 'priya_v',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Computer Science Engineering',
    year: 'Fourth Year',
    roleBadge: 'Mentor',
    bio: 'Incoming SDE @ Microsoft India. 4th Year CSE. Passionate about distributed systems, DSA mentorship, and helping juniors crack tier-1 product internships.',
    skills: ['System Design', 'C++', 'Java', 'Algorithms', 'Cloud Computing', 'Docker'],
    interests: ['Placement Preparation', 'Competitive Programming', 'Research', 'Startups and Entrepreneurship'],
    projects: [
      {
        id: 'proj-p1',
        title: 'Distributed Key-Value Store',
        description: 'Raft consensus algorithm implemented in Go with snapshotting and gRPC client interface.',
        techStack: ['Go', 'gRPC', 'Protobuf', 'Docker'],
        github: 'https://github.com/priya/raft-kv'
      }
    ],
    achievements: [
      {
        id: 'ach-p1',
        title: 'Amazon WOW Mentee & Intern 2025',
        organization: 'Amazon',
        year: '2025'
      },
      {
        id: 'ach-p2',
        title: 'Google Generation Scholar 2024',
        organization: 'Google APAC',
        year: '2024'
      }
    ],
    joinedCommunities: ['comm-jec-webdev', 'comm-cp-dsa', 'comm-placement-prep', 'comm-ecell'],
    clubs: ['Coding Club', 'Entrepreneurship Cell'],
    isMentor: true,
    mentorAvailability: 'Available',
    mentorAreas: ['Placement preparation', 'Internships', 'Resume and portfolio reviews', 'Competitive programming'],
    mentorBio: 'I mentor students on coding interviews, DSA problem solving, resume tailoring, and behavioral interview rounds.',
    connectionStatus: 'connected',
    mutualConnections: 14,
    onlineStatus: true
  },
  {
    id: 'user-rohit',
    name: 'Rohit Khandelwal',
    username: 'rohit_ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Artificial Intelligence and Machine Learning',
    year: 'Third Year',
    roleBadge: 'Senior',
    bio: '3rd Year AI & ML. Lead Organizer @ AI Society. Working on multimodal LLMs, medical image classification, and agentic workflows.',
    skills: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'LangChain', 'OpenCV'],
    interests: ['Artificial Intelligence', 'Machine Learning', 'Research', 'Robotics'],
    projects: [
      {
        id: 'proj-r1',
        title: 'MedScan-AI',
        description: 'Deep neural network for thoracic pathology detection on chest X-Rays with 94.2% AUC.',
        techStack: ['PyTorch', 'TorchVision', 'Streamlit', 'Weights & Biases']
      }
    ],
    achievements: [
      {
        id: 'ach-r1',
        title: 'Published at IEEE INDICON 2025',
        organization: 'IEEE',
        year: '2025'
      }
    ],
    joinedCommunities: ['comm-ai-ml', 'comm-robotics', 'comm-cp-dsa'],
    clubs: ['Robotics Club', 'AI Society'],
    isMentor: true,
    mentorAvailability: 'Available',
    mentorAreas: ['Coding and development', 'Hackathons and projects', 'Subject and semester guidance'],
    connectionStatus: 'pending',
    mutualConnections: 8,
    onlineStatus: false
  },
  {
    id: 'user-ananya',
    name: 'Ananya Mishra',
    username: 'ananya_design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Information Technology',
    year: 'Third Year',
    roleBadge: 'Club Admin',
    bio: 'Product Designer & Frontend Engineer. Design Lead @ JEC Web Developers & Creative Arts Club. Figma enthusiast and typography nerd.',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    interests: ['Design and UI/UX', 'Web Development', 'Photography', 'Startups and Entrepreneurship'],
    projects: [
      {
        id: 'proj-a1',
        title: 'Aura UI Design System',
        description: 'An open-source Figma design system with 200+ accessible components for student builders.',
        techStack: ['Figma', 'React', 'Storybook']
      }
    ],
    achievements: [
      {
        id: 'ach-a1',
        title: 'Best UI/UX Award @ HackMIT 2025',
        organization: 'MIT',
        year: '2025'
      }
    ],
    joinedCommunities: ['comm-jec-webdev', 'comm-firstyear-it', 'comm-photo-arts'],
    clubs: ['Photography Club', 'Literary Club'],
    isMentor: true,
    mentorAvailability: 'Available',
    mentorAreas: ['Resume and portfolio reviews', 'Coding and development', 'College clubs and campus life'],
    connectionStatus: 'connected',
    mutualConnections: 21,
    onlineStatus: true
  },
  {
    id: 'user-aman',
    name: 'Aman Patel',
    username: 'aman_ece',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Electronics and Communication Engineering',
    year: 'Fourth Year',
    roleBadge: 'Mentor',
    bio: 'ECE Final Year | Ex-Intern @ Texas Instruments | Core Hardware, Embedded C, Robotics, and IoT Specialist.',
    skills: ['Embedded C', 'Verilog', 'ARM Cortex', 'Altium Designer', 'MATLAB', 'IoT'],
    interests: ['Robotics', 'Research', 'Placement Preparation'],
    projects: [
      {
        id: 'proj-am1',
        title: 'Autonomous Quadruped Robot',
        description: '12-DOF inverse kinematics robot dog built with custom PCB and ROS2 integration.',
        techStack: ['C++', 'ROS2', 'ESP32', 'FreeRTOS']
      }
    ],
    achievements: [
      {
        id: 'ach-am1',
        title: 'e-Yantra National Finalist (IIT Bombay)',
        organization: 'IIT Bombay',
        year: '2024'
      }
    ],
    joinedCommunities: ['comm-robotics', 'comm-placement-prep'],
    clubs: ['Robotics Club'],
    isMentor: true,
    mentorAvailability: 'Limited',
    mentorAreas: ['Subject and semester guidance', 'Internships', 'Placement preparation', 'Higher studies'],
    connectionStatus: 'none',
    mutualConnections: 5,
    onlineStatus: false
  },
  {
    id: 'user-tanvi',
    name: 'Tanvi Joshi',
    username: 'tanvi_j',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Information Technology',
    year: 'First Year',
    roleBadge: 'Student',
    bio: 'Freshman in IT. Curious about web dev, open source, and campus cultural clubs. Eager to connect with seniors!',
    skills: ['C', 'Python', 'HTML/CSS', 'Git Basics'],
    interests: ['Web Development', 'Cultural Activities', 'Music'],
    projects: [],
    achievements: [
      {
        id: 'ach-t1',
        title: 'State Merit Scholar (12th Board)',
        organization: 'MPBSE',
        year: '2025'
      }
    ],
    joinedCommunities: ['comm-firstyear-it', 'comm-jec-webdev', 'comm-music-club'],
    clubs: ['College Music Club'],
    isMentor: false,
    connectionStatus: 'none',
    mutualConnections: 3,
    onlineStatus: true
  },
  {
    id: 'user-vikram',
    name: 'Vikramaditya Rao',
    username: 'vikram_ecell',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Mechanical Engineering',
    year: 'Fourth Year',
    roleBadge: 'Club Admin',
    bio: 'President @ Entrepreneurship Cell JEC. Building a climate-tech cold-storage startup. Raised ₹15 Lakhs seed grant.',
    skills: ['Product Management', 'Pitching', 'Financial Modeling', 'SolidWorks', 'Growth Strategy'],
    interests: ['Startups and Entrepreneurship', 'Placement Preparation', 'Cricket and Sports'],
    projects: [
      {
        id: 'proj-v1',
        title: 'KisanCool — Solar Cold Storage',
        description: 'Off-grid decentralized cold storage unit designed for perishable horticulture crops.',
        techStack: ['Thermo-Fluids', 'Solar PV', 'IoT Monitoring']
      }
    ],
    achievements: [
      {
        id: 'ach-v1',
        title: 'Winner — National Startup India Challenge',
        organization: 'Startup India',
        year: '2025'
      }
    ],
    joinedCommunities: ['comm-ecell', 'comm-placement-prep', 'comm-sports'],
    clubs: ['Entrepreneurship Cell', 'Sports Club'],
    isMentor: true,
    mentorAvailability: 'Available',
    mentorAreas: ['Startups and entrepreneurship', 'Hackathons and projects', 'College clubs and campus life'],
    connectionStatus: 'none',
    mutualConnections: 9,
    onlineStatus: true
  },
  {
    id: 'user-devanshi',
    name: 'Devanshi Singhal',
    username: 'devanshi_cp',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    college: 'IIT Indore',
    branch: 'Computer Science Engineering',
    year: 'Third Year',
    roleBadge: 'Senior',
    bio: 'Candidate Master on Codeforces (1980). ICPC Regionalist 2024 & 2025. Love math, trees, graphs, and dynamic programming.',
    skills: ['C++', 'Competitive Programming', 'Graph Theory', 'Algorithms', 'Number Theory'],
    interests: ['Competitive Programming', 'Placement Preparation', 'Research'],
    projects: [],
    achievements: [
      {
        id: 'ach-d1',
        title: 'ICPC Amritapuri Regionalist (Rank 42)',
        organization: 'ICPC',
        year: '2024'
      }
    ],
    joinedCommunities: ['comm-cp-dsa', 'comm-ai-ml'],
    clubs: ['Coding Club'],
    isMentor: true,
    mentorAvailability: 'Busy',
    mentorAreas: ['Competitive programming', 'Coding and development'],
    connectionStatus: 'none',
    mutualConnections: 4,
    onlineStatus: false
  },
  {
    id: 'user-kavya',
    name: 'Kavya Pillai',
    username: 'kavya_civil',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Civil Engineering',
    year: 'Fourth Year',
    roleBadge: 'Senior',
    bio: '4th Year Civil. GATE 2026 aspirant & Structural Engineering enthusiast. Head of Civil CAD Society.',
    skills: ['AutoCAD', 'STAAD.Pro', 'Revit', 'GIS', 'Structural Dynamics'],
    interests: ['Research', 'Placement Preparation', 'Cultural Activities'],
    projects: [],
    achievements: [],
    joinedCommunities: ['comm-civil-hub', 'comm-placement-prep'],
    clubs: ['Cultural Committee'],
    isMentor: true,
    mentorAvailability: 'Available',
    mentorAreas: ['Subject and semester guidance', 'Higher studies', 'Placement preparation'],
    connectionStatus: 'none',
    mutualConnections: 2,
    onlineStatus: false
  },
  {
    id: 'user-siddharth',
    name: 'Siddharth Saxena',
    username: 'sid_sports',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Electrical Engineering',
    year: 'Second Year',
    roleBadge: 'Student',
    bio: '2nd Year EE. College Cricket Team Captain. Exploring renewable energy systems and battery tech.',
    skills: ['Power Systems', 'MATLAB', 'Circuits', 'Athletics'],
    interests: ['Cricket and Sports', 'Cultural Activities'],
    projects: [],
    achievements: [
      {
        id: 'ach-s1',
        title: 'Nodal Cricket Champions 2025',
        organization: 'RGPV Nodal Sports',
        year: '2025'
      }
    ],
    joinedCommunities: ['comm-sports', 'comm-music-club'],
    clubs: ['Sports Club'],
    isMentor: false,
    connectionStatus: 'connected',
    mutualConnections: 11,
    onlineStatus: true
  }
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'comm-jec-webdev',
    name: 'JEC Web Developers',
    slug: 'jec-web-dev',
    tagline: 'The official tech guild for modern frontend, backend, and fullstack builders at JEC.',
    description: 'A vibrant community of developers, open-source contributors, and UI/UX designers building real-world web apps. We host weekly build sessions, peer code reviews, and hackathon project matching.',
    icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Artificial Intelligence and Machine Learning', 'Electronics and Communication Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Web Development', 'Design and UI/UX', 'Startups and Entrepreneurship'],
    type: 'Technical',
    isPrivate: false,
    memberCount: 482,
    activeMemberCount: 124,
    moderatorName: 'Ananya Mishra',
    moderatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    joined: true,
    rules: [
      { id: 'r1', title: 'Be Respectful & Constructive', description: 'Offer kind, thoughtful feedback on peers\' code and pull requests.' },
      { id: 'r2', title: 'No Spam or Plagiarism', description: 'Do not post self-promotional affiliate links or copy assignments without credit.' },
      { id: 'r3', title: 'Tag Questions Clearly', description: 'Include framework version, error logs, and what you have tried.' }
    ],
    resources: [
      {
        id: 'res-1',
        communityId: 'comm-jec-webdev',
        title: 'Fullstack Roadmap 2026 — JEC Campus Edition',
        description: 'Curated semester-by-semester guide for mastering React, Next.js, Go, and PostgreSQL alongside engineering coursework.',
        fileType: 'pdf',
        subject: 'Web Technologies',
        semester: 'Semester 4',
        uploaderName: 'Priya Verma',
        date: 'Oct 14, 2026',
        fileSize: '4.8 MB',
        downloadsCount: 312,
        url: '#'
      },
      {
        id: 'res-2',
        communityId: 'comm-jec-webdev',
        title: 'Fullstack Starter Boilerplate (React + Tailwind + Express)',
        description: 'Clean repository template with JWT auth, Docker compose, and GitHub Actions CI configured.',
        fileType: 'code',
        subject: 'Project Architecture',
        uploaderName: 'Aryan Sharma',
        date: 'Oct 18, 2026',
        fileSize: '1.2 MB',
        downloadsCount: 184,
        url: '#'
      },
      {
        id: 'res-3',
        communityId: 'comm-jec-webdev',
        title: 'Web Dev Lab Manual & Viva Questions',
        description: 'Previous 5 years practical viva questions with answers and sample code snippets.',
        fileType: 'pdf',
        subject: 'Internet & Web Technology',
        semester: 'Semester 5',
        uploaderName: 'Ananya Mishra',
        date: 'Sep 28, 2026',
        fileSize: '6.4 MB',
        downloadsCount: 450,
        url: '#'
      }
    ],
    members: [
      {
        userId: 'user-ananya',
        name: 'Ananya Mishra',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        college: 'Jabalpur Engineering College (JEC)',
        branch: 'Information Technology',
        year: 'Third Year',
        role: 'Admin',
        joinedDate: 'Aug 2024'
      },
      {
        userId: 'user-priya',
        name: 'Priya Verma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        college: 'Jabalpur Engineering College (JEC)',
        branch: 'Computer Science Engineering',
        year: 'Fourth Year',
        role: 'Mentor',
        joinedDate: 'Sep 2023'
      },
      {
        userId: 'user-aryan',
        name: 'Aryan Sharma',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        college: 'Jabalpur Engineering College (JEC)',
        branch: 'Computer Science Engineering',
        year: 'Second Year',
        role: 'Member',
        joinedDate: 'Jan 2025'
      }
    ]
  },
  {
    id: 'comm-firstyear-it',
    name: 'First-Year IT Community',
    slug: 'first-year-it',
    tagline: 'Dedicated support circle for freshers in Information Technology.',
    description: 'Created specifically for first-year IT students to share lecture notes, clarify subject doubts, prepare for mid-semester exams, and receive guidance from senior department mentors.',
    icon: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Information Technology'],
    years: ['First Year'],
    interests: ['Web Development', 'Academic', 'Subject and semester guidance'],
    type: 'Academic',
    isPrivate: false,
    memberCount: 168,
    activeMemberCount: 52,
    moderatorName: 'Ananya Mishra',
    moderatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Help Each Other Grow', description: 'No question is silly. Ask doubts about basic programming, math, or mechanics.' }
    ],
    resources: [
      {
        id: 'res-it1',
        communityId: 'comm-firstyear-it',
        title: 'Basic Computational Engineering (C Programming) Handwritten Notes',
        description: 'Complete notes for pointers, arrays, memory management, and file handling.',
        fileType: 'pdf',
        subject: 'BT-204 Basic Computer Engineering',
        semester: 'Semester 1',
        uploaderName: 'Ananya Mishra',
        date: 'Oct 05, 2026',
        fileSize: '8.2 MB',
        downloadsCount: 580,
        url: '#'
      },
      {
        id: 'res-it2',
        communityId: 'comm-firstyear-it',
        title: 'Engineering Mathematics-I Previous 5 Years Solved Papers',
        description: 'Matrices, Calculus, and Vector spaces solved questions with step-by-step proofs.',
        fileType: 'pdf',
        subject: 'BT-102 Mathematics I',
        semester: 'Semester 1',
        uploaderName: 'Priya Verma',
        date: 'Oct 02, 2026',
        fileSize: '12.4 MB',
        downloadsCount: 720,
        url: '#'
      }
    ],
    members: []
  },
  {
    id: 'comm-ai-ml',
    name: 'AI and Machine Learning Society',
    slug: 'ai-ml-society',
    tagline: 'Deep learning papers, Kaggle competitions, and generative AI research.',
    description: 'An interdisciplinary research and application hub exploring modern AI, from LLM finetuning and computer vision to robotics perception. We organize paper reading groups and Kaggle sprint teams.',
    icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Artificial Intelligence and Machine Learning', 'Computer Science Engineering', 'Electronics and Communication Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Research'],
    type: 'Technical',
    isPrivate: false,
    memberCount: 395,
    activeMemberCount: 88,
    moderatorName: 'Rohit Khandelwal',
    moderatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    joined: true,
    rules: [
      { id: 'r1', title: 'Cite Sources', description: 'When discussing ML papers or benchmarks, link the ArXiv paper or dataset.' }
    ],
    resources: [
      {
        id: 'res-ai1',
        communityId: 'comm-ai-ml',
        title: 'Deep Learning with PyTorch: From Tensors to Transformers',
        description: 'Comprehensive 80-page self-study guide with Colab notebooks linked.',
        fileType: 'pdf',
        subject: 'Deep Learning',
        semester: 'Semester 5',
        uploaderName: 'Rohit Khandelwal',
        date: 'Oct 10, 2026',
        fileSize: '14.1 MB',
        downloadsCount: 410,
        url: '#'
      }
    ],
    members: []
  },
  {
    id: 'comm-cp-dsa',
    name: 'Coding and Competitive Programming',
    slug: 'coding-and-cp',
    tagline: 'Sharpen your problem solving for Codeforces, LeetCode, and ICPC.',
    description: 'The primary battleground for competitive coders. Daily problem discussions, weekly virtual contests, editorial walkthroughs, and ICPC regional preparation sessions.',
    icon: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Artificial Intelligence and Machine Learning', 'Electronics and Communication Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Competitive Programming', 'Placement Preparation', 'Research'],
    type: 'Technical',
    isPrivate: false,
    memberCount: 620,
    activeMemberCount: 195,
    moderatorName: 'Devanshi Singhal',
    moderatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    joined: true,
    rules: [
      { id: 'r1', title: 'No Ongoing Contest Solutions', description: 'Never ask or share code for active contests (e.g. ongoing Codeforces rounds).' }
    ],
    resources: [
      {
        id: 'res-cp1',
        communityId: 'comm-cp-dsa',
        title: 'Mastering Graphs & Dynamic Programming Cheatsheet',
        description: 'Standard template code for Dijkstra, Floyd-Warshall, Segment Trees, and DP transitions in C++.',
        fileType: 'code',
        subject: 'Algorithms',
        uploaderName: 'Priya Verma',
        date: 'Oct 12, 2026',
        fileSize: '820 KB',
        downloadsCount: 890,
        url: '#'
      }
    ],
    members: []
  },
  {
    id: 'comm-music-club',
    name: 'College Music Club (Aalap)',
    slug: 'aalap-music-club',
    tagline: 'Vocalists, instrumentalists, and producers making campus groove.',
    description: 'The musical heartbeat of the campus. From acoustic jam sessions under the banyan tree to annual fest rock concerts, Aalap brings musicians together.',
    icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Other'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Music', 'Cultural Activities'],
    type: 'College Club',
    isClub: true,
    clubRecruitmentStatus: 'Open',
    isPrivate: false,
    memberCount: 240,
    activeMemberCount: 45,
    moderatorName: 'Tanvi Joshi',
    moderatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    joined: true,
    rules: [
      { id: 'r1', title: 'Share Original Music & Covers', description: 'Constructive criticism only on members jam audio & video.' }
    ],
    resources: [],
    members: []
  },
  {
    id: 'comm-ecell',
    name: 'Entrepreneurship and Startup Circle',
    slug: 'jec-ecell',
    tagline: 'From campus prototype to venture-backed startup.',
    description: 'Empowering student founders, innovators, and problem-solvers. We provide startup incubation assistance, founder speed-dating, pitch deck reviews, and alumni VC connections.',
    icon: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Mechanical Engineering', 'Electronics and Communication Engineering', 'Civil Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Startups and Entrepreneurship', 'Project Collaboration', 'Placement Preparation'],
    type: 'College Club',
    isClub: true,
    clubRecruitmentStatus: 'Open',
    isPrivate: false,
    memberCount: 310,
    activeMemberCount: 92,
    moderatorName: 'Vikramaditya Rao',
    moderatorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Maintain Founder Confidentiality', description: 'Respect early stage ideas and intellectual property shared in private pitch rooms.' }
    ],
    resources: [
      {
        id: 'res-ec1',
        communityId: 'comm-ecell',
        title: 'Seed Pitch Deck Master Template & Guide',
        description: 'Standard 10-slide startup pitch deck with example traction metrics for college incubators.',
        fileType: 'doc',
        subject: 'Venture Creation',
        uploaderName: 'Vikramaditya Rao',
        date: 'Oct 01, 2026',
        fileSize: '3.2 MB',
        downloadsCount: 280,
        url: '#'
      }
    ],
    members: []
  },
  {
    id: 'comm-robotics',
    name: 'Robotics & Hardware Guild',
    slug: 'robotics-guild',
    tagline: 'Designing autonomous rovers, drones, and embedded systems.',
    description: 'Hardware enthusiasts collaborating on mechatronics, microcontrollers, ROS2, and sensor fusion. Home to college teams competing in e-Yantra and Robocon.',
    icon: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Electronics and Communication Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Science Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Robotics', 'Project Collaboration', 'Artificial Intelligence'],
    type: 'College Club',
    isClub: true,
    clubRecruitmentStatus: 'Interviewing',
    isPrivate: false,
    memberCount: 220,
    activeMemberCount: 65,
    moderatorName: 'Aman Patel',
    moderatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Lab Safety First', description: 'Follow electrical safety protocols when working with high-current LiPo batteries.' }
    ],
    resources: [],
    members: []
  },
  {
    id: 'comm-placement-prep',
    name: 'Placement Preparation Community',
    slug: 'placement-prep',
    tagline: 'Structured preparation for on-campus and off-campus tech drives.',
    description: 'An exclusive mentorship-driven circle for 3rd and 4th-year students targeting top MNCs and high-growth startups. Features resume roasts, mock HR & technical rounds, and company test patterns.',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Artificial Intelligence and Machine Learning', 'Electronics and Communication Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    years: ['Third Year', 'Fourth Year'],
    interests: ['Placement Preparation', 'Competitive Programming', 'Subject and semester guidance'],
    type: 'Career and Placement',
    isPrivate: true,
    memberCount: 420,
    activeMemberCount: 160,
    moderatorName: 'Priya Verma',
    moderatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    joined: false,
    requestPending: false,
    rules: [
      { id: 'r1', title: 'Verification Required', description: 'Open primarily to pre-final and final year students preparing for campus placements.' }
    ],
    resources: [
      {
        id: 'res-pl1',
        communityId: 'comm-placement-prep',
        title: 'Core CS Subjects Interview Capsule (OS, DBMS, CN, OOPS)',
        description: 'Top 150 conceptual questions frequently asked in Microsoft, Oracle, Cisco, and TCS Digital interviews.',
        fileType: 'pdf',
        subject: 'Core CS Interview',
        semester: 'Semester 7',
        uploaderName: 'Priya Verma',
        date: 'Oct 16, 2026',
        fileSize: '5.6 MB',
        downloadsCount: 1120,
        url: '#'
      }
    ],
    members: []
  },
  {
    id: 'comm-photo-arts',
    name: 'Photography and Creative Arts Club',
    slug: 'photo-arts-club',
    tagline: 'Capturing moments, storytelling through lenses, and digital illustration.',
    description: 'A community of visual artists, shutterbugs, and cinematographers documenting college events, architecture, street life, and digital painting.',
    icon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Other'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Photography', 'Design and UI/UX', 'Cultural Activities'],
    type: 'Hobby',
    isClub: true,
    clubRecruitmentStatus: 'Open',
    isPrivate: false,
    memberCount: 185,
    activeMemberCount: 38,
    moderatorName: 'Ananya Mishra',
    moderatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Share Exif Data & Editing Notes', description: 'Help members learn lighting and camera techniques.' }
    ],
    resources: [],
    members: []
  },
  {
    id: 'comm-sports',
    name: 'JEC Sports & Athletics Board',
    slug: 'jec-sports',
    tagline: 'Cricket, football, badminton, and campus fitness enthusiasts.',
    description: 'The official sports coordination group for inter-hostel leagues, university trials, marathon runs, and morning gym buddy matchings.',
    icon: 'https://images.unsplash.com/photo-1531415074868-036b1c575351?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Computer Science Engineering', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Other'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Cricket and Sports', 'Sports and Cultural'],
    type: 'Sports and Cultural',
    isClub: true,
    clubRecruitmentStatus: 'Open',
    isPrivate: false,
    memberCount: 340,
    activeMemberCount: 95,
    moderatorName: 'Siddharth Saxena',
    moderatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Maintain Sportsmanship', description: 'Encourage peers and coordinate ground slots fairly.' }
    ],
    resources: [],
    members: []
  },
  {
    id: 'comm-cybersec',
    name: 'CyberSecurity & Ethical Hacking Guild',
    slug: 'cybersec-guild',
    tagline: 'CTF challenges, reverse engineering, and defensive security.',
    description: 'A cross-college technical guild focused on cybersecurity research, bug bounty hunting, cryptography, and competing in national Capture The Flag events.',
    icon: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    college: 'All Colleges',
    branches: ['Computer Science Engineering', 'Information Technology', 'Artificial Intelligence and Machine Learning'],
    years: ['Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Competitive Programming', 'Research', 'Placement Preparation'],
    type: 'Project Collaboration',
    isPrivate: true,
    memberCount: 195,
    activeMemberCount: 62,
    moderatorName: 'Rohit Khandelwal',
    moderatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    joined: false,
    requestPending: true,
    rules: [
      { id: 'r1', title: 'Ethical Hacking Only', description: 'Strict zero tolerance for testing university or private portals without explicit authorization.' }
    ],
    resources: [],
    members: []
  },
  {
    id: 'comm-civil-hub',
    name: 'Civil Engineering Design & CAD Hub',
    slug: 'civil-cad-hub',
    tagline: 'Structural analysis, modern infrastructure design, and BIM tools.',
    description: 'Connecting civil engineering students with seniors and industry alumni for software training (Revit, STAAD.Pro), survey projects, and GATE preparation.',
    icon: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f156b?w=1200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branches: ['Civil Engineering'],
    years: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    interests: ['Research', 'Academic', 'Subject and semester guidance'],
    type: 'Academic',
    isPrivate: false,
    memberCount: 175,
    activeMemberCount: 42,
    moderatorName: 'Kavya Pillai',
    moderatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    joined: false,
    rules: [
      { id: 'r1', title: 'Academic Integrity', description: 'Share knowledge, drawing conventions, and site visit learnings.' }
    ],
    resources: [],
    members: []
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'mentor-priya',
    userId: 'user-priya',
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Computer Science Engineering',
    year: 'Fourth Year',
    skills: ['Data Structures & Algorithms', 'System Design', 'C++', 'Java', 'Resume Crafting'],
    areasOfGuidance: [
      'Placement preparation',
      'Internships',
      'Resume and portfolio reviews',
      'Competitive programming',
      'First-year college guidance'
    ],
    bio: 'Placed at Microsoft India as an SDE. Cracked Amazon WOW and GS Quant tests. I love guiding motivated students to land tier-1 software roles.',
    currentCompanyOrOffer: 'Incoming SDE @ Microsoft India',
    availability: 'Available',
    rating: 4.9,
    reviewCount: 38,
    activeMenteesCount: 6,
    linkedin: 'https://linkedin.com/in/priya-verma-sample'
  },
  {
    id: 'mentor-rohit',
    userId: 'user-rohit',
    name: 'Rohit Khandelwal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Artificial Intelligence and Machine Learning',
    year: 'Third Year',
    skills: ['PyTorch', 'Transformers', 'FastAPI', 'Research Writing', 'LangChain'],
    areasOfGuidance: [
      'Coding and development',
      'Hackathons and projects',
      'Research and publications',
      'Subject and semester guidance'
    ],
    bio: 'Lead organizer at AI Society. Published at IEEE INDICON. Available to mentor on deep learning projects, research paper writing, and hackathons.',
    currentCompanyOrOffer: 'AI Research Intern @ IIT Bombay Lab',
    availability: 'Available',
    rating: 4.8,
    reviewCount: 22,
    activeMenteesCount: 4
  },
  {
    id: 'mentor-ananya',
    userId: 'user-ananya',
    name: 'Ananya Mishra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Information Technology',
    year: 'Third Year',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'React', 'Frontend Engineering'],
    areasOfGuidance: [
      'Resume and portfolio reviews',
      'Coding and development',
      'College clubs and campus life',
      'First-year college guidance'
    ],
    bio: 'Design lead at JEC Web Developers. I help students build standout design portfolios, critique UI projects, and navigate club leadership.',
    currentCompanyOrOffer: 'Product Design Intern @ FinTech Startup',
    availability: 'Available',
    rating: 5.0,
    reviewCount: 19,
    activeMenteesCount: 3
  },
  {
    id: 'mentor-aman',
    userId: 'user-aman',
    name: 'Aman Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Electronics and Communication Engineering',
    year: 'Fourth Year',
    skills: ['Embedded C', 'Hardware Design', 'Verilog', 'IoT', 'Altium'],
    areasOfGuidance: [
      'Subject and semester guidance',
      'Internships',
      'Placement preparation',
      'Higher studies'
    ],
    bio: 'Ex-Intern at Texas Instruments. Can guide ECE/EE students on core semiconductor placements, GATE strategies, and embedded systems roadmaps.',
    currentCompanyOrOffer: 'Core Hardware Intern @ Texas Instruments',
    availability: 'Limited',
    rating: 4.7,
    reviewCount: 14,
    activeMenteesCount: 5
  },
  {
    id: 'mentor-vikram',
    userId: 'user-vikram',
    name: 'Vikramaditya Rao',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    college: 'Jabalpur Engineering College (JEC)',
    branch: 'Mechanical Engineering',
    year: 'Fourth Year',
    skills: ['Startup Incubation', 'Pitching', 'Grant Funding', 'Product Strategy'],
    areasOfGuidance: [
      'Startups and entrepreneurship',
      'Hackathons and projects',
      'College clubs and campus life'
    ],
    bio: 'Founder of KisanCool. Helped 12+ student teams apply for government startup grants (NIDHI EIR & Startup India Seed Fund).',
    currentCompanyOrOffer: 'Founder @ KisanCool Technologies',
    availability: 'Available',
    rating: 4.9,
    reviewCount: 27,
    activeMenteesCount: 4
  },
  {
    id: 'mentor-devanshi',
    userId: 'user-devanshi',
    name: 'Devanshi Singhal',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    college: 'IIT Indore',
    branch: 'Computer Science Engineering',
    year: 'Third Year',
    skills: ['C++', 'Competitive Programming', 'Advanced Algorithms', 'Graph Theory'],
    areasOfGuidance: [
      'Competitive programming',
      'Coding and development',
      'Placement preparation'
    ],
    bio: 'Candidate Master (1980) on Codeforces. Mentoring for ICPC regionals, online code rounds, and building intuition for DP and Trees.',
    currentCompanyOrOffer: 'Incoming SDE Intern @ Uber',
    availability: 'Busy',
    rating: 4.95,
    reviewCount: 41,
    activeMenteesCount: 2
  }
];

export const MOCK_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 'req-1',
    mentorId: 'mentor-priya',
    mentorName: 'Priya Verma',
    mentorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    mentorRole: 'Incoming SDE @ Microsoft India',
    menteeId: 'user-aryan',
    menteeName: 'Aryan Sharma',
    menteeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    menteeCollege: 'Jabalpur Engineering College (JEC)',
    menteeBranch: 'Computer Science Engineering',
    menteeYear: 'Second Year',
    guidanceCategory: 'Placement preparation',
    helpDescription: 'Hi Priya didi! I am currently in 2nd year and have solved around 250 problems on LeetCode. I want guidance on preparing a roadmap for off-campus summer internships and how to structure my resume.',
    preferredMode: 'Resume Review',
    status: 'accepted',
    createdAt: 'Oct 19, 2026'
  },
  {
    id: 'req-2',
    mentorId: 'mentor-ananya',
    mentorName: 'Ananya Mishra',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    mentorRole: 'Product Design Intern @ FinTech Startup',
    menteeId: 'user-aryan',
    menteeName: 'Aryan Sharma',
    menteeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    menteeCollege: 'Jabalpur Engineering College (JEC)',
    menteeBranch: 'Computer Science Engineering',
    menteeYear: 'Second Year',
    guidanceCategory: 'Resume and portfolio reviews',
    helpDescription: 'Hello Ananya! Would love a quick review of my portfolio website design and suggestions on improving typographic hierarchy and micro-interactions.',
    preferredMode: 'Chat',
    status: 'pending',
    createdAt: 'Oct 22, 2026'
  },
  {
    id: 'req-3',
    mentorId: 'mentor-rohit',
    mentorName: 'Rohit Khandelwal',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    mentorRole: 'AI Research Intern @ IIT Bombay Lab',
    menteeId: 'user-tanvi',
    menteeName: 'Tanvi Joshi',
    menteeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    menteeCollege: 'Jabalpur Engineering College (JEC)',
    menteeBranch: 'Information Technology',
    menteeYear: 'First Year',
    guidanceCategory: 'First-year college guidance',
    helpDescription: 'Hi bhaiya! As a first-year student, I am confused about whether to start with Python or C/C++ for my first semester. Seeking your advice!',
    preferredMode: 'Chat',
    status: 'pending',
    createdAt: 'Oct 21, 2026'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-priya',
    authorName: 'Priya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'CSE',
    authorYear: '4th Year',
    authorBadge: 'Mentor',
    communityId: 'comm-jec-webdev',
    communityName: 'JEC Web Developers',
    content: '🎉 Thrilled to announce that we are organizing a 2-day hands-on workshop on "Deploying Full-Stack Next.js Apps with Docker & CI/CD" this coming Saturday! We will cover everything from containerization, environment secrets, and automated testing to free cloud deployment on AWS / Render.\n\nOpen to all branches and years! Bring your laptops with Docker Desktop installed.',
    timestamp: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    category: 'Communities',
    likesCount: 54,
    isLiked: true,
    isBookmarked: true,
    comments: [
      {
        id: 'c-1',
        authorId: 'user-aryan',
        authorName: 'Aryan Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        authorCollege: 'JEC',
        authorBranch: 'CSE',
        authorYear: '2nd Year',
        content: 'Super excited for this Priya didi! Will we also cover setting up PostgreSQL with Prisma inside Docker compose?',
        timestamp: '1 hour ago',
        likesCount: 4,
        isLiked: true
      },
      {
        id: 'c-2',
        authorId: 'user-priya',
        authorName: 'Priya Verma',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        authorCollege: 'JEC',
        authorBranch: 'CSE',
        authorYear: '4th Year',
        content: 'Yes Aryan! We will write a complete multi-container docker-compose.yml file with Postgres and Redis.',
        timestamp: '45 mins ago',
        likesCount: 8
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-aryan',
    authorName: 'Aryan Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'CSE',
    authorYear: '2nd Year',
    authorBadge: 'Student',
    communityId: 'comm-jec-webdev',
    communityName: 'JEC Web Developers',
    content: '🚀 Just pushed v1.0 of "CampusRide" — a peer carpooling tool for students traveling between city campus and hostels! Built with React, Tailwind, Node.js, and Leaflet maps.\n\nLooking for 2 peer testers from 1st/2nd year and 1 feedback review on state management. Drop a comment if you would like to collaborate!',
    timestamp: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    category: 'Communities',
    likesCount: 38,
    isLiked: false,
    isBookmarked: false,
    comments: [
      {
        id: 'c-3',
        authorId: 'user-ananya',
        authorName: 'Ananya Mishra',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        authorCollege: 'JEC',
        authorBranch: 'IT',
        authorYear: '3rd Year',
        authorBadge: 'Club Admin',
        content: 'This looks so clean Aryan! Would love to test it out and review the mobile touch target sizing.',
        timestamp: '3 hours ago',
        likesCount: 5
      }
    ]
  },
  {
    id: 'post-3',
    authorId: 'user-rohit',
    authorName: 'Rohit Khandelwal',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'AI & ML',
    authorYear: '3rd Year',
    authorBadge: 'Senior',
    communityId: 'comm-ai-ml',
    communityName: 'AI and Machine Learning Society',
    content: 'Quick poll for our upcoming weekend session: Which topic would you prefer us to dive into first?',
    timestamp: '8 hours ago',
    category: 'Communities',
    likesCount: 29,
    isLiked: false,
    isBookmarked: false,
    poll: {
      question: 'Which AI topic should we focus on this Saturday?',
      totalVotes: 87,
      options: [
        { id: 'opt-1', text: 'Building Local AI Agents with Ollama & LangGraph', votes: 42 },
        { id: 'opt-2', text: 'Finetuning Llama-3 with LoRA / Unsloth', votes: 29 },
        { id: 'opt-3', text: 'YOLOv11 for Realtime Object Detection in Robotics', votes: 16 }
      ],
      userVotedOptionId: 'opt-1'
    },
    comments: []
  },
  {
    id: 'post-4',
    authorId: 'user-devanshi',
    authorName: 'Devanshi Singhal',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'IIT Indore',
    authorBranch: 'CSE',
    authorYear: '3rd Year',
    authorBadge: 'Senior',
    communityId: 'comm-cp-dsa',
    communityName: 'Coding and Competitive Programming',
    content: '💡 Senior Tip for juniors starting LeetCode / CP this semester:\n\nDo not jump straight into hard DP and Segment Trees! Master these 4 patterns first:\n1. Two Pointers / Sliding Window\n2. Prefix Sums & Hashing\n3. Binary Search on Answer Space\n4. Breadth-First Search (BFS) on Grids\n\nOnce you solve 25 problems in each pattern, everything else starts clicking into place.',
    timestamp: '14 hours ago',
    category: 'Mentorship',
    likesCount: 112,
    isLiked: true,
    isBookmarked: true,
    comments: [
      {
        id: 'c-4',
        authorId: 'user-tanvi',
        authorName: 'Tanvi Joshi',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        authorCollege: 'JEC',
        authorBranch: 'IT',
        authorYear: '1st Year',
        content: 'Thank you Devanshi didi! Saving this immediately. Do you recommend doing this in C++ or Python?',
        timestamp: '11 hours ago',
        likesCount: 6
      },
      {
        id: 'c-5',
        authorId: 'user-devanshi',
        authorName: 'Devanshi Singhal',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        authorCollege: 'IIT Indore',
        authorBranch: 'CSE',
        authorYear: '3rd Year',
        content: 'C++ with STL is ideal for competitive programming due to execution speed and rich standard containers, but Python is great for learning logic first!',
        timestamp: '10 hours ago',
        likesCount: 9
      }
    ]
  },
  {
    id: 'post-5',
    authorId: 'user-vikram',
    authorName: 'Vikramaditya Rao',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'ME',
    authorYear: '4th Year',
    authorBadge: 'Club Admin',
    communityId: 'comm-ecell',
    communityName: 'Entrepreneurship and Startup Circle',
    content: '📢 Registrations are now LIVE for "Campus Shark Tank 2026"! Pitch your idea to campus alumni angel investors and compete for a ₹1,00,000 prototype development grant.\n\nSolo founders and cross-department teams of up to 4 members are welcome. Applications close on November 5th.',
    timestamp: '1 day ago',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    category: 'Communities',
    likesCount: 88,
    isLiked: false,
    isBookmarked: true,
    comments: []
  },
  {
    id: 'post-6',
    authorId: 'user-ananya',
    authorName: 'Ananya Mishra',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'IT',
    authorYear: '3rd Year',
    authorBadge: 'Club Admin',
    communityId: 'comm-firstyear-it',
    communityName: 'First-Year IT Community',
    content: '📚 Uploaded comprehensive handwritten notes for "Basic Computer Engineering & C Pointers" in the Resources tab of First-Year IT! It includes solved dry runs of previous year midterm questions. Let me know if any topic needs additional explanations.',
    timestamp: '2 days ago',
    category: 'Following',
    likesCount: 76,
    isLiked: true,
    isBookmarked: false,
    comments: []
  },
  {
    id: 'post-7',
    authorId: 'user-siddharth',
    authorName: 'Siddharth Saxena',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'EE',
    authorYear: '2nd Year',
    authorBadge: 'Student',
    communityId: 'comm-sports',
    communityName: 'JEC Sports & Athletics Board',
    content: '🏏 Inter-Branch Cricket Championship matches start this Monday at JEC Main Ground! First match: CSE vs Mechanical at 9:30 AM. Come out and cheer for your branch squads!',
    timestamp: '2 days ago',
    image: 'https://images.unsplash.com/photo-1531415074868-036b1c575351?w=800&auto=format&fit=crop&q=80',
    category: 'All',
    likesCount: 42,
    isLiked: false,
    isBookmarked: false,
    comments: []
  },
  {
    id: 'post-8',
    authorId: 'user-tanvi',
    authorName: 'Tanvi Joshi',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    authorCollege: 'JEC',
    authorBranch: 'IT',
    authorYear: '1st Year',
    authorBadge: 'Student',
    communityId: 'comm-music-club',
    communityName: 'College Music Club (Aalap)',
    content: '🎸 First open-mic acoustic evening was magical! Huge thank you to all the seniors who joined the jamming circle near the library lawn. We will do this every alternate Thursday evening!',
    timestamp: '3 days ago',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    category: 'Communities',
    likesCount: 65,
    isLiked: false,
    isBookmarked: false,
    comments: []
  }
];

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: 'event-1',
    title: 'Docker & Microservices Masterclass',
    description: 'Hands-on session on containerizing fullstack React + Node applications, writing multi-stage Dockerfiles, and deploying to production cloud clusters.',
    date: 'Saturday, Oct 24, 2026',
    time: '2:00 PM – 5:30 PM IST',
    venue: 'Computer Center Lab 3 & Google Meet',
    isOnline: true,
    meetingLink: 'https://meet.google.com/jec-web-dev',
    communityId: 'comm-jec-webdev',
    communityName: 'JEC Web Developers',
    organizerName: 'Priya Verma & Aryan Sharma',
    eventType: 'Technical',
    college: 'Jabalpur Engineering College (JEC)',
    attendeeCount: 142,
    isRegistered: true,
    isInterested: false,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    tags: ['Docker', 'DevOps', 'Web Dev', 'Hands-on']
  },
  {
    id: 'event-2',
    title: 'HackSphere 2026: 36-Hour National Campus Hackathon',
    description: 'Central India’s premier student hackathon. Tracks in AI Agents, Open Source, Healthcare, and Sustainable Tech. Over ₹2.5 Lakhs in prize pool + internship opportunities.',
    date: 'Nov 12 – 14, 2026',
    time: 'Starts 9:00 AM IST',
    venue: 'JEC Golden Jubilee Auditorium',
    isOnline: false,
    communityId: 'comm-jec-webdev',
    communityName: 'JEC Web Developers',
    organizerName: 'JEC Tech Council',
    eventType: 'Hackathon',
    college: 'Jabalpur Engineering College (JEC)',
    attendeeCount: 380,
    isRegistered: false,
    isInterested: true,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    tags: ['Hackathon', 'Cash Prize', 'Hardware & Software']
  },
  {
    id: 'event-3',
    title: 'Mock Placement Drive & Resume Roast Session',
    description: 'Interactive senior-led session simulating real technical and HR interview rounds. Get your resume audited and receive live feedback from placed final-year seniors.',
    date: 'Wednesday, Oct 28, 2026',
    time: '6:00 PM – 8:00 PM IST',
    venue: 'Seminar Hall 2 & Zoom',
    isOnline: true,
    meetingLink: 'https://zoom.us/j/placement-prep',
    communityId: 'comm-placement-prep',
    communityName: 'Placement Preparation Community',
    organizerName: 'Priya Verma',
    eventType: 'Mentorship',
    college: 'Jabalpur Engineering College (JEC)',
    attendeeCount: 185,
    isRegistered: true,
    isInterested: false,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    tags: ['Placement', 'Mock Interview', 'Resume Review']
  },
  {
    id: 'event-4',
    title: 'Campus Shark Tank — Founder Pitch Day',
    description: 'Student startup founders pitch their minimum viable products to alumni entrepreneurs and seed investors for grant funding and incubation support.',
    date: 'Friday, Nov 06, 2026',
    time: '11:00 AM – 4:00 PM IST',
    venue: 'E-Cell Incubation Center (Main Campus)',
    isOnline: false,
    communityId: 'comm-ecell',
    communityName: 'Entrepreneurship and Startup Circle',
    organizerName: 'Vikramaditya Rao',
    eventType: 'Club Meeting',
    college: 'Jabalpur Engineering College (JEC)',
    attendeeCount: 95,
    isRegistered: false,
    isInterested: false,
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    tags: ['Startups', 'Pitching', 'Funding']
  },
  {
    id: 'event-5',
    title: 'Aalap Acoustic Night & Open Mic',
    description: 'An evening of classical ragas, indie acoustics, and spoken word poetry under the stars on the library lawns. Free entry for all students.',
    date: 'Thursday, Oct 29, 2026',
    time: '7:00 PM – 9:30 PM IST',
    venue: 'Central Library Lawns',
    isOnline: false,
    communityId: 'comm-music-club',
    communityName: 'College Music Club (Aalap)',
    organizerName: 'Tanvi Joshi & Music Club Team',
    eventType: 'Cultural',
    college: 'Jabalpur Engineering College (JEC)',
    attendeeCount: 210,
    isRegistered: false,
    isInterested: true,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    tags: ['Music', 'Live Jam', 'Acoustic']
  },
  {
    id: 'event-6',
    title: 'ICPC Regional Strategy & Graph Algorithms Webinar',
    description: 'Deep dive into advanced graph modeling (Network Flow, 2-SAT, Heavy-Light Decomposition) with ICPC regional qualifiers.',
    date: 'Sunday, Nov 01, 2026',
    time: '4:00 PM – 6:30 PM IST',
    venue: 'Online via Discord Stage',
    isOnline: true,
    meetingLink: 'https://discord.gg/jec-cp',
    communityId: 'comm-cp-dsa',
    communityName: 'Coding and Competitive Programming',
    organizerName: 'Devanshi Singhal',
    eventType: 'Coding Competition',
    college: 'All Colleges',
    attendeeCount: 165,
    isRegistered: false,
    isInterested: false,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tags: ['ICPC', 'Algorithms', 'C++']
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-priya',
    participant: MOCK_USERS[1], // Priya Verma
    lastMessage: 'Yes Aryan! I reviewed your resume draft. The projects section is solid, just add quantitative impact metrics.',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    onlineStatus: true
  },
  {
    id: 'conv-ananya',
    participant: MOCK_USERS[3], // Ananya Mishra
    lastMessage: 'Let us sync up before the community build session on Friday.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    onlineStatus: true
  },
  {
    id: 'conv-rohit',
    participant: MOCK_USERS[2], // Rohit Khandelwal
    lastMessage: 'Checked out the Ollama setup guide you posted. Working smoothly on Linux!',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    onlineStatus: false
  },
  {
    id: 'conv-tanvi',
    participant: MOCK_USERS[5], // Tanvi Joshi
    lastMessage: 'Hey bhaiya, thank you for sharing the C programming lab notes!',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    onlineStatus: true
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-priya': [
    {
      id: 'm1',
      conversationId: 'conv-priya',
      senderId: 'user-aryan',
      text: 'Good morning Priya didi! Hope you are doing well.',
      timestamp: 'Yesterday 4:15 PM',
      isMine: true
    },
    {
      id: 'm2',
      conversationId: 'conv-priya',
      senderId: 'user-priya',
      text: 'Hey Aryan! How is your semester going? Have you started prepping for upcoming summer internship drives?',
      timestamp: 'Yesterday 4:20 PM',
      isMine: false
    },
    {
      id: 'm3',
      conversationId: 'conv-priya',
      senderId: 'user-aryan',
      text: 'Yes didi! I updated my resume with CampusRide and DevPulse projects. Could you take a look when you get a chance?',
      timestamp: 'Yesterday 4:22 PM',
      isMine: true,
      attachment: {
        type: 'file',
        name: 'Aryan_Sharma_Resume_2026.pdf',
        url: '#',
        size: '180 KB'
      }
    },
    {
      id: 'm4',
      conversationId: 'conv-priya',
      senderId: 'user-priya',
      text: 'Yes Aryan! I reviewed your resume draft. The projects section is solid, just add quantitative impact metrics.',
      timestamp: '10:42 AM',
      isMine: false
    }
  ],
  'conv-ananya': [
    {
      id: 'm5',
      conversationId: 'conv-ananya',
      senderId: 'user-ananya',
      text: 'Hey Aryan! I loved the UI mockups you shared for the JEC Web Developers event banner.',
      timestamp: 'Yesterday 2:30 PM',
      isMine: false
    },
    {
      id: 'm6',
      conversationId: 'conv-ananya',
      senderId: 'user-aryan',
      text: 'Thanks Ananya! I used the violet and slate palette to keep it clean and minimal.',
      timestamp: 'Yesterday 2:45 PM',
      isMine: true
    },
    {
      id: 'm7',
      conversationId: 'conv-ananya',
      senderId: 'user-ananya',
      text: 'Let us sync up before the community build session on Friday.',
      timestamp: 'Yesterday 3:00 PM',
      isMine: false
    }
  ],
  'conv-rohit': [
    {
      id: 'm8',
      conversationId: 'conv-rohit',
      senderId: 'user-aryan',
      text: 'Hey Rohit, did you get the chance to test the Ollama docker compose script?',
      timestamp: '2 days ago',
      isMine: true
    },
    {
      id: 'm9',
      conversationId: 'conv-rohit',
      senderId: 'user-rohit',
      text: 'Checked out the Ollama setup guide you posted. Working smoothly on Linux!',
      timestamp: '2 days ago',
      isMine: false
    }
  ],
  'conv-tanvi': [
    {
      id: 'm10',
      conversationId: 'conv-tanvi',
      senderId: 'user-tanvi',
      text: 'Hey bhaiya, thank you for sharing the C programming lab notes!',
      timestamp: '3 days ago',
      isMine: false
    },
    {
      id: 'm11',
      conversationId: 'conv-tanvi',
      senderId: 'user-aryan',
      text: 'Most welcome Tanvi! If you get stuck on pointers or memory allocation, feel free to drop a message anytime.',
      timestamp: '3 days ago',
      isMine: true
    }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'mentorship',
    title: 'Mentorship Request Accepted',
    message: 'Priya Verma accepted your mentorship request in Placement preparation.',
    timestamp: '1 hour ago',
    read: false,
    targetTab: 'mentorship'
  },
  {
    id: 'notif-2',
    type: 'comment',
    title: 'New Comment on Your Post',
    message: 'Ananya Mishra commented: "This looks so clean Aryan! Would love to test it out..."',
    timestamp: '3 hours ago',
    read: false,
    targetTab: 'home',
    targetId: 'post-2'
  },
  {
    id: 'notif-3',
    type: 'event',
    title: 'Upcoming Workshop Reminder',
    message: 'Docker & Microservices Masterclass starts this Saturday at 2:00 PM IST.',
    timestamp: '5 hours ago',
    read: true,
    targetTab: 'events',
    targetId: 'event-1'
  },
  {
    id: 'notif-4',
    type: 'community',
    title: 'New Resource in JEC Web Developers',
    message: 'Priya Verma uploaded "Core CS Subjects Interview Capsule (OS, DBMS, CN, OOPS)".',
    timestamp: '1 day ago',
    read: true,
    targetTab: 'explore',
    targetId: 'comm-jec-webdev'
  },
  {
    id: 'notif-5',
    type: 'message',
    title: 'New Message from Priya Verma',
    message: '"Yes Aryan! I reviewed your resume draft. The projects section is solid..."',
    timestamp: '1 day ago',
    read: true,
    targetTab: 'messages',
    targetId: 'conv-priya'
  }
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  profileVisibility: 'Campus Only',
  mentorshipAvailable: true,
  allowDirectMessages: 'Everyone',
  emailNotifications: true,
  pushNotifications: true,
  eventReminders: true,
  blockedUsers: []
};
