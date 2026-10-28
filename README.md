# StudentSphere — Modern Student Networking Platform

StudentSphere is an interactive, responsive website prototype designed for college students to connect with classmates, meet seniors, find mentors, join clubs and communities, collaborate on projects, and communicate privately.

---

## 🚀 Live Demo URL
The development server is actively running at:
**https://melodic-pony-553f2b.netlify.app/**

---

## 🌟 Core Feature Walkthrough

### 1. Home Dashboard
- **Personalized Welcome Banner**: Time-of-day greeting for current user (*Aryan Sharma, 2nd Year CSE, Jabalpur Engineering College*).
- **Profile Completion Tracker**: Displays profile readiness score (85%) with 1-click modal to update skills, projects, and bio.
- **Unified Campus Feed**: Filter posts by *All Discussions*, *Following*, *My Communities*, and *Senior Guidance*.
- **Interactive Post Card**:
  - Live liking with counter animation.
  - Interactive student comments with immediate posting.
  - Bookmarking and post sharing with clipboard copy.
  - Interactive student poll with real-time percentage recalculation upon voting.
  - Flagging and reporting inappropriate content.
- **Campus Widgets**:
  - Recommended Communities with 1-click Join.
  - Recommended Mentors with 1-click Mentorship Request.
  - Upcoming Events with Register / Interested toggles.
  - Suggested Classmates based on shared domain interests.

### 2. Explore Communities (Multi-Facet Discovery)
- **Multi-Filter System**:
  - **Academic Branch**: Computer Science, IT, AI & ML, ECE, EE, Mechanical, Civil, Other.
  - **Year of Study**: First Year, Second Year, Third Year, Fourth Year.
  - **Interests**: Web Development, AI/ML, Competitive Programming, Startups, Robotics, Design, Music, Placement Prep, etc.
  - **Community Type**: Academic, Technical, College Club, Hobby, Career & Placement, Project Collaboration, Sports & Cultural.
  - **College Campus**: Jabalpur Engineering College, IIT Indore, SGSITS, MANIT, or All Colleges.
- **Combined Filtering Logic**: Select *Branch: Information Technology* + *Year: First Year* + *Interest: Web Development* to observe instant live matching.
- **Filter Chips & Sorting**: Remove individual chips, clear all, sort by *Relevance*, *Most Popular*, or *Newest*.
- **Empty States**: Helpful zero-state message with 1-click filter reset.

### 3. Community Detail Page
- Dedicated pages for all 12 communities (e.g. *JEC Web Developers*, *First-Year IT Community*, *AI Society*, *Robotics Club*, *Aalap Music Club*, *E-Cell*).
- **5 Dedicated Tabs**:
  1. **Discussions**: Feed scoped to the community with discussion posts and polls.
  2. **Members**: Organizes leadership (*Founder, Admin, Moderator, Mentor*) and active students.
  3. **Resources**: Community study materials, reference PDFs, question papers, and tutorial files, complete with a **"Share Resource"** upload simulator.
  4. **Events**: Community-hosted workshops, meetings, and hackathons.
  5. **About & Rules**: Code of conduct, rules list, and moderation contacts.

### 4. Senior-Junior Mentorship System
- **Mentor Directory**: Filter verified senior mentors by guidance area (*Placement Prep, First-Year Guidance, Internships, Resume Review, Competitive Programming, Higher Studies*), branch, and availability (*Available, Limited, Busy*).
- **Mentorship Request Workflow**:
  1. Click **Request** on any mentor card.
  2. Select Guidance Category.
  3. Select Preferred Format (*Chat Q&A, Resume Review, 15-min Video Call*).
  4. Write description of specific questions or challenges.
  5. Submit to generate immediate toast feedback and record as *Pending* on the student's dashboard.
- **4 Dedicated Mentorship Tabs**:
  - *Find a Mentor*
  - *My Mentors* (Active connections with 1-click chat launch)
  - *Sent Requests* (Status tracking with Pending/Accepted/Declined pills)
  - *Mentor Inbox* (Senior persona simulator where requests can be accepted or declined)

### 5. Private Messaging & Chat
- **Three-Column Desktop Layout**:
  - Left: Searchable conversations list with unread badges and online indicators.
  - Center: Message feed with chat composer, emoji picker, and mock PDF/image attachments.
  - Right: Contact profile card with branch, bio, skills, and moderation options.
- **Responsive Navigation**: Smooth mobile experience toggling between conversation list and active chat view with back button.
- **Instant Messaging**: Messages appear immediately in state and persist across refreshes.

### 6. Student Profile & Customization
- Detailed student showcase (*Aryan Sharma*):
  - Academic bio, badges (*Student, Senior, Mentor, Club Admin, Verified*).
  - Featured projects with GitHub links, tech stack pills, and stars.
  - Achievements and honors (Hackathons, LeetCode rating).
  - Joined communities and clubs.
- **Edit Profile Modal**: Modify name, avatar, bio, skills, interests, add projects, and toggle mentorship availability.

### 7. Campus Events & Workshops
- Categorized campus events (*Docker Masterclass, HackSphere 2026 Hackathon, Mock Placement Drive, Aalap Acoustic Night, Campus Shark Tank*).
- Filter by event type and format (*On Campus* vs *Online*).
- Interactive **Register** and **Interested** buttons with live attendee counter.

### 8. Campus Safety & Settings
- **Privacy Controls**: Profile visibility (*Campus Only*, *Public*, *Private*), Direct message permissions, Mentorship toggle.
- **Notification Toggles**: Bell alerts, mentorship email alerts, event reminders.
- **Campus Safety Console**: Admin moderation simulator for reported content with take-down and dismiss actions.

---

## 🛠️ Tech Stack & Directory Structure
- **Framework**: React 18 with TypeScript
- **Tooling**: Vite 5
- **Styling**: Tailwind CSS with custom branding (*brand: indigo, accent: violet*)
- **Icons**: Lucide React
- **Storage**: Browser `localStorage` for state persistence across sessions

```
studentsphere/
├── src/
│   ├── components/
│   │   ├── common/       # Avatar, Badge, ToastContainer
│   │   ├── navigation/   # Sidebar, TopNav, MobileNav
│   │   ├── feed/         # PostCard
│   │   ├── community/    # CommunityCard
│   │   ├── mentorship/   # MentorCard
│   │   ├── events/       # EventCard
│   │   └── modals/       # CreatePost, CreateCommunity, RequestMentorship, EditProfile, GlobalSearch, Report
│   ├── context/          # AppContext (full state, handlers, storage sync)
│   ├── data/             # Rich mock dataset (12+ communities, 10+ students, 6+ mentors, posts, events)
│   ├── pages/            # Home, Explore, CommunityDetail, Mentorship, MyCommunities, Messages, Events, Profile, Settings
│   ├── types/            # Complete TypeScript domain interfaces
│   ├── App.tsx           # Layout, routing, and global modals
│   └── main.tsx          # App entry point
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```
