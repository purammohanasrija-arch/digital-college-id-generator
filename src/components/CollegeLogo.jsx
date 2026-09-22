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

  // Extract properties from activeLogo or config
  const logo = config?.activeLogo || config?.customLogo || config || {};
  const text = (logo.text || 'COL').toString().trim().toUpperCase();
  const shape = logo.shape || 'circle';
  const icon = logo.icon || 'education';
  const style = logo.style || 'gradient';
  const bgColor = logo.bgColor || '#1e3a8a';
  const textColor = logo.textColor || '#ffffff';
  const borderColor = logo.borderColor || '#f59e0b';
  const border = logo.border || 'medium';

  // Determine actual render size
  const effectiveSize = size !== 46 ? size : (logo.size || size);

  // Border thickness mapping
  const strokeWidth =
    border === 'none' ? 0 :
    border === 'thin' ? 2 :
    border === 'thick' ? 6 : 3.5;

  // Safe unique ID for SVG gradients
  const gradId = `logoGrad-${shape}-${bgColor.replace(/[^a-zA-Z0-9]/g, '')}-${textColor.replace(/[^a-zA-Z0-9]/g, '')}`;

  // Font size calculation based on text length
  const fontSize =
    text.length <= 2 ? 22 :
    text.length <= 3 ? 18 :
    text.length <= 4 ? 15 :
    text.length <= 5 ? 13 : 11;

  // Calculate fill based on style
  const fillValue =
    style === 'solid'
      ? bgColor
      : style === 'outline'
      ? 'rgba(15, 23, 42, 0.55)'
      : `url(#${gradId})`;

  const strokeColor = style === 'outline' ? textColor : borderColor;

  // Render shapes
  const renderShape = () => {
    switch (shape) {
      case 'shield':
        return (
          <path
            d="M 40 26 Q 80 16 120 26 C 120 75 106 116 80 144 C 54 116 40 75 40 26 Z"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      case 'square':
        return (
          <rect
            x="16"
            y="16"
            width="128"
            height="128"
            rx="4"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      case 'rounded-square':
        return (
          <rect
            x="16"
            y="16"
            width="128"
            height="128"
            rx="28"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      case 'hexagon':
        return (
          <polygon
            points="80,12 144,48 144,112 80,148 16,112 16,48"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      case 'badge':
        return (
          <polygon
            points="80,12 95,24 114,20 122,38 141,46 140,66 152,80 140,94 141,114 122,122 114,140 95,136 80,148 65,136 46,140 38,122 19,114 20,94 8,80 20,66 19,46 38,38 46,20 65,24"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
      case 'circle':
      default:
        return (
          <circle
            cx="80"
            cy="80"
            r="68"
            fill={fillValue}
            stroke={strokeWidth > 0 ? strokeColor : 'none'}
            strokeWidth={strokeWidth}
          />
        );
    }
  };

  // Render Icon (all 8 options)
  const renderIcon = () => {
    const iconColor = style === 'outline' ? textColor : (borderColor || '#facc15');

    switch (icon) {
      case 'college':
        return (
          /* 🏫 College Building */
          <g fill={iconColor} transform="translate(80, 56) scale(0.9)">
            <polygon points="0,-18 20,-6 -20,-6" />
            <rect x="-18" y="-4" width="36" height="18" rx="1" />
            <rect x="-14" y="2" width="6" height="12" fill={bgColor} rx="1" />
            <rect x="-3" y="2" width="6" height="12" fill={bgColor} rx="1" />
            <rect x="8" y="2" width="6" height="12" fill={bgColor} rx="1" />
          </g>
        );
      case 'books':
        return (
          /* 📚 Books */
          <g fill={iconColor} stroke={bgColor} strokeWidth="1.2" transform="translate(80, 56) scale(0.95)">
            <path d="M -18,-8 Q 0,-14 0,0 Q 0,-14 18,-8 L 18,8 Q 0,2 0,16 Q 0,2 -18,8 Z" />
            <line x1="0" y1="0" x2="0" y2="16" stroke={bgColor} strokeWidth="1.5" />
          </g>
        );
      case 'science':
        return (
          /* 🔬 Science Atom / Flask */
          <g stroke={iconColor} fill="none" strokeWidth="2.2" transform="translate(80, 56) scale(0.85)">
            <ellipse cx="0" cy="0" rx="20" ry="7" transform="rotate(30)" />
            <ellipse cx="0" cy="0" rx="20" ry="7" transform="rotate(90)" />
            <ellipse cx="0" cy="0" rx="20" ry="7" transform="rotate(150)" />
            <circle cx="0" cy="0" r="3.5" fill={iconColor} stroke="none" />
          </g>
        );
      case 'technology':
        return (
          /* 💻 Technology Chip / Screen */
          <g fill={iconColor} transform="translate(80, 56) scale(0.9)">
            <rect x="-16" y="-12" width="32" height="22" rx="2" stroke={iconColor} strokeWidth="1" fill="none" />
            <circle cx="0" cy="-1" r="5" fill={iconColor} />
            <rect x="-12" y="-9" width="24" height="16" fill={iconColor} opacity="0.25" rx="1" />
            <polygon points="-6,10 6,10 10,15 -10,15" />
          </g>
        );
      case 'star':
        return (
          /* ⭐ Academic Star */
          <g fill={iconColor} transform="translate(80, 56) scale(0.9)">
            <polygon points="0,-16 4.7,-4.8 16,-4.8 7.3,3.2 10.6,14.4 0,7.2 -10.6,14.4 -7.3,3.2 -16,-4.8 -4.7,-4.8" />
          </g>
        );
      case 'university':
        return (
          /* 🏛️ University Classical Portico */
          <g fill={iconColor} transform="translate(80, 56) scale(0.9)">
            <polygon points="-20,-10 0,-20 20,-10" />
            <rect x="-20" y="-8" width="40" height="3" rx="0.5" />
            <rect x="-17" y="-4" width="5" height="17" rx="0.5" />
            <rect x="-2.5" y="-4" width="5" height="17" rx="0.5" />
            <rect x="12" y="-4" width="5" height="17" rx="0.5" />
            <rect x="-22" y="13" width="44" height="3" rx="0.5" />
          </g>
        );
      case 'global':
        return (
          /* 🌐 Global */
          <g stroke={iconColor} fill="none" strokeWidth="2" transform="translate(80, 56) scale(0.85)">
            <circle cx="0" cy="0" r="16" />
            <ellipse cx="0" cy="0" rx="8" ry="16" />
            <line x1="-16" y1="0" x2="16" y2="0" />
            <line x1="-13" y1="-8" x2="13" y2="-8" />
            <line x1="-13" y1="8" x2="13" y2="8" />
          </g>
        );
      case 'education':
      default:
        return (
          /* 🎓 Education Mortarboard Cap */
          <g fill={iconColor} transform="translate(80, 56) scale(0.95)">
            <polygon points="0,-16 22,-5 0,6 -22,-5" />
            <path d="M -12,1 L -12,9 Q 0,16 12,9 L 12,1 Q 0,8 -12,1 Z" />
            <line x1="18" y1="-3" x2="20" y2="10" stroke={iconColor} strokeWidth="1.5" />
            <circle cx="20" cy="11" r="2.5" />
          </g>
        );
    }
  };

  return (
    <div
      className={`college-logo-container ${className}`}
      style={{ width: effectiveSize, height: effectiveSize }}
    >
      <svg
        viewBox="0 0 160 160"
        width="100%"
        height="100%"
        className="college-logo-svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bgColor} />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Laurel / Dotted Accent Ring */}
        {shape === 'circle' && (
          <circle
            cx="80"
            cy="80"
            r="73"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.65"
          />
        )}

        {/* Main Badge Shape */}
        <g filter="url(#logoGlow)">
          {renderShape()}
        </g>

        {/* Render Emblem Icon */}
        {renderIcon()}

        {/* Bold College Text / Initials */}
        <text
          x="80"
          y="108"
          textAnchor="middle"
          fill={textColor}
          fontSize={fontSize}
          fontWeight="800"
          letterSpacing="1.5"
          fontFamily="'Cinzel', 'Outfit', 'Plus Jakarta Sans', sans-serif"
          filter="url(#logoGlow)"
        >
          {text}
        </text>

        {/* Sub-banner laurels or decorative underline */}
        <line
          x1="62"
          y1="116"
          x2="98"
          y2="116"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
};

export default CollegeLogo;
