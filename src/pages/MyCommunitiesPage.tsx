import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityCard } from '../components/community/CommunityCard';
import { Plus, Users, Compass, Award, Shield } from 'lucide-react';
import { Community } from '../types';

export const MyCommunitiesPage: React.FC = () => {
  const { communities, setIsCreateCommunityOpen, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'clubs' | 'academic' | 'technical'>('all');

  const joinedCommunities: Community[] = communities.filter((c: Community) => c.joined);

  const filtered: Community[] = joinedCommunities.filter((c: Community) => {
    if (filter === 'all') return true;
    if (filter === 'clubs') return c.isClub || c.type === 'College Club' || c.type === 'Sports and Cultural';
    if (filter === 'academic') return c.type === 'Academic';
    if (filter === 'technical') return c.type === 'Technical' || c.type === 'Project Collaboration';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Communities & Clubs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Groups, student chapters, and technical guilds you have joined on campus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Explore More
          </button>
          <button
            onClick={() => setIsCreateCommunityOpen(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Community</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'all', label: `All Joined (${joinedCommunities.length})` },
          { id: 'clubs', label: 'College Clubs' },
          { id: 'technical', label: 'Technical Guilds' },
          { id: 'academic', label: 'Academic & Branch' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              filter === tab.id
                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">No communities in this category</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Join clubs and interest groups in the Explore page to collaborate with peers and access shared notes.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl"
          >
            Discover Communities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((community: Community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}

    </div>
  );
};
