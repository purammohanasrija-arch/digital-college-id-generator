import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import Footer from './components/Footer';
import AuroraBackground from './components/AuroraBackground';
import MouseGlow from './components/MouseGlow';
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
  const [student, setStudent] = useState(initialStudentState);
  const [errors, setErrors] = useState({});
  const [selectedTheme, setSelectedTheme] = useState(cardThemes[0]);
  const [activeSide, setActiveSide] = useState('front');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoConfig, setLogoConfig] = useState(initialLogoConfig);
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
    } catch (e) {
      // Local storage disabled or error
    }
  }, []);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
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
      newErrors.name = 'Please enter your full name.';
    }

    if (!student.studentId.trim()) {
      newErrors.studentId = 'Please enter your student ID.';
    }

    if (student.collegeChoice === 'Custom College') {
      if (!student.customCollege?.name?.trim()) {
        newErrors.college = 'Please enter your custom college name.';
      }
    } else if (!student.college.trim()) {
      newErrors.college = 'Please select your college.';
    }

    if (!student.department.trim()) {
      newErrors.department = 'Please enter your department.';
    }

    if (!student.course.trim()) {
      newErrors.course = 'Please enter your course.';
    }

    if (!student.year.trim()) {
      newErrors.year = 'Please select your year of study.';
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
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback
      }
    } else {
      setIsGenerated(false);
      showToast('⚠️ Please fill in all required fields highlighted in red.');
    }
  };

  // Reset form to pristine state
  const handleReset = () => {
    setStudent(initialStudentState);
    setLogoConfig(initialLogoConfig);
    setErrors({});
    setIsGenerated(false);
    setActiveSide('front');
    showToast('↺ Form reset to default blank state');
  };

  // Export as high-resolution PNG image
  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;

    const isValid = validateForm();
    if (!isValid) {
      alert('Please fill in the required fields before downloading the ID card.');
      return;
    }

    try {
      setIsDownloading(true);

      const cardElement = cardRef.current;
      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const filename = `${student.studentId.trim() || 'student'}_${activeSide}_id_card.png`.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📥 PNG download complete!');
    } catch (error) {
      console.error('Failed to export ID Card image:', error);
      alert('An error occurred while generating the ID card image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Export as PDF document
  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    const isValid = validateForm();
    if (!isValid) {
      alert('Please fill in the required fields before downloading the ID card.');
      return;
    }

    try {
      setIsDownloading(true);

      const cardElement = cardRef.current;
      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
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
        {/* Header */}
        <Header />

        {/* Bento Grid Dashboard Layout */}
        <main className="bento-dashboard-layout">
          {/* Left Column: Form Bento Cards */}
          <section className="bento-form-col">
            <StudentForm
              student={student}
              errors={errors}
              onChange={handleInputChange}
              onCollegeChange={handleCollegeChange}
              onCustomCollegeChange={handleCustomCollegeChange}
              onPhotoUpload={handlePhotoUpload}
              onPhotoRemove={handlePhotoRemove}
              onReset={handleReset}
              onGenerate={handleGenerate}
              onDownloadPNG={handleDownloadPNG}
              onDownloadPDF={handleDownloadPDF}
              onLoadSample={handleLoadSample}
              onSaveDraft={handleSaveDraft}
              onLoadDraft={handleLoadDraft}
              hasSavedDraft={hasSavedDraft}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              logoConfig={logoConfig}
              onLogoUpload={handleLogoUpload}
              onLogoRemove={handleLogoRemove}
              onUpdateLogoSetting={handleUpdateLogoSetting}
              onApplyCustomLogo={handleApplyCustomLogo}
              isDownloading={isDownloading}
              isGenerated={isGenerated}
            />
          </section>

          {/* Right Column: Live 3D Holographic ID Card Preview */}
          <section className="bento-preview-col">
            <div className="bento-card bento-preview-card glass-panel sticky-bento-preview">
              <div className="bento-card-header preview-bento-header">
                <div className="bento-header-left">
                  <div className="bento-icon-box cyan-glow">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="bento-title">🪪 Live 3D Credential Preview</h3>
                    <p className="bento-subtitle">Interactive 3D tilt & holographic security verification</p>
                  </div>
                </div>
              </div>

              <IDCard
                student={student}
                cardRef={cardRef}
                theme={selectedTheme}
                activeSide={activeSide}
                onToggleSide={setActiveSide}
                logoConfig={logoConfig}
                isLiveCustom={isLiveCustom}
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
