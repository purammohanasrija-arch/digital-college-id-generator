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
  List
} from 'lucide-react';
import FormInput from './FormInput';
import {
  bloodGroups,
  genders,
  yearOptions,
  cardThemes,
  sectionOptions,
  departmentOptions,
  courseOptions
} from '../utils/defaultData';

const StudentForm = ({
  student,
  errors,
  onChange,
  onPhotoUpload,
  onPhotoRemove,
  onReset,
  onGenerate,
  onDownloadPNG,
  onDownloadPDF,
  onLoadSample,
  selectedTheme,
  onThemeChange,
  isDownloading,
  isGenerated
}) => {
  const fileInputRef = useRef(null);

  const [customMode, setCustomMode] = useState({
    department: false,
    course: false,
    section: false
  });

  const toggleCustomMode = (field) => {
    setCustomMode((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleFileChange = (e) => {
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
    <div className="student-form-container">
      <div className="form-card-header">
        <div className="form-header-title-box">
          <h2 className="form-title">Student Information</h2>
          <p className="form-subtitle">Fill in the student details to generate the official credential</p>
        </div>

        <button
          type="button"
          onClick={onLoadSample}
          className="btn-sample-fill"
          title="Auto-fill with sample student data"
        >
          <Sparkles size={14} />
          <span>Auto-fill Sample</span>
        </button>
      </div>

      {/* Validation Summary Alert */}
      {errorCount > 0 && (
        <div className="validation-banner">
          <div className="validation-banner-content">
            <AlertTriangle size={20} className="validation-banner-icon" />
            <div>
              <strong>Please complete all required fields</strong>
              <p className="validation-banner-sub">
                {errorCount} {errorCount === 1 ? 'field requires' : 'fields require'} your attention marked with an asterisk (*).
              </p>
            </div>
          </div>
        </div>
      )}

      {isGenerated && errorCount === 0 && (
        <div className="success-banner">
          <CheckCircle2 size={18} className="success-icon" />
          <span>ID Card validated and ready for export!</span>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} noValidate>
        {/* Card Theme Picker */}
        <div className="form-section theme-picker-section">
          <div className="section-title-wrap">
            <Palette size={18} className="section-icon" />
            <h3 className="section-title">Card Theme & Color</h3>
          </div>
          <div className="theme-options-grid">
            {cardThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`theme-chip ${selectedTheme.id === t.id ? 'active' : ''}`}
                onClick={() => onThemeChange(t)}
                title={t.name}
              >
                <span className="theme-color-dot" style={{ background: t.gradient }}></span>
                <span className="theme-chip-label">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: Personal Details */}
        <div className="form-section">
          <div className="section-title-wrap">
            <User size={18} className="section-icon" />
            <h3 className="section-title">Personal Details</h3>
          </div>

          <div className="form-grid-2">
            <FormInput
              label="Full Name"
              name="name"
              value={student.name}
              onChange={onChange}
              placeholder="e.g. Johnathan Doe"
              required
              error={errors.name}
              icon={User}
            />

            <FormInput
              label="Student ID / Roll Number"
              name="studentId"
              value={student.studentId}
              onChange={onChange}
              placeholder="e.g. STU-2024-8842"
              required
              error={errors.studentId}
              icon={Hash}
            />
          </div>

          <div className="form-grid-3">
            <FormInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={student.dob}
              onChange={onChange}
              icon={Calendar}
            />

            <FormInput
              label="Gender"
              name="gender"
              type="select"
              value={student.gender}
              onChange={onChange}
              options={genders}
              placeholder="Select Gender"
            />

            <FormInput
              label="Blood Group"
              name="bloodGroup"
              type="select"
              value={student.bloodGroup}
              onChange={onChange}
              options={bloodGroups}
              placeholder="Select Blood Group"
              icon={HeartPulse}
            />
          </div>

          <div className="form-grid-2">
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={student.phone}
              onChange={onChange}
              placeholder="e.g. +1 (555) 019-2834"
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

          {/* Profile Photo Upload */}
          <div className="photo-upload-container">
            <label className="form-label">
              <span className="label-text">Profile Photo</span>
              <span className="label-help">JPG, PNG or WebP (Passport size recommended)</span>
            </label>

            <div
              className={`photo-dropzone ${student.photo ? 'has-preview' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !student.photo && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-file-input"
              />

              {student.photo ? (
                <div className="photo-preview-box">
                  <img src={student.photo} alt="Student preview" className="uploaded-thumbnail" />
                  <div className="photo-preview-details">
                    <span className="photo-success-tag">Photo Loaded</span>
                    <p className="photo-hint">Displays live on the ID card badge</p>
                    <div className="photo-actions">
                      <button
                        type="button"
                        className="btn-change-photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
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
                          if (fileInputRef.current) fileInputRef.current.value = '';
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
                  <div className="upload-icon-circle">
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

        {/* SECTION 2: Academic Details */}
        <div className="form-section">
          <div className="section-title-wrap">
            <School size={18} className="section-icon" />
            <h3 className="section-title">Academic Details</h3>
          </div>

          <div className="form-grid-1">
            <FormInput
              label="College / University Name"
              name="college"
              value={student.college}
              onChange={onChange}
              placeholder="e.g. Apex Institute of Science & Technology"
              required
              error={errors.college}
              icon={School}
            />
          </div>

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
                  <span>{customMode.section ? '1-22 List' : 'Custom'}</span>
                </button>
              </div>
              <FormInput
                label="Section"
                name="section"
                type={customMode.section ? 'text' : 'select'}
                options={sectionOptions}
                value={student.section}
                onChange={onChange}
                placeholder={customMode.section ? "e.g. Sec 1 / Batch A" : "Select Section (1-22)"}
                icon={Layers}
              />
            </div>

            <FormInput
              label="Academic Session / Year"
              name="academicYear"
              value={student.academicYear}
              onChange={onChange}
              placeholder="e.g. 2024 - 2028"
              icon={Calendar}
            />
          </div>
        </div>

        {/* SECTION 3: Additional Details */}
        <div className="form-section">
          <div className="section-title-wrap">
            <MapPin size={18} className="section-icon" />
            <h3 className="section-title">Additional Details</h3>
          </div>

          <FormInput
            label="Residential Address"
            name="address"
            type="textarea"
            rows={2}
            value={student.address}
            onChange={onChange}
            placeholder="e.g. 402 Silicon Valley Blvd, Technology Park, CA"
            icon={MapPin}
          />

          <FormInput
            label="Emergency Contact"
            name="emergencyContact"
            value={student.emergencyContact}
            onChange={onChange}
            placeholder="e.g. +1 (555) 998-1122 (Parent/Guardian)"
            icon={PhoneCall}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions-wrapper">
          <div className="primary-actions-row">
            <button
              type="button"
              onClick={onGenerate}
              className="btn btn-primary btn-generate"
            >
              <Sparkles size={18} />
              <span>Generate ID Card</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="btn btn-secondary btn-reset"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>

          <div className="download-actions-row">
            <button
              type="button"
              onClick={onDownloadPNG}
              disabled={isDownloading}
              className="btn btn-download-png"
            >
              <Download size={17} />
              <span>{isDownloading ? 'Exporting...' : 'Download ID Card (PNG)'}</span>
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
    </div>
  );
};

export default StudentForm;
