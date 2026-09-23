import React, { useRef, useState, useCallback } from 'react';
import IDCard from './IDCard';

const HoloCenterStage = ({
  student,
  cardRef,
  template,
  accentColor,
  logoConfig,
  activeSide,
  onToggleSide,
  onOpenScanner,
  showBackground,
  showQRCode,
  showTagline,
  showBarcode,
  showSignature,
  showHostel,
  showBloodGroup
}) => {
  const stageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    // Normalized coordinates from -1 to 1
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Realistic 3D tilt tracking matching reference perspective: rotateX ~4deg, rotateY ~-7deg
    const tiltX = 4 + (-normY * 5.5);
    const tiltY = -7 + (normX * 7.5);

    stageRef.current.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
    stageRef.current.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
    stageRef.current.style.setProperty('--mouse-holo-x', normX.toFixed(2));
    stageRef.current.style.setProperty('--mouse-holo-y', normY.toFixed(2));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!stageRef.current) return;
    // Smoothly return to default reference angle
    stageRef.current.style.setProperty('--card-tilt-x', '4deg');
    stageRef.current.style.setProperty('--card-tilt-y', '-7deg');
    stageRef.current.style.setProperty('--mouse-holo-x', '0');
    stageRef.current.style.setProperty('--mouse-holo-y', '0');
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div className="campus-center-stage-container">
      {/* 3D Perspective Stage Area */}
      <div
        ref={stageRef}
        className={`holo-card-stage-3d ${isHovered ? 'hovering' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ambient Stage Glow emitting behind the hero card */}
        <div className="stage-ambient-card-bloom" aria-hidden="true"></div>

        {/* Floating 3D Anchor for the Hero ID Card */}
        <div className="pedestal-card-anchor">
          <IDCard
            student={student}
            cardRef={cardRef}
            template={template}
            accentColor={accentColor}
            logoConfig={logoConfig}
            activeSide={activeSide}
            onToggleSide={onToggleSide}
            onOpenScanner={onOpenScanner}
            showBackground={showBackground}
            showQRCode={showQRCode}
            showTagline={showTagline}
            showBarcode={showBarcode}
            showSignature={showSignature}
            showHostel={showHostel}
            showBloodGroup={showBloodGroup}
          />
        </div>

        {/* Multi-Layered Futuristic Product Showcase Pedestal */}
        <div className="futuristic-pedestal-showcase" aria-hidden="true">
          {/* Vertical Light Projector Cone (Light emitted upward toward card) */}
          <div className="pedestal-upward-projector-beam"></div>

          {/* Underneath Depth Shadow */}
          <div className="pedestal-underneath-shadow"></div>

          {/* Multi-Tier Metallic Hardware Podium Image Base */}
          <div className="pedestal-hardware-base">
            <img
              src="/pedestal_clean.png"
              alt="Futuristic Pedestal"
              className="pedestal-stage-img"
            />
          </div>

          {/* Glowing Translucent Glass Disc Platform */}
          <div className="pedestal-glass-disc-platform">
            {/* Outer Cyan Neon Ring */}
            <div className="pedestal-ring ring-outer-cyan"></div>
            {/* Middle Purple / Magenta Neon Ring */}
            <div className="pedestal-ring ring-middle-purple"></div>
            {/* Inner Core Glowing Disc */}
            <div className="pedestal-ring ring-inner-core"></div>
            {/* Top Surface Specular Gloss Reflection */}
            <div className="pedestal-surface-reflection"></div>
          </div>

          {/* Floor Radial Flare */}
          <div className="pedestal-bottom-flare"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HoloCenterStage);
