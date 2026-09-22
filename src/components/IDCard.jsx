import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import BarcodeCanvas from './BarcodeCanvas';
import CollegeLogo from './CollegeLogo';
import {
  Shield,
  Phone,
  Mail,
  Calendar,
  HeartPulse,
  Hash,
  MapPin,
  Building,
  GraduationCap,
  Globe,
  Award,
  Layers,
  Sparkles,
  Eye,
  CheckCircle,
  FileBadge,
  QrCode,
  Barcode as BarcodeIcon,
  Maximize2,
  X,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import { sampleStudentData, sampleColleges } from '../utils/defaultData';

const IDCard = ({
  student,
  cardRef,
  theme,
  activeSide,
  onToggleSide,
  logoConfig,
  isLiveCustom
}) => {
  const [showTestModal, setShowTestModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // College name & metadata resolution
  const isCustom = student.collegeChoice === 'Custom College';
  const collegeName = isCustom
    ? (student.customCollege?.name?.trim() || student.college?.trim() || 'Custom College')
    : (student.college?.trim() || sampleStudentData.college);

  const collegeMeta = sampleColleges.find((c) => c.name === (student.collegeChoice || student.college)) || null;
  const collegeLocation = isCustom
    ? (student.customCollege?.location?.trim() || '')
    : (collegeMeta?.location || '');

  const collegeAccreditation =
    collegeMeta?.accreditation ||
    (collegeLocation ? `${collegeLocation} • Accredited Institution` : "Affiliated to State University • Accredited Grade 'A++'");

  // Merge student input with fallback sample data so preview is never blank
  const displayData = {
    name: student.name.trim() || sampleStudentData.name,
    fatherName: student.fatherName?.trim() || sampleStudentData.fatherName,
    studentId: student.studentId.trim() || sampleStudentData.studentId,
    dob: student.dob || sampleStudentData.dob,
    gender: student.gender || sampleStudentData.gender,
    bloodGroup: student.bloodGroup || sampleStudentData.bloodGroup,
    phone: student.phone.trim() || sampleStudentData.phone,
    email: student.email.trim() || sampleStudentData.email,
    photo: student.photo || '',
    college: collegeName,
    collegeLocation: collegeLocation,
    collegeAccreditation: collegeAccreditation,
    department: student.department.trim() || sampleStudentData.department,
    course: student.course.trim() || sampleStudentData.course,
    year: student.year || sampleStudentData.year,
    section: student.section.trim() || sampleStudentData.section,
    academicYear: student.academicYear.trim() || sampleStudentData.academicYear,
    address: student.address.trim() || sampleStudentData.address,
    emergencyContact: student.emergencyContact.trim() || sampleStudentData.emergencyContact
  };

  // Human-readable and camera-friendly QR Code Verification Payload
  const qrPayload = `🎓 STUDENT IDENTITY VERIFICATION
Name: ${displayData.name}
Father's Name: ${displayData.fatherName}
ID: ${displayData.studentId}
College: ${displayData.college}
Dept: ${displayData.department}
Course: ${displayData.course}
Year: ${displayData.year}
Validity: ${displayData.academicYear}
Status: OFFICIAL STUDENT ✅`;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="id-card-stage">
      {/* Top Preview Controls Bar */}
      <div className="card-stage-controls">
        <div className="side-toggle-group">
          <button
            type="button"
            className={`side-tab-btn ${activeSide === 'front' ? 'active' : ''}`}
            onClick={() => onToggleSide('front')}
          >
            <FileBadge size={15} />
            <span>Front Side</span>
          </button>
          <button
            type="button"
            className={`side-tab-btn ${activeSide === 'back' ? 'active' : ''}`}
            onClick={() => onToggleSide('back')}
          >
            <Layers size={15} />
            <span>Back Side</span>
          </button>
        </div>

        <div className="status-indicator">
          <button
            type="button"
            className="btn-test-scanner"
            onClick={() => setShowTestModal(true)}
            title="Inspect & test scannability of QR & Barcode"
          >
            <Maximize2 size={13} />
            <span>Test Scanners</span>
          </button>
        </div>
      </div>

      {/* Lanyard Strap & Clip Simulation */}
      <div className="lanyard-container">
        <div className="lanyard-ribbon" style={{ background: theme.primary }}>
          <div className="lanyard-texture"></div>
          <span className="lanyard-text">{displayData.college}</span>
        </div>
        <div className="lanyard-hardware">
          <div className="lanyard-metal-clip"></div>
          <div className="lanyard-metal-loop"></div>
        </div>
      </div>

      {/* THE ID CARD BADGE — Target for html2canvas */}
      <div className="id-card-outer-wrapper">
        <div
          ref={cardRef}
          id="college-id-card"
          className={`id-card-badge ${theme.id} ${activeSide === 'back' ? 'showing-back' : ''}`}
          style={{
            '--theme-primary': theme.primary,
            '--theme-secondary': theme.secondary,
            '--theme-accent': theme.accent,
            '--theme-badge-bg': theme.badgeBg,
            '--theme-gradient': theme.gradient,
            '--theme-light-accent': theme.lightAccent
          }}
        >
          {/* Lanyard Slot Cutout */}
          <div className="card-slot-punch">
            <div className="slot-inner-hole"></div>
          </div>

          {activeSide === 'front' ? (
            /* ================= FRONT SIDE ================= */
            <div className="card-face card-face-front">
              {/* College Header */}
              <div className="card-header-bar" style={{ background: theme.gradient }}>
                <div className="header-crest-wrap">
                  <CollegeLogo config={logoConfig} size={logoConfig?.activeLogo?.size || 46} />
                </div>
                <div className="header-info">
                  <h3 className="card-college-name">{displayData.college}</h3>
                  <p className="card-college-accreditation">
                    {displayData.collegeAccreditation}
                  </p>
                </div>
              </div>

              {/* Card Sub-banner */}
              <div className="card-sub-banner">
                <div className="badge-title-box">
                  <span className="badge-title-text">STUDENT IDENTIFICATION CARD</span>
                </div>
                <span className="badge-session-pill">{displayData.academicYear}</span>
              </div>

              {/* Main Body with Photo & Key Bio */}
              <div className="card-main-body">
                {/* Left Column: Photo, Chip, Hologram */}
                <div className="card-photo-column">
                  <div className="photo-outer-frame">
                    {displayData.photo ? (
                      <img
                        src={displayData.photo}
                        alt={displayData.name}
                        className="student-portrait-img"
                      />
                    ) : (
                      <div className="default-avatar-graphic">
                        <svg viewBox="0 0 100 100" className="avatar-svg">
                          <circle cx="50" cy="50" r="48" fill="#e2e8f0" />
                          <circle cx="50" cy="38" r="20" fill="#94a3b8" />
                          <path
                            d="M 20 85 C 20 65, 35 60, 50 60 C 65 60, 80 65, 80 85 Z"
                            fill="#64748b"
                          />
                        </svg>
                        <span className="avatar-label">PHOTO</span>
                      </div>
                    )}
                    <div className="photo-corner-accent top-left"></div>
                    <div className="photo-corner-accent bottom-right"></div>
                  </div>

                  {/* Smart Chip & Security Hologram */}
                  <div className="security-badges-row">
                    <div className="smart-chip-graphic" title="RFID Microchip">
                      <div className="chip-line horizontal"></div>
                      <div className="chip-line vertical"></div>
                      <div className="chip-core"></div>
                    </div>
                    <div className="hologram-seal" title="Official Security Hologram">
                      <Shield size={13} className="hologram-icon" />
                      <span className="hologram-text">SECURE</span>
                    </div>
                  </div>

                  {/* Blood Group Tag */}
                  {displayData.bloodGroup && (
                    <div className="blood-group-tag">
                      <HeartPulse size={12} className="blood-icon" />
                      <span>BLOOD: <strong>{displayData.bloodGroup}</strong></span>
                    </div>
                  )}
                </div>

                {/* Right Column: Student Details */}
                <div className="card-info-column">
                  <div className="student-name-block">
                    <h2 className="student-primary-name">{displayData.name}</h2>
                    <div className="student-id-pill">
                      <Hash size={13} />
                      <span className="id-number">{displayData.studentId}</span>
                    </div>
                  </div>

                  <div className="details-table">
                    <div className="detail-row">
                      <span className="detail-key">Department:</span>
                      <span className="detail-value">{displayData.department}</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-key">Course:</span>
                      <span className="detail-value bold">{displayData.course}</span>
                    </div>

                    {displayData.fatherName && (
                      <div className="detail-row">
                        <span className="detail-key">Father:</span>
                        <span className="detail-value">{displayData.fatherName}</span>
                      </div>
                    )}

                    <div className="detail-row dual">
                      <div>
                        <span className="detail-key">Year:</span>
                        <span className="detail-value">{displayData.year}</span>
                      </div>
                      {displayData.section && (
                        <div>
                          <span className="detail-key">Section:</span>
                          <span className="detail-value">{displayData.section}</span>
                        </div>
                      )}
                    </div>

                    {displayData.dob && (
                      <div className="detail-row">
                        <span className="detail-key">DOB:</span>
                        <span className="detail-value">{displayData.dob}</span>
                      </div>
                    )}

                    {displayData.phone && (
                      <div className="detail-row">
                        <span className="detail-key">Phone:</span>
                        <span className="detail-value">{displayData.phone}</span>
                      </div>
                    )}

                    {displayData.email && (
                      <div className="detail-row">
                        <span className="detail-key">Email:</span>
                        <span className="detail-value email-value">{displayData.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* REAL SCANNABLE CODE 128 BARCODE ON FRONT */}
              <div className="card-front-barcode-section">
                <div className="barcode-inner-card">
                  <BarcodeCanvas
                    value={displayData.studentId}
                    width={1.55}
                    height={32}
                    fontSize={10}
                  />
                </div>
              </div>

              {/* Card Footer with Scannable QR & Dual Signatures */}
              <div className="card-footer-zone">
                <div className="qr-code-section">
                  <div className="qr-wrapper-card" title="Point your phone camera to scan">
                    <QRCodeSVG
                      value={qrPayload}
                      size={68}
                      level="M"
                      includeMargin={true}
                      fgColor="#0f172a"
                      bgColor="#ffffff"
                    />
                  </div>
                  <span className="qr-caption">SCAN TO VERIFY</span>
                </div>

                <div className="signatures-container">
                  <div className="signature-box">
                    <div className="signature-line-drawn student-sig">
                      {displayData.name.split(' ')[0] || 'Student'}
                    </div>
                    <div className="signature-divider"></div>
                    <span className="signature-title">Card Holder Signature</span>
                  </div>

                  <div className="signature-box">
                    <div className="signature-line-drawn auth-sig">
                      Dr. R. Vance
                    </div>
                    <div className="signature-divider"></div>
                    <span className="signature-title">Dean / Authorized Signatory</span>
                  </div>
                </div>
              </div>

              {/* Bottom security strip */}
              <div className="card-bottom-strip" style={{ background: theme.primary }}>
                <span>OFFICIAL STUDENT IDENTIFICATION • PROPERTY OF {displayData.college.toUpperCase()}</span>
              </div>
            </div>
          ) : (
            /* ================= BACK SIDE ================= */
            <div className="card-face card-face-back">
              <div className="back-top-strip" style={{ background: theme.primary }}>
                <span>INSTITUTIONAL REGULATIONS & EMERGENCY CONTACT</span>
              </div>

              <div className="back-card-body">
                {/* Institutional Terms */}
                <div className="back-section">
                  <h4 className="back-heading">Terms & Conditions of Usage</h4>
                  <ul className="back-rules-list">
                    <li>This card is non-transferable and remains property of the college.</li>
                    <li>Loss of this card must be immediately reported to the Campus Registrar.</li>
                    <li>Must be visibly worn or produced upon request by campus authorities.</li>
                    <li>Valid strictly through the completion of the registered program.</li>
                  </ul>
                </div>

                {/* Residential & Emergency Details */}
                <div className="back-section contact-section">
                  {displayData.fatherName && (
                    <div className="back-info-item">
                      <UserCheck size={15} className="back-icon" />
                      <div>
                        <strong>Father / Guardian:</strong>
                        <p>{displayData.fatherName}</p>
                      </div>
                    </div>
                  )}

                  <div className="back-info-item">
                    <MapPin size={15} className="back-icon" />
                    <div>
                      <strong>Permanent Address:</strong>
                      <p>{displayData.address || 'Campus Residential Hall, Student Quarter'}</p>
                    </div>
                  </div>

                  <div className="back-info-item emergency-item">
                    <Phone size={15} className="back-icon" />
                    <div>
                      <strong>Emergency Contact:</strong>
                      <p>{displayData.emergencyContact || '+1 (555) 000-HELP (Campus Security)'}</p>
                    </div>
                  </div>
                </div>

                {/* Institution Contact Information */}
                <div className="back-institution-box">
                  <Building size={16} className="inst-icon" />
                  <div>
                    <span className="inst-title">{displayData.college}</span>
                    <p className="inst-details">
                      {displayData.collegeLocation
                        ? `${displayData.collegeLocation} • Helpline: +1 (800) 555-UNIV`
                        : 'Administrative Wing, Academic Avenue • Helpline: +1 (800) 555-UNIV'}
                    </p>
                    <p className="inst-web">www.campus-registry.edu • registry@college.edu</p>
                  </div>
                </div>

                {/* REAL CODE128 BARCODE CANVAS ON BACK */}
                <div className="barcode-container">
                  <div className="real-barcode-wrapper">
                    <BarcodeCanvas
                      value={displayData.studentId}
                      width={1.65}
                      height={40}
                      fontSize={11}
                    />
                  </div>
                  <p className="return-policy">
                    If found, please return to any campus administrative desk or drop in nearest mailbox.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Test & Inspect Scannable Codes */}
      {showTestModal && (
        <div className="modal-backdrop" onClick={() => setShowTestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title">
                <QrCode size={20} className="text-blue-400" />
                <h3>Digital Scanner & Code Verification</h3>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setShowTestModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">
                Both codes are dynamically generated from live student inputs using HTML5 vector standards and are 100% compliant with standard smartphone cameras and optical barcode scanners.
              </p>

              <div className="scanner-cards-grid">
                {/* QR Code Inspection */}
                <div className="scanner-card">
                  <div className="scanner-card-badge">
                    <QrCode size={16} />
                    <span>Real-time QR Code</span>
                  </div>
                  <div className="scanner-visual-box">
                    <QRCodeSVG
                      value={qrPayload}
                      size={140}
                      level="M"
                      includeMargin={true}
                      fgColor="#0f172a"
                      bgColor="#ffffff"
                    />
                  </div>
                  <div className="scanner-decoded-box">
                    <div className="decoded-header">
                      <span>Decoded Content:</span>
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="btn-copy-payload"
                      >
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="decoded-pre">{qrPayload}</pre>
                  </div>
                </div>

                {/* Barcode Inspection */}
                <div className="scanner-card">
                  <div className="scanner-card-badge">
                    <BarcodeIcon size={16} />
                    <span>Code 128 Barcode</span>
                  </div>
                  <div className="scanner-visual-box barcode-box">
                    <BarcodeCanvas
                      value={displayData.studentId}
                      width={2.0}
                      height={50}
                      fontSize={12}
                    />
                  </div>
                  <div className="scanner-decoded-box">
                    <div className="decoded-header">
                      <span>Decoded String:</span>
                    </div>
                    <div className="barcode-decoded-val">
                      <Hash size={14} />
                      <code>{displayData.studentId}</code>
                    </div>
                    <p className="scanner-tip">
                      Standard Code 128 symbology. Scannable with any handheld laser scanner, POS terminal, or mobile barcode scanner app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowTestModal(false)}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDCard;
