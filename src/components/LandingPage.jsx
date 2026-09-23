import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Barcode as BarcodeIcon,
  Palette,
  Download,
  Layers,
  CheckCircle2,
  ScanLine,
  Eye,
  GraduationCap,
  Zap,
  Globe
} from 'lucide-react';
import IDCard from './IDCard';
import { initialStudentState, cardTemplates, accentColors, defaultLogoConfig } from '../utils/defaultData';

const LandingPage = ({
  onLaunchStudio,
  onOpenTemplates,
  onOpenScanner
}) => {
  return (
    <div className="campus-landing-page">
      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-content">
          {/* Status Badge */}
          <div className="landing-badge-pill">
            <Sparkles size={14} className="badge-spark-icon" />
            <span>Next-Gen Digital Campus Identity Platform</span>
            <span className="badge-live-dot"></span>
          </div>

          {/* Main Headline */}
          <h1 className="landing-main-title">
            Your Digital Identity, <br />
            <span className="title-gradient-glow">Futuristic & Verified.</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-subtitle">
            Generate stunning 3D holographic college ID cards in seconds. Equipped with real camera-scannable QR verification, authentic Code-128 barcodes, custom university crests, and 300 DPI print-ready rendering.
          </p>

          {/* CTA Action Buttons */}
          <div className="landing-cta-row">
            <button
              type="button"
              className="campus-gradient-btn landing-primary-btn"
              onClick={onLaunchStudio}
            >
              <span>Create Your ID Now</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="campus-glass-btn landing-secondary-btn"
              onClick={onOpenTemplates}
            >
              <Layers size={16} />
              <span>Explore 8 Templates</span>
            </button>

            <button
              type="button"
              className="campus-glass-btn landing-tertiary-btn"
              onClick={onOpenScanner}
              title="Test real phone camera & laser scanner"
            >
              <ScanLine size={16} className="text-cyan" />
              <span>Test Live Scanner</span>
            </button>
          </div>

          {/* Trust Metric Badges */}
          <div className="landing-trust-strip">
            <div className="trust-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>100% Camera Scannable</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={15} className="text-cyan" />
              <span>ISO/IEC Code 128 Barcodes</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={15} className="text-purple" />
              <span>Print-Ready 300 DPI</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive 3D Preview Teaser */}
        <div className="landing-hero-preview-anchor">
          <div className="hero-preview-glow" aria-hidden="true"></div>
          <div className="hero-card-scale-wrap" onClick={onLaunchStudio} title="Click to open ID Studio">
            <IDCard
              student={initialStudentState}
              template={cardTemplates[0]}
              accentColor={accentColors[0]}
              logoConfig={defaultLogoConfig}
              activeSide="front"
              onToggleSide={() => {}}
              onOpenScanner={onOpenScanner}
              showBackground={true}
              showQRCode={true}
              showTagline={true}
              showBarcode={true}
              showSignature={true}
              showHostel={true}
              showBloodGroup={true}
            />
            <div className="hero-preview-overlay-cta">
              <button type="button" className="hero-overlay-pill" onClick={onLaunchStudio}>
                <Sparkles size={14} />
                <span>Launch Interactive Studio</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars Grid */}
      <section className="landing-features-section">
        <div className="features-header">
          <h2 className="features-title">Engineered for Tomorrow's Universities</h2>
          <p className="features-desc">Every element is crafted with vector precision, optical scannability, and high-performance glassmorphism.</p>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-box glass-card">
            <div className="feature-icon-wrap icon-cyan">
              <QrCode size={24} />
            </div>
            <h3 className="feature-heading">Real Camera-Scannable QR</h3>
            <p className="feature-text">
              High-contrast vector QR codes with calibrated quiet zones. Scannable immediately by any iPhone camera, Google Lens, or Android imager without specialized apps.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-box glass-card">
            <div className="feature-icon-wrap icon-purple">
              <BarcodeIcon size={24} />
            </div>
            <h3 className="feature-heading">Authentic Code-128 Barcodes</h3>
            <p className="feature-text">
              Standards-compliant 1D barcodes dynamically generated via JsBarcode. Works seamlessly with university library turnstiles, gate scanners, and optical readers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-box glass-card">
            <div className="feature-icon-wrap icon-pink">
              <Palette size={24} />
            </div>
            <h3 className="feature-heading">Custom College Logo Studio</h3>
            <p className="feature-text">
              Upload your university's official crest file (PNG/SVG) or design a custom crest with emblems, mottos, and custom colorways in the built-in studio.
            </p>
          </div>

          {/* Card 4 */}
          <div className="feature-box glass-card">
            <div className="feature-icon-wrap icon-gold">
              <Download size={24} />
            </div>
            <h3 className="feature-heading">Print-Ready 300 DPI Export</h3>
            <p className="feature-text">
              Export ultra-sharp 3x resolution PNG badges calibrated for PVC plastic ID card printers and digital mobile wallets.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works 3-Step Section */}
      <section className="landing-steps-section">
        <div className="steps-header">
          <h2 className="steps-title">Create Your Digital Credential in 3 Easy Steps</h2>
        </div>

        <div className="steps-row">
          <div className="step-card glass-card">
            <div className="step-number">01</div>
            <h4 className="step-title">Enter Student Details</h4>
            <p className="step-text">Fill in your name, roll number, academic program, branch, hostel, and upload your portrait photo.</p>
          </div>

          <div className="step-card glass-card">
            <div className="step-number">02</div>
            <h4 className="step-title">Style & Personalize</h4>
            <p className="step-text">Select from 8 futuristic frosted acrylic templates, choose your favorite neon aura accent, and customize your college crest.</p>
          </div>

          <div className="step-card glass-card">
            <div className="step-number">03</div>
            <h4 className="step-title">Download & Verify</h4>
            <p className="step-text">Test the QR and barcode with your phone, export a high-res 300 DPI badge, and share your digital credential anywhere.</p>
          </div>
        </div>

        {/* Bottom Giant CTA Banner */}
        <div className="landing-bottom-cta-banner glass-card">
          <div className="cta-banner-content">
            <h3 className="cta-banner-title">Ready to build your digital college identity?</h3>
            <p className="cta-banner-sub">Step into the future of academic credentials with CampusID.</p>
          </div>
          <button
            type="button"
            className="campus-gradient-btn cta-banner-btn"
            onClick={onLaunchStudio}
          >
            <Sparkles size={16} />
            <span>Launch ID Studio Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(LandingPage);
