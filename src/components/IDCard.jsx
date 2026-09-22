import React, { useState, useRef } from 'react';
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
  UserCheck,
  ShieldCheck
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
  const tiltStageRef = useRef(null);

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
Status: OFFICIAL VERIFIED STUDENT ✅`;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3D Tilt calculations on mouse movement (Zero React re-renders)
  const handleMouseMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const stage = tiltStageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    const rotateX = -y * 18; // Max 9 deg tilt
    const rotateY = x * 18;  // Max 9 deg tilt
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    stage.style.setProperty('--card-rotate-x', `${rotateX}deg`);
    stage.style.setProperty('--card-rotate-y', `${rotateY}deg`);
    stage.style.setProperty('--glare-x', `${glareX}%`);
    stage.style.setProperty('--glare-y', `${glareY}%`);
    stage.style.setProperty('--glare-opacity', '0.75');
  };

  const handleMouseLeave = () => {
    const stage = tiltStageRef.current;
    if (!stage) return;

    stage.style.setProperty('--card-rotate-x', '0deg');
    stage.style.setProperty('--card-rotate-y', '0deg');
    stage.style.setProperty('--glare-opacity', '0');
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
          <span className="lanyard-text">
            {collegeMeta?.shortName || student.customCollege?.shortName || 'CAMPUS ID'}
          </span>
        </div>
        <div className="lanyard-hardware">
          <div className="lanyard-metal-clip"></div>
          <div className="lanyard-metal-loop"></div>
        </div>
      </div>

      {/* 3D TILT STAGE WRAPPER */}
      <div
        ref={tiltStageRef}
        className="holo-tilt-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Holographic Border Outer Glow Frame */}
        <div className="holo-border-frame">
          {/* Moving Light Streak across the card surface */}
          <div className="holo-light-streak" aria-hidden="true"></div>

          {/* Interactive Specular Glare overlay */}
          <div className="card-specular-glare" aria-hidden="true"></div>

          {/* THE ID CARD BADGE — Target for html2canvas */}
          <div
            ref={cardRef}
            id="college-id-card"
            className={`id-card-badge glass-id-card ${theme.id} ${activeSide === 'back' ? 'showing-back' : ''}`}
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
                    <span className="badge-title-text">DIGITAL STUDENT ID</span>
                  </div>
                  <div className="sub-banner-pills">
                    <span className="badge-verified-tag">
                      <span className="verified-dot"></span>
                      <span>VERIFIED</span>
                    </span>
                    <span className="badge-session-pill">{displayData.academicYear}</span>
                  </div>
                </div>

                {/* Main Body with Photo & Key Bio */}
                <div className="card-main-body">
                  {/* Left Column: Photo, Chip, Hologram */}
                  <div className="card-photo-column">
                    <div className="photo-outer-frame holo-photo-ring">
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
                      {/* Smart RFID Microchip */}
                      <div className="smart-chip-sim" title="RFID Microchip">
                        <div className="chip-lines line-top"></div>
                        <div className="chip-lines line-mid"></div>
                        <div className="chip-lines line-bot"></div>
                        <div className="chip-center"></div>
                      </div>

                      {/* Rainbow Hologram Seal */}
                      <div className="hologram-seal" title="Authentic Security Hologram">
                        <div className="hologram-shimmer"></div>
                        <Shield className="hologram-icon" size={12} />
                        <span className="hologram-text">SECURE</span>
                      </div>
                    </div>

                    {/* Blood Group Tag */}
                    <div className="blood-group-tag">
                      <HeartPulse size={12} className="blood-icon" />
                      <span className="blood-val">{displayData.bloodGroup}</span>
                    </div>

                    {/* FRONT CODE 128 BARCODE */}
                    <div className="front-barcode-wrap" title={`Barcode: ${displayData.studentId}`}>
                      <BarcodeCanvas
                        value={displayData.studentId}
                        width={1.05}
                        height={24}
                        fontSize={9}
                      />
                    </div>
                  </div>

                  {/* Right Column: Bio Data */}
                  <div className="card-info-column">
                    <div className="student-name-block">
                      <span className="label-tiny">STUDENT NAME</span>
                      <h2 className="student-full-name">{displayData.name}</h2>
                      {displayData.fatherName && (
                        <div className="student-father-name-row">
                          <span className="label-tiny">S/O • D/O:</span>
                          <span className="val-father-name">{displayData.fatherName}</span>
                        </div>
                      )}
                    </div>

                    <div className="id-number-block">
                      <span className="label-tiny">REGISTRATION / ROLL NO.</span>
                      <div className="id-badge-code">
                        <Hash size={13} className="hash-icon" />
                        <span className="code-text">{displayData.studentId}</span>
                      </div>
                    </div>

                    <div className="academic-meta-grid">
                      <div className="meta-item full-row">
                        <span className="label-tiny">DEPARTMENT</span>
                        <span className="val-text dept-text">{displayData.department}</span>
                      </div>

                      <div className="meta-item full-row">
                        <span className="label-tiny">COURSE / PROGRAM</span>
                        <span className="val-text course-text">{displayData.course}</span>
                      </div>

                      <div className="meta-item">
                        <span className="label-tiny">YEAR</span>
                        <span className="val-text highlight">{displayData.year}</span>
                      </div>

                      <div className="meta-item">
                        <span className="label-tiny">SECTION</span>
                        <span className="val-text highlight">{displayData.section}</span>
                      </div>

                      <div className="meta-item">
                        <span className="label-tiny">DATE OF BIRTH</span>
                        <span className="val-text">{displayData.dob || '—'}</span>
                      </div>

                      <div className="meta-item">
                        <span className="label-tiny">GENDER</span>
                        <span className="val-text">{displayData.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Zone: QR Code & Dual Signatures */}
                <div className="card-footer-zone">
                  {/* Verified Dynamic QR Code */}
                  <div className="qr-container-box">
                    <div className="qr-wrapper-border">
                      <QRCodeSVG
                        value={qrPayload}
                        size={64}
                        level="M"
                        includeMargin={false}
                        fgColor="#000000"
                        bgColor="#ffffff"
                        aria-label="Student Identity QR Code"
                      />
                    </div>
                    <span className="qr-caption">SCAN TO VERIFY</span>
                  </div>

                  {/* Signatures */}
                  <div className="signatures-row">
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

                <div className="back-bottom-strip" style={{ background: theme.primary }}>
                  <span>ISSUED UNDER THE REGULATORY AUTHORITY OF THE ACADEMIC COUNCIL</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="card-preview-tips">
        <Sparkles size={14} className="tip-sparkle" />
        <span>Hover & move mouse to tilt 3D card • Flip side to inspect back barcode</span>
      </div>

      {/* SCANNER INSPECTION & TEST MODAL */}
      {showTestModal && (
        <div className="modal-backdrop" onClick={() => setShowTestModal(false)}>
          <div className="modal-container scanner-test-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <QrCode size={20} className="modal-icon-sparkle" />
                <div>
                  <h3 className="modal-title">Scanner Inspector & Test Center</h3>
                  <p className="modal-subtitle">Directly test optical barcode & smartphone camera verification</p>
                </div>
              </div>
              <button
                type="button"
                className="modal-btn-close"
                onClick={() => setShowTestModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="scanner-test-content">
              {/* QR Code Testing Box */}
              <div className="scanner-card">
                <div className="scanner-card-header">
                  <span className="scanner-tag">Smartphone Camera Scannable</span>
                  <h4>QR Code Payload</h4>
                </div>
                <div className="scanner-qr-display">
                  <div className="scanner-qr-frame">
                    <QRCodeSVG
                      value={qrPayload}
                      size={140}
                      level="M"
                      includeMargin={true}
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </div>
                </div>
                <p className="scanner-desc">
                  Open your iPhone Camera or Google Lens and point at the QR code above. It will instantly pop up the student's verification credentials.
                </p>
                <div className="payload-preview-box">
                  <pre className="payload-text">{qrPayload}</pre>
                </div>
                <button
                  type="button"
                  className="btn-copy-payload"
                  onClick={handleCopyPayload}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Decoded Text'}</span>
                </button>
              </div>

              {/* Barcode Testing Box */}
              <div className="scanner-card">
                <div className="scanner-card-header">
                  <span className="scanner-tag">Optical Laser / Mobile App Ready</span>
                  <h4>Code 128 Barcode</h4>
                </div>
                <div className="scanner-barcode-display">
                  <BarcodeCanvas
                    value={displayData.studentId}
                    width={2.2}
                    height={70}
                    fontSize={14}
                  />
                </div>
                <p className="scanner-desc">
                  High-contrast pure Code 128 canvas rasterization with dedicated quiet zones. Fully readable by USB handheld scanners and library check-in apps.
                </p>
                <div className="barcode-meta-info">
                  <div className="meta-pair">
                    <span className="k">Symbology:</span>
                    <span className="v">Code 128 Auto</span>
                  </div>
                  <div className="meta-pair">
                    <span className="k">Encoded String:</span>
                    <span className="v">{displayData.studentId}</span>
                  </div>
                  <div className="meta-pair">
                    <span className="k">Placements:</span>
                    <span className="v">Front Check-in + Back Regulatory</span>
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
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(IDCard);
