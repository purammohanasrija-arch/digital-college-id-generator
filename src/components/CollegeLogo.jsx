import React from 'react';

const CollegeLogo = ({ config, size = 46, className = '' }) => {
  // If uploaded custom image file
  if (config?.mode === 'upload' && config?.customUpload) {
    return (
      <div
        className={`college-logo-container uploaded-logo-frame ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={config.customUpload}
          alt="Custom College Logo"
          className="college-logo-img"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  // Get active design properties
  const isCreator = config?.mode === 'creator';
  const c = isCreator
    ? config?.creator || {}
    : {
        icon: config?.preset?.icon || 'book',
        shape: config?.preset?.shape || 'shield',
        bgColor: config?.preset?.primaryColor || '#1e3a8a',
        accentColor: config?.preset?.accentColor || '#f59e0b',
        monogram: config?.preset?.monogram || 'AIST',
        estYear: config?.preset?.estYear || '1985'
      };

  const shape = c.shape || 'shield';
  const icon = c.icon || 'book';
  const bgColor = c.bgColor || '#1e3a8a';
  const accentColor = c.accentColor || '#f59e0b';
  const monogram = (c.monogram || 'COL').substring(0, 5).toUpperCase();
  const estYear = c.estYear || 'EST. 1985';

  return (
    <div
      className={`college-logo-container ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width="100%"
        height="100%"
        className="college-logo-svg"
      >
        <defs>
          <linearGradient id={`bgGrad-${monogram}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bgColor} />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id={`goldGrad-${monogram}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Laurel / Dotted Border */}
        <circle
          cx="80"
          cy="80"
          r="74"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="4 3"
          opacity="0.8"
        />

        {/* Dynamic Crest Shape */}
        {shape === 'circle' ? (
          <circle
            cx="80"
            cy="80"
            r="68"
            fill={`url(#bgGrad-${monogram})`}
            stroke={`url(#goldGrad-${monogram})`}
            strokeWidth="3"
            filter="url(#logoGlow)"
          />
        ) : shape === 'hexagon' ? (
          <polygon
            points="80,14 140,47 140,113 80,146 20,113 20,47"
            fill={`url(#bgGrad-${monogram})`}
            stroke={`url(#goldGrad-${monogram})`}
            strokeWidth="3"
            filter="url(#logoGlow)"
          />
        ) : shape === 'diamond' ? (
          <polygon
            points="80,12 148,80 80,148 12,80"
            fill={`url(#bgGrad-${monogram})`}
            stroke={`url(#goldGrad-${monogram})`}
            strokeWidth="3"
            filter="url(#logoGlow)"
          />
        ) : (
          /* Default: Classic Medieval Shield */
          <path
            d="M 40 30 Q 80 22 120 30 C 120 75 105 110 80 135 C 55 110 40 75 40 30 Z"
            fill={`url(#bgGrad-${monogram})`}
            stroke={`url(#goldGrad-${monogram})`}
            strokeWidth="3"
            filter="url(#logoGlow)"
          />
        )}

        {/* Dynamic Icon */}
        <g transform="translate(80, 64) scale(0.9)" textAnchor="middle">
          {icon === 'atom' ? (
            /* Science & Tech Atom */
            <g stroke={`url(#goldGrad-${monogram})`} fill="none" strokeWidth="2.5">
              <ellipse cx="0" cy="0" rx="22" ry="8" transform="rotate(30)" />
              <ellipse cx="0" cy="0" rx="22" ry="8" transform="rotate(90)" />
              <ellipse cx="0" cy="0" rx="22" ry="8" transform="rotate(150)" />
              <circle cx="0" cy="0" r="4" fill={accentColor} stroke="none" />
            </g>
          ) : icon === 'torch' ? (
            /* Flame of Excellence */
            <g>
              <path
                d="M -3 6 L 3 6 L 2 16 L -2 16 Z"
                fill={`url(#goldGrad-${monogram})`}
              />
              <path
                d="M -6 -12 Q 0 -22 6 -12 Q 10 -4 0 5 Q -10 -4 -6 -12 Z"
                fill="#ef4444"
              />
              <path
                d="M -3 -8 Q 0 -16 3 -8 Q 6 -2 0 4 Q -6 -2 -3 -8 Z"
                fill="#f59e0b"
              />
            </g>
          ) : icon === 'pillars' ? (
            /* Classical Pillars */
            <g fill={`url(#goldGrad-${monogram})`}>
              <rect x="-20" y="-16" width="40" height="3" rx="1" />
              <rect x="-18" y="-12" width="36" height="2" />
              <rect x="-16" y="-9" width="6" height="22" rx="1" />
              <rect x="-3" y="-9" width="6" height="22" rx="1" />
              <rect x="10" y="-9" width="6" height="22" rx="1" />
              <rect x="-20" y="13" width="40" height="4" rx="1" />
            </g>
          ) : icon === 'cap' ? (
            /* Graduation Mortarboard */
            <g fill={`url(#goldGrad-${monogram})`}>
              <polygon points="0,-16 22,-6 0,4 -22,-6" />
              <path d="M -12,0 L -12,8 Q 0,15 12,8 L 12,0 Q 0,7 -12,0 Z" />
              <line x1="18" y1="-4" x2="20" y2="8" stroke={accentColor} strokeWidth="1.5" />
              <circle cx="20" cy="9" r="2.5" fill={accentColor} />
            </g>
          ) : icon === 'crown' ? (
            /* Royal Crown */
            <g fill={`url(#goldGrad-${monogram})`}>
              <polygon points="-18,8 -14,-10 -6,0 0,-14 6,0 14,-10 18,8" />
              <rect x="-18" y="9" width="36" height="4" rx="1" />
              <circle cx="-14" cy="-12" r="2" fill={accentColor} />
              <circle cx="0" cy="-16" r="2.5" fill={accentColor} />
              <circle cx="14" cy="-12" r="2" fill={accentColor} />
            </g>
          ) : (
            /* Default: Open Book of Knowledge */
            <g fill="#f8fafc" stroke="#64748b" strokeWidth="1">
              <path d="M -18,-6 Q 0,-14 0,2 Q 0,-14 18,-6 L 18,12 Q 0,4 0,18 Q 0,4 -18,12 Z" />
              <line x1="0" y1="2" x2="0" y2="18" stroke="#334155" strokeWidth="1.5" />
              <line x1="-14" y1="-1" x2="-4" y2="-3" stroke="#94a3b8" strokeWidth="1" />
              <line x1="-14" y1="4" x2="-4" y2="2" stroke="#94a3b8" strokeWidth="1" />
              <line x1="4" y1="-3" x2="14" y2="-1" stroke="#94a3b8" strokeWidth="1" />
              <line x1="4" y1="2" x2="14" y2="4" stroke="#94a3b8" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* Monogram Text in Academic Serif */}
        <text
          x="80"
          y="108"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="14"
          fontWeight="800"
          letterSpacing="2"
          fontFamily="Cinzel, serif"
          filter="url(#logoGlow)"
        >
          {monogram}
        </text>

        {/* Established Year Ribbon / Text */}
        <text
          x="80"
          y="124"
          textAnchor="middle"
          fill={accentColor}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="1.2"
          fontFamily="monospace"
        >
          {estYear}
        </text>
      </svg>
    </div>
  );
};

export default CollegeLogo;
