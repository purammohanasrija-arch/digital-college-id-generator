import React, { useState } from 'react';
import { Palette, Sparkles, Check, Sliders } from 'lucide-react';
import { cardThemes } from '../utils/defaultData';

const ThemeStudioPanel = ({
  selectedTheme,
  onThemeChange,
  onCustomColorChange
}) => {
  const [showCustomSliders, setShowCustomSliders] = useState(false);

  return (
    <div className="bento-card bento-theme-studio-panel glass-panel">
      <div className="bento-card-header">
        <div className="bento-header-left">
          <div className="bento-icon-box emerald-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="bento-title">🌈 Theme Studio</h3>
            <p className="bento-subtitle">Presets & custom color grading</p>
          </div>
        </div>

        <button
          type="button"
          className={`btn-toggle-sliders ${showCustomSliders ? 'active' : ''}`}
          onClick={() => setShowCustomSliders(!showCustomSliders)}
          title="Toggle custom color palette adjusters"
        >
          <Sliders size={14} />
          <span>Tune</span>
        </button>
      </div>

      <div className="bento-card-body">
        {/* Preset Theme Chips */}
        <div className="theme-selector-chips">
          {cardThemes.map((theme) => {
            const isActive = selectedTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                className={`theme-chip-btn ${isActive ? 'active' : ''}`}
                onClick={() => onThemeChange(theme)}
              >
                <span
                  className="theme-color-bullet"
                  style={{ background: theme.primary }}
                />
                <span className="theme-chip-name">{theme.name}</span>
                {isActive && <Check size={14} className="theme-check" />}
              </button>
            );
          })}
        </div>

        {/* Custom Color Tuning Sliders if toggled */}
        {showCustomSliders && (
          <div className="custom-theme-sliders-box glass-panel" style={{ marginTop: '0.85rem' }}>
            <div className="theme-color-input-row">
              <label className="color-label">Primary Color</label>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={selectedTheme.primary || '#0f172a'}
                  onChange={(e) => onCustomColorChange('primary', e.target.value)}
                  className="theme-native-color-picker"
                />
                <span className="color-hex-val">{selectedTheme.primary}</span>
              </div>
            </div>

            <div className="theme-color-input-row">
              <label className="color-label">Accent Highlight</label>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={selectedTheme.accent || '#38bdf8'}
                  onChange={(e) => onCustomColorChange('accent', e.target.value)}
                  className="theme-native-color-picker"
                />
                <span className="color-hex-val">{selectedTheme.accent}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ThemeStudioPanel);
