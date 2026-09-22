import React, { useState } from 'react';
import {
  User,
  Hash,
  Calendar,
  HeartPulse,
  Phone,
  Mail,
  Building2,
  BookOpen,
  GraduationCap,
  Layers,
  MapPin,
  PhoneCall,
  UserCheck,
  List,
  Edit3
} from 'lucide-react';
import FormInput from './FormInput';
import {
  bloodGroups,
  genders,
  yearOptions,
  sectionOptions,
  departmentOptions,
  courseOptions,
  academicSessionOptions
} from '../utils/defaultData';

const StudentDetailsPanel = ({
  student,
  errors = {},
  onChange
}) => {
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

  return (
    <div className="bento-card bento-student-details-panel glass-panel">
      <div className="bento-card-header">
        <div className="bento-header-left">
          <div className="bento-icon-box cyan-glow">
            <User size={18} />
          </div>
          <div>
            <h3 className="bento-title">👤 Student Details</h3>
            <p className="bento-subtitle">Personal, academic & contact credentials</p>
          </div>
        </div>
      </div>

      <div className="bento-card-body scrollable-bento-body">
        {/* Full Name & Father Name */}
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

        {/* Student ID & DOB */}
        <div className="form-grid-2">
          <FormInput
            label="Student ID / Roll No."
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

        {/* Gender & Blood Group */}
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

        {/* Phone & Email */}
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

        {/* Department & Course */}
        <div className="form-grid-2">
          <div className="field-with-switch">
            <div className="field-top-meta">
              <button
                type="button"
                className="btn-text-switch"
                onClick={() => toggleCustomMode('department')}
              >
                {customMode.department ? <List size={12} /> : <Edit3 size={12} />}
                <span>{customMode.department ? 'List' : 'Custom'}</span>
              </button>
            </div>
            <FormInput
              label="Department"
              name="department"
              type={customMode.department ? 'text' : 'select'}
              options={departmentOptions}
              value={student.department}
              onChange={onChange}
              placeholder={customMode.department ? "e.g. Computer Science" : "Select Department"}
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
                <span>{customMode.course ? 'List' : 'Custom'}</span>
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

        {/* Year, Section & Academic Session */}
        <div className="form-grid-3">
          <FormInput
            label="Year"
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
                <span>{customMode.section ? '1–22' : 'Custom'}</span>
              </button>
            </div>
            <FormInput
              label="Section"
              name="section"
              type={customMode.section ? 'text' : 'select'}
              options={sectionOptions}
              value={student.section}
              onChange={onChange}
              placeholder="Section"
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
                <span>{customMode.academicYear ? 'List' : 'Custom'}</span>
              </button>
            </div>
            <FormInput
              label="Academic Session"
              name="academicYear"
              type={customMode.academicYear ? 'text' : 'select'}
              options={academicSessionOptions}
              value={student.academicYear}
              onChange={onChange}
              placeholder="e.g. 2024 - 2028"
              icon={Calendar}
            />
          </div>
        </div>

        {/* Residential Address & Emergency Contact */}
        <div className="form-grid-2">
          <FormInput
            label="Residential Address"
            name="address"
            type="textarea"
            rows={2}
            value={student.address}
            onChange={onChange}
            placeholder="Permanent campus or residential address"
            icon={MapPin}
          />

          <FormInput
            label="Emergency Contact"
            name="emergencyContact"
            value={student.emergencyContact}
            onChange={onChange}
            placeholder="e.g. +91 99887 76655 (Guardian)"
            icon={PhoneCall}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(StudentDetailsPanel);
