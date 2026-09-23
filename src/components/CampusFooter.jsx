import React from 'react';
import {
  CalendarDays,
  BookOpen,
  Users,
  Heart
} from 'lucide-react';

const CampusFooter = () => {
  return (
    <footer className="campus-footer-dock-wrap">
      {/* Left Brand Badge */}
      <div className="footer-left-brand">
        <div className="vignan-symbol-crest">
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,5 92,26 92,74 50,95 8,74 8,26" stroke="#38bdf8" strokeWidth="6" fill="rgba(56, 189, 248, 0.12)" />
            <polygon points="50,18 80,33 80,67 50,82 20,67 20,33" stroke="#a855f7" strokeWidth="4" fill="rgba(168, 85, 247, 0.15)" />
            <line x1="50" y1="18" x2="50" y2="82" stroke="#38bdf8" strokeWidth="3" />
            <line x1="20" y1="33" x2="80" y2="67" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="20" y1="67" x2="80" y2="33" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="8" fill="#ec4899" />
          </svg>
        </div>
        <div className="vignan-text-group">
          <span className="vignan-brand-name">VIGNAN</span>
          <span className="vignan-brand-motto">For a Better Tomorrow</span>
        </div>
      </div>

      {/* Center Floating Pill Dock */}
      <nav className="footer-center-dock" aria-label="Campus Pillars">
        <div className="dock-pillar-item">
          <div className="dock-icon-box">
            <CalendarDays size={18} className="dock-icon cyan-glow" />
          </div>
          <div className="dock-label-group">
            <span className="dock-pillar-title">Identity</span>
            <span className="dock-pillar-subtitle">Today</span>
          </div>
        </div>

        <div className="dock-pillar-item">
          <div className="dock-icon-box">
            <BookOpen size={18} className="dock-icon purple-glow" />
          </div>
          <div className="dock-label-group">
            <span className="dock-pillar-title">Knowledge</span>
            <span className="dock-pillar-subtitle">Tomorrow</span>
          </div>
        </div>

        <div className="dock-pillar-item">
          <div className="dock-icon-box">
            <Users size={18} className="dock-icon blue-glow" />
          </div>
          <div className="dock-label-group">
            <span className="dock-pillar-title">Opportunities</span>
            <span className="dock-pillar-subtitle">Always</span>
          </div>
        </div>

        <div className="dock-pillar-item">
          <div className="dock-icon-box">
            <Heart size={18} className="dock-icon pink-glow" />
          </div>
          <div className="dock-label-group">
            <span className="dock-pillar-title">A Brighter You</span>
            <span className="dock-pillar-subtitle">Forever</span>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default React.memo(CampusFooter);
