import React, { useMemo } from 'react';

const AuroraBackground = () => {
  // Generate random static particle coordinates so they don't re-render
  const particles = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="aurora-wrapper" aria-hidden="true">
      {/* Deep cosmic base */}
      <div className="aurora-deep-void"></div>

      {/* Floating Aurora Gradient Blobs */}
      <div className="aurora-beam beam-1"></div>
      <div className="aurora-beam beam-2"></div>
      <div className="aurora-beam beam-3"></div>
      <div className="aurora-beam beam-4"></div>

      {/* Subtle Grid / Digital Matrix overlay */}
      <div className="aurora-cyber-grid"></div>

      {/* Animated Twinkling Particles / Stars */}
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
