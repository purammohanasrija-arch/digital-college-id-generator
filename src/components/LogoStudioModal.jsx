import React, { useState, useEffect } from 'react';
import {
  X,
  Palette,
  RotateCcw,
  Check,
  Sparkles,
  Sliders,
  Type,
  Shield,
  Circle,
  Square,
  Hexagon,
  Award
} from 'lucide-react';
import CollegeLogo from './CollegeLogo';
import {
  logoShapes,
  logoIcons,
  logoStyles,
  borderOptions
} from '../utils/defaultData';

const LogoStudioModal = ({
  isOpen,
  onClose,
  currentLogo,
  defaultCollegeLogo,
  onApplyLogo,
  onResetLogo
}) => {
  if (!isOpen) return null;

  // Local state for all customizable options
  const [logoState, setLogoState] = useState({
    text: 'VFSTR',
    shape: 'circle',
    icon: 'education',
    style: 'gradient',
    bgColor: '#1e3a8a',
    textColor: '#ffffff',
    borderColor: '#f59e0b',
    border: 'medium',
    size: 54,
    ...(defaultCollegeLogo || {}),
    ...(currentLogo?.activeLogo || currentLogo?.customLogo || currentLogo || {})
  });

  // Sync state when modal opens or inputs change
  useEffect(() => {
    if (isOpen) {
      setLogoState({
        text: 'VFSTR',
        shape: 'circle',
        icon: 'education',
        style: 'gradient',
        bgColor: '#1e3a8a',
        textColor: '#ffffff',
        borderColor: '#f59e0b',
        border: 'medium',
        size: 54,
        ...(defaultCollegeLogo || {}),
        ...(currentLogo?.activeLogo || currentLogo?.customLogo || currentLogo || {})
      });
    }
  }, [isOpen, defaultCollegeLogo]);

  const handleChange = (field, value) => {
    setLogoState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApplyLogo({
      mode: 'creator',
      activeLogo: { ...logoState },
      customLogo: { ...logoState }
    });
    onClose();
  };

  const handleReset = () => {
    if (defaultCollegeLogo) {
      setLogoState({ ...defaultCollegeLogo, size: 54 });
      if (onResetLogo) {
        onResetLogo();
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container custom-logo-creator-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-title-icon-wrap">
              <Palette size={20} className="modal-icon-sparkle" />
            </div>
            <div>
              <h3 className="modal-title">🎨 CUSTOM LOGO CREATOR</h3>
              <p className="modal-subtitle">Design your unique college crest with instant live preview</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-btn-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Two-column layout (Options on left, Live Preview on right) */}
        <div className="custom-logo-grid">
          {/* LEFT: Customization Options */}
          <div className="logo-controls-column">
            {/* 1. Logo Text */}
            <div className="logo-ctrl-group">
              <label className="logo-ctrl-label">
                <span className="logo-ctrl-title">Logo Text</span>
                <span className="logo-ctrl-hint">College Initials / Short Name (e.g. VFSTR, VU, KL, IIT)</span>
              </label>
              <div className="logo-input-wrap">
                <input
                  type="text"
                  maxLength={7}
                  value={logoState.text}
                  onChange={(e) => handleChange('text', e.target.value.toUpperCase())}
                  placeholder="e.g. VFSTR"
                  className="logo-text-input"
                />
              </div>
            </div>

            {/* 2. Logo Shape */}
            <div className="logo-ctrl-group">
              <label className="logo-ctrl-label">
                <span className="logo-ctrl-title">Shape</span>
                <span className="logo-ctrl-hint">Choose badge silhouette</span>
              </label>
              <div className="shape-chips-grid">
                {logoShapes.map((shape) => (
                  <button
                    key={shape.id}
                    type="button"
                    className={`shape-chip-btn ${logoState.shape === shape.id ? 'active' : ''}`}
                    onClick={() => handleChange('shape', shape.id)}
                  >
                    {shape.id === 'circle' && <Circle size={14} />}
                    {shape.id === 'shield' && <Shield size={14} />}
                    {shape.id === 'square' && <Square size={14} />}
                    {shape.id === 'rounded-square' && <Square size={14} style={{ borderRadius: '4px' }} />}
                    {shape.id === 'hexagon' && <Hexagon size={14} />}
                    {shape.id === 'badge' && <Award size={14} />}
                    <span>{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Logo Icon */}
            <div className="logo-ctrl-group">
              <label className="logo-ctrl-label">
                <span className="logo-ctrl-title">Icon</span>
                <span className="logo-ctrl-hint">Select central academic emblem</span>
              </label>
              <div className="icon-selector-grid">
                {logoIcons.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`icon-chip-btn ${logoState.icon === item.id ? 'active' : ''}`}
                    onClick={() => handleChange('icon', item.id)}
                    title={item.label}
                  >
                    <span className="icon-emoji">{item.emoji}</span>
                    <span className="icon-text">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Logo Style */}
            <div className="logo-ctrl-group">
              <label className="logo-ctrl-label">
                <span className="logo-ctrl-title">Style</span>
                <span className="logo-ctrl-hint">Background fill appearance</span>
              </label>
              <div className="style-chips-row">
                {logoStyles.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    className={`style-chip-btn ${logoState.style === st.id ? 'active' : ''}`}
                    onClick={() => handleChange('style', st.id)}
                  >
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5 & 6. Color Pickers (Background Color & Text Color) */}
            <div className="logo-ctrl-row-2">
              <div className="logo-ctrl-group">
                <label className="logo-ctrl-label">
                  <span className="logo-ctrl-title">Background Color</span>
                </label>
                <div className="color-picker-box">
                  <input
                    type="color"
                    value={logoState.bgColor}
                    onChange={(e) => handleChange('bgColor', e.target.value)}
                    className="color-picker-input"
                  />
                  <span className="color-hex-tag">{logoState.bgColor}</span>
                </div>
              </div>

              <div className="logo-ctrl-group">
                <label className="logo-ctrl-label">
                  <span className="logo-ctrl-title">Text Color</span>
                </label>
                <div className="color-picker-box">
                  <input
                    type="color"
                    value={logoState.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="color-picker-input"
                  />
                  <span className="color-hex-tag">{logoState.textColor}</span>
                </div>
              </div>
            </div>

            {/* 7. Border Options */}
            <div className="logo-ctrl-group">
              <label className="logo-ctrl-label">
                <span className="logo-ctrl-title">Border</span>
                <span className="logo-ctrl-hint">Outer frame stroke weight</span>
              </label>
              <div className="border-chips-row">
                {borderOptions.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`border-chip-btn ${logoState.border === b.id ? 'active' : ''}`}
                    onClick={() => handleChange('border', b.id)}
                  >
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 8. Logo Size Slider */}
            <div className="logo-ctrl-group">
              <div className="slider-label-row">
                <span className="logo-ctrl-title">Logo Size</span>
                <span className="slider-val-badge">{logoState.size || 46}px</span>
              </div>
              <input
                type="range"
                min="36"
                max="64"
                step="2"
                value={logoState.size || 46}
                onChange={(e) => handleChange('size', parseInt(e.target.value, 10))}
                className="logo-size-slider"
              />
            </div>
          </div>

          {/* RIGHT: Live Logo Preview */}
          <div className="logo-preview-column">
            <div className="preview-stage-card">
              <div className="preview-badge-status">
                <Sparkles size={13} className="preview-sparkle-icon" />
                <span>LIVE PREVIEW</span>
              </div>

              {/* Central Logo Container */}
              <div className="preview-logo-showcase">
                <div className="preview-pedestal">
                  <CollegeLogo
                    config={{
                      mode: 'creator',
                      activeLogo: { ...logoState, size: 84 }
                    }}
                    size={84}
                    className="stage-logo"
                  />
                </div>
              </div>

              {/* Metadata Readout */}
              <div className="preview-details-card">
                <div className="preview-meta-row">
                  <span className="meta-k">Badge Monogram:</span>
                  <span className="meta-v">{logoState.text || 'COL'}</span>
                </div>
                <div className="preview-meta-row">
                  <span className="meta-k">Shape / Style:</span>
                  <span className="meta-v">
                    {logoState.shape.toUpperCase()} • {logoState.style.toUpperCase()}
                  </span>
                </div>
                <div className="preview-meta-row">
                  <span className="meta-k">Border Weight:</span>
                  <span className="meta-v">{logoState.border.toUpperCase()}</span>
                </div>
                <div className="preview-meta-row">
                  <span className="meta-k">Card Scale:</span>
                  <span className="meta-v">{logoState.size || 46}px</span>
                </div>
              </div>

              <div className="preview-tip-box">
                <span>💡 Updates render live instantly on your ID card when applied!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer custom-logo-footer">
          <button
            type="button"
            className="btn-modal-reset"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          <div className="footer-right-actions">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-modal-apply"
              onClick={handleApply}
            >
              <Check size={16} />
              <span>Apply Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoStudioModal;
