import React, { useRef } from 'react';
import { School, Sparkles, UploadCloud, RotateCcw, Palette, Hash, MapPin } from 'lucide-react';
import FormInput from './FormInput';
import CollegeLogo from './CollegeLogo';
import { collegeOptions, sampleColleges } from '../utils/defaultData';

const CollegeLogoPanel = ({
  student,
  errors = {},
  onCollegeChange,
  onCustomCollegeChange,
  logoConfig,
  onLogoUpload,
  onLogoRemove,
  onUpdateLogoSetting,
  onOpenLogoStudio
}) => {
  const logoFileInputRef = useRef(null);

  const currentCollegeMeta =
    sampleColleges.find((c) => c.name === (student.collegeChoice || student.college)) || sampleColleges[0];

  return (
    <div className="bento-card bento-college-logo-panel glass-panel">
      {/* College Selection Header */}
      <div className="bento-card-header">
        <div className="bento-header-left">
          <div className="bento-icon-box blue-glow">
            <School size={18} />
          </div>
          <div>
            <h3 className="bento-title">🏫 College & Logo Studio</h3>
            <p className="bento-subtitle">Institution branding & custom vector logos</p>
          </div>
        </div>
      </div>

      <div className="bento-card-body">
        {/* Select College Dropdown */}
        <FormInput
          label="Select College"
          name="collegeChoice"
          type="select"
          options={collegeOptions}
          value={student.collegeChoice || student.college}
          onChange={(e) => onCollegeChange(e.target.value)}
          placeholder="Select College"
          required
          error={errors.college}
          icon={School}
        />

        {/* Custom College Fields */}
        {student.collegeChoice === 'Custom College' && (
          <div className="custom-college-fields-card">
            <div className="custom-college-title-row">
              <Sparkles size={14} className="sparkle-gold" />
              <span className="custom-college-title">Custom University Details</span>
            </div>
            <div className="custom-college-grid">
              <FormInput
                label="College Name"
                name="customCollegeName"
                type="text"
                value={student.customCollege?.name || ''}
                onChange={(e) => onCustomCollegeChange('name', e.target.value)}
                placeholder="e.g. Apex Institute of Science & Technology"
                required
                error={errors.college}
                icon={School}
              />
              <div className="form-grid-2">
                <FormInput
                  label="Short Name (Monogram)"
                  name="customCollegeShortName"
                  type="text"
                  value={student.customCollege?.shortName || ''}
                  onChange={(e) => onCustomCollegeChange('shortName', e.target.value)}
                  placeholder="e.g. AIST"
                  icon={Hash}
                />
                <FormInput
                  label="Location"
                  name="customCollegeLocation"
                  type="text"
                  value={student.customCollege?.location || ''}
                  onChange={(e) => onCustomCollegeChange('location', e.target.value)}
                  placeholder="e.g. Hyderabad, TS"
                  icon={MapPin}
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Logo Display & Controls */}
        <div className="logo-management-header" style={{ marginTop: '1rem' }}>
          <div className="logo-management-left">
            <div
              className={`logo-mini-badge-frame holo-photo-ring crest-shape-${logoConfig?.uploadShape || 'circle'} crest-bg-${logoConfig?.uploadBg || 'white'}`}
            >
              <CollegeLogo
                config={logoConfig}
                size={logoConfig?.mode === 'upload' && logoConfig?.uploadBg === 'transparent' ? 44 : 40}
              />
            </div>
            <div className="logo-status-text-wrap">
              <span className="logo-management-title">Active Logo Crest</span>
              <span className="logo-management-status">
                {logoConfig?.mode === 'upload'
                  ? '🖼️ Uploaded Custom Image'
                  : logoConfig?.mode === 'creator'
                  ? `🎨 Custom: ${logoConfig?.activeLogo?.text || 'Custom'} (${logoConfig?.activeLogo?.shape || 'Crest'})`
                  : `🏛️ Preset: ${currentCollegeMeta?.shortName || 'College'}`}
              </span>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={logoFileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onLogoUpload(file);
                e.target.value = '';
              }
            }}
            style={{ display: 'none' }}
          />

          <div className="logo-action-buttons">
            <button
              type="button"
              className="btn-create-custom-logo"
              onClick={onOpenLogoStudio}
              title="Design a custom vector college crest"
            >
              <Palette size={14} />
              <span>🎨 Create Custom Logo</span>
            </button>

            <button
              type="button"
              className="btn-upload-logo"
              onClick={() => logoFileInputRef.current?.click()}
              title="Upload PNG, JPG, JPEG, or SVG image"
            >
              <UploadCloud size={14} />
              <span>🖼️ Upload Logo</span>
            </button>

            {(logoConfig?.mode === 'upload' || logoConfig?.mode === 'creator') && (
              <button
                type="button"
                className="btn-remove-logo"
                onClick={onLogoRemove}
                title="Restore default college logo"
              >
                <RotateCcw size={13} />
                <span>Reset Logo</span>
              </button>
            )}
          </div>
        </div>

        {/* Uploaded Logo Customizer Controls */}
        {logoConfig?.mode === 'upload' && (
          <div className="uploaded-logo-customizer-box glass-panel" style={{ marginTop: '0.85rem' }}>
            <div className="customizer-box-header">
              <div className="customizer-header-title">
                <Sparkles size={14} className="customizer-sparkle-icon" />
                <span>Uploaded Logo Appearance & Auto-Clip</span>
              </div>
              <span className="customizer-badge">Auto-Clipping</span>
            </div>

            <div className="logo-controls-grid">
              {/* Shape Selector */}
              <div className="logo-control-unit">
                <label className="logo-control-label">Badge Shape</label>
                <div className="logo-chips-row">
                  <button
                    type="button"
                    className={`logo-chip-btn ${(!logoConfig.uploadShape || logoConfig.uploadShape === 'circle') ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadShape', 'circle')}
                  >
                    🔘 Circle
                  </button>
                  <button
                    type="button"
                    className={`logo-chip-btn ${logoConfig.uploadShape === 'rounded' ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadShape', 'rounded')}
                  >
                    🔲 Rounded
                  </button>
                  <button
                    type="button"
                    className={`logo-chip-btn ${logoConfig.uploadShape === 'natural' ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadShape', 'natural')}
                  >
                    🔳 Natural
                  </button>
                </div>
              </div>

              {/* Background Selector */}
              <div className="logo-control-unit">
                <label className="logo-control-label">Background</label>
                <div className="logo-chips-row">
                  <button
                    type="button"
                    className={`logo-chip-btn ${(!logoConfig.uploadBg || logoConfig.uploadBg === 'white') ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadBg', 'white')}
                  >
                    ⚪ White
                  </button>
                  <button
                    type="button"
                    className={`logo-chip-btn ${logoConfig.uploadBg === 'transparent' ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadBg', 'transparent')}
                  >
                    🏁 Transparent
                  </button>
                  <button
                    type="button"
                    className={`logo-chip-btn ${logoConfig.uploadBg === 'glass' ? 'active' : ''}`}
                    onClick={() => onUpdateLogoSetting?.('uploadBg', 'glass')}
                  >
                    🧊 Glass
                  </button>
                </div>
              </div>

              {/* Size Slider */}
              <div className="logo-control-unit logo-slider-unit">
                <div className="logo-slider-header">
                  <label className="logo-control-label">Crest Size</label>
                  <span className="logo-slider-value">{logoConfig.uploadSize || 48}px</span>
                </div>
                <input
                  type="range"
                  min="36"
                  max="62"
                  step="2"
                  value={logoConfig.uploadSize || 48}
                  onChange={(e) => onUpdateLogoSetting?.('uploadSize', parseInt(e.target.value, 10))}
                  className="logo-range-slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CollegeLogoPanel);
