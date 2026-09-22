import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, QrCode, Download, Cpu, LayoutGrid, Check, ChevronDown } from 'lucide-react';

const layoutOptions = [
  {
    id: 'bento',
    name: 'Bento Command Center',
    icon: '🧩',
    tag: 'Default',
    desc: '3-Column visual command center with central 3D ID hero'
  },
  {
    id: 'id-first',
    name: 'ID First',
    icon: '🪪',
    desc: 'Centerpiece live card at top with modular control dock below'
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    icon: '🎨',
    desc: 'College crest and theme customization prioritized beside card'
  },
  {
    id: 'sidebar',
    name: 'Glass Sidebar',
    icon: '🧊',
    desc: 'Fixed left glass drawer with wide open live canvas'
  },
  {
    id: 'floating',
    name: 'Floating Cards',
    icon: '🪟',
    desc: 'Organic floating glass cards with elevated spatial depth'
  }
];

const Header = ({
  activeLayout = 'bento',
  onSelectLayout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const activeLayoutMeta = layoutOptions.find((l) => l.id === activeLayout) || layoutOptions[0];

  return (
    <header className="futuristic-app-header glass-panel">
      <div className="header-top-meta">
        <div className="system-pill">
          <Cpu size={13} className="meta-icon-spin" />
          <span>PORTAL v2.5 • AI CREDENTIAL ENGINE</span>
        </div>

        <div className="header-top-actions">
          {/* Layout Switcher Dropdown */}
          <div className="layout-switcher-container" ref={dropdownRef}>
            <button
              type="button"
              className={`layout-switcher-btn ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Switch Dashboard Layout View"
            >
              <LayoutGrid size={15} className="layout-icon" />
              <span className="layout-btn-label">▦ Layout:</span>
              <span className="layout-active-name">{activeLayoutMeta.icon} {activeLayoutMeta.name}</span>
              <ChevronDown size={13} className={`layout-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="layout-dropdown-menu glass-panel">
                <div className="layout-dropdown-header">
                  <span>Dashboard Layout Views</span>
                </div>
                <div className="layout-options-list">
                  {layoutOptions.map((opt) => {
                    const isSelected = activeLayout === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`layout-option-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          onSelectLayout?.(opt.id);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <span className="layout-opt-icon">{opt.icon}</span>
                        <div className="layout-opt-text">
                          <div className="layout-opt-title-row">
                            <span className="layout-opt-title">{opt.name}</span>
                            {opt.tag && <span className="layout-opt-tag">{opt.tag}</span>}
                          </div>
                          <span className="layout-opt-desc">{opt.desc}</span>
                        </div>
                        {isSelected && <Check size={14} className="layout-opt-check" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Live Status Pill */}
          <div className="live-status-pill">
            <span className="live-pulse-dot"></span>
            <span className="live-text">LIVE PREVIEW</span>
          </div>
        </div>
      </div>

      <div className="header-main-title-wrap">
        <h1 className="futuristic-title">
          🎓 DIGITAL COLLEGE <span className="cyber-gradient-text">ID</span>
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
