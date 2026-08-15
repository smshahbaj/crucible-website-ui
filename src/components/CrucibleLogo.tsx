import React from 'react';

interface CrucibleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  withGlow?: boolean;
}

export const CrucibleLogoIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="crucibleGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e879f9" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#7e22ce" />
        </linearGradient>
        <filter id="purpleNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Crucible Anvil & Chalice Crest Silhouette */}
      <g filter="url(#purpleNeonGlow)">
        {/* Top horn and cap */}
        <path 
          d="M8 10C12 10 14 13 18 13H30C34 13 36 10 40 10V14C36 14 34 16 31 17L30 20H18L17 17C14 16 12 14 8 14V10Z" 
          fill="url(#crucibleGrad)" 
        />
        {/* Pillar / waist */}
        <path 
          d="M20 20H28L29 27C29 30 32 32 35 33V36H13V33C16 32 19 30 19 27L20 20Z" 
          fill="url(#crucibleGrad)" 
        />
        {/* Base foundation */}
        <path 
          d="M10 37H38L40 42H8L10 37Z" 
          fill="url(#crucibleGrad)" 
        />
        {/* Inner energy core / glyph */}
        <path 
          d="M22 17H26V23H22V17ZM23 26H25V30H23V26Z" 
          fill="#ffffff" 
          opacity="0.9" 
        />
      </g>
    </svg>
  );
};

export const CrucibleLogo: React.FC<CrucibleLogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  withGlow = true 
}) => {
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', title: 'text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative flex items-center justify-center p-1 rounded-xl bg-purple-950/40 border border-purple-500/30 ${withGlow ? 'shadow-[0_0_20px_rgba(168,85,247,0.4)]' : ''}`}>
        <CrucibleLogoIcon className={sizeClasses.icon} />
      </div>
      
      <div className="flex flex-col">
        <span className={`font-display font-extrabold tracking-wider text-white leading-none ${sizeClasses.title}`}>
          CRUCIBLE
        </span>
        {showSubtitle && (
          <span className={`font-mono font-bold tracking-[0.2em] text-purple-400/90 leading-tight mt-0.5 ${sizeClasses.sub}`}>
            BY SMSHAHBAJ
          </span>
        )}
      </div>
    </div>
  );
};
