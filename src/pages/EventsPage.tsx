import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { Calendar, Search, Filter, Video, MapPin, Sparkles, Plus } from 'lucide-react';
import { CampusEvent } from '../types';

export const EventsPage: React.FC = () => {
  const { events, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All Event Types');
  const [formatFilter, setFormatFilter] = useState<'all' | 'online' | 'campus'>('all');

  const EVENT_TYPES = [
    'All Event Types',
    'Technical',
    'Hackathon',
    'College Fest',
    'Club Meeting',
    'Coding Competition',
    'Guest Lecture',
    'Cultural',
    'Mentorship'
  ];

  const filteredEvents: CampusEvent[] = useMemo(() => {
    return events.filter((e: CampusEvent) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(q);
        const matchesDesc = e.description.toLowerCase().includes(q);
        const matchesComm = e.communityName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesComm) return false;
      }

      if (selectedType !== 'All Event Types') {
        if (e.eventType !== selectedType) return false;
      }

      if (formatFilter === 'online' && !e.isOnline) return false;
      if (formatFilter === 'campus' && e.isOnline) return false;

      return true;
    });
  }, [events, searchQuery, selectedType, formatFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Campus Events & Activities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Workshops, hackathons, club meetings, and cultural fests taking place across campus.
          </p>
        </div>

        <button
          onClick={() => showToast('Event creation is open for club leads & verified community admins.', 'info')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Host an Event</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search events by title, keyword, or organizing club..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
          >
            {EVENT_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Online vs In-Person */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFormatFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                formatFilter === 'all' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFormatFilter('campus')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                formatFilter === 'campus' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              On Campus
            </button>
            <button
              onClick={() => setFormatFilter('online')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                formatFilter === 'online' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online
            </button>
          </div>
        </div>

      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
          No events match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: CampusEvent) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

    </div>
  );
};
