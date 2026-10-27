import React from 'react';
import { CampusEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Video, Users, Check, Star } from 'lucide-react';

interface EventCardProps {
  event: CampusEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { toggleRegisterEvent, toggleInterestEvent, viewCommunity } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col group">
      
      {/* Cover Image & Online Badge */}
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img 
          src={event.coverImage} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-xs">
            {event.eventType}
          </span>

          {event.isOnline ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-600/90 text-white flex items-center gap-1 shadow-xs">
              <Video className="w-3 h-3" /> Online
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-600/90 text-white flex items-center gap-1 shadow-xs">
              <MapPin className="w-3 h-3" /> On Campus
            </span>
          )}
        </div>

        {/* Organizer */}
        <div className="absolute bottom-2 left-2.5 right-2.5">
          <span 
            onClick={() => viewCommunity(event.communityId)}
            className="text-[11px] font-medium text-white/90 hover:text-white hover:underline cursor-pointer truncate block drop-shadow-sm"
          >
            Organized by {event.communityName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1 mb-2 group-hover:text-brand-600 transition-colors">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div>
          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700">{event.attendeeCount}</span>
              <span>registered</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => toggleInterestEvent(event.id)}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                event.isInterested
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${event.isInterested ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>{event.isInterested ? 'Interested' : 'Interest'}</span>
            </button>

            <button
              onClick={() => toggleRegisterEvent(event.id)}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                event.isRegistered
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
              }`}
            >
              {event.isRegistered ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Registered</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
