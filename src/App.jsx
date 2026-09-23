import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import CampusNavbar from './components/CampusNavbar';
import LandingPage from './components/LandingPage';
import CreateIDForm from './components/CreateIDForm';
import HoloCenterStage from './components/HoloCenterStage';
import CustomizationPanel from './components/CustomizationPanel';
import CampusFooter from './components/CampusFooter';
import AuroraBackground from './components/AuroraBackground';
import MouseGlow from './components/MouseGlow';
import LogoStudioModal from './components/LogoStudioModal';
import ScanVerifierModal from './components/ScanVerifierModal';
import Toast from './components/Toast';
import {
  initialStudentState,
  cardTemplates,
  accentColors,
  sampleColleges,
  defaultLogoConfig
} from './utils/defaultData';
import {
  X,
  Check,
  Copy,
  Share2,
  Sparkles,
  ShieldCheck,
  Download,
  Palette,
  Layers,
  Award
} from 'lucide-react';
import './App.css';

function App() {
  // 1. Student details with localStorage persistence
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('campusid_student_state_v3');
      return saved ? JSON.parse(saved) : initialStudentState;
    } catch (e) {
      return initialStudentState;
    }
  });

  // 2. Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const savedId = localStorage.getItem('campusid_template_id_v3');
      const found = cardTemplates.find((t) => t.id === savedId);
      return found || cardTemplates[0];
    } catch (e) {
      return cardTemplates[0];
    }
  });

  // 3. Selected Accent Color
  const [selectedAccent, setSelectedAccent] = useState(() => {
    try {
      const savedId = localStorage.getItem('campusid_accent_id_v3');
      const found = accentColors.find((c) => c.id === savedId);
      return found || accentColors[0];
    } catch (e) {
      return accentColors[0];
    }
  });

  // 4. Custom Logo Studio Configuration
  const [logoConfig, setLogoConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('campusid_logo_config_v3');
      return saved ? JSON.parse(saved) : defaultLogoConfig;
    } catch (e) {
      return defaultLogoConfig;
    }
  });

  // 5. 7 Display Controls Toggles with localStorage persistence
  const [toggles, setToggles] = useState(() => {
    try {
      const saved = localStorage.getItem('campusid_toggles_v3');
      return saved ? JSON.parse(saved) : {
        showBackground: true,
        showQRCode: true,
        showTagline: true,
        showBarcode: true,
        showSignature: true,
        showHostel: true,
        showBloodGroup: true
      };
    } catch (e) {
      return {
        showBackground: true,
        showQRCode: true,
        showTagline: true,
        showBarcode: true,
        showSignature: true,
        showHostel: true,
        showBloodGroup: true
      };
    }
  });

  // 6. Theme (Dark / Light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('campusid_theme_dark_v3');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  // Active side ('front' | 'back')
  const [activeSide, setActiveSide] = useState('front');

  // View mode: 'landing' (welcome showcase page) | 'generator' (3-column creation studio)
  const [currentView, setCurrentView] = useState('landing');

  // Navigation tab
  const [activeTab, setActiveTab] = useState('home');

  // Loading & toast
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [toast, setToast] = useState({ message: null, type: 'info' });

  // Modals
  const [isLogoStudioOpen, setIsLogoStudioOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Official verification payload for scanner modal
  const fullVerificationPayload = [
    `🎓 OFFICIAL STUDENT ID VERIFICATION`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Name: ${student.name || 'Mohana P'}`,
    `Roll No: ${student.studentId || '24CS1234'}`,
    `College: ${student.college || "Vignan's Foundation for Science, Technology and Research"}`,
    `Course: ${student.course || 'B.Tech'} (${student.year || '3rd Year'})`,
    `Department: ${student.department || 'Computer Science & Engineering'}`,
    `Hostel: ${student.hostel || 'Girls Hostel - A'}`,
    `Blood Group: ${student.bloodGroup || 'B+'}`,
    `Valid Until: ${student.validUntil || '2028'}`,
    `Status: OFFICIAL VERIFIED ACTIVE`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Issued by CampusID Verification Authority`
  ].join('\n');

  const cardRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campusid_student_state_v3', JSON.stringify(student));
    } catch (e) {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('campusid_template_id_v3', selectedTemplate.id);
    } catch (e) {}
  }, [selectedTemplate]);

  useEffect(() => {
    try {
      localStorage.setItem('campusid_accent_id_v3', selectedAccent.id);
    } catch (e) {}
  }, [selectedAccent]);

  useEffect(() => {
    try {
      localStorage.setItem('campusid_logo_config_v3', JSON.stringify(logoConfig));
    } catch (e) {}
  }, [logoConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('campusid_toggles_v3', JSON.stringify(toggles));
    } catch (e) {}
  }, [toggles]);

  useEffect(() => {
    try {
      localStorage.setItem('campusid_theme_dark_v3', JSON.stringify(isDarkMode));
    } catch (e) {}
  }, [isDarkMode]);

  // Toast dispatch
  const showToast = (message, type = 'info') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ message: null, type: 'info' });
    }, 3400);
  };

  // Student field changes
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // College selector
  const handleCollegeSelect = (collegeName) => {
    if (collegeName === 'Custom College') {
      setStudent((prev) => ({
        ...prev,
        collegeChoice: 'Custom College',
        college: 'Apex Institute of Technology'
      }));
      showToast('Custom college enabled', 'info');
      return;
    }

    const collegeObj = sampleColleges.find((c) => c.name === collegeName);
    if (collegeObj) {
      setStudent((prev) => ({
        ...prev,
        collegeChoice: collegeObj.name,
        college: collegeObj.name,
        tagline: collegeObj.tagline || prev.tagline,
        motto: collegeObj.motto || prev.motto
      }));

      // Update logo config if standard
      if (collegeObj.defaultLogo) {
        setLogoConfig({
          mode: 'default',
          customUpload: '',
          activeLogo: { ...collegeObj.defaultLogo }
        });
      }

      showToast(`Switched to ${collegeObj.shortName}`, 'success');
    }
  };

  // Photo upload
  const handlePhotoUpload = (photoUrl) => {
    setStudent((prev) => ({
      ...prev,
      photo: photoUrl
    }));
    showToast('Portrait photo updated', 'image');
  };

  // Toggle helper
  const handleToggle = (key, val) => {
    setToggles((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  // Generate ID Action
  const handleGenerate = () => {
    showToast('✨ ID Card Generated with Real-Time Hologram!', 'success');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.62 },
        colors: [
          selectedAccent.hex,
          '#38bdf8',
          '#c084fc',
          '#ec4899',
          '#ffffff'
        ]
      });
    } catch (e) {}
  };

  // Download High-Resolution 3x PNG
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);
      showToast('Preparing high-resolution 3x export...', 'download');

      const cardElem = cardRef.current;
      const canvas = await html2canvas(cardElem, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const sanitizedId = (student.studentId || 'student').trim().replace(/[^a-z0-9]/gi, '_');
      link.href = image;
      link.download = `${sanitizedId}_campus_id_${activeSide}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`🎉 Download completed (${activeSide.toUpperCase()} side)`, 'download');

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } catch (err) {
      console.error('Export error:', err);
      showToast('Export failed. Please try again.', 'info');
    } finally {
      setIsDownloading(false);
    }
  };

  // Share Handler
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // Dedicated WhatsApp Card Image Share (supports native file share on mobile, clipboard paste + download + chat redirect on desktop)
  const handleShareWhatsAppCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsSharingWhatsApp(true);
      showToast('Rendering high-resolution ID card image for WhatsApp...', 'info');

      const cardElem = cardRef.current;
      const canvas = await html2canvas(cardElem, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const sanitizedId = (student.studentId || 'student').trim().replace(/[^a-z0-9]/gi, '_');
      const fileName = `${sanitizedId}_campus_id.png`;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast('Failed to generate card image.', 'info');
          setIsSharingWhatsApp(false);
          return;
        }

        const file = new File([blob], fileName, { type: 'image/png' });
        const shareText = `🎓 Official Digital Campus ID - ${student.name || 'Student'}\nRoll No: ${student.studentId || ''}\nCollege: ${student.college || "Vignan's University"}\nBranch: ${student.department || ''}\nCourse: ${student.course || 'B.Tech'}`;

        // 1. Check if device supports Web Share API with Files (Android Chrome, iOS Safari)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${student.name || 'Student'} - CampusID`,
              text: shareText
            });
            showToast('✅ Shared card image successfully!', 'success');
            setIsSharingWhatsApp(false);
            return;
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') {
              setIsSharingWhatsApp(false);
              return;
            }
            console.warn('Native share failed, proceeding with web fallback:', shareErr);
          }
        }

        // 2. Desktop / WhatsApp Web workflow:
        // A. Copy image directly to system clipboard so user can press Ctrl+V into WhatsApp Web chat
        let copiedClipboard = false;
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            copiedClipboard = true;
          }
        } catch (clipErr) {
          console.warn('Clipboard write failed:', clipErr);
        }

        // B. Automatically download high-resolution PNG file
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // C. Open WhatsApp with formatted caption
        const waText = encodeURIComponent(`${shareText}\n\nGenerated via CampusID Digital Credential.`);
        const waUrl = `https://api.whatsapp.com/send?text=${waText}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        if (copiedClipboard) {
          showToast('🎉 Card image copied to clipboard & downloaded! Press Ctrl+V in WhatsApp to paste the card!', 'success', 7000);
        } else {
          showToast('📥 Card image downloaded! Attach it directly in WhatsApp chat.', 'download', 7000);
        }
        setIsSharingWhatsApp(false);
      }, 'image/png');
    } catch (err) {
      console.error('WhatsApp share error:', err);
      showToast('Error sharing card image.', 'info');
      setIsSharingWhatsApp(false);
    }
  };

  // Copy Card Image directly to Clipboard for instant pasting anywhere
  const handleCopyCardImage = async () => {
    if (!cardRef.current) return;
    try {
      showToast('Copying card image to clipboard...', 'info');
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            showToast('📋 Card image copied to clipboard! Ready to paste (Ctrl+V).', 'success');
          } else {
            showToast('Clipboard image copying not supported in this browser.', 'info');
          }
        } catch (err) {
          console.warn('Clipboard image write failed:', err);
          showToast('Could not copy image to clipboard.', 'info');
        }
      }, 'image/png');
    } catch (err) {
      showToast('Error copying image.', 'info');
    }
  };

  const handleCopyShareLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setLinkCopied(true);
      showToast('🎉 ID link copied to clipboard!', 'copy');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 }
        });
      } catch (e) {}
      setTimeout(() => setLinkCopied(false), 2600);
    } catch (e) {
      showToast('Please copy the link from the box below', 'info');
    }
  };

  return (
    <div
      className={`campus-app-root ${isDarkMode ? 'theme-dark' : 'theme-light'}`}
      style={{
        '--current-accent': selectedAccent.hex,
        '--current-accent-ring': selectedAccent.ring,
        '--current-accent-glow': selectedAccent.glow
      }}
    >
      {/* Cosmic Aurora Background */}
      <AuroraBackground />

      {/* Global Mouse-Following Soft Ambient Glow */}
      <MouseGlow />

      {/* Top CampusID Navbar */}
      <CampusNavbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Welcome to CampusID', 'info');
          } else if (tab === 'generate') {
            setCurrentView('generator');
            showToast('Ready to customize & generate ID', 'info');
          } else if (tab === 'templates') {
            setIsTemplatesModalOpen(true);
          } else if (tab === 'about') {
            setIsAboutModalOpen(true);
          }
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => {
          setIsDarkMode((prev) => !prev);
          showToast(!isDarkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
        }}
        studentName={student.name}
        studentId={student.studentId}
        collegeName={student.college}
      />

      {/* Main Content: Landing Welcome Page OR 3-Column Generator Studio */}
      <main className="campus-main-content">
        {currentView === 'landing' ? (
          <LandingPage
            onLaunchStudio={() => {
              setCurrentView('generator');
              setActiveTab('generate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTemplates={() => setIsTemplatesModalOpen(true)}
            onOpenScanner={() => setIsScannerModalOpen(true)}
          />
        ) : (
          <div className="campus-stage-grid">
            {/* LEFT: Student Information Form */}
            <div className="stage-col stage-col-left">
              <CreateIDForm
                student={student}
                onChange={handleStudentChange}
                onCollegeSelect={handleCollegeSelect}
                onPhotoUpload={handlePhotoUpload}
                onGenerate={handleGenerate}
                accentColor={selectedAccent}
              />
            </div>

            {/* CENTER: Live 3D Holographic ID Card Preview on Glowing Pedestal */}
            <div className="stage-col stage-col-center">
              <HoloCenterStage
                student={student}
                cardRef={cardRef}
                template={selectedTemplate}
                accentColor={selectedAccent}
                logoConfig={logoConfig}
                activeSide={activeSide}
                onToggleSide={(side) => setActiveSide(side)}
                onOpenScanner={() => setIsScannerModalOpen(true)}
                showBackground={toggles.showBackground}
                showQRCode={toggles.showQRCode}
                showTagline={toggles.showTagline}
                showBarcode={toggles.showBarcode}
                showSignature={toggles.showSignature}
                showHostel={toggles.showHostel}
                showBloodGroup={toggles.showBloodGroup}
              />
            </div>

            {/* RIGHT: Customization Controls & Actions */}
            <div className="stage-col stage-col-right">
              <CustomizationPanel
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(tpl) => {
                  setSelectedTemplate(tpl);
                  showToast(`Applied ${tpl.name} template`, 'success');
                }}
                selectedAccent={selectedAccent}
                onSelectAccent={(clr) => {
                  setSelectedAccent(clr);
                  showToast(`Applied ${clr.name} accent`, 'success');
                }}
                showBackground={toggles.showBackground}
                onToggleBackground={(v) => handleToggle('showBackground', v)}
                showQRCode={toggles.showQRCode}
                onToggleQRCode={(v) => handleToggle('showQRCode', v)}
                showTagline={toggles.showTagline}
                onToggleTagline={(v) => handleToggle('showTagline', v)}
                showBarcode={toggles.showBarcode}
                onToggleBarcode={(v) => handleToggle('showBarcode', v)}
                showSignature={toggles.showSignature}
                onToggleSignature={(v) => handleToggle('showSignature', v)}
                showHostel={toggles.showHostel}
                onToggleHostel={(v) => handleToggle('showHostel', v)}
                showBloodGroup={toggles.showBloodGroup}
                onToggleBloodGroup={(v) => handleToggle('showBloodGroup', v)}
                onOpenLogoStudio={() => setIsLogoStudioOpen(true)}
                onOpenScanner={() => setIsScannerModalOpen(true)}
                onDownload={handleDownload}
                onShare={handleShare}
                isDownloading={isDownloading}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Pillars Dock & Footer */}
      <CampusFooter />

      {/* Animated Toast Notification */}
      <Toast message={toast.message} type={toast.type} />

      {/* Custom Logo Studio Modal */}
      <LogoStudioModal
        isOpen={isLogoStudioOpen}
        onClose={() => setIsLogoStudioOpen(false)}
        currentLogo={logoConfig}
        defaultCollegeLogo={sampleColleges[0].defaultLogo}
        onApplyLogo={(newLogo) => {
          setLogoConfig(newLogo);
          showToast('🎨 Custom college logo applied to ID!', 'success');
        }}
        onResetLogo={() => {
          setLogoConfig(defaultLogoConfig);
          showToast('Reset to default college logo', 'info');
        }}
      />

      {/* Live ID Scanner & Verification Tester Modal */}
      <ScanVerifierModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        student={student}
        qrPayload={fullVerificationPayload}
        activeBarcodeValue={student.studentId || '24CS1234'}
      />

      {/* Share Modal Dialog */}
      {isShareModalOpen && (
        <div className="campus-modal-backdrop" onClick={() => setIsShareModalOpen(false)}>
          <div className="campus-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-wrap">
                <Share2 size={20} className="modal-icon" />
                <h3 className="modal-title">Share Your CampusID</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="modal-desc">
              Share your digital credential with university officials, recruiters, or friends across multiple channels.
            </p>

            {/* Featured: WhatsApp Card Image Share */}
            <div className="share-whatsapp-highlight-card">
              <div className="whatsapp-highlight-content">
                <div className="whatsapp-badge-icon">📲</div>
                <div className="whatsapp-text-block">
                  <span className="whatsapp-badge-title">Share ID Card on WhatsApp</span>
                  <span className="whatsapp-badge-sub">
                    Directly exports and delivers your high-res digital ID card image to WhatsApp chats
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="whatsapp-primary-share-btn"
                onClick={handleShareWhatsAppCard}
                disabled={isSharingWhatsApp}
              >
                <Share2 size={16} />
                <span>{isSharingWhatsApp ? 'Generating Card Image...' : 'Share Card Image on WhatsApp'}</span>
              </button>
            </div>

            {/* Quick Actions Row: Copy Image to Clipboard & Download High-Res PNG */}
            <div className="modal-action-buttons-row">
              <button
                type="button"
                className="modal-secondary-action-btn"
                onClick={handleCopyCardImage}
                title="Copy Card Image to Clipboard for Ctrl+V in WhatsApp Web / Teams"
              >
                <Copy size={14} />
                <span>Copy Card Image</span>
              </button>
              <button
                type="button"
                className="modal-secondary-action-btn"
                onClick={handleDownload}
                title="Download 3x High-Res PNG"
              >
                <Download size={14} />
                <span>Download PNG</span>
              </button>
            </div>

            {/* Direct Social Media & Messaging Shortcuts */}
            <span className="share-channels-label">Instant 1-Click Channels</span>
            <div className="share-social-grid">
              {/* WhatsApp */}
              <button
                type="button"
                className="share-social-btn whatsapp"
                onClick={handleShareWhatsAppCard}
                title="Share ID Card Image on WhatsApp"
              >
                <div className="social-icon-box">💬</div>
                <span>WhatsApp</span>
              </button>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my verified digital Campus ID card for ${student.college || "Vignan's University"}! 🎓`)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn twitter"
                onClick={() => showToast('Opening Twitter / X...', 'info')}
              >
                <div className="social-icon-box">𝕏</div>
                <span>Twitter / X</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn linkedin"
                onClick={() => showToast('Opening LinkedIn...', 'info')}
              >
                <div className="social-icon-box">💼</div>
                <span>LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(`Official Digital Campus ID - ${student.name || 'Student'}`)}&body=${encodeURIComponent(`Hi,\n\nPlease verify my official digital Campus ID credential for ${student.college || "Vignan's University"}:\n\n${window.location.href}\n\nStudent: ${student.name}\nRoll No: ${student.studentId}\nCourse: ${student.course || 'B.Tech'}\nBranch: ${student.department}\n\nGenerated via CampusID Platform.`)}`}
                className="share-social-btn email"
                onClick={() => showToast('Opening Email...', 'info')}
              >
                <div className="social-icon-box">✉️</div>
                <span>Email</span>
              </a>
            </div>

            {/* System Native Share (Mobile / Supported Browsers) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                type="button"
                className="campus-glass-btn"
                style={{
                  width: '100%',
                  marginBottom: '16px',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '9px'
                }}
                onClick={() => {
                  navigator
                    .share({
                      title: `${student.name || 'Student'} - CampusID Credential`,
                      text: `Check out my official digital Campus ID card for ${student.college}!`,
                      url: window.location.href
                    })
                    .catch(() => {});
                }}
              >
                <Share2 size={14} />
                <span>Open Device Share Menu</span>
              </button>
            )}

            {/* Direct Link Copy Box */}
            <span className="share-channels-label">Direct Credential Link</span>
            <div className="modal-link-box">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="modal-link-input"
              />
              <button
                type="button"
                className="campus-gradient-btn modal-copy-btn"
                onClick={handleCopyShareLink}
              >
                {linkCopied ? <Check size={15} /> : <Copy size={15} />}
                <span>{linkCopied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Gallery Modal */}
      {isTemplatesModalOpen && (
        <div className="campus-modal-backdrop" onClick={() => setIsTemplatesModalOpen(false)}>
          <div className="campus-modal-card templates-gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-wrap">
                <Layers size={20} className="modal-icon" />
                <h3 className="modal-title">All 8 Card Templates</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsTemplatesModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="templates-modal-grid">
              {cardTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className={`template-gallery-item ${selectedTemplate.id === tpl.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    showToast(`Switched to ${tpl.name}`, 'success');
                    setIsTemplatesModalOpen(false);
                  }}
                >
                  <div className={`gallery-item-preview thumb-bg-${tpl.id}`}>
                    <span>{tpl.name}</span>
                  </div>
                  <div className="gallery-item-info">
                    <span className="gallery-item-name">{tpl.name}</span>
                    <span className="gallery-item-desc">{tpl.styleDesc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Modal Dialog */}
      {isAboutModalOpen && (
        <div className="campus-modal-backdrop" onClick={() => setIsAboutModalOpen(false)}>
          <div className="campus-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-wrap">
                <ShieldCheck size={20} className="modal-icon" />
                <h3 className="modal-title">About CampusID</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAboutModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="modal-desc">
              CampusID is a next-generation student identity platform delivering holographic 3D digital badges with camera-scannable QR verification, dynamic themes, and 300 DPI print-ready rendering.
            </p>

            <div className="about-stats-grid">
              <div className="stat-box">
                <span className="stat-number">300 DPI</span>
                <span className="stat-label">Print Quality</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">10</span>
                <span className="stat-label">Universities</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Interactive</span>
              </div>
            </div>

            <button
              type="button"
              className="campus-gradient-btn modal-close-action"
              onClick={() => setIsAboutModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
