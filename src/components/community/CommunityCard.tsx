import React from 'react';
import { Community } from '../../types';
import { useApp } from '../../context/AppContext';
import { Users, Lock, Globe, Sparkles, Check, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { toggleJoinCommunity, viewCommunity, viewUserProfile } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col group">
      
      {/* Cover Header Banner */}
      <div 
        onClick={() => viewCommunity(community.id)}
        className="relative h-24 sm:h-28 overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img 
          src={community.coverImage} 
          alt={community.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <Badge role={community.isPrivate ? 'Private' : 'Public'} size="xs" />
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
            {community.type}
          </span>
        </div>

        {/* Club Recruitment Badge if Club */}
        {community.isClub && community.clubRecruitmentStatus && (
          <div className="absolute bottom-2 right-2.5">
            <Badge role={community.clubRecruitmentStatus} size="xs" />
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col">
        
        {/* Avatar + Title Row */}
        <div className="flex items-start gap-3 -mt-8 mb-2.5">
          <img 
            src={community.icon} 
            alt={community.name} 
            onClick={() => viewCommunity(community.id)}
            className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white cursor-pointer hover:opacity-90 flex-shrink-0" 
          />
          <div className="min-w-0 pt-3">
            <h3 
              onClick={() => viewCommunity(community.id)}
              className="font-bold text-sm text-slate-900 group-hover:text-brand-600 cursor-pointer transition-colors leading-tight line-clamp-1"
            >
              {community.name}
            </h3>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {community.college}
            </p>
          </div>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 flex-1">
          {community.tagline || community.description}
        </p>

        {/* Interests & Branch Badges */}
        <div className="flex flex-wrap gap-1 mb-3.5">
          {community.branches.slice(0, 2).map(b => (
            <span 
              key={b} 
              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-md truncate max-w-[140px]"
            >
              {b.replace(' Engineering', '')}
            </span>
          ))}
          {community.interests.slice(0, 2).map(i => (
            <span 
              key={i} 
              className="text-[10px] px-2 py-0.5 bg-brand-50 text-brand-700 font-medium rounded-md truncate max-w-[120px]"
            >
              #{i}
            </span>
          ))}
        </div>

        {/* Stats Row & Moderator info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{community.memberCount}</span>
            <span className="text-[11px]">members</span>
            {community.activeMemberCount > 0 && (
              <span className="text-[10px] text-emerald-600 font-medium ml-1">
                ({community.activeMemberCount} online)
              </span>
            )}
          </div>

          <div 
            onClick={(e) => {
              e.stopPropagation();
              // find moderator userId
              viewCommunity(community.id, 'members');
            }}
            className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
            title={`Lead: ${community.moderatorName}`}
          >
            <Avatar src={community.moderatorAvatar} name={community.moderatorName} size="xs" />
            <span className="truncate max-w-[90px]">{community.moderatorName.split(' ')[0]}</span>
          </div>
        </div>

        {/* Join / Leave / Request Button */}
        <div className="flex items-center gap-2">
          {community.joined ? (
            <button
              onClick={() => toggleJoinCommunity(community.id)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Joined</span>
            </button>
          ) : community.isPrivate ? (
            community.requestPending ? (
              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className="w-full py-2 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 hover:bg-amber-100"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Request Pending</span>
              </button>
            ) : (
              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className="w-full py-2 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Request to Join</span>
              </button>
            )
          ) : (
            <button
              onClick={() => toggleJoinCommunity(community.id)}
              className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Join Community</span>
            </button>
          )}

          <button
            onClick={() => viewCommunity(community.id)}
            className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            title="View Details"
          >
            View
          </button>
        </div>

      </div>

    </div>
  );
};
