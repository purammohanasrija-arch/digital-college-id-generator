import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  MoonStar,
  Sun,
  Sparkles,
  User,
  ExternalLink,
  ShieldCheck,
  Award,
  X
} from 'lucide-react';

const CampusNavbar = ({
  activeTab = 'generate',
  onTabChange,
  isDarkMode = true,
  onToggleDarkMode,
  studentName = 'Mohana P',
  studentId = '24CS1234',
  collegeName = "Vignan's Foundation for Science, Technology and Research"
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileContainerRef = useRef(null);

  // Close profile dropdown on click outside or on Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showProfileMenu]);

  return (
    <header className="campus-header">
      {/* Brand Left - clicking navigates to home landing page */}
      <div
        className="campus-brand"
        onClick={() => onTabChange?.('home')}
        role="button"
        tabIndex={0}
        title="Return to CampusID Home"
      >
        <div className="campus-logo-icon">
          <GraduationCap size={26} className="cap-icon" />
        </div>
        <div className="campus-brand-text">
          <h1 className="campus-title">CampusID</h1>
          <p className="campus-subtitle">Your Identity, Your Story</p>
        </div>
      </div>

      {/* Navigation Links Center */}
      <nav className="campus-nav-center" aria-label="Main Navigation">
        <button
          type="button"
          className={`campus-nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange?.('home')}
        >
          Home
        </button>
        <button
          type="button"
          className={`campus-nav-pill ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => onTabChange?.('generate')}
        >
          Generate
        </button>
        <button
          type="button"
          className={`campus-nav-link ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => onTabChange?.('templates')}
        >
          Templates
        </button>
        <button
          type="button"
          className={`campus-nav-link ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => onTabChange?.('about')}
        >
          About
        </button>
      </nav>

      {/* Controls Right */}
      <div className="campus-header-right">
        {/* Day / Night Theme Toggle */}
        <button
          type="button"
          className="campus-circle-btn theme-toggle-btn"
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <MoonStar size={17} /> : <Sun size={17} />}
        </button>

        {/* Motivational Pill Badge */}
        <div className="campus-motto-pill">
          <Sun size={13} className="sun-spark-icon" />
          <span>Bright Minds, Brighter Futures</span>
          <Sparkles size={12} className="sparkle-gold" />
        </div>

        {/* Profile Circle Icon with Dropdown */}
        <div className="profile-btn-container" ref={profileContainerRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className={`campus-circle-btn profile-btn ${showProfileMenu ? 'active' : ''}`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Student Profile Account"
            aria-label="Student Account"
          >
            <User size={17} />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown-menu glass-card">
              <button
                type="button"
                className="profile-close-btn"
                onClick={() => setShowProfileMenu(false)}
                title="Close Profile Menu"
                aria-label="Close Profile Menu"
              >
                <X size={15} />
              </button>

              <div className="profile-dropdown-header">
                <div className="profile-avatar-circle">
                  <User size={18} />
                </div>
                <div className="profile-info-wrap">
                  <span className="profile-name">{studentName}</span>
                  <span className="profile-id">{studentId}</span>
                </div>
              </div>
              <div className="profile-college-line">
                <ShieldCheck size={13} className="verified-shield-icon" />
                <span>{collegeName}</span>
              </div>
              <div className="profile-dropdown-badge">
                <Award size={13} />
                <span>Official Student Credential</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(CampusNavbar);
