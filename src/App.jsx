import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import Footer from './components/Footer';
import AuroraBackground from './components/AuroraBackground';
import MouseGlow from './components/MouseGlow';
import LogoStudioModal from './components/LogoStudioModal';
import BentoCommandCenterLayout from './layouts/BentoCommandCenterLayout';
import {
  IDFirstLayout,
  CreativeLayout,
  SidebarLayout,
  FloatingLayout
} from './layouts/OtherLayouts';
import {
  initialStudentState,
  sampleStudentData,
  cardThemes,
  initialLogoConfig,
  sampleColleges
} from './utils/defaultData';
import { Sparkles } from 'lucide-react';
import './App.css';

function App() {
  // Persistent layout selection
  const [activeLayout, setActiveLayout] = useState(() => {
    try {
      return localStorage.getItem('digital_id_selected_layout') || 'bento';
    } catch (e) {
      return 'bento';
    }
  });

  // State with localStorage recovery
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('digital_id_student_state');
      return saved ? JSON.parse(saved) : initialStudentState;
    } catch (e) {
      return initialStudentState;
    }
  });

  const [errors, setErrors] = useState({});
  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      const savedId = localStorage.getItem('digital_id_theme_id');
      const found = cardThemes.find((t) => t.id === savedId);
      return found || cardThemes[0];
    } catch (e) {
      return cardThemes[0];
    }
  });

  const [activeSide, setActiveSide] = useState('front');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoConfig, setLogoConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('digital_id_logo_config');
      return saved ? JSON.parse(saved) : initialLogoConfig;
    } catch (e) {
      return initialLogoConfig;
    }
  });

  const [isLogoStudioOpen, setIsLogoStudioOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  const cardRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Check if saved draft exists on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('digital_id_generator_draft');
      if (saved) {
        setHasSavedDraft(true);
      }
    } catch (e) {}
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('digital_id_student_state', JSON.stringify(student));
    } catch (e) {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('digital_id_theme_id', selectedTheme.id);
    } catch (e) {}
  }, [selectedTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('digital_id_logo_config', JSON.stringify(logoConfig));
    } catch (e) {}
  }, [logoConfig]);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSelectLayout = (layoutId) => {
    setActiveLayout(layoutId);
    try {
      localStorage.setItem('digital_id_selected_layout', layoutId);
    } catch (e) {}
    showToast(`Switched to ${layoutId.replace('-', ' ').toUpperCase()} layout`);
  };

  // Controlled input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // College selection handler
  const handleCollegeChange = (selectedName) => {
    const isCustom = selectedName === 'Custom College';
    const collegeMeta = sampleColleges.find((c) => c.name === selectedName);

    setStudent((prev) => ({
      ...prev,
      collegeChoice: selectedName,
      college: isCustom ? (prev.customCollege?.name || '') : selectedName
    }));

    if (errors.college) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.college;
        return updated;
      });
    }

    // Automatically change the logo on the ID card
    if (collegeMeta) {
      setLogoConfig({
        mode: 'default',
        customUpload: '',
        activeLogo: { ...collegeMeta.defaultLogo }
      });
    } else if (isCustom) {
      setLogoConfig({
        mode: 'default',
        customUpload: '',
        activeLogo: {
          text: student.customCollege?.shortName?.trim() || 'COL',
          shape: 'circle',
          icon: 'education',
          style: 'gradient',
          bgColor: '#1e3a8a',
          textColor: '#ffffff',
          borderColor: '#f59e0b',
          border: 'medium',
          size: 46
        }
      });
    }
  };

  // Custom college sub-fields handler
  const handleCustomCollegeChange = (field, value) => {
    setStudent((prev) => {
      const updatedCustom = {
        ...prev.customCollege,
        [field]: value
      };
      return {
        ...prev,
        customCollege: updatedCustom,
        college: field === 'name' ? value : prev.college
      };
    });

    if (field === 'name' && errors.college) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.college;
        return updated;
      });
    }

    if (field === 'shortName' && logoConfig.mode === 'default') {
      const monogram = value.trim().toUpperCase() || 'COL';
      setLogoConfig((prev) => ({
        ...prev,
        activeLogo: {
          ...prev.activeLogo,
          text: monogram
        }
      }));
    }
  };

  // Upload College Logo handler
  const handleLogoUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoConfig((prev) => ({
        ...prev,
        mode: 'upload',
        customUpload: event.target?.result || '',
        uploadShape: prev.uploadShape || 'circle',
        uploadBg: prev.uploadBg || 'white',
        uploadSize: prev.uploadSize || 48,
        uploadFit: prev.uploadFit || 'contain'
      }));
      showToast('🖼️ Custom college logo uploaded!');
    };
    reader.readAsDataURL(file);
  };

  // Update logo configuration settings (shape, background, size, fit)
  const handleUpdateLogoSetting = (field, value) => {
    setLogoConfig((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Remove Logo handler: restores the selected college's default logo
  const handleLogoRemove = () => {
    const isCustom = student.collegeChoice === 'Custom College';
    const collegeMeta = sampleColleges.find((c) => c.name === student.collegeChoice);

    if (collegeMeta) {
      setLogoConfig({
        mode: 'default',
        customUpload: '',
        activeLogo: { ...collegeMeta.defaultLogo }
      });
    } else if (isCustom) {
      setLogoConfig({
        mode: 'default',
        customUpload: '',
        activeLogo: {
          text: student.customCollege?.shortName?.trim() || 'COL',
          shape: 'circle',
          icon: 'education',
          style: 'gradient',
          bgColor: '#1e3a8a',
          textColor: '#ffffff',
          borderColor: '#f59e0b',
          border: 'medium',
          size: 46
        }
      });
    }
    showToast('🏛️ Restored default college crest');
  };

  // Apply custom created logo from Custom Logo Creator modal
  const handleApplyCustomLogo = (newLogoConfig) => {
    setLogoConfig({
      mode: 'creator',
      customUpload: '',
      activeLogo: { ...newLogoConfig.activeLogo },
      customLogo: { ...newLogoConfig.activeLogo }
    });
    showToast('🎨 Custom designed logo applied to ID card!');
  };

  // Custom color tuning in Theme Studio
  const handleCustomColorChange = (key, val) => {
    setSelectedTheme((prev) => ({
      ...prev,
      [key]: val,
      gradient: key === 'primary'
        ? `linear-gradient(135deg, ${val} 0%, ${prev.secondary || val} 55%, ${val} 100%)`
        : prev.gradient
    }));
  };

  // Photo upload using FileReader for base64 data URL
  const handlePhotoUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setStudent((prev) => ({
        ...prev,
        photo: event.target?.result || ''
      }));
      showToast('📷 Student portrait photo updated');
    };
    reader.readAsDataURL(file);
  };

  // Remove photo handler
  const handlePhotoRemove = () => {
    setStudent((prev) => ({
      ...prev,
      photo: ''
    }));
    showToast('Student photo removed');
  };

  // Auto-fill sample student data for rapid testing
  const handleLoadSample = () => {
    setStudent({ ...sampleStudentData });
    const defaultMeta = sampleColleges[0];
    setLogoConfig({
      mode: 'default',
      customUpload: '',
      activeLogo: { ...defaultMeta.defaultLogo }
    });
    setErrors({});
    setIsGenerated(true);
    showToast('✨ Auto-filled sample student credentials');
  };

  // Save draft to localStorage
  const handleSaveDraft = () => {
    try {
      const dataToSave = {
        student,
        logoConfig,
        selectedThemeId: selectedTheme.id
      };
      localStorage.setItem('digital_id_generator_draft', JSON.stringify(dataToSave));
      setHasSavedDraft(true);
      showToast('💾 Draft successfully saved to local browser storage!');
    } catch (err) {
      console.error(err);
      showToast('⚠️ Could not save draft to local storage.');
    }
  };

  // Load draft from localStorage
  const handleLoadDraft = () => {
    try {
      const saved = localStorage.getItem('digital_id_generator_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) setStudent(parsed.student);
        if (parsed.logoConfig) setLogoConfig(parsed.logoConfig);
        if (parsed.selectedThemeId) {
          const theme = cardThemes.find((t) => t.id === parsed.selectedThemeId);
          if (theme) setSelectedTheme(theme);
        }
        setErrors({});
        showToast('📂 Saved draft restored successfully!');
      }
    } catch (err) {
      console.error(err);
      showToast('⚠️ Failed to load saved draft.');
    }
  };

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};

    if (!student.name.trim()) {
      newErrors.name = 'Please enter full name.';
    }

    if (!student.studentId.trim()) {
      newErrors.studentId = 'Please enter student ID.';
    }

    if (student.collegeChoice === 'Custom College') {
      if (!student.customCollege?.name?.trim()) {
        newErrors.college = 'Please enter custom college name.';
      }
    } else if (!student.college.trim()) {
      newErrors.college = 'Please select college.';
    }

    if (!student.department.trim()) {
      newErrors.department = 'Please enter department.';
    }

    if (!student.course.trim()) {
      newErrors.course = 'Please enter course.';
    }

    if (!student.year.trim()) {
      newErrors.year = 'Please select year of study.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate ID Card
  const handleGenerate = () => {
    const isValid = validateForm();
    if (isValid) {
      setIsGenerated(true);
      showToast('🎉 Official student ID badge verified & generated!');
      try {
        confetti({
          particleCount: 80,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399']
        });
      } catch (e) {}
    } else {
      showToast('⚠️ Please fill out all required fields marked in red.');
    }
  };

  // Reset form handler
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form fields?')) {
      setStudent(initialStudentState);
      const defaultMeta = sampleColleges[0];
      setLogoConfig({
        mode: 'default',
        customUpload: '',
        activeLogo: { ...defaultMeta.defaultLogo }
      });
      setSelectedTheme(cardThemes[0]);
      setErrors({});
      setIsGenerated(false);
      showToast('↺ Form reset to blank default');
    }
  };

  // Download High-Resolution 3x PNG
  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);
      showToast('📸 Preparing high-resolution 3x print export...');

      const scale = 3;
      const canvas = await html2canvas(cardRef.current, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const filename = `${student.studentId.trim() || 'student'}_id_${activeSide}.png`.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`✨ Downloaded ${activeSide.toUpperCase()} side as high-res PNG!`);
    } catch (error) {
      console.error('Failed to export ID Card image:', error);
      alert('An error occurred while generating the image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Download Official PDF
  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);
      showToast('📄 Generating official PDF document...');

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85.6, 120]
      });

      pdf.addImage(imgData, 'PNG', 5, 5, 75.6, 110);
      const filename = `${student.studentId.trim() || 'student'}_id_card.pdf`.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
      pdf.save(filename);
      showToast('📄 PDF document generated!');
    } catch (error) {
      console.error('Failed to export ID Card PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const isLiveCustom = Object.entries(student).some(([key, val]) => val && val.trim?.() !== '');

  const commonLayoutProps = {
    student,
    errors,
    onChange: handleInputChange,
    onCollegeChange: handleCollegeChange,
    onCustomCollegeChange: handleCustomCollegeChange,
    onPhotoUpload: handlePhotoUpload,
    onPhotoRemove: handlePhotoRemove,
    logoConfig,
    onLogoUpload: handleLogoUpload,
    onLogoRemove: handleLogoRemove,
    onUpdateLogoSetting: handleUpdateLogoSetting,
    onOpenLogoStudio: () => setIsLogoStudioOpen(true),
    selectedTheme,
    onThemeChange: setSelectedTheme,
    onCustomColorChange: handleCustomColorChange,
    cardRef,
    activeSide,
    onToggleSide: setActiveSide,
    isLiveCustom,
    onGenerate: handleGenerate,
    onSaveDraft: handleSaveDraft,
    onLoadDraft: handleLoadDraft,
    hasSavedDraft,
    onReset: handleReset,
    onLoadSample: handleLoadSample,
    onDownloadPNG: handleDownloadPNG,
    onDownloadPDF: handleDownloadPDF,
    isDownloading
  };

  // Current college meta for logo modal
  const currentCollegeMeta =
    sampleColleges.find((c) => c.name === (student.collegeChoice || student.college)) || sampleColleges[0];

  return (
    <div className="app-layout futuristic-layout">
      {/* 🌌 Aurora Background System */}
      <AuroraBackground />

      {/* ✨ Cursor Following Mouse Glow */}
      <MouseGlow />

      {/* Floating Glass Toast Notification */}
      {toastMessage && (
        <div className="floating-toast-alert glass-panel">
          <Sparkles size={16} className="toast-sparkle" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="app-container">
        {/* Header with Layout Switcher */}
        <Header
          activeLayout={activeLayout}
          onSelectLayout={handleSelectLayout}
        />

        {/* Dynamic Layout Router */}
        <main className="dashboard-layout-viewport">
          {activeLayout === 'id-first' ? (
            <IDFirstLayout {...commonLayoutProps} />
          ) : activeLayout === 'creative' ? (
            <CreativeLayout {...commonLayoutProps} />
          ) : activeLayout === 'sidebar' ? (
            <SidebarLayout {...commonLayoutProps} />
          ) : activeLayout === 'floating' ? (
            <FloatingLayout {...commonLayoutProps} />
          ) : (
            /* Default: Bento Command Center (3-Column Layout) */
            <BentoCommandCenterLayout {...commonLayoutProps} />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Logo Studio Modal */}
      <LogoStudioModal
        isOpen={isLogoStudioOpen}
        onClose={() => setIsLogoStudioOpen(false)}
        currentLogo={logoConfig}
        defaultCollegeLogo={currentCollegeMeta?.defaultLogo}
        onApplyLogo={handleApplyCustomLogo}
        onResetLogo={handleLogoRemove}
      />
    </div>
  );
}

export default App;
