import React, { useRef, useState } from 'react';
import {
  User,
  Hash,
  Calendar,
  HeartPulse,
  Phone,
  Mail,
  UploadCloud,
  X,
  School,
  Building2,
  BookOpen,
  GraduationCap,
  Layers,
  MapPin,
  PhoneCall,
  Sparkles,
  RotateCcw,
  Download,
  FileDown,
  Palette,
  CheckCircle2,
  AlertTriangle,
  Edit3,
  List,
  UserCheck,
  Save,
  Check,
  FolderOpen
} from 'lucide-react';
import FormInput from './FormInput';
import CollegeLogo from './CollegeLogo';
import LogoStudioModal from './LogoStudioModal';
import {
  bloodGroups,
  genders,
  yearOptions,
  cardThemes,
  sectionOptions,
  departmentOptions,
  courseOptions,
  academicSessionOptions,
  collegeOptions,
  sampleColleges
} from '../utils/defaultData';

const StudentForm = ({
  student,
  errors,
  onChange,
  onCollegeChange,
  onCustomCollegeChange,
  onPhotoUpload,
  onPhotoRemove,
  onReset,
  onGenerate,
  onDownloadPNG,
  onDownloadPDF,
  onLoadSample,
  onSaveDraft,
  onLoadDraft,
  hasSavedDraft,
  selectedTheme,
  onThemeChange,
  logoConfig,
  onLogoUpload,
  onLogoRemove,
  onUpdateLogoSetting,
  onApplyCustomLogo,
  isDownloading,
  isGenerated
}) => {
  const photoFileInputRef = useRef(null);
  const logoFileInputRef = useRef(null);
  const [isLogoStudioOpen, setIsLogoStudioOpen] = useState(false);

  const currentCollegeMeta =
    sampleColleges.find((c) => c.name === (student.collegeChoice || student.college)) || sampleColleges[0];

  const [customMode, setCustomMode] = useState({
    department: false,
    course: false,
    section: false,
    academicYear: false
  });

  const toggleCustomMode = (field) => {
    setCustomMode((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="bento-dashboard-form">
      {/* Validation Alert Banner */}
      {errorCount > 0 && (
        <div className="form-alert-banner error-banner glass-panel">
          <AlertTriangle size={18} className="alert-icon" />
          <div className="alert-text">
            <strong>{errorCount} Required Field{errorCount > 1 ? 's' : ''} Missing:</strong>
            <span> Please complete highlighted inputs to generate your credential.</span>
          </div>
        </div>
      )}

      {/* Generation Success Banner */}
      {isGenerated && errorCount === 0 && (
        <div className="form-alert-banner success-banner glass-panel">
          <CheckCircle2 size={18} className="alert-icon" />
          <div className="alert-text">
            <strong>Credential Verified & Generated!</strong>
            <span> Live preview updated with official verification hash and optical barcodes.</span>
          </div>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} noValidate className="bento-form-grid">
        {/* ========================================================
            BENTO CARD 1: 👤 STUDENT DETAILS (Personal & Academic)
            ======================================================== */}
        <div className="bento-card bento-student-details glass-panel">
          <div className="bento-card-header">
            <div className="bento-header-left">
              <div className="bento-icon-box cyan-glow">
                <User size={18} />
              </div>
              <div>
                <h3 className="bento-title">👤 Student Information</h3>
                <p className="bento-subtitle">Personal and program enrolment credentials</p>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
            {/* Row 1: Full Name & Father's Name */}
            <div className="form-grid-2">
              <FormInput
                label="Full Student Name"
                name="name"
                value={student.name}
                onChange={onChange}
                placeholder="e.g. Alexander J. Morgan"
                required
                error={errors.name}
                icon={User}
              />

              <FormInput
                label="Father's / Guardian's Name"
                name="fatherName"
                value={student.fatherName}
                onChange={onChange}
                placeholder="e.g. Robert H. Morgan"
                icon={UserCheck}
              />
            </div>

            {/* Row 2: Student ID & Date of Birth */}
            <div className="form-grid-2">
              <FormInput
                label="Student Registration / Roll No."
                name="studentId"
                value={student.studentId}
                onChange={onChange}
                placeholder="e.g. STU-2024-8842"
                required
                error={errors.studentId}
                icon={Hash}
              />

              <FormInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={student.dob}
                onChange={onChange}
                icon={Calendar}
              />
            </div>

            {/* Row 3: Gender & Blood Group */}
            <div className="form-grid-2">
              <FormInput
                label="Gender"
                name="gender"
                type="select"
                options={genders}
                value={student.gender}
                onChange={onChange}
                icon={User}
              />

              <FormInput
                label="Blood Group"
                name="bloodGroup"
                type="select"
                options={bloodGroups}
                value={student.bloodGroup}
                onChange={onChange}
                icon={HeartPulse}
              />
            </div>

            {/* Row 4: Phone & Email */}
            <div className="form-grid-2">
              <FormInput
                label="Contact Phone"
                name="phone"
                type="tel"
                value={student.phone}
                onChange={onChange}
                placeholder="e.g. +91 98765 43210"
                icon={Phone}
              />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={student.email}
                onChange={onChange}
                placeholder="e.g. student@college.edu"
                icon={Mail}
              />
            </div>

            {/* Row 5: Department & Course (Dual-mode) */}
            <div className="form-grid-2">
              <div className="field-with-switch">
                <div className="field-top-meta">
                  <button
                    type="button"
                    className="btn-text-switch"
                    onClick={() => toggleCustomMode('department')}
                  >
                    {customMode.department ? <List size={12} /> : <Edit3 size={12} />}
                    <span>{customMode.department ? 'Choose from list' : 'Type custom'}</span>
                  </button>
                </div>
                <FormInput
                  label="Department"
                  name="department"
                  type={customMode.department ? 'text' : 'select'}
                  options={departmentOptions}
                  value={student.department}
                  onChange={onChange}
                  placeholder={customMode.department ? "e.g. Computer Science & Engineering" : "Select Department"}
                  required
                  error={errors.department}
                  icon={Building2}
                />
              </div>

              <div className="field-with-switch">
                <div className="field-top-meta">
                  <button
                    type="button"
                    className="btn-text-switch"
                    onClick={() => toggleCustomMode('course')}
                  >
                    {customMode.course ? <List size={12} /> : <Edit3 size={12} />}
                    <span>{customMode.course ? 'Choose from list' : 'Type custom'}</span>
                  </button>
                </div>
                <FormInput
                  label="Course / Program"
                  name="course"
                  type={customMode.course ? 'text' : 'select'}
                  options={courseOptions}
                  value={student.course}
                  onChange={onChange}
                  placeholder={customMode.course ? "e.g. B.Tech Computer Science" : "Select Course"}
                  required
                  error={errors.course}
                  icon={BookOpen}
                />
              </div>
            </div>

            {/* Row 6: Year, Section (1-22), and Academic Session */}
            <div className="form-grid-3">
              <FormInput
                label="Year of Study"
                name="year"
                type="select"
                value={student.year}
                onChange={onChange}
                options={yearOptions}
                placeholder="Select Year"
                required
                error={errors.year}
                icon={GraduationCap}
              />

              <div className="field-with-switch">
                <div className="field-top-meta">
                  <button
                    type="button"
                    className="btn-text-switch"
                    onClick={() => toggleCustomMode('section')}
                  >
                    {customMode.section ? <List size={12} /> : <Edit3 size={12} />}
                    <span>{customMode.section ? '1–22 list' : 'Custom'}</span>
                  </button>
                </div>
                <FormInput
                  label="Section"
                  name="section"
                  type={customMode.section ? 'text' : 'select'}
                  options={sectionOptions}
                  value={student.section}
                  onChange={onChange}
                  placeholder={customMode.section ? "e.g. Sec-A" : "Select Section"}
                  icon={Layers}
                />
              </div>

              <div className="field-with-switch">
                <div className="field-top-meta">
                  <button
                    type="button"
                    className="btn-text-switch"
                    onClick={() => toggleCustomMode('academicYear')}
                  >
                    {customMode.academicYear ? <List size={12} /> : <Edit3 size={12} />}
                    <span>{customMode.academicYear ? 'Session list' : 'Custom'}</span>
                  </button>
                </div>
                <FormInput
                  label="Academic Session"
                  name="academicYear"
                  type={customMode.academicYear ? 'text' : 'select'}
                  options={academicSessionOptions}
                  value={student.academicYear}
                  onChange={onChange}
                  placeholder={customMode.academicYear ? "e.g. 2024 - 2028" : "Select Session"}
                  icon={Calendar}
                />
              </div>
            </div>

            {/* Row 7: Address & Emergency Contact */}
            <div className="form-grid-2">
              <FormInput
                label="Residential Address"
                name="address"
                type="textarea"
                rows={2}
                value={student.address}
                onChange={onChange}
                placeholder="Campus Hostels / Permanent residential address"
                icon={MapPin}
              />

              <FormInput
                label="Emergency Contact / Helpline"
                name="emergencyContact"
                value={student.emergencyContact}
                onChange={onChange}
                placeholder="e.g. +91 99887 76655 (Parent)"
                icon={PhoneCall}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            BENTO CARD 2: 🏫 COLLEGE SELECTION & CUSTOM COLLEGE
            ======================================================== */}
        <div className="bento-card bento-college glass-panel">
          <div className="bento-card-header">
            <div className="bento-header-left">
              <div className="bento-icon-box blue-glow">
                <School size={18} />
              </div>
              <div>
                <h3 className="bento-title">🏫 College Selection</h3>
                <p className="bento-subtitle">Select university or enter custom institution</p>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
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

            {/* Custom College Sub-fields */}
            {student.collegeChoice === 'Custom College' && (
              <div className="custom-college-fields-card">
                <div className="custom-college-title-row">
                  <Sparkles size={14} className="sparkle-gold" />
                  <span className="custom-college-title">Custom College Details</span>
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
                      label="College Short Name"
                      name="customCollegeShortName"
                      type="text"
                      value={student.customCollege?.shortName || ''}
                      onChange={(e) => onCustomCollegeChange('shortName', e.target.value)}
                      placeholder="e.g. AIST or APEX"
                      icon={Hash}
                    />
                    <FormInput
                      label="College Location"
                      name="customCollegeLocation"
                      type="text"
                      value={student.customCollege?.location || ''}
                      onChange={(e) => onCustomCollegeChange('location', e.target.value)}
                      placeholder="e.g. Hyderabad, Telangana"
                      icon={MapPin}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            BENTO CARD 3: 🎨 LOGO & CREST STUDIO
            ======================================================== */}
        <div className="bento-card bento-logo-studio glass-panel">
          <div className="bento-card-header">
            <div className="bento-header-left">
              <div className="bento-icon-box purple-glow">
                <Palette size={18} />
              </div>
              <div>
                <h3 className="bento-title">🎨 Logo & Crest Studio</h3>
                <p className="bento-subtitle">Demo logos, custom vector creator & upload</p>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
            <div className="logo-management-header">
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
                  <span className="logo-management-title">Active College Logo</span>
                  <span className="logo-management-status">
                    {logoConfig?.mode === 'upload'
                      ? '🖼️ Uploaded Custom Image'
                      : logoConfig?.mode === 'creator'
                      ? `🎨 Custom: ${logoConfig?.activeLogo?.text || 'Custom'} (${logoConfig?.activeLogo?.shape || 'Crest'})`
                      : `🏛️ Default: ${currentCollegeMeta?.shortName || 'College'}`}
                  </span>
                </div>
              </div>

              {/* Hidden file input for logo */}
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
                  onClick={() => setIsLogoStudioOpen(true)}
                  title="Design your custom college crest"
                >
                  <Sparkles size={14} />
                  <span>🎨 Create Custom Logo</span>
                </button>

                <button
                  type="button"
                  className="btn-upload-logo"
                  onClick={() => logoFileInputRef.current?.click()}
                  title="Upload PNG, JPG, JPEG, or SVG image"
                >
                  <UploadCloud size={14} />
                  <span>🖼️ Upload College Logo</span>
                </button>

                {(logoConfig?.mode === 'upload' || logoConfig?.mode === 'creator') && (
                  <button
                    type="button"
                    className="btn-remove-logo"
                    onClick={onLogoRemove}
                    title="Restore selected college default logo"
                  >
                    <RotateCcw size={13} />
                    <span>Remove Logo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Customizer controls when an image is uploaded */}
            {logoConfig?.mode === 'upload' && (
              <div className="uploaded-logo-customizer-box glass-panel">
                <div className="customizer-box-header">
                  <div className="customizer-header-title">
                    <Sparkles size={14} className="customizer-sparkle-icon" />
                    <span>Uploaded Logo Appearance & Auto-Clip</span>
                  </div>
                  <span className="customizer-badge">Live Preview</span>
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
                        title="Circle Crest - smooth circular crop (eliminates square corners)"
                      >
                        🔘 Circle Crest
                      </button>
                      <button
                        type="button"
                        className={`logo-chip-btn ${logoConfig.uploadShape === 'rounded' ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadShape', 'rounded')}
                        title="Rounded Badge - modern rounded square"
                      >
                        🔲 Rounded
                      </button>
                      <button
                        type="button"
                        className={`logo-chip-btn ${logoConfig.uploadShape === 'natural' ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadShape', 'natural')}
                        title="Natural - unclipped original ratio"
                      >
                        🔳 Natural
                      </button>
                    </div>
                  </div>

                  {/* Background Selector */}
                  <div className="logo-control-unit">
                    <label className="logo-control-label">Badge Background</label>
                    <div className="logo-chips-row">
                      <button
                        type="button"
                        className={`logo-chip-btn ${(!logoConfig.uploadBg || logoConfig.uploadBg === 'white') ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadBg', 'white')}
                        title="Solid White Backing"
                      >
                        ⚪ White
                      </button>
                      <button
                        type="button"
                        className={`logo-chip-btn ${logoConfig.uploadBg === 'transparent' ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadBg', 'transparent')}
                        title="Transparent Backing (great for transparent PNGs)"
                      >
                        🏁 Transparent
                      </button>
                      <button
                        type="button"
                        className={`logo-chip-btn ${logoConfig.uploadBg === 'glass' ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadBg', 'glass')}
                        title="Glassmorphic Backing"
                      >
                        🧊 Glass
                      </button>
                    </div>
                  </div>

                  {/* Image Fit */}
                  <div className="logo-control-unit">
                    <label className="logo-control-label">Image Scaling</label>
                    <div className="logo-chips-row">
                      <button
                        type="button"
                        className={`logo-chip-btn ${(!logoConfig.uploadFit || logoConfig.uploadFit === 'contain') ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadFit', 'contain')}
                        title="Fit Inside - preserve complete image"
                      >
                        🔍 Fit Inside
                      </button>
                      <button
                        type="button"
                        className={`logo-chip-btn ${logoConfig.uploadFit === 'cover' ? 'active' : ''}`}
                        onClick={() => onUpdateLogoSetting?.('uploadFit', 'cover')}
                        title="Fill Crest - fill entire circular area"
                      >
                        📐 Fill Crest
                      </button>
                    </div>
                  </div>

                  {/* Size Slider */}
                  <div className="logo-control-unit logo-slider-unit">
                    <div className="logo-slider-header">
                      <label className="logo-control-label">Header Crest Size</label>
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

        {/* ========================================================
            BENTO CARD 4: 🌈 THEME STUDIO
            ======================================================== */}
        <div className="bento-card bento-theme-studio glass-panel">
          <div className="bento-card-header">
            <div className="bento-header-left">
              <div className="bento-icon-box emerald-glow">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="bento-title">🌈 Card Theme Studio</h3>
                <p className="bento-subtitle">Select institutional color palette</p>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
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
          </div>
        </div>

        {/* ========================================================
            BENTO CARD 5: 📷 PROFILE PHOTO UPLOAD
            ======================================================== */}
        <div className="bento-card bento-profile-photo glass-panel">
          <div className="bento-card-header">
            <div className="bento-header-left">
              <div className="bento-icon-box magenta-glow">
                <UploadCloud size={18} />
              </div>
              <div>
                <h3 className="bento-title">📷 Student Portrait Photo</h3>
                <p className="bento-subtitle">Instant base64 preview with holographic frame</p>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
            <div
              className={`photo-dropzone ${student.photo ? 'has-preview' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !student.photo && photoFileInputRef.current?.click()}
            >
              <input
                ref={photoFileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoFileChange}
                className="hidden-file-input"
              />

              {student.photo ? (
                <div className="photo-preview-box">
                  <div className="photo-thumb-holo-frame">
                    <img src={student.photo} alt="Student preview" className="uploaded-thumbnail" />
                  </div>
                  <div className="photo-preview-details">
                    <span className="photo-success-tag">
                      <Sparkles size={12} />
                      <span>Photo Loaded</span>
                    </span>
                    <p className="photo-hint">Displays with holographic ring on ID card</p>
                    <div className="photo-actions">
                      <button
                        type="button"
                        className="btn-change-photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          photoFileInputRef.current?.click();
                        }}
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPhotoRemove();
                          if (photoFileInputRef.current) photoFileInputRef.current.value = '';
                        }}
                      >
                        <X size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="dropzone-empty-state">
                  <div className="upload-icon-circle holo-ring-pulse">
                    <UploadCloud size={24} />
                  </div>
                  <div className="upload-prompt">
                    <span className="upload-primary-text">Click or drag & drop photo here</span>
                    <span className="upload-secondary-text">Standard 1:1 or 3:4 portrait photo</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            BENTO CARD 6: ⚡ QUICK ACTIONS DOCK
            ======================================================== */}
        <div className="bento-card bento-quick-actions glass-panel">
          <div className="bento-actions-grid">
            <button
              type="button"
              onClick={onGenerate}
              className="btn btn-generate cyber-glow-btn"
            >
              <Sparkles size={17} />
              <span>⚡ Generate ID Card</span>
            </button>

            <button
              type="button"
              onClick={onSaveDraft}
              className="btn btn-save-draft"
              title="Save current details to local browser storage"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>

            {hasSavedDraft && (
              <button
                type="button"
                onClick={onLoadDraft}
                className="btn btn-load-draft"
                title="Restore saved details from local browser storage"
              >
                <FolderOpen size={16} />
                <span>Load Draft</span>
              </button>
            )}

            <button
              type="button"
              onClick={onReset}
              className="btn btn-reset"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={onLoadSample}
              className="btn btn-sample"
            >
              <Sparkles size={16} />
              <span>Auto-Fill Sample</span>
            </button>

            <button
              type="button"
              onClick={onDownloadPNG}
              disabled={isDownloading}
              className="btn btn-download-png"
            >
              <Download size={17} />
              <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
            </button>

            <button
              type="button"
              onClick={onDownloadPDF}
              disabled={isDownloading}
              className="btn btn-download-pdf"
            >
              <FileDown size={17} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </form>

      {/* Custom Logo Creator Modal */}
      <LogoStudioModal
        isOpen={isLogoStudioOpen}
        onClose={() => setIsLogoStudioOpen(false)}
        currentLogo={logoConfig}
        defaultCollegeLogo={currentCollegeMeta?.defaultLogo}
        onApplyLogo={onApplyCustomLogo}
        onResetLogo={onLogoRemove}
      />
    </div>
  );
};

export default React.memo(StudentForm);
