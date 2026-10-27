import React from 'react';
import { RoleBadge } from '../../types';
import { ShieldCheck, GraduationCap, Sparkles, Award } from 'lucide-react';

interface BadgeProps {
  role?: RoleBadge | 'Verified' | 'Private' | 'Public' | 'Open' | 'Closed' | 'Interviewing';
  variant?: 'role' | 'status' | 'category' | 'outline';
  children?: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  role, 
  variant = 'role', 
  children, 
  className = '',
  size = 'sm' 
}) => {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1',
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold'
  }[size];

  if (role === 'Mentor') {
    return (
      <span className={`inline-flex items-center rounded-full bg-violet-100 text-violet-800 border border-violet-200/60 shadow-xs ${sizeClasses} ${className}`}>
        <Sparkles className="w-3 h-3 text-violet-600" />
        {children || 'Mentor'}
      </span>
    );
  }

  if (role === 'Senior') {
    return (
      <span className={`inline-flex items-center rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200/60 shadow-xs ${sizeClasses} ${className}`}>
        <GraduationCap className="w-3 h-3 text-indigo-600" />
        {children || 'Senior'}
      </span>
    );
  }

  if (role === 'Club Admin') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-200/60 shadow-xs ${sizeClasses} ${className}`}>
        <Award className="w-3 h-3 text-amber-600" />
        {children || 'Club Admin'}
      </span>
    );
  }

  if (role === 'Student') {
    return (
      <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 ${sizeClasses} ${className}`}>
        {children || 'Student'}
      </span>
    );
  }

  if (role === 'Verified') {
    return (
      <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses} ${className}`}>
        <ShieldCheck className="w-3 h-3 text-emerald-600" />
        {children || 'Verified'}
      </span>
    );
  }

  if (role === 'Private') {
    return (
      <span className={`inline-flex items-center rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 ${sizeClasses} ${className}`}>
        🔒 {children || 'Private'}
      </span>
    );
  }

  if (role === 'Public') {
    return (
      <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 ${sizeClasses} ${className}`}>
        🌐 {children || 'Public'}
      </span>
    );
  }

  if (role === 'Open') {
    return (
      <span className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Recruiting Open
      </span>
    );
  }

  if (role === 'Interviewing') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-200 ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Interviewing
      </span>
    );
  }

  if (role === 'Closed') {
    return (
      <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses} ${className}`}>
        Closed
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
