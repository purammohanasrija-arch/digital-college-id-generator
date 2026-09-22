import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import Footer from './components/Footer';
import { initialStudentState, sampleStudentData, cardThemes, initialLogoConfig } from './utils/defaultData';
import './App.css';

function App() {
  const [student, setStudent] = useState(initialStudentState);
  const [errors, setErrors] = useState({});
  const [selectedTheme, setSelectedTheme] = useState(cardThemes[0]);
  const [activeSide, setActiveSide] = useState('front');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoConfig, setLogoConfig] = useState(initialLogoConfig);

  const cardRef = useRef(null);

  // Controlled input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific validation error on user input
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
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
    };
    reader.readAsDataURL(file);
  };

  // Remove photo handler
  const handlePhotoRemove = () => {
    setStudent((prev) => ({
      ...prev,
      photo: ''
    }));
  };

  // Auto-fill sample student data for rapid testing
  const handleLoadSample = () => {
    setStudent({ ...sampleStudentData });
    setErrors({});
    setIsGenerated(true);
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

    if (!student.college.trim()) {
      newErrors.college = 'Please enter your college name.';
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
      // Trigger joyful celebration confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback if canvas is not ready
      }
    } else {
      setIsGenerated(false);
    }
  };

  // Reset form to pristine state
  const handleReset = () => {
    setStudent(initialStudentState);
    setLogoConfig(initialLogoConfig);
    setErrors({});
    setIsGenerated(false);
    setActiveSide('front');
  };

  // Export as high-resolution PNG image
  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;

    // Run quick validation check first
    const isValid = validateForm();
    if (!isValid) {
      alert('Please fill in the required fields before downloading the ID card.');
      return;
    }

    try {
      setIsDownloading(true);

      const cardElement = cardRef.current;
      const canvas = await html2canvas(cardElement, {
        scale: 3, // 3x pixel ratio for crystal clear high-DPI print quality
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
      // Standard CR80 card dimensions in mm: 54mm width x 86mm height (portrait badge)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85.6, 120] // Card container with slight printable margin
      });

      pdf.addImage(imgData, 'PNG', 5, 5, 75.6, 110);
      const filename = `${student.studentId.trim() || 'student'}_id_card.pdf`.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
      pdf.save(filename);
    } catch (error) {
      console.error('Failed to export ID Card PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Check if any custom input was entered
  const isLiveCustom = Object.entries(student).some(([key, val]) => val && val.trim?.() !== '');

  return (
    <div className="app-layout">
      {/* Background Decorative Blobs */}
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>
      <div className="bg-glow blob-3"></div>

      <div className="app-container">
        {/* Header */}
        <Header />

        {/* Main Two-Column Content Area */}
        <main className="main-content-grid">
          {/* Left Column: Controlled Student Details Form */}
          <section className="form-column">
            <StudentForm
              student={student}
              errors={errors}
              onChange={handleInputChange}
              onPhotoUpload={handlePhotoUpload}
              onPhotoRemove={handlePhotoRemove}
              onReset={handleReset}
              onGenerate={handleGenerate}
              onDownloadPNG={handleDownloadPNG}
              onDownloadPDF={handleDownloadPDF}
              onLoadSample={handleLoadSample}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              logoConfig={logoConfig}
              onLogoConfigChange={setLogoConfig}
              isDownloading={isDownloading}
              isGenerated={isGenerated}
            />
          </section>

          {/* Right Column: Instant Live ID Card Preview */}
          <section className="preview-column">
            <div className="sticky-preview-wrapper">
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
