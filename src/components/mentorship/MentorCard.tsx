import React from 'react';
import { Mentor } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Star, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

interface MentorCardProps {
  mentor: Mentor;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const { openRequestMentorshipModal, viewUserProfile, mentorshipRequests, currentUser } = useApp();

  const existingRequest = mentorshipRequests.find(
    r => r.mentorId === mentor.id && r.menteeId === currentUser.id
  );

  const availabilityColor = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Limited: 'bg-amber-50 text-amber-700 border-amber-200',
    Busy: 'bg-rose-50 text-rose-700 border-rose-200'
  }[mentor.availability];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-200 p-5 flex flex-col justify-between group">
      
      <div>
        {/* Header Profile Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <Avatar 
              src={mentor.avatar} 
              name={mentor.name} 
              size="lg" 
              onClick={() => viewUserProfile(mentor.userId)}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 
                  onClick={() => viewUserProfile(mentor.userId)}
                  className="font-bold text-sm text-slate-900 group-hover:text-brand-600 cursor-pointer transition-colors truncate"
                >
                  {mentor.name}
                </h3>
                <Badge role="Mentor" size="xs" />
              </div>

              <p className="text-[11px] text-brand-700 font-semibold truncate mt-0.5">
                {mentor.currentCompanyOrOffer || `${mentor.branch} Senior`}
              </p>

              <p className="text-[11px] text-slate-500 truncate">
                {mentor.college} • {mentor.year}
              </p>
            </div>
          </div>

          {/* Availability Status Badge */}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${availabilityColor} whitespace-nowrap`}>
            ● {mentor.availability}
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
          {mentor.bio}
        </p>

        {/* Areas of Guidance */}
        <div className="mb-3.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Mentorship Areas
          </span>
          <div className="flex flex-wrap gap-1">
            {mentor.areasOfGuidance.slice(0, 3).map(area => (
              <span
                key={area}
                className="text-[10px] px-2 py-0.5 bg-violet-50 text-violet-700 font-medium rounded-md border border-violet-100"
              >
                {area}
              </span>
            ))}
            {mentor.areasOfGuidance.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                +{mentor.areasOfGuidance.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Skills Tag */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Skills
          </span>
          <div className="flex flex-wrap gap-1">
            {mentor.skills.slice(0, 4).map(skill => (
              <span
                key={skill}
                className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{mentor.rating}</span>
            <span className="text-[11px] text-slate-400 font-normal">
              ({mentor.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{mentor.activeMenteesCount} active mentees</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => viewUserProfile(mentor.userId)}
            className="py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            View Profile
          </button>

          {existingRequest ? (
            <span className={`py-2 px-3 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-1 ${
              existingRequest.status === 'accepted'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : existingRequest.status === 'declined'
                ? 'bg-slate-100 text-slate-500'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {existingRequest.status === 'accepted' ? '✓ Connected' : '⏳ Pending'}
            </span>
          ) : (
            <button
              onClick={() => openRequestMentorshipModal(mentor)}
              className="py-2 px-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
