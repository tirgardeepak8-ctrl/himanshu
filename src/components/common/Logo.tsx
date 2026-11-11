import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  // Sizing maps
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl tracking-[0.25em]',
    xl: 'text-3xl tracking-[0.28em]'
  };

  const isDarkCanvas = variant === 'dark';
  const goldColor = '#D4AF37';
  const textColor = isDarkCanvas ? 'text-white' : variant === 'gold' ? 'text-[#D4AF37]' : 'text-neutral-900';
  const taglineColor = isDarkCanvas ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Distinctive 2D TIRGAR T-Bow-and-Arrow Symbol */}
        <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Outer subtle circular frame */}
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke={goldColor}
              strokeWidth="2"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke={goldColor}
              strokeWidth="1.5"
            />

            {/* Recurved Indian Bow forming the upper bar of the 'T' */}
            <path
              d="M16 42 C 28 26, 42 32, 50 34 C 58 32, 72 26, 84 42"
              stroke={goldColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Bowstring */}
            <line
              x1="18"
              y1="42"
              x2="82"
              y2="42"
              stroke={isDarkCanvas ? '#FFFFFF' : '#888888'}
              strokeWidth="1"
              strokeOpacity="0.8"
            />

            {/* Vertical Central Arrow forming the stem of the 'T' */}
            <line
              x1="50"
              y1="16"
              x2="50"
              y2="82"
              stroke={goldColor}
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Sharp Arrowhead pointing skyward */}
            <path
              d="M50 14 L42 28 L50 24 L58 28 Z"
              fill={goldColor}
            />

            {/* Arrow Fletching / Feathers at the base */}
            <path
              d="M50 68 L40 76 L44 78 L50 72"
              stroke={goldColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M50 68 L60 76 L56 78 L50 72"
              stroke={goldColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="82" r="2" fill={goldColor} />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className={`font-display font-extrabold ${textSizes[size]} ${textColor} leading-none uppercase`}>
              TIRGAR
            </span>
            <span className="text-[9px] text-[#D4AF37] font-semibold -translate-y-1">®</span>
          </div>
        </div>
      </div>

      {showTagline && (
        <p className={`mt-1.5 text-[9px] md:text-[10px] tracking-[0.26em] uppercase font-medium ${taglineColor} text-center`}>
          Rooted in Heritage. Built for Generations.
        </p>
      )}
    </div>
  );
};
