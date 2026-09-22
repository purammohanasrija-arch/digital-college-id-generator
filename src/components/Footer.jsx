import React from 'react';
import { Heart, Code2, ShieldCheck, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-primary">
          <p className="footer-title">
            <strong>Digital College ID Generator</strong>
          </p>
          <p className="footer-built">
            Built with React
          </p>
        </div>

        <div className="footer-meta">
          <span className="footer-badge">
            <ShieldCheck size={14} /> Client-Side Secure • No Data Stored
          </span>
          <span className="footer-badge">
            <Sparkles size={14} /> Instant High-DPI Canvas Rendering
          </span>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Digital College ID Generator • Professional Student Identity Card Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
