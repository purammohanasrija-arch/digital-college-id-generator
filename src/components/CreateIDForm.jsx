import React, { useRef, useState } from 'react';
import {
  User,
  CreditCard,
  GitBranch,
  GraduationCap,
  Calendar,
  Building2,
  Home,
  Droplet,
  Clock,
  Sparkles,
  ChevronDown,
  Upload,
  AlertCircle
} from 'lucide-react';
import {
  yearOptions,
  bloodGroups,
  validUntilOptions,
  programOptions,
  departmentOptions,
  hostelOptions,
  sampleColleges
} from '../utils/defaultData';

const CreateIDForm = ({
  student,
  onChange,
  onCollegeSelect,
  onPhotoUpload,
  onGenerate,
  accentColor
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Process uploaded file
  const processFile = (file) => {
    if (!file) return;

    // Supported formats check: JPG, JPEG, PNG, WebP
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a supported image format: JPG, JPEG, PNG, or WebP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onPhotoUpload?.(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  // Form submit / Generate handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!student.name?.trim()) errors.name = 'Full name is required';
    if (!student.studentId?.trim()) errors.studentId = 'Roll number is required';
    if (!student.department?.trim()) errors.department = 'Branch is required';
    if (!student.college?.trim()) errors.college = 'College name is required';

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onGenerate?.();
    }
  };

  return (
    <div className="stage-left-panel-wrap">
      <aside className="campus-glass-card create-id-panel" aria-label="Create Your ID Form">
      <div className="panel-title-area">
        <h2 className="panel-heading">Create Your ID</h2>
        <p className="panel-subheading">Enter your details to generate a stunning college ID card.</p>
      </div>

      <form className="campus-form" onSubmit={handleSubmit} noValidate>
        {/* 1. Full Name */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-name">
            Full Name <span className="req-star">*</span>
          </label>
          <div className={`campus-input-box ${validationErrors.name ? 'has-error' : ''}`}>
            <span className="campus-input-icon">
              <User size={16} />
            </span>
            <input
              id="student-name"
              type="text"
              name="name"
              value={student.name || ''}
              onChange={(e) => {
                onChange(e);
                if (validationErrors.name) setValidationErrors(prev => ({ ...prev, name: null }));
              }}
              placeholder="e.g. Mohana P"
              className="campus-input"
              autoComplete="name"
            />
          </div>
          {validationErrors.name && (
            <span className="field-error-msg"><AlertCircle size={11} /> {validationErrors.name}</span>
          )}
        </div>

        {/* 2. Roll Number */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-id">
            Roll Number <span className="req-star">*</span>
          </label>
          <div className={`campus-input-box ${validationErrors.studentId ? 'has-error' : ''}`}>
            <span className="campus-input-icon">
              <CreditCard size={16} />
            </span>
            <input
              id="student-id"
              type="text"
              name="studentId"
              value={student.studentId || ''}
              onChange={(e) => {
                onChange(e);
                if (validationErrors.studentId) setValidationErrors(prev => ({ ...prev, studentId: null }));
              }}
              placeholder="e.g. 24CS1234"
              className="campus-input"
              autoComplete="off"
            />
          </div>
          {validationErrors.studentId && (
            <span className="field-error-msg"><AlertCircle size={11} /> {validationErrors.studentId}</span>
          )}
        </div>

        {/* 3. Program / Degree */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-course">Program / Degree</label>
          <div className="campus-input-box select-wrapper">
            <span className="campus-input-icon">
              <GraduationCap size={16} />
            </span>
            <select
              id="student-course"
              name="course"
              value={student.course || 'B.Tech'}
              onChange={onChange}
              className="campus-input campus-select"
            >
              {programOptions.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="campus-select-arrow" />
          </div>
        </div>

        {/* 4. Branch / Department Dropdown + Editable Text */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-branch-select">
            Branch / Department <span className="req-star">*</span>
          </label>
          {/* Quick Department Dropdown */}
          <div className="campus-input-box select-wrapper">
            <span className="campus-input-icon">
              <GitBranch size={16} />
            </span>
            <select
              id="student-branch-select"
              value={departmentOptions.includes(student.department) ? student.department : 'Other'}
              onChange={(e) => {
                const val = e.target.value;
                if (val !== 'Other') {
                  onChange({ target: { name: 'department', value: val } });
                  if (validationErrors.department) setValidationErrors(prev => ({ ...prev, department: null }));
                }
              }}
              className="campus-input campus-select"
            >
              <optgroup label="Select Department">
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown size={14} className="campus-select-arrow" />
          </div>
          {/* Editable Branch Field */}
          <div className={`campus-input-box ${validationErrors.department ? 'has-error' : ''}`} style={{ marginTop: '5px' }}>
            <input
              id="student-branch"
              type="text"
              name="department"
              value={student.department || ''}
              onChange={(e) => {
                onChange(e);
                if (validationErrors.department) setValidationErrors(prev => ({ ...prev, department: null }));
              }}
              placeholder="e.g. Computer Science & Engineering"
              className="campus-input"
            />
          </div>
          {validationErrors.department && (
            <span className="field-error-msg"><AlertCircle size={11} /> {validationErrors.department}</span>
          )}
        </div>

        {/* 5. Year */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-year">Year</label>
          <div className="campus-input-box select-wrapper">
            <span className="campus-input-icon">
              <Calendar size={16} />
            </span>
            <select
              id="student-year"
              name="year"
              value={student.year || '3rd Year'}
              onChange={onChange}
              className="campus-input campus-select"
            >
              {yearOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="campus-select-arrow" />
          </div>
        </div>

        {/* 6. College Name & Preset Selector */}
        <div className="campus-form-group">
          <div className="college-label-row">
            <label className="campus-label" htmlFor="student-college">
              College Name <span className="req-star">*</span>
            </label>
          </div>
          {/* Quick University Preset Dropdown */}
          <div className="campus-input-box select-wrapper college-preset-wrap">
            <span className="campus-input-icon">
              <Building2 size={16} />
            </span>
            <select
              id="student-college-preset"
              value={student.collegeChoice || student.college}
              onChange={(e) => onCollegeSelect?.(e.target.value)}
              className="campus-input campus-select"
            >
              <optgroup label="Popular Universities (Auto-brand)">
                {sampleColleges.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
              <option value="Custom College">Custom College / University</option>
            </select>
            <ChevronDown size={14} className="campus-select-arrow" />
          </div>

          {/* College custom editable name */}
          <div className={`campus-input-box ${validationErrors.college ? 'has-error' : ''}`} style={{ marginTop: '5px' }}>
            <input
              id="student-college"
              type="text"
              name="college"
              value={student.college || ''}
              onChange={(e) => {
                onChange(e);
                if (validationErrors.college) setValidationErrors(prev => ({ ...prev, college: null }));
              }}
              placeholder="e.g. Vignan's Foundation for Science, Technology and Research"
              className="campus-input"
            />
          </div>
          {validationErrors.college && (
            <span className="field-error-msg"><AlertCircle size={11} /> {validationErrors.college}</span>
          )}
        </div>

        {/* Two Columns for Hostel & Blood Group */}
        <div className="form-two-col-row">
          {/* 7. Hostel / Residence with Dropdown & Custom Edit */}
          <div className="campus-form-group">
            <label className="campus-label" htmlFor="student-hostel-select">Hostel / Residence</label>
            <div className="campus-input-box select-wrapper">
              <span className="campus-input-icon">
                <Home size={15} />
              </span>
              <select
                id="student-hostel-select"
                value={hostelOptions.includes(student.hostel) ? student.hostel : 'Other'}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== 'Other') {
                    onChange({ target: { name: 'hostel', value: val } });
                  }
                }}
                className="campus-input campus-select"
              >
                <optgroup label="Select Residence / Hostel">
                  {hostelOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown size={14} className="campus-select-arrow" />
            </div>
            <div className="campus-input-box" style={{ marginTop: '5px' }}>
              <input
                id="student-hostel"
                type="text"
                name="hostel"
                value={student.hostel || ''}
                onChange={onChange}
                placeholder="e.g. Girls Hostel - A"
                className="campus-input"
              />
            </div>
          </div>

          {/* 8. Blood Group */}
          <div className="campus-form-group">
            <label className="campus-label" htmlFor="student-blood">Blood Group</label>
            <div className="campus-input-box select-wrapper">
              <span className="campus-input-icon">
                <Droplet size={15} />
              </span>
              <select
                id="student-blood"
                name="bloodGroup"
                value={student.bloodGroup || 'B+'}
                onChange={onChange}
                className="campus-input campus-select"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="campus-select-arrow" />
            </div>
          </div>
        </div>

        {/* 8. Valid Until */}
        <div className="campus-form-group">
          <label className="campus-label" htmlFor="student-valid-until">Valid Until</label>
          <div className="campus-input-box select-wrapper">
            <span className="campus-input-icon">
              <Clock size={16} />
            </span>
            <select
              id="student-valid-until"
              name="validUntil"
              value={student.validUntil || '2028'}
              onChange={onChange}
              className="campus-input campus-select"
            >
              {validUntilOptions.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="campus-select-arrow" />
          </div>
        </div>

        {/* 9. Upload Photo (Drag-and-Drop + Click) */}
        <div className="campus-form-group upload-photo-group">
          <label className="campus-label">Upload Photo</label>
          <div
            className={`campus-upload-dropzone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-avatar-preview">
              <img
                src={student.photo || '/mohana_center.png'}
                alt="Student portrait preview"
                className="upload-preview-img"
              />
            </div>
            <div className="upload-dropzone-info">
              <button
                type="button"
                className="campus-glass-btn choose-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Upload size={13} />
                <span>Choose Image</span>
              </button>
              <span className="dropzone-hint-text">or drag & drop (JPG, PNG, WebP)</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Generate ID Button */}
        <button
          type="submit"
          className="campus-gradient-btn generate-btn"
          style={{
            '--accent-glow': accentColor?.glow || 'rgba(168, 85, 247, 0.55)'
          }}
        >
          <Sparkles size={18} className="btn-sparkle" />
          <span>✨ Generate ID</span>
        </button>
      </form>
    </aside>

    {/* Cursive Tagline below form floating outside glass card */}
    <div className="panel-script-footer">
      <p className="cursive-tagline">“Same Student. Bigger Dreams.” ♡</p>
    </div>
  </div>
  );
};

export default React.memo(CreateIDForm);

