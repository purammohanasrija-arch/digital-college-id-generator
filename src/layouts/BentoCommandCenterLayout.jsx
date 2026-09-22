import React from 'react';
import StudentDetailsPanel from '../components/StudentDetailsPanel';
import ProfilePhotoPanel from '../components/ProfilePhotoPanel';
import CollegeLogoPanel from '../components/CollegeLogoPanel';
import ThemeStudioPanel from '../components/ThemeStudioPanel';
import IDCard from '../components/IDCard';
import ActionBar from '../components/ActionBar';
import { Sparkles } from 'lucide-react';

const BentoCommandCenterLayout = ({
  student,
  errors,
  onChange,
  onCollegeChange,
  onCustomCollegeChange,
  onPhotoUpload,
  onPhotoRemove,
  logoConfig,
  onLogoUpload,
  onLogoRemove,
  onUpdateLogoSetting,
  onOpenLogoStudio,
  selectedTheme,
  onThemeChange,
  onCustomColorChange,
  cardRef,
  activeSide,
  onToggleSide,
  isLiveCustom,
  onGenerate,
  onSaveDraft,
  onLoadDraft,
  hasSavedDraft,
  onReset,
  onLoadSample,
  onDownloadPNG,
  onDownloadPDF,
  isDownloading
}) => {
  return (
    <div className="bento-command-center-root">
      {/* 3-Column Bento Grid Structure */}
      <div className="bento-command-center-grid">
        {/* ========================================================
            COLUMN 1 (LEFT): 👤 Student Details & 📷 Profile Photo
            ======================================================== */}
        <div className="command-col-left">
          <StudentDetailsPanel
            student={student}
            errors={errors}
            onChange={onChange}
          />

          <ProfilePhotoPanel
            photo={student.photo}
            onPhotoUpload={onPhotoUpload}
            onPhotoRemove={onPhotoRemove}
          />
        </div>

        {/* ========================================================
            COLUMN 2 (CENTER - CENTERPIECE): 🪪 3D ID Card Live Preview
            ======================================================== */}
        <div className="command-col-center">
          <div className="bento-card bento-hero-preview-card glass-panel">
            <div className="bento-card-header preview-bento-header">
              <div className="bento-header-left">
                <div className="bento-icon-box cyan-glow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="bento-title">🪪 3D ID Card Live Preview</h3>
                  <p className="bento-subtitle">Holographic border & interactive 3D tilt security card</p>
                </div>
              </div>
            </div>

            <div className="hero-id-card-stage-wrap">
              <IDCard
                student={student}
                cardRef={cardRef}
                theme={selectedTheme}
                activeSide={activeSide}
                onToggleSide={onToggleSide}
                logoConfig={logoConfig}
                isLiveCustom={isLiveCustom}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 3 (RIGHT): 🏫 College & Logo Studio + 🌈 Theme Studio
            ======================================================== */}
        <div className="command-col-right">
          <CollegeLogoPanel
            student={student}
            errors={errors}
            onCollegeChange={onCollegeChange}
            onCustomCollegeChange={onCustomCollegeChange}
            logoConfig={logoConfig}
            onLogoUpload={onLogoUpload}
            onLogoRemove={onLogoRemove}
            onUpdateLogoSetting={onUpdateLogoSetting}
            onOpenLogoStudio={onOpenLogoStudio}
          />

          <ThemeStudioPanel
            selectedTheme={selectedTheme}
            onThemeChange={onThemeChange}
            onCustomColorChange={onCustomColorChange}
          />
        </div>
      </div>

      {/* ========================================================
          BOTTOM ROW (FULL-WIDTH): ⚡ Action Bar
          ======================================================== */}
      <ActionBar
        onGenerate={onGenerate}
        onSaveDraft={onSaveDraft}
        onLoadDraft={onLoadDraft}
        hasSavedDraft={hasSavedDraft}
        onReset={onReset}
        onLoadSample={onLoadSample}
        onDownloadPNG={onDownloadPNG}
        onDownloadPDF={onDownloadPDF}
        isDownloading={isDownloading}
      />
    </div>
  );
};

export default React.memo(BentoCommandCenterLayout);
