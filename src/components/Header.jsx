import React from 'react';
import { Sparkles, ShieldCheck, QrCode, Download, Cpu } from 'lucide-react';

const Header = () => {
  return (
    <header className="futuristic-app-header glass-panel">
      <div className="header-top-meta">
        <div className="system-pill">
          <Cpu size={13} className="meta-icon-spin" />
          <span>PORTAL v2.5 • AI CREDENTIAL ENGINE</span>
        </div>

        <div className="live-status-pill">
          <span className="live-pulse-dot"></span>
          <span className="live-text">LIVE PREVIEW</span>
        </div>
      </div>

      <div className="header-main-title-wrap">
        <h1 className="futuristic-title">
          🎓 Digital College <span className="cyber-gradient-text">ID</span>
        </h1>
        <p className="futuristic-subtitle">
          Create • Customize • Preview • Download
        </p>
      </div>

      <div className="header-feature-pills">
        <div className="glass-pill">
          <ShieldCheck size={14} className="pill-cyan" />
          <span>Holographic 3D Security</span>
        </div>
        <div className="glass-pill">
          <QrCode size={14} className="pill-purple" />
          <span>Camera-Scannable QR</span>
        </div>
        <div className="glass-pill">
          <Download size={14} className="pill-emerald" />
          <span>Vector HD 3x Print Ready</span>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
