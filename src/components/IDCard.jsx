import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import CollegeLogo from './CollegeLogo';
import DynamicBarcode from './DynamicBarcode';
import {
  User,
  GraduationCap,
  Building,
  Droplet,
  Clock,
  RotateCw,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ScanLine
} from 'lucide-react';

const IDCard = ({
  student,
  cardRef,
  template,
  accentColor,
  logoConfig,
  activeSide = 'front',
  onToggleSide,
  onOpenScanner,
  showBackground = true,
  showQRCode = true,
  showTagline = true,
  showBarcode = true,
  showSignature = true,
  showHostel = true,
  showBloodGroup = true
}) => {
  // Student values with dynamic fallbacks
  const name = student.name || 'Mohana P';
  const rollNo = student.studentId || '24CS1234';
  const branch = student.department || 'Computer Science & Engineering';
  const course = student.course || 'B.Tech';
  const year = student.year || '3rd Year';
  const hostel = student.hostel || 'Girls Hostel - A';
  const bloodGroup = student.bloodGroup || 'B+';
  const validUntil = student.validUntil || '2028';
  const college = student.college || "Vignan's Foundation for Science, Technology and Research";
  const photo = student.photo || '/mohana_center.png';
  const tagline = student.tagline || 'Learn\nInnovate\nLead ✨';
  const motto = student.motto || 'For a Better Tomorrow';

  // 1. Detailed Full Official QR Verification Payload (Scannable by all iPhone & Android Cameras, Google Lens, Samsung Camera)
  const fullVerificationPayload = [
    `🎓 OFFICIAL STUDENT ID VERIFICATION`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Name: ${name}`,
    `Roll No: ${rollNo}`,
    `College: ${college}`,
    `Course: ${course} (${year})`,
    `Department: ${branch}`,
    `Hostel: ${hostel}`,
    `Blood Group: ${bloodGroup}`,
    `Valid Until: ${validUntil}`,
    `Status: OFFICIAL VERIFIED ACTIVE`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Issued by CampusID Verification Authority`
  ].join('\n');

  // 2. Concise Front Mini-Badge Payload (Optimized for 50px badge size so modules are crisp and easily scannable)
  const conciseFrontPayload = [
    `🎓 STUDENT ID: ${rollNo}`,
    `Name: ${name}`,
    `Branch: ${branch}`,
    `College: ${college.split(' ')[0]}`,
    `Valid: ${validUntil} • VERIFIED ACTIVE`
  ].join('\n');

  const isCustomLogo =
    logoConfig && (
      logoConfig.mode === 'creator' ||
      logoConfig.mode === 'upload' ||
      (logoConfig.mode === 'default' && (student?.collegeChoice ? !student.collegeChoice.includes('Vignan') : !college.includes('Vignan')))
    );

  return (
    <div className="holo-card-presentation-wrap">
      {/* Side Switcher Floating Pill */}
      <div className="card-quick-toggle-pill">
        <button
          type="button"
          className={`side-pill-btn ${activeSide === 'front' ? 'active' : ''}`}
          onClick={() => onToggleSide?.('front')}
        >
          Front
        </button>
        <button
          type="button"
          className={`side-pill-btn ${activeSide === 'back' ? 'active' : ''}`}
          onClick={() => onToggleSide?.('back')}
        >
          Back (QR)
        </button>
        <button
          type="button"
          className="flip-icon-btn"
          onClick={() => onToggleSide?.(activeSide === 'front' ? 'back' : 'front')}
          title="Flip Card"
          aria-label="Flip Card"
        >
          <RotateCw size={13} />
        </button>
        {onOpenScanner && (
          <button
            type="button"
            className="side-pill-btn verifier-pill-btn"
            onClick={onOpenScanner}
            title="Test Live Scanner (QR & Barcode)"
          >
            <ScanLine size={12} className="scan-icon-spark" />
            <span>Test Scan</span>
          </button>
        )}
      </div>

      {/* Hero ID Card Wrapper with Ambient Bloom and 3D Depth */}
      <div className="card-hero-glow-positioner">
        {/* Luminous Ambient Bloom Glow Layer directly behind the card */}
        <div className="card-ambient-bloom-glow" aria-hidden="true"></div>

        {/* The Target Card Container for html2canvas / export */}
        <div
          ref={cardRef}
          id="campus-hologram-card"
          className={`campus-id-card-frame template-${template?.id || 'aurora'} ${template?.isDark ? 'theme-card-dark' : 'theme-card-light'} ${activeSide === 'back' ? 'is-back' : ''}`}
          style={{
            '--accent-color': accentColor?.hex || '#a855f7',
            '--accent-ring': accentColor?.ring || '#c084fc',
            '--accent-glow': accentColor?.glow || 'rgba(168, 85, 247, 0.55)',
            background: template?.cardBg
          }}
        >
          {/* Iridescent Crystal Specular Overlay */}
          <div className="card-glass-specular-edge" aria-hidden="true"></div>

          {/* Prismatic Dynamic Holographic Sheen Layer */}
          <div className="card-holographic-sheen" aria-hidden="true"></div>

          {/* Luminous Beveled Edge Highlight */}
          <div className="card-beveled-glass-highlight" aria-hidden="true"></div>

          {/* ========================================================
              FRONT SIDE OF CARD (Luminous Frosted Crystal Acrylic)
              ======================================================== */}
          {activeSide === 'front' ? (
            <div className="card-face card-face-front">
              {/* Top College Header Bar */}
              <div className="card-header-vignan">
                <div className="vignan-header-left">
                  {/* College Crest / Custom Logo */}
                  <div className="vignan-crest-box">
                    {isCustomLogo ? (
                      <CollegeLogo config={logoConfig} size={48} />
                    ) : (
                      <img
                        src="/vignan-crest.svg"
                        alt="College Crest"
                        className="vignan-crest-img"
                        onError={(e) => {
                          e.target.src = '/college-crest.svg';
                        }}
                      />
                    )}
                  </div>
                  <div className="vignan-header-titles">
                    <h3 className="vignan-title-primary">
                      {college.includes("Vignan") ? "VIGNAN'S" : college.split(' ')[0]}
                    </h3>
                    <p className="vignan-title-sub">
                      {college.includes("Vignan") ? "Foundation for Science, Technology and Research" : college}
                    </p>
                    <p className="vignan-title-deemed">Deemed to be University</p>
                  </div>
                </div>

                {/* Right Tagline */}
                {showTagline && (
                  <div className="vignan-header-tagline">
                    {tagline.split('\n').map((line, idx) => (
                      <span
                        key={idx}
                        className={`tagline-word ${idx === tagline.split('\n').length - 1 ? 'highlight' : ''}`}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Campus Landscape Backdrop & Centered Student Portrait */}
              <div className="card-middle-stage">
                {showBackground && (
                  <div className="card-campus-backdrop" aria-hidden="true">
                    <div className="campus-building-silhouette"></div>
                    <div className="campus-backdrop-glow"></div>
                  </div>
                )}

                {/* Student Portrait Center with glowing rounded squircle frame */}
                <div className="card-portrait-center">
                  <div className="portrait-glow-frame">
                    <img
                      src={photo}
                      alt={name}
                      className="portrait-student-img"
                      crossOrigin="anonymous"
                    />
                    {/* Embedded Glass Specular Reflection on portrait */}
                    <div className="portrait-glass-reflection" aria-hidden="true"></div>
                  </div>
                </div>
              </div>

              {/* Student Name & Academic Program */}
              <div className="card-student-identity">
                <h2 className="student-main-name">{name}</h2>
                <div className="student-degree-line">{course}</div>
                <div className="student-branch-line">{branch}</div>
              </div>

              {/* Student Key-Value Details Grid */}
              <div className="card-details-table">
                <div className="detail-row">
                  <div className="detail-key">
                    <User size={13} className="detail-icon" />
                    <span>Roll No</span>
                  </div>
                  <div className="detail-colon">:</div>
                  <div className="detail-val roll-val">{rollNo}</div>
                </div>

                <div className="detail-row">
                  <div className="detail-key">
                    <GraduationCap size={13} className="detail-icon" />
                    <span>Year</span>
                  </div>
                  <div className="detail-colon">:</div>
                  <div className="detail-val">{year}</div>
                </div>

                {showHostel && (
                  <div className="detail-row">
                    <div className="detail-key">
                      <Building size={13} className="detail-icon" />
                      <span>Hostel</span>
                    </div>
                    <div className="detail-colon">:</div>
                    <div className="detail-val">{hostel}</div>
                  </div>
                )}

                {showBloodGroup && (
                  <div className="detail-row">
                    <div className="detail-key">
                      <Droplet size={13} className="detail-icon" />
                      <span>Blood Group</span>
                    </div>
                    <div className="detail-colon">:</div>
                    <div className="detail-val blood-val">{bloodGroup}</div>
                  </div>
                )}

                {validUntil && (
                  <div className="detail-row">
                    <div className="detail-key">
                      <Clock size={13} className="detail-icon" />
                      <span>Valid Until</span>
                    </div>
                    <div className="detail-colon">:</div>
                    <div className="detail-val">{validUntil}</div>
                  </div>
                )}
              </div>

              {/* Bottom Row: Signature, QR Badge, & University Branding */}
              <div className="card-bottom-auth-row">
                {/* Authorized Signature */}
                {showSignature ? (
                  <div className="auth-signature-block">
                    <div className="signature-display-wrap">
                      <img
                        src="/authorized-signature.svg"
                        alt="Authorized Signature"
                        className="signature-crop-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="auth-label">Authorized Signatory</div>
                  </div>
                ) : <div className="auth-placeholder"></div>}

                {/* Front Scannable QR Mini-Badge with White Contrast Backing */}
                {showQRCode && (
                  <div
                    className="front-qr-badge"
                    title="Click to enlarge & scan student verification"
                    onClick={onOpenScanner}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenScanner?.();
                      }
                    }}
                  >
                    <div className="qr-badge-inner-glass">
                      <QRCodeSVG
                        value={conciseFrontPayload}
                        size={64}
                        level="M"
                        includeMargin={true}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                  </div>
                )}

                {/* University Branding Bottom Right */}
                <div className="vignan-bottom-logo-block">
                  <img
                    src="/vignan-branding.svg"
                    alt={motto}
                    className="vignan-bottom-logo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="vignan-bottom-fallback-labels">
                    <span className="vignan-bottom-name">
                      {college.includes("Vignan") ? "VIGNAN" : college.split(' ')[0]}
                    </span>
                    <span className="vignan-bottom-sub">{motto}</span>
                  </div>
                </div>
              </div>

              {/* Right Vertical Barcode Strip - Real Standards-Compliant Code-128 SVG Barcode */}
              {showBarcode && (
                <aside className="card-right-vertical-barcode" aria-label={`Vertical Barcode for ${rollNo}`}>
                  <div className="vertical-barcode-rotator" title={`Code-128 Barcode: ${rollNo}`}>
                    <DynamicBarcode
                      value={rollNo}
                      format="CODE128"
                      width={1.35}
                      height={28}
                      displayValue={false}
                      background="#ffffff"
                      lineColor="#000000"
                      margin={3}
                    />
                  </div>
                  <div className="barcode-code-vert-text">{rollNo}</div>
                </aside>
              )}
            </div>
          ) : (
            /* ========================================================
                BACK SIDE OF CARD (Official Verification & Emergency Info)
                ======================================================== */
            <div className="card-face card-face-back">
              <div className="back-header-strip">
                <ShieldCheck size={17} className="shield-icon" />
                <span>OFFICIAL DIGITAL STUDENT BADGE • VERIFIED</span>
              </div>

              {/* Real Dynamic Camera Scannable QR Code */}
              <div className="back-qr-showcase">
                <div className="qr-code-holder">
                  <QRCodeSVG
                    value={fullVerificationPayload}
                    size={160}
                    level="M"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <p className="qr-caption">Scan with any phone camera (Google Lens / iOS) to verify identity</p>
              </div>

              {/* Real Code-128 Horizontal Barcode on Back */}
              {showBarcode && (
                <div className="back-barcode-showcase" title={`Code-128 Barcode: ${rollNo}`}>
                  <div className="back-barcode-box">
                    <DynamicBarcode
                      value={rollNo}
                      format="CODE128"
                      width={1.6}
                      height={38}
                      displayValue={true}
                      fontSize={11}
                      background="#ffffff"
                      lineColor="#000000"
                      margin={6}
                    />
                  </div>
                  <span className="back-barcode-label">OFFICIAL 1D BARCODE (CODE-128)</span>
                </div>
              )}

              {/* Structured Info Grid */}
              <div className="back-info-grid">
                <div className="back-info-item">
                  <Phone size={13} className="back-icon" />
                  <div>
                    <div className="back-info-title">Emergency Contact</div>
                    <div className="back-info-val">+91 98480 12345 (Campus Security)</div>
                  </div>
                </div>

                <div className="back-info-item">
                  <Mail size={13} className="back-icon" />
                  <div>
                    <div className="back-info-title">Student Institutional Email</div>
                    <div className="back-info-val">{student.email || `${name.toLowerCase().replace(/\s+/g, '.')}@univ.ac.in`}</div>
                  </div>
                </div>

                <div className="back-info-item">
                  <MapPin size={13} className="back-icon" />
                  <div>
                    <div className="back-info-title">Campus Address</div>
                    <div className="back-info-val">Vadlamudi, Guntur, AP - 522213</div>
                  </div>
                </div>
              </div>

              {/* Official Statutory Disclaimer */}
              <div className="back-terms-box">
                <p>
                  This card is the property of {college}. If found, please return to the Office of the Registrar. Official verified digital credential.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IDCard);
