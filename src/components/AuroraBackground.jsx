import React, { useMemo } from 'react';

const AuroraBackground = () => {
  // Generate random static particle coordinates (1px, 2px, 3px) in white, cyan, purple, blue
  const particles = useMemo(() => {
    const colors = [
      '#ffffff',
      '#38bdf8', // Cyan
      '#c084fc', // Purple
      '#f472b6', // Pink
      '#60a5fa'  // Blue
    ];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3,
      color: colors[i % colors.length],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="aurora-wrapper" aria-hidden="true">
      {/* Layer 1: Deep Navy / Indigo Space Void */}
      <div className="aurora-deep-void"></div>

      {/* Layer 2: Massive Blurred Radial Nebula Blooms */}
      <div className="aurora-nebula nebula-cyan"></div>
      <div className="aurora-nebula nebula-purple"></div>
      <div className="aurora-nebula nebula-pink"></div>
      <div className="aurora-nebula nebula-teal"></div>
      <div className="aurora-nebula nebula-blue"></div>

      {/* Layer 3: Actual Flowing Curved Aurora Ribbons (SVG Waves with Gaussian Blur) */}
      <div className="aurora-ribbons-container">
        <svg
          className="aurora-ribbon-svg ribbon-svg-1"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
            </linearGradient>
            <filter id="auroraBlur1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="55" />
            </filter>
          </defs>
          <path
            d="M-100,280 C240,120 480,480 820,240 C1120,40 1340,320 1550,180 L1550,550 C1300,680 1020,420 720,620 C420,820 160,540 -100,680 Z"
            fill="url(#auroraGrad1)"
            filter="url(#auroraBlur1)"
          />
        </svg>

        <svg
          className="aurora-ribbon-svg ribbon-svg-2"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="auroraGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.65" />
            </linearGradient>
            <filter id="auroraBlur2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="65" />
            </filter>
          </defs>
          <path
            d="M-50,450 C260,320 540,680 900,420 C1200,200 1380,500 1580,360 L1580,720 C1340,840 1080,600 780,780 C480,940 180,720 -50,850 Z"
            fill="url(#auroraGrad2)"
            filter="url(#auroraBlur2)"
          />
        </svg>

        <svg
          className="aurora-ribbon-svg ribbon-svg-3"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="auroraGrad3" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>
            <filter id="auroraBlur3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
          <path
            d="M-80,180 C320,380 620,120 980,340 C1280,520 1420,240 1560,420 L1560,650 C1260,510 1020,740 680,560 C380,400 120,680 -80,520 Z"
            fill="url(#auroraGrad3)"
            filter="url(#auroraBlur3)"
          />
        </svg>
      </div>

      {/* Layer 4: Center Stage Hero Light Bloom (Directly behind the ID card) */}
      <div className="aurora-card-hero-bloom"></div>

      {/* Layer 5: Atmospheric Light Diffusion Overlay */}
      <div className="aurora-light-diffusion"></div>

      {/* Layer 6: Subtle Digital Cyber-Grid Overlay */}
      <div className="aurora-cyber-grid"></div>

      {/* Layer 7: Cosmic Twinkling Particles / Stars */}
      <div className="aurora-starfield">
        {particles.map((p) => (
          <span
            key={p.id}
            className="aurora-star"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(AuroraBackground);
