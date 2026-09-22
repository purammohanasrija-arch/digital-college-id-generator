import React, { useState, useRef } from 'react';
import {
  X,
  Palette,
  Shield,
  Circle,
  Hexagon,
  Diamond,
  BookOpen,
  Flame,
  Atom,
  Building,
  GraduationCap,
  Crown,
  UploadCloud,
  Check,
  Sparkles,
  Layers
} from 'lucide-react';
import CollegeLogo from './CollegeLogo';
import { presetLogos } from '../utils/defaultData';

const LogoStudioModal = ({
  isOpen,
  onClose,
  logoConfig,
  onChangeLogoConfig
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(logoConfig.mode || 'preset');
  const [localConfig, setLocalConfig] = useState({ ...logoConfig });
  const uploadInputRef = useRef(null);

  const handleSelectPreset = (preset) => {
    setLocalConfig((prev) => ({
      ...prev,
      mode: 'preset',
      presetId: preset.id,
      preset: preset
    }));
  };

  const handleCreatorChange = (field, value) => {
    setLocalConfig((prev) => ({
      ...prev,
      mode: 'creator',
      creator: {
        ...prev.creator,
        [field]: value
      }
    }));
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, SVG, JPG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLocalConfig((prev) => ({
        ...prev,
        mode: 'upload',
        customUpload: event.target?.result || ''
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    onChangeLogoConfig({
      ...localConfig,
      mode: activeTab
    });
    onClose();
  };

  const shapes = [
    { id: 'shield', label: 'Shield', icon: Shield },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'hexagon', label: 'Hexagon', icon: Hexagon },
    { id: 'diamond', label: 'Diamond', icon: Diamond }
  ];

  const emblems = [
    { id: 'book', label: 'Knowledge Book', icon: BookOpen },
    { id: 'torch', label: 'Excellence Torch', icon: Flame },
    { id: 'atom', label: 'Science & Tech Atom', icon: Atom },
    { id: 'pillars', label: 'Heritage Pillars', icon: Building },
    { id: 'cap', label: 'Graduation Cap', icon: GraduationCap },
    { id: 'crown', label: 'Imperial Crown', icon: Crown }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content logo-studio-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-title">
            <Palette size={20} className="text-amber-400" />
            <h3>College Logo & Emblem Studio</h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="studio-tabs-bar">
          <button
            type="button"
            className={`studio-tab ${activeTab === 'preset' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('preset');
              setLocalConfig((prev) => ({ ...prev, mode: 'preset' }));
            }}
          >
            <Shield size={14} />
            <span>Preset Crests</span>
          </button>

          <button
            type="button"
            className={`studio-tab ${activeTab === 'creator' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('creator');
              setLocalConfig((prev) => ({ ...prev, mode: 'creator' }));
            }}
          >
            <Sparkles size={14} />
            <span>Customize Logo Creator</span>
          </button>

          <button
            type="button"
            className={`studio-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('upload');
              setLocalConfig((prev) => ({ ...prev, mode: 'upload' }));
            }}
          >
            <UploadCloud size={14} />
            <span>Upload Logo Image</span>
          </button>
        </div>

        <div className="modal-body studio-modal-body">
          {/* TAB 1: PRESET LOGOS */}
          {activeTab === 'preset' && (
            <div className="presets-tab-content">
              <p className="studio-section-desc">
                Select from our authentic handcrafted college and university crests:
              </p>

              <div className="presets-grid">
                {presetLogos.map((preset) => {
                  const isSelected =
                    localConfig.presetId === preset.id ||
                    (!localConfig.presetId && preset.id === 'classic');

                  return (
                    <div
                      key={preset.id}
                      className={`preset-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <div className="preset-card-logo">
                        <CollegeLogo
                          config={{ mode: 'preset', preset: preset }}
                          size={64}
                        />
                      </div>
                      <div className="preset-card-info">
                        <h4 className="preset-card-name">{preset.name}</h4>
                        <span className="preset-card-sub">
                          Monogram: <strong>{preset.monogram}</strong> • {preset.estYear}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="preset-selected-badge">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMIZE LOGO CREATOR */}
          {activeTab === 'creator' && (
            <div className="creator-tab-content">
              {/* Live Preview Box */}
              <div className="creator-preview-panel">
                <div className="creator-logo-display">
                  <CollegeLogo
                    config={{
                      mode: 'creator',
                      creator: localConfig.creator
                    }}
                    size={96}
                  />
                </div>
                <div className="creator-preview-text">
                  <span className="creator-badge">Live Vector Preview</span>
                  <p className="creator-hint">
                    Customized vector crest scales seamlessly on your ID card
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="creator-controls-grid">
                {/* 1. Shield Shape */}
                <div className="creator-control-group">
                  <label className="creator-label">Crest Shape</label>
                  <div className="creator-pill-group">
                    {shapes.map((s) => {
                      const Icon = s.icon;
                      const active = localConfig.creator?.shape === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          className={`creator-pill-btn ${active ? 'active' : ''}`}
                          onClick={() => handleCreatorChange('shape', s.id)}
                        >
                          <Icon size={14} />
                          <span>{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Emblem Icon */}
                <div className="creator-control-group">
                  <label className="creator-label">Emblem Symbol</label>
                  <div className="creator-emblems-grid">
                    {emblems.map((e) => {
                      const Icon = e.icon;
                      const active = localConfig.creator?.icon === e.id;
                      return (
                        <button
                          key={e.id}
                          type="button"
                          className={`creator-emblem-btn ${active ? 'active' : ''}`}
                          onClick={() => handleCreatorChange('icon', e.id)}
                          title={e.label}
                        >
                          <Icon size={16} />
                          <span>{e.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Text Inputs: Monogram & Established */}
                <div className="creator-inputs-row">
                  <div className="creator-field">
                    <label className="creator-label">College Monogram / Initials</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={localConfig.creator?.monogram || ''}
                      onChange={(e) => handleCreatorChange('monogram', e.target.value)}
                      placeholder="e.g. AIST or MIT"
                      className="form-control"
                    />
                  </div>

                  <div className="creator-field">
                    <label className="creator-label">Established Year Label</label>
                    <input
                      type="text"
                      maxLength={12}
                      value={localConfig.creator?.estYear || ''}
                      onChange={(e) => handleCreatorChange('estYear', e.target.value)}
                      placeholder="e.g. EST. 1985"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* 4. Colors */}
                <div className="creator-colors-row">
                  <div className="creator-field">
                    <label className="creator-label">Shield Base Color</label>
                    <div className="color-picker-wrap">
                      <input
                        type="color"
                        value={localConfig.creator?.bgColor || '#1e3a8a'}
                        onChange={(e) => handleCreatorChange('bgColor', e.target.value)}
                        className="color-input"
                      />
                      <span className="color-code">
                        {localConfig.creator?.bgColor || '#1e3a8a'}
                      </span>
                    </div>
                  </div>

                  <div className="creator-field">
                    <label className="creator-label">Accent / Gold Tint</label>
                    <div className="color-picker-wrap">
                      <input
                        type="color"
                        value={localConfig.creator?.accentColor || '#f59e0b'}
                        onChange={(e) => handleCreatorChange('accentColor', e.target.value)}
                        className="color-input"
                      />
                      <span className="color-code">
                        {localConfig.creator?.accentColor || '#f59e0b'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD CUSTOM LOGO */}
          {activeTab === 'upload' && (
            <div className="upload-tab-content">
              <p className="studio-section-desc">
                Upload your official college emblem, institution seal, or university PNG/SVG:
              </p>

              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomUpload}
                style={{ display: 'none' }}
              />

              <div
                className="custom-logo-dropzone"
                onClick={() => uploadInputRef.current?.click()}
              >
                {localConfig.customUpload ? (
                  <div className="upload-logo-preview-box">
                    <img
                      src={localConfig.customUpload}
                      alt="Uploaded Logo"
                      className="uploaded-logo-preview"
                    />
                    <div className="uploaded-logo-info">
                      <span className="badge-live">Custom Logo Ready</span>
                      <p className="upload-hint">Click anywhere to replace with a new file</p>
                    </div>
                  </div>
                ) : (
                  <div className="dropzone-empty-state">
                    <div className="upload-icon-circle">
                      <UploadCloud size={28} />
                    </div>
                    <div>
                      <span className="upload-primary-text">Click to choose college logo</span>
                      <p className="upload-secondary-text">Supports PNG with transparent background, SVG, or JPG</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleApply}>
            <Check size={16} />
            <span>Apply Logo to ID Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoStudioModal;
