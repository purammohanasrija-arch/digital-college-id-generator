import React from 'react';
import { GraduationCap, Sparkles, QrCode, Download, ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-badge">
        <Sparkles size={16} className="badge-sparkle" />
        <span>Official Academic Credential Studio</span>
      </div>

      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <GraduationCap className="brand-icon" size={38} />
          <div className="icon-glow"></div>
        </div>
        <div className="brand-text">
          <h1 className="header-title">
            Digital College <span className="title-gradient">ID Generator</span>
          </h1>
          <p className="header-subtitle">
            Create your professional digital college ID instantly
          </p>
        </div>
      </div>

      <div className="header-features">
        <div className="feature-pill">
          <ShieldCheck size={15} />
          <span>Real-time Live Sync</span>
        </div>
        <div className="feature-pill">
          <QrCode size={15} />
          <span>Dynamic QR Code</span>
        </div>
        <div className="feature-pill">
          <Download size={15} />
          <span>HD Export (PNG & PDF)</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
