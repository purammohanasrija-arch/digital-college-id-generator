import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Palette,
  RotateCcw,
  Check,
  Sparkles,
  Upload,
  Shield,
  Circle,
  Square,
  Hexagon,
  Award,
  Image as ImageIcon,
  Sliders
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

  const fileInputRef = useRef(null);

  // Determine active tab based on current config: 'upload' or 'designer'
  const [activeTab, setActiveTab] = useState(() => {
    return currentLogo?.mode === 'upload' ? 'upload' : 'upload';
  });

  // Upload image state
  const [uploadedImage, setUploadedImage] = useState(() => {
    return currentLogo?.customUpload || '/vignan-crest.svg';
  });
  const [uploadShape, setUploadShape] = useState(() => {
    return currentLogo?.uploadShape || 'circle';
  });
  const [uploadBg, setUploadBg] = useState(() => {
    return currentLogo?.uploadBg || 'white';
  });
  const [uploadSize, setUploadSize] = useState(() => {
    return currentLogo?.uploadSize || 46;
  });

  // Designer state
  const [designerState, setDesignerState] = useState(() => ({
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
    ...(currentLogo?.activeLogo || currentLogo?.customLogo || {})
  }));

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (currentLogo?.mode === 'upload') {
        setActiveTab('upload');
        setUploadedImage(currentLogo.customUpload || '/vignan-crest.svg');
        setUploadShape(currentLogo.uploadShape || 'circle');
        setUploadBg(currentLogo.uploadBg || 'white');
        setUploadSize(currentLogo.uploadSize || 46);
      } else if (currentLogo?.mode === 'creator') {
        setActiveTab('designer');
        setDesignerState({
          text: 'VFSTR',
          shape: 'circle',
          icon: 'education',
          style: 'gradient',
          bgColor: '#1e3a8a',
          textColor: '#ffffff',
          borderColor: '#f59e0b',
          border: 'medium',
          size: 54,
          ...(currentLogo.activeLogo || currentLogo.customLogo || {})
        });
      }
    }
  }, [isOpen, currentLogo]);

  // Handle image upload file selection
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please choose a smaller logo image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDesignerChange = (field, value) => {
    setDesignerState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply changes to ID card
  const handleApply = () => {
    if (activeTab === 'upload') {
      onApplyLogo({
        mode: 'upload',
        customUpload: uploadedImage,
        uploadShape,
        uploadBg,
        uploadSize,
        uploadFit: 'contain'
      });
    } else {
      onApplyLogo({
        mode: 'creator',
        activeLogo: { ...designerState },
        customLogo: { ...designerState }
      });
    }
    onClose();
  };

  // Reset to default university logo
  const handleReset = () => {
    if (onResetLogo) {
      onResetLogo();
    }
    setUploadedImage('/vignan-crest.svg');
    setUploadShape('circle');
    setUploadBg('white');
    if (defaultCollegeLogo) {
      setDesignerState({ ...defaultCollegeLogo, size: 54 });
    }
    onClose();
  };

  return (
    <div className="campus-modal-backdrop logo-studio-backdrop" onClick={onClose}>
      <div
        className="campus-modal-card custom-logo-creator-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header-row">
          <div className="modal-title-wrap">
            <Palette size={20} className="modal-icon" />
            <div>
              <h3 className="modal-title">College Logo & Crest Studio</h3>
              <p className="modal-desc" style={{ marginBottom: 0, fontSize: '11px' }}>
                Upload your university's official crest or design a custom emblem
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Studio Mode Tabs */}
        <div className="logo-studio-tabs">
          <button
            type="button"
            className={`studio-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={14} />
            <span>Upload Crest / Logo</span>
          </button>
          <button
            type="button"
            className={`studio-tab-btn ${activeTab === 'designer' ? 'active' : ''}`}
            onClick={() => setActiveTab('designer')}
          >
            <Sliders size={14} />
            <span>Emblem Designer</span>
          </button>
        </div>

        {/* Modal Body: Two-column layout (Options on left, Live Preview on right) */}
        <div className="custom-logo-grid">
          {/* LEFT: Controls based on Active Tab */}
          <div className="logo-controls-column">
            {activeTab === 'upload' ? (
              /* TAB 1: File Upload & Framing Options */
              <div className="tab-upload-controls">
                {/* Upload Action Box */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Upload Image File</span>
                    <span className="logo-ctrl-hint">PNG, SVG, JPG, or WebP (Transparent PNG recommended)</span>
                  </label>
                  <div
                    className="logo-upload-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={22} className="upload-drop-icon" />
                    <span className="upload-drop-text">Click to choose image from your computer</span>
                    <span className="upload-drop-sub">Max file size: 5MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp,image/jpg"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Quick Official Crests</span>
                  </label>
                  <div className="logo-presets-row">
                    <button
                      type="button"
                      className={`preset-chip ${uploadedImage === '/vignan-crest.svg' ? 'active' : ''}`}
                      onClick={() => setUploadedImage('/vignan-crest.svg')}
                    >
                      <img src="/vignan-crest.svg" alt="Vignan Crest" className="preset-chip-img" />
                      <span>Vignan Crest</span>
                    </button>
                    <button
                      type="button"
                      className={`preset-chip ${uploadedImage === '/college-crest.svg' ? 'active' : ''}`}
                      onClick={() => setUploadedImage('/college-crest.svg')}
                    >
                      <img src="/college-crest.svg" alt="Shield Crest" className="preset-chip-img" />
                      <span>Academic Crest</span>
                    </button>
                  </div>
                </div>

                {/* Frame Shape */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Crest Frame Shape</span>
                  </label>
                  <div className="shape-chips-row">
                    {[
                      { id: 'circle', label: 'Circle' },
                      { id: 'rounded', label: 'Rounded' },
                      { id: 'square', label: 'Square' },
                      { id: 'natural', label: 'Natural / Flat' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`shape-chip-btn ${uploadShape === s.id ? 'active' : ''}`}
                        onClick={() => setUploadShape(s.id)}
                      >
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Framing */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Backing Background</span>
                  </label>
                  <div className="shape-chips-row">
                    {[
                      { id: 'white', label: 'White' },
                      { id: 'transparent', label: 'Transparent' },
                      { id: 'glass', label: 'Frosted Glass' }
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        className={`shape-chip-btn ${uploadBg === bg.id ? 'active' : ''}`}
                        onClick={() => setUploadBg(bg.id)}
                      >
                        <span>{bg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Size Slider */}
                <div className="logo-ctrl-group">
                  <div className="slider-label-row">
                    <span className="logo-ctrl-title">Crest Display Size</span>
                    <span className="slider-val-badge">{uploadSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="36"
                    max="64"
                    step="2"
                    value={uploadSize}
                    onChange={(e) => setUploadSize(parseInt(e.target.value, 10))}
                    className="logo-size-slider"
                  />
                </div>
              </div>
            ) : (
              /* TAB 2: Emblem Designer Controls */
              <div className="tab-designer-controls">
                {/* 1. Logo Text */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Monogram Initials</span>
                    <span className="logo-ctrl-hint">e.g. VFSTR, IIT, NIT, VIT</span>
                  </label>
                  <div className="logo-input-wrap">
                    <input
                      type="text"
                      maxLength={7}
                      value={designerState.text}
                      onChange={(e) => handleDesignerChange('text', e.target.value.toUpperCase())}
                      placeholder="e.g. VFSTR"
                      className="logo-text-input"
                    />
                  </div>
                </div>

                {/* 2. Shape Selector */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Emblem Shape</span>
                  </label>
                  <div className="shape-chips-row">
                    {logoShapes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`shape-chip-btn ${designerState.shape === s.id ? 'active' : ''}`}
                        onClick={() => handleDesignerChange('shape', s.id)}
                      >
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Icon Selector */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Heraldic Icon</span>
                  </label>
                  <div className="icon-chips-grid">
                    {logoIcons.map((ic) => (
                      <button
                        key={ic.id}
                        type="button"
                        className={`icon-chip-btn ${designerState.icon === ic.id ? 'active' : ''}`}
                        onClick={() => handleDesignerChange('icon', ic.id)}
                        title={ic.label}
                      >
                        <span className="icon-emoji">{ic.emoji}</span>
                        <span className="icon-label">{ic.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Color Pickers */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Colors</span>
                  </label>
                  <div className="color-pickers-row">
                    <div className="color-input-item">
                      <span className="color-label">Background</span>
                      <input
                        type="color"
                        value={designerState.bgColor}
                        onChange={(e) => handleDesignerChange('bgColor', e.target.value)}
                        className="native-color-picker"
                      />
                    </div>
                    <div className="color-input-item">
                      <span className="color-label">Border Ring</span>
                      <input
                        type="color"
                        value={designerState.borderColor}
                        onChange={(e) => handleDesignerChange('borderColor', e.target.value)}
                        className="native-color-picker"
                      />
                    </div>
                    <div className="color-input-item">
                      <span className="color-label">Text / Icon</span>
                      <input
                        type="color"
                        value={designerState.textColor}
                        onChange={(e) => handleDesignerChange('textColor', e.target.value)}
                        className="native-color-picker"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Border Weight */}
                <div className="logo-ctrl-group">
                  <label className="logo-ctrl-label">
                    <span className="logo-ctrl-title">Border Thickness</span>
                  </label>
                  <div className="border-chips-row">
                    {borderOptions.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`border-chip-btn ${designerState.border === b.id ? 'active' : ''}`}
                        onClick={() => handleDesignerChange('border', b.id)}
                      >
                        <span>{b.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Logo Preview on Pedestal */}
          <div className="logo-preview-column">
            <div className="preview-stage-card">
              <div className="preview-badge-status">
                <Sparkles size={13} className="preview-sparkle-icon" />
                <span>LIVE CARD PREVIEW</span>
              </div>

              {/* Central Logo Container */}
              <div className="preview-logo-showcase">
                <div className="preview-pedestal">
                  {activeTab === 'upload' ? (
                    <CollegeLogo
                      config={{
                        mode: 'upload',
                        customUpload: uploadedImage || '/vignan-crest.svg',
                        uploadShape,
                        uploadBg,
                        uploadFit: 'contain'
                      }}
                      size={86}
                      className="stage-logo"
                    />
                  ) : (
                    <CollegeLogo
                      config={{
                        mode: 'creator',
                        activeLogo: { ...designerState, size: 86 }
                      }}
                      size={86}
                      className="stage-logo"
                    />
                  )}
                </div>
              </div>

              {/* Metadata Readout */}
              <div className="preview-details-card">
                {activeTab === 'upload' ? (
                  <>
                    <div className="preview-meta-row">
                      <span className="meta-k">Mode:</span>
                      <span className="meta-v">Official Upload</span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Mask Shape:</span>
                      <span className="meta-v">{uploadShape.toUpperCase()}</span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Background:</span>
                      <span className="meta-v">{uploadBg.toUpperCase()}</span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Display Scale:</span>
                      <span className="meta-v">{uploadSize}px</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="preview-meta-row">
                      <span className="meta-k">Monogram:</span>
                      <span className="meta-v">{designerState.text || 'COL'}</span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Shape / Style:</span>
                      <span className="meta-v">
                        {designerState.shape.toUpperCase()} • {designerState.style.toUpperCase()}
                      </span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Border:</span>
                      <span className="meta-v">{designerState.border.toUpperCase()}</span>
                    </div>
                    <div className="preview-meta-row">
                      <span className="meta-k">Scale:</span>
                      <span className="meta-v">{designerState.size || 46}px</span>
                    </div>
                  </>
                )}
              </div>

              <div className="preview-tip-box">
                <span>💡 Click "Apply Logo" to update your ID card immediately!</span>
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
            <span>Reset to University Default</span>
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
              className="campus-gradient-btn btn-modal-apply"
              onClick={handleApply}
            >
              <Check size={16} />
              <span>Apply Logo to Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoStudioModal;
