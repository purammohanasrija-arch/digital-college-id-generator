import React from 'react';
import { Sparkles, Save, FolderOpen, RotateCcw, Download, FileDown } from 'lucide-react';

const ActionBar = ({
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
    <footer className="bento-card bento-action-bar-dock glass-panel">
      <div className="action-bar-inner">
        <button
          type="button"
          onClick={onGenerate}
          className="btn btn-generate cyber-glow-btn"
          title="Synthesize and verify ID credential"
        >
          <Sparkles size={17} />
          <span>⚡ Generate ID</span>
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="btn btn-save-draft"
          title="Save current details to local browser storage"
        >
          <Save size={16} />
          <span>💾 Save</span>
        </button>

        {hasSavedDraft && (
          <button
            type="button"
            onClick={onLoadDraft}
            className="btn btn-load-draft"
            title="Restore saved details from local browser storage"
          >
            <FolderOpen size={16} />
            <span>📂 Load Draft</span>
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="btn btn-reset"
          title="Clear form and reset to default"
        >
          <RotateCcw size={16} />
          <span>↻ Reset</span>
        </button>

        <button
          type="button"
          onClick={onLoadSample}
          className="btn btn-sample"
          title="Auto-fill with demo student records"
        >
          <Sparkles size={16} />
          <span>⚡ Sample Data</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPNG}
          disabled={isDownloading}
          className="btn btn-download-png"
          title="Export high-resolution 3x print-ready PNG"
        >
          <Download size={17} />
          <span>{isDownloading ? 'Exporting...' : '↓ Download PNG'}</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPDF}
          disabled={isDownloading}
          className="btn btn-download-pdf"
          title="Export official CR80 PDF document"
        >
          <FileDown size={17} />
          <span>↓ Download PDF</span>
        </button>
      </div>
    </footer>
  );
};

export default React.memo(ActionBar);
