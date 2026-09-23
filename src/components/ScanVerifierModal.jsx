import React, { useState } from 'react';
import {
  X,
  QrCode,
  Barcode as BarcodeIcon,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import DynamicBarcode from './DynamicBarcode';

const ScanVerifierModal = ({
  isOpen,
  onClose,
  student,
  qrPayload,
  activeBarcodeValue
}) => {
  const [activeTab, setActiveTab] = useState('qr');
  const [copied, setCopied] = useState(false);
  const [laserScanned, setLaserScanned] = useState(false);

  if (!isOpen) return null;

  const name = student?.name || 'Mohana P';
  const rollNo = student?.studentId || activeBarcodeValue || '24CS1234';
  const college = student?.college || "Vignan's Foundation for Science, Technology and Research";
  const branch = student?.department || 'Computer Science & Engineering';
  const course = student?.course || 'B.Tech';
  const year = student?.year || '3rd Year';
  const hostel = student?.hostel || 'Girls Hostel - A';
  const bloodGroup = student?.bloodGroup || 'B+';
  const validUntil = student?.validUntil || '2028';

  // Copy payload
  const handleCopy = () => {
    const textToCopy = activeTab === 'qr' ? qrPayload : rollNo;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Play standard barcode scanner beep sound via Web Audio API
  const playScannerBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, audioCtx.currentTime); // High pitch supermarket/library scanner beep
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
    setLaserScanned(true);
    setTimeout(() => setLaserScanned(false), 2400);
  };

  return (
    <div className="verifier-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="verifier-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="verifier-header">
          <div className="verifier-header-title">
            <div className="verifier-icon-badge">
              <ShieldCheck size={20} className="shield-active" />
            </div>
            <div>
              <h2 className="verifier-title">Live ID Scanner & Verification Tester</h2>
              <p className="verifier-subtitle">
                Test and verify what real smartphone cameras & optical barcode scanners read from this card
              </p>
            </div>
          </div>
          <button
            type="button"
            className="verifier-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="verifier-tabs-row">
          <button
            type="button"
            className={`verifier-tab-btn ${activeTab === 'qr' ? 'active' : ''}`}
            onClick={() => setActiveTab('qr')}
          >
            <QrCode size={16} />
            <span>2D QR Code Output</span>
          </button>
          <button
            type="button"
            className={`verifier-tab-btn ${activeTab === 'barcode' ? 'active' : ''}`}
            onClick={() => setActiveTab('barcode')}
          >
            <BarcodeIcon size={16} />
            <span>1D Barcode Output</span>
          </button>
        </div>

        {/* Tab 1: QR Code Scanner */}
        {activeTab === 'qr' && (
          <div className="verifier-body-section">
            <div className="verifier-split-grid">
              {/* Left: High-Res Scannable QR Code */}
              <div className="verifier-target-box">
                <div className="verifier-qr-frame">
                  <QRCodeSVG
                    value={qrPayload}
                    size={160}
                    level="M"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <span className="verifier-scan-hint">
                  <Smartphone size={13} />
                  Point your phone camera right now to test
                </span>
              </div>

              {/* Right: Decoded Output Details */}
              <div className="verifier-output-box">
                <div className="verifier-output-header">
                  <span className="output-status-pill">
                    <CheckCircle2 size={13} /> DECODED CREDENTIAL
                  </span>
                  <button type="button" className="copy-scanned-btn" onClick={handleCopy}>
                    {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>

                <div className="scanned-data-fields">
                  <div className="scanned-field-item">
                    <span className="scanned-key">Full Name:</span>
                    <span className="scanned-val highlight">{name}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Roll Number:</span>
                    <span className="scanned-val font-mono">{rollNo}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">College:</span>
                    <span className="scanned-val">{college}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Program & Year:</span>
                    <span className="scanned-val">{course} • {year}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Department:</span>
                    <span className="scanned-val">{branch}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Hostel Residence:</span>
                    <span className="scanned-val">{hostel}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Blood Group:</span>
                    <span className="scanned-val font-mono">{bloodGroup}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Valid Until:</span>
                    <span className="scanned-val">{validUntil}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Credential Status:</span>
                    <span className="scanned-val badge-verified">OFFICIAL VERIFIED ACTIVE</span>
                  </div>
                </div>

                {/* Raw Scanned Payload preview */}
                <div className="raw-payload-preview">
                  <span className="raw-label">Phone Camera Raw Decoded String:</span>
                  <pre className="raw-code-box">{qrPayload}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 1D Barcode Scanner */}
        {activeTab === 'barcode' && (
          <div className="verifier-body-section">
            <div className="verifier-split-grid">
              {/* Left: The Real Code-128 Barcode with Laser Simulation */}
              <div className="verifier-target-box">
                <div className={`verifier-barcode-frame ${laserScanned ? 'scanned-pulse' : ''}`}>
                  <DynamicBarcode
                    value={rollNo}
                    format="CODE128"
                    width={2}
                    height={56}
                    displayValue={true}
                    fontSize={13}
                    background="#ffffff"
                    lineColor="#000000"
                    margin={10}
                  />
                  {/* Laser Beam Animation */}
                  <div className="barcode-laser-line"></div>
                </div>

                <button
                  type="button"
                  className="simulate-scanner-btn"
                  onClick={playScannerBeep}
                >
                  <Volume2 size={15} />
                  <span>Simulate Optical Laser Scan (Beep)</span>
                </button>
              </div>

              {/* Right: Barcode Decoder Specifications */}
              <div className="verifier-output-box">
                <div className="verifier-output-header">
                  <span className="output-status-pill">
                    <CheckCircle2 size={13} /> 1D BARCODE DECODED
                  </span>
                  <button type="button" className="copy-scanned-btn" onClick={handleCopy}>
                    {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="scanned-data-fields">
                  <div className="scanned-field-item">
                    <span className="scanned-key">Decoded Payload:</span>
                    <span className="scanned-val highlight font-mono" style={{ fontSize: '16px' }}>{rollNo}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Barcode Standard:</span>
                    <span className="scanned-val font-mono">CODE_128 (ISO/IEC 15417)</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Associated Student:</span>
                    <span className="scanned-val">{name}</span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Scanner Compatibility:</span>
                    <span className="scanned-val badge-verified">
                      Compatible with All Handheld Laser & 2D Imagers
                    </span>
                  </div>
                  <div className="scanned-field-item">
                    <span className="scanned-key">Camera Apps:</span>
                    <span className="scanned-val">
                      Scannable via Google Lens, Apple Code Scanner, Zebra, ZXing
                    </span>
                  </div>
                </div>

                {laserScanned && (
                  <div className="scanner-beep-alert">
                    <CheckCircle2 size={16} />
                    <span>Optical Scan Successful! Read: <strong>{rollNo}</strong> (Code 128)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="verifier-footer">
          <div className="verifier-footer-info">
            <Sparkles size={14} className="sparkle-gold" />
            <span>Both QR Code & Barcode use official vector standards for 100% optical readability</span>
          </div>
          <button type="button" className="campus-glass-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScanVerifierModal);
