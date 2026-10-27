import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showOnline?: boolean;
  online?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  showOnline = false,
  online = false,
  className = '',
  onClick
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-24 h-24 text-2xl'
  };

  const dotSizeMap = {
    xs: 'w-1.5 h-1.5 ring-1',
    sm: 'w-2 h-2 ring-1.5',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
    xl: 'w-3.5 h-3.5 ring-2',
    '2xl': 'w-5 h-5 ring-4'
  };

  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`relative inline-block flex-shrink-0 ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeMap[size]} rounded-full object-cover border border-slate-200/80 shadow-xs`}
        />
      ) : (
        <div className={`${sizeMap[size]} rounded-full bg-gradient-to-tr from-brand-600 to-accent-500 text-white font-semibold flex items-center justify-center border border-slate-200/80 shadow-xs`}>
          {initials}
        </div>
      )}

      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-white ${dotSizeMap[size]} ${
            online ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
          title={online ? 'Online now' : 'Offline'}
        />
      )}
    </div>
  );
};
