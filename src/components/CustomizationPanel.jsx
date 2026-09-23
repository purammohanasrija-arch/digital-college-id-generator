import React from 'react';
import {
  Download,
  Share2,
  Tv,
  QrCode,
  SunMedium,
  Barcode as BarcodeIcon,
  PenTool,
  Home,
  Droplet,
  Palette,
  ScanLine
} from 'lucide-react';
import { cardTemplates, accentColors } from '../utils/defaultData';

const CustomizationPanel = ({
  selectedTemplate,
  onSelectTemplate,
  selectedAccent,
  onSelectAccent,
  showBackground,
  onToggleBackground,
  showQRCode,
  onToggleQRCode,
  showTagline,
  onToggleTagline,
  showBarcode,
  onToggleBarcode,
  showSignature,
  onToggleSignature,
  showHostel,
  onToggleHostel,
  showBloodGroup,
  onToggleBloodGroup,
  onOpenLogoStudio,
  onOpenScanner,
  onDownload,
  onShare,
  isDownloading
}) => {
  return (
    <div className="stage-right-panel-wrap">
      {/* Top handwriting script banner floating in sky above right card */}
      <div className="panel-floating-script-header" aria-hidden="true">
        <span className="floating-quote-line">More than a Student,</span>
        <span className="floating-quote-line">A Future Builder ♡</span>
      </div>

      <aside className="campus-glass-card customization-panel" aria-label="Card Customization Options">
        {/* 1. Choose a Template (8 selectable options) */}
        <div className="custom-section">
        <h3 className="custom-section-heading">Choose a Template</h3>
        <div className="template-thumbnails-grid eight-templates">
          {cardTemplates.map((tpl) => {
            const isSelected = selectedTemplate?.id === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                className={`template-thumb-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectTemplate?.(tpl)}
                title={`${tpl.name}: ${tpl.styleDesc}`}
              >
                <div className="thumb-preview-box">
                  <div className={`thumb-gradient-preview thumb-bg-${tpl.id}`}>
                    <div className="thumb-inner-accent"></div>
                  </div>
                </div>
                <span className="thumb-label">{tpl.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Accent Color (6 selectable swatches) */}
      <div className="custom-section accent-section">
        <h3 className="custom-section-heading">Accent Color</h3>
        <div className="accent-swatches-row">
          {accentColors.map((color) => {
            const isSelected = selectedAccent?.id === color.id;
            return (
              <button
                key={color.id}
                type="button"
                className={`accent-color-circle ${isSelected ? 'active' : ''}`}
                style={{
                  backgroundColor: color.hex,
                  boxShadow: isSelected
                    ? `0 0 0 2px #0f172a, 0 0 0 4px ${color.ring}, 0 0 16px ${color.glow}`
                    : undefined
                }}
                onClick={() => onSelectAccent?.(color)}
                title={`Set accent color to ${color.name}`}
                aria-label={color.name}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Display Controls (7 Instant Toggles) */}
      <div className="custom-section toggles-section">
        <h3 className="custom-section-heading">Display Controls</h3>

        {/* Show Background */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <Tv size={15} className="toggle-icon" />
            <span className="toggle-text">Show Background</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showBackground}
              onChange={(e) => onToggleBackground?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show QR Code */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <QrCode size={15} className="toggle-icon" />
            <span className="toggle-text">Show QR Code</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showQRCode}
              onChange={(e) => onToggleQRCode?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show Barcode */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <BarcodeIcon size={15} className="toggle-icon" />
            <span className="toggle-text">Show Barcode</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showBarcode}
              onChange={(e) => onToggleBarcode?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show Tagline */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <SunMedium size={15} className="toggle-icon" />
            <span className="toggle-text">Show Tagline</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showTagline}
              onChange={(e) => onToggleTagline?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show Signature */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <PenTool size={15} className="toggle-icon" />
            <span className="toggle-text">Show Signature</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showSignature}
              onChange={(e) => onToggleSignature?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show Hostel */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <Home size={15} className="toggle-icon" />
            <span className="toggle-text">Show Hostel</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showHostel}
              onChange={(e) => onToggleHostel?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        {/* Show Blood Group */}
        <div className="campus-toggle-row">
          <div className="toggle-label-wrap">
            <Droplet size={15} className="toggle-icon" />
            <span className="toggle-text">Show Blood Group</span>
          </div>
          <label className="campus-switch">
            <input
              type="checkbox"
              checked={showBloodGroup}
              onChange={(e) => onToggleBloodGroup?.(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
      </div>

      {/* 4. Custom Logo Studio Action */}
      <div className="custom-section studio-btn-wrap">
        <button
          type="button"
          className="campus-glass-btn custom-logo-trigger-btn"
          onClick={onOpenLogoStudio}
        >
          <Palette size={15} className="btn-icon" />
          <span>Create Custom Logo Studio</span>
        </button>
      </div>

      {/* 5. Download & Share Action Buttons */}
      <div className="panel-actions-group">
        {onOpenScanner && (
          <button
            type="button"
            className="campus-glass-btn verify-scanner-trigger-btn"
            onClick={onOpenScanner}
            title="Open Live Scanner Verifier to test QR Code & Barcode"
          >
            <ScanLine size={15} className="btn-icon" />
            <span>📷 Test Scanner (QR & Barcode)</span>
          </button>
        )}

        <button
          type="button"
          className="campus-gradient-btn download-btn"
          disabled={isDownloading}
          onClick={onDownload}
          style={{
            '--accent-glow': selectedAccent?.glow || 'rgba(168, 85, 247, 0.55)'
          }}
        >
          <Download size={17} className="btn-icon" />
          <span>{isDownloading ? 'Generating High-Res ID...' : '⬇ Download ID'}</span>
        </button>

        <button
          type="button"
          className="campus-glass-btn share-btn"
          onClick={onShare}
        >
          <Share2 size={16} className="btn-icon" />
          <span>Share</span>
        </button>
      </div>
    </aside>

    {/* 6. Handwriting script bottom right floating outside glass card */}
    <div className="panel-script-footer right-script" aria-hidden="true">
      <div className="cursive-tagline-multiline">
        <span className="script-line">Create</span>
        <span className="script-line">Belong</span>
        <span className="script-line">Achieve</span>
        <span className="script-dash-underline"></span>
      </div>
    </div>
  </div>
  );
};

export default React.memo(CustomizationPanel);
