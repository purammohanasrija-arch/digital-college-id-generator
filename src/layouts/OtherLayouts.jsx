import React, { useState } from 'react';
import StudentDetailsPanel from '../components/StudentDetailsPanel';
import ProfilePhotoPanel from '../components/ProfilePhotoPanel';
import CollegeLogoPanel from '../components/CollegeLogoPanel';
import ThemeStudioPanel from '../components/ThemeStudioPanel';
import IDCard from '../components/IDCard';
import ActionBar from '../components/ActionBar';
import { Sparkles, User, School, Palette, Camera } from 'lucide-react';

/* ========================================================
   1. ID FIRST LAYOUT (Hero Card Top, Controls Below)
   ======================================================== */
export const IDFirstLayout = (props) => {
  return (
    <div className="layout-id-first-root">
      {/* Top Hero Preview Stage */}
      <div className="bento-card bento-hero-top-preview glass-panel">
        <div className="bento-card-header preview-bento-header">
          <div className="bento-header-left">
            <div className="bento-icon-box cyan-glow">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="bento-title">🪪 Live 3D Credential Preview</h3>
              <p className="bento-subtitle">Interactive 3D tilt & holographic card</p>
            </div>
          </div>
        </div>

        <div className="hero-id-card-stage-wrap">
          <IDCard
            student={props.student}
            cardRef={props.cardRef}
            theme={props.selectedTheme}
            activeSide={props.activeSide}
            onToggleSide={props.onToggleSide}
            logoConfig={props.logoConfig}
            isLiveCustom={props.isLiveCustom}
          />
        </div>
      </div>

      {/* 2-Column Bento Grid Below */}
      <div className="id-first-controls-grid">
        <div className="controls-col-left">
          <StudentDetailsPanel
            student={props.student}
            errors={props.errors}
            onChange={props.onChange}
          />
          <ProfilePhotoPanel
            photo={props.student.photo}
            onPhotoUpload={props.onPhotoUpload}
            onPhotoRemove={props.onPhotoRemove}
          />
        </div>

        <div className="controls-col-right">
          <CollegeLogoPanel
            student={props.student}
            errors={props.errors}
            onCollegeChange={props.onCollegeChange}
            onCustomCollegeChange={props.onCustomCollegeChange}
            logoConfig={props.logoConfig}
            onLogoUpload={props.onLogoUpload}
            onLogoRemove={props.onLogoRemove}
            onUpdateLogoSetting={props.onUpdateLogoSetting}
            onOpenLogoStudio={props.onOpenLogoStudio}
          />
          <ThemeStudioPanel
            selectedTheme={props.selectedTheme}
            onThemeChange={props.onThemeChange}
            onCustomColorChange={props.onCustomColorChange}
          />
        </div>
      </div>

      <ActionBar {...props} />
    </div>
  );
};

/* ========================================================
   2. CREATIVE STUDIO LAYOUT (Design Tools Prioritized)
   ======================================================== */
export const CreativeLayout = (props) => {
  return (
    <div className="layout-creative-root">
      <div className="creative-studio-grid">
        {/* Left: Design & Theme Panels */}
        <div className="creative-col-left">
          <CollegeLogoPanel
            student={props.student}
            errors={props.errors}
            onCollegeChange={props.onCollegeChange}
            onCustomCollegeChange={props.onCustomCollegeChange}
            logoConfig={props.logoConfig}
            onLogoUpload={props.onLogoUpload}
            onLogoRemove={props.onLogoRemove}
            onUpdateLogoSetting={props.onUpdateLogoSetting}
            onOpenLogoStudio={props.onOpenLogoStudio}
          />
          <ThemeStudioPanel
            selectedTheme={props.selectedTheme}
            onThemeChange={props.onThemeChange}
            onCustomColorChange={props.onCustomColorChange}
          />
          <ProfilePhotoPanel
            photo={props.student.photo}
            onPhotoUpload={props.onPhotoUpload}
            onPhotoRemove={props.onPhotoRemove}
          />
        </div>

        {/* Center: Hero ID Card */}
        <div className="creative-col-center">
          <div className="bento-card bento-hero-preview-card glass-panel sticky-card-dock">
            <div className="bento-card-header preview-bento-header">
              <div className="bento-header-left">
                <div className="bento-icon-box purple-glow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="bento-title">🪪 Creative Canvas Preview</h3>
                  <p className="bento-subtitle">Instant visual synthesis</p>
                </div>
              </div>
            </div>

            <div className="hero-id-card-stage-wrap">
              <IDCard
                student={props.student}
                cardRef={props.cardRef}
                theme={props.selectedTheme}
                activeSide={props.activeSide}
                onToggleSide={props.onToggleSide}
                logoConfig={props.logoConfig}
                isLiveCustom={props.isLiveCustom}
              />
            </div>
          </div>
        </div>

        {/* Right: Student Information */}
        <div className="creative-col-right">
          <StudentDetailsPanel
            student={props.student}
            errors={props.errors}
            onChange={props.onChange}
          />
        </div>
      </div>

      <ActionBar {...props} />
    </div>
  );
};

/* ========================================================
   3. GLASS SIDEBAR LAYOUT (Left Drawer, Wide Right Canvas)
   ======================================================== */
export const SidebarLayout = (props) => {
  const [activeSidebarTab, setActiveSidebarTab] = useState('student');

  return (
    <div className="layout-sidebar-root">
      <div className="sidebar-workspace-grid">
        {/* Left Vertical Glass Drawer */}
        <div className="sidebar-drawer glass-panel">
          <div className="sidebar-tab-pills">
            <button
              type="button"
              className={`sidebar-tab-btn ${activeSidebarTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveSidebarTab('student')}
            >
              <User size={15} />
              <span>Student</span>
            </button>
            <button
              type="button"
              className={`sidebar-tab-btn ${activeSidebarTab === 'college' ? 'active' : ''}`}
              onClick={() => setActiveSidebarTab('college')}
            >
              <School size={15} />
              <span>College & Logo</span>
            </button>
            <button
              type="button"
              className={`sidebar-tab-btn ${activeSidebarTab === 'theme' ? 'active' : ''}`}
              onClick={() => setActiveSidebarTab('theme')}
            >
              <Palette size={15} />
              <span>Themes</span>
            </button>
            <button
              type="button"
              className={`sidebar-tab-btn ${activeSidebarTab === 'photo' ? 'active' : ''}`}
              onClick={() => setActiveSidebarTab('photo')}
            >
              <Camera size={15} />
              <span>Photo</span>
            </button>
          </div>

          <div className="sidebar-tab-content">
            {activeSidebarTab === 'student' && (
              <StudentDetailsPanel
                student={props.student}
                errors={props.errors}
                onChange={props.onChange}
              />
            )}
            {activeSidebarTab === 'college' && (
              <CollegeLogoPanel
                student={props.student}
                errors={props.errors}
                onCollegeChange={props.onCollegeChange}
                onCustomCollegeChange={props.onCustomCollegeChange}
                logoConfig={props.logoConfig}
                onLogoUpload={props.onLogoUpload}
                onLogoRemove={props.onLogoRemove}
                onUpdateLogoSetting={props.onUpdateLogoSetting}
                onOpenLogoStudio={props.onOpenLogoStudio}
              />
            )}
            {activeSidebarTab === 'theme' && (
              <ThemeStudioPanel
                selectedTheme={props.selectedTheme}
                onThemeChange={props.onThemeChange}
                onCustomColorChange={props.onCustomColorChange}
              />
            )}
            {activeSidebarTab === 'photo' && (
              <ProfilePhotoPanel
                photo={props.student.photo}
                onPhotoUpload={props.onPhotoUpload}
                onPhotoRemove={props.onPhotoRemove}
              />
            )}
          </div>
        </div>

        {/* Right Wide Open ID Preview Canvas */}
        <div className="sidebar-canvas-preview">
          <div className="bento-card bento-hero-preview-card glass-panel sticky-card-dock">
            <div className="bento-card-header preview-bento-header">
              <div className="bento-header-left">
                <div className="bento-icon-box cyan-glow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="bento-title">🪪 Live Identity Canvas</h3>
                  <p className="bento-subtitle">Real-time vector rendering</p>
                </div>
              </div>
            </div>

            <div className="hero-id-card-stage-wrap">
              <IDCard
                student={props.student}
                cardRef={props.cardRef}
                theme={props.selectedTheme}
                activeSide={props.activeSide}
                onToggleSide={props.onToggleSide}
                logoConfig={props.logoConfig}
                isLiveCustom={props.isLiveCustom}
              />
            </div>
          </div>
        </div>
      </div>

      <ActionBar {...props} />
    </div>
  );
};

/* ========================================================
   4. FLOATING CARDS LAYOUT (Spatial Cards Architecture)
   ======================================================== */
export const FloatingLayout = (props) => {
  return (
    <div className="layout-floating-root">
      <div className="floating-cards-flow">
        <div className="floating-card-item">
          <StudentDetailsPanel
            student={props.student}
            errors={props.errors}
            onChange={props.onChange}
          />
        </div>

        <div className="floating-card-item floating-hero-card">
          <div className="bento-card bento-hero-preview-card glass-panel">
            <div className="bento-card-header preview-bento-header">
              <div className="bento-header-left">
                <div className="bento-icon-box cyan-glow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="bento-title">🪪 Floating 3D Credential</h3>
                  <p className="bento-subtitle">Spatial glass perspective</p>
                </div>
              </div>
            </div>

            <div className="hero-id-card-stage-wrap">
              <IDCard
                student={props.student}
                cardRef={props.cardRef}
                theme={props.selectedTheme}
                activeSide={props.activeSide}
                onToggleSide={props.onToggleSide}
                logoConfig={props.logoConfig}
                isLiveCustom={props.isLiveCustom}
              />
            </div>
          </div>
        </div>

        <div className="floating-card-item">
          <CollegeLogoPanel
            student={props.student}
            errors={props.errors}
            onCollegeChange={props.onCollegeChange}
            onCustomCollegeChange={props.onCustomCollegeChange}
            logoConfig={props.logoConfig}
            onLogoUpload={props.onLogoUpload}
            onLogoRemove={props.onLogoRemove}
            onUpdateLogoSetting={props.onUpdateLogoSetting}
            onOpenLogoStudio={props.onOpenLogoStudio}
          />
          <ThemeStudioPanel
            selectedTheme={props.selectedTheme}
            onThemeChange={props.onThemeChange}
            onCustomColorChange={props.onCustomColorChange}
          />
          <ProfilePhotoPanel
            photo={props.student.photo}
            onPhotoUpload={props.onPhotoUpload}
            onPhotoRemove={props.onPhotoRemove}
          />
        </div>
      </div>

      <ActionBar {...props} />
    </div>
  );
};
