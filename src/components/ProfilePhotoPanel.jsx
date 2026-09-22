import React, { useRef } from 'react';
import { UploadCloud, Camera, Sparkles, X, RefreshCw } from 'lucide-react';

const ProfilePhotoPanel = ({
  photo,
  onPhotoUpload,
  onPhotoRemove
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bento-card bento-profile-photo-panel glass-panel">
      <div className="bento-card-header">
        <div className="bento-header-left">
          <div className="bento-icon-box magenta-glow">
            <Camera size={18} />
          </div>
          <div>
            <h3 className="bento-title">📷 Profile Photo</h3>
            <p className="bento-subtitle">Holographic portrait image</p>
          </div>
        </div>
      </div>

      <div className="bento-card-body">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div
          className={`photo-dropzone ${photo ? 'has-preview' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !photo && fileInputRef.current?.click()}
        >
          {photo ? (
            <div className="photo-preview-box">
              <div className="photo-thumb-holo-frame">
                <img src={photo} alt="Student portrait" className="uploaded-thumbnail" />
              </div>
              <div className="photo-preview-details">
                <span className="photo-success-tag">
                  <Sparkles size={12} />
                  <span>Photo Loaded</span>
                </span>
                <p className="photo-hint">Displays with holographic ring on ID card</p>
                <div className="photo-actions">
                  <button
                    type="button"
                    className="btn-change-photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    title="Choose a different photo"
                  >
                    <RefreshCw size={12} />
                    <span>Replace</span>
                  </button>
                  <button
                    type="button"
                    className="btn-remove-photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPhotoRemove();
                    }}
                    title="Remove current photo"
                  >
                    <X size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="dropzone-empty-state">
              <div className="upload-icon-circle holo-ring-pulse">
                <UploadCloud size={24} />
              </div>
              <div className="upload-prompt">
                <span className="upload-primary-text">Click or drag & drop photo</span>
                <span className="upload-secondary-text">Standard 1:1 or 3:4 portrait (PNG, JPG)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfilePhotoPanel);
