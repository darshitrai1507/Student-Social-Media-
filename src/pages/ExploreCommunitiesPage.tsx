import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityCard } from '../components/community/CommunityCard';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Check, 
  ChevronDown, 
  ChevronUp,
  School,
  SlidersHorizontal
} from 'lucide-react';
import { BranchType, YearOfStudy, CommunityType, Community } from '../types';

export const ExploreCommunitiesPage: React.FC = () => {
  const { communities, setIsCreateCommunityOpen } = useApp();

  // Search & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'newest'>('relevance');

  // Filter States
  const [selectedBranches, setSelectedBranches] = useState<BranchType[]>([]);
  const [selectedYears, setSelectedYears] = useState<YearOfStudy[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<CommunityType[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>('All Colleges');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Available filter options
  const BRANCHES: BranchType[] = [
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence and Machine Learning',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other'
  ];

  const YEARS: YearOfStudy[] = [
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year'
  ];

  const INTERESTS = [
    'Web Development',
    'App Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Competitive Programming',
    'Data Science',
    'Startups and Entrepreneurship',
    'Design and UI/UX',
    'Robotics',
    'Gaming',
    'Cricket and Sports',
    'Music',
    'Photography',
    'Cultural Activities',
    'Placement Preparation',
    'Research'
  ];

  const COMMUNITY_TYPES: CommunityType[] = [
    'Academic',
    'Technical',
    'College Club',
    'Hobby',
    'Career and Placement',
    'Project Collaboration',
    'Sports and Cultural'
  ];

  const COLLEGES = [
    'All Colleges',
    'Jabalpur Engineering College (JEC)',
    'IIT Indore',
    'SGSITS Indore',
    'MANIT Bhopal'
  ];

  // Multi-Filter Combination Logic
  const filteredCommunities: Community[] = useMemo(() => {
    return communities.filter((c: Community) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
        const matchesInterests = c.interests.some((i: string) => i.toLowerCase().includes(q));
        const matchesBranches = c.branches.some((b: string) => b.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesInterests && !matchesBranches) {
          return false;
        }
      }

      // 2. College Filter
      if (selectedCollege !== 'All Colleges') {
        if (c.college !== 'All Colleges' && c.college !== selectedCollege) {
          return false;
        }
      }

      // 3. Branch Filter (Any match if selected)
      if (selectedBranches.length > 0) {
        const matchesBranch = c.branches.some((b: BranchType) => selectedBranches.includes(b));
        if (!matchesBranch) return false;
      }

      // 4. Year Filter (Any match if selected)
      if (selectedYears.length > 0) {
        const matchesYear = c.years.some((y: YearOfStudy) => selectedYears.includes(y));
        if (!matchesYear) return false;
      }

      // 5. Interest Filter (Any match if selected)
      if (selectedInterests.length > 0) {
        const matchesInterest = c.interests.some((i: string) => selectedInterests.includes(i));
        if (!matchesInterest) return false;
      }

      // 6. Community Type Filter
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(c.type)) return false;
      }

      return true;
    }).sort((a: Community, b: Community) => {
      if (sortBy === 'popularity') return b.memberCount - a.memberCount;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // relevance
    });
  }, [communities, searchQuery, selectedCollege, selectedBranches, selectedYears, selectedInterests, selectedTypes, sortBy]);

  // Toggle Handlers
  const toggleBranch = (b: BranchType) => {
    setSelectedBranches(prev => 
      prev.includes(b) ? prev.filter(item => item !== b) : [...prev, b]
    );
  };

  const toggleYear = (y: YearOfStudy) => {
    setSelectedYears(prev => 
      prev.includes(y) ? prev.filter(item => item !== y) : [...prev, y]
    );
  };

  const toggleInterest = (i: string) => {
    setSelectedInterests(prev => 
      prev.includes(i) ? prev.filter(item => item !== i) : [...prev, i]
    );
  };

  const toggleType = (t: CommunityType) => {
    setSelectedTypes(prev => 
      prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
    );
  };

  const clearAllFilters = () => {
    setSelectedBranches([]);
    setSelectedYears([]);
    setSelectedInterests([]);
    setSelectedTypes([]);
    setSelectedCollege('All Colleges');
    setSearchQuery('');
  };

  const totalActiveFilters = selectedBranches.length + selectedYears.length + selectedInterests.length + selectedTypes.length + (selectedCollege !== 'All Colleges' ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore Communities & Clubs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover technical guilds, branch societies, creative clubs, and academic circles across your campus.
          </p>
        </div>

        <button
          onClick={() => setIsCreateCommunityOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Create Community</span>
        </button>
      </div>

      {/* Prominent Search Bar */}
      <div className="relative mb-6">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200/90 rounded-2xl shadow-subtle focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
          <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search communities, clubs, branches, and interests..."
            className="w-full text-sm bg-transparent border-0 focus:ring-0 focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-700">
            {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'} found
          </span>

          {totalActiveFilters > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 text-[11px]">Filters:</span>

              {selectedCollege !== 'All Colleges' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-50 text-brand-700 rounded-md font-medium text-[11px]">
                  🏫 {selectedCollege.replace(' (JEC)', '')}
                  <button onClick={() => setSelectedCollege('All Colleges')}>×</button>
                </span>
              )}

              {selectedBranches.map((b: BranchType) => (
                <span key={b} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-medium text-[11px]">
                  {b.replace(' Engineering', '')}
                  <button onClick={() => toggleBranch(b)}>×</button>
                </span>
              ))}

              {selectedYears.map((y: YearOfStudy) => (
                <span key={y} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-violet-50 text-violet-700 rounded-md font-medium text-[11px]">
                  {y}
                  <button onClick={() => toggleYear(y)}>×</button>
                </span>
              ))}

              {selectedInterests.map((i: string) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-medium text-[11px]">
                  #{i}
                  <button onClick={() => toggleInterest(i)}>×</button>
                </span>
              ))}

              {selectedTypes.map((t: CommunityType) => (
                <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-md font-medium text-[11px]">
                  {t}
                  <button onClick={() => toggleType(t)}>×</button>
                </span>
              ))}

              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 ml-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear all
              </button>
            </>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
          >
            <option value="relevance">Relevance</option>
            <option value="popularity">Most Popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar (Left) + Communities Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Filter Sidebar (4 cols on lg, or mobile drawer) */}
        <div className={`lg:col-span-3 space-y-5 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle space-y-6 sticky top-20">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900">Filter By</h3>
              </div>
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-brand-600 hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* A. College Selector */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                College Campus
              </label>
              <select
                value={selectedCollege}
                onChange={e => setSelectedCollege(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              >
                {COLLEGES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* B. Branch Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Academic Branch
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {BRANCHES.map(b => {
                  const isChecked = selectedBranches.includes(b);
                  const shortName = b.replace(' Engineering', '');
                  return (
                    <label 
                      key={b}
                      className={`flex items-center gap-2.5 p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isChecked ? 'bg-brand-50 text-brand-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBranch(b)}
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="truncate">{shortName}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* C. Year of Study */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Year of Study
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {YEARS.map(y => {
                  const isChecked = selectedYears.includes(y);
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => toggleYear(y)}
                      className={`py-1.5 px-2 text-[11px] rounded-lg font-medium border text-center transition-colors ${
                        isChecked 
                          ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* D. Interests Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Interests & Domains
              </label>
              <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto pr-1">
                {INTERESTS.map(int => {
                  const isChecked = selectedInterests.includes(int);
                  return (
                    <button
                      key={int}
                      type="button"
                      onClick={() => toggleInterest(int)}
                      className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                        isChecked 
                          ? 'bg-brand-600 text-white font-semibold' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {int}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* E. Community Type */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Community Type
              </label>
              <div className="space-y-1.5">
                {COMMUNITY_TYPES.map(type => {
                  const isChecked = selectedTypes.includes(type);
                  return (
                    <label 
                      key={type}
                      className={`flex items-center gap-2.5 p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isChecked ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleType(type)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Communities Grid (9 cols on lg) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Empty State */}
          {filteredCommunities.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-bold text-base text-slate-900">No matching campus communities</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We couldn't find any community matching your active combination of branch, year, interest, or search terms.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCommunities.map((community: Community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
