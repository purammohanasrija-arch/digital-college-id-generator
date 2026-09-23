import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

/**
 * DynamicBarcode
 * Generates an authentic, standards-compliant Code-128 or Code-39 barcode
 * using pure SVG vectors for guaranteed scannability with phone cameras
 * (Google Lens, Apple Camera) and handheld 1D/2D optical laser scanners.
 */
const DynamicBarcode = ({
  value = '24CS1234',
  format = 'CODE128',
  width = 1.6,
  height = 42,
  displayValue = false,
  font = 'monospace',
  fontSize = 11,
  textMargin = 2,
  lineColor = '#000000',
  background = '#ffffff',
  margin = 6,
  className = '',
  orientation = 'horizontal' // 'horizontal' | 'vertical'
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clean and validate value (Code128 supports ASCII, fallback if empty)
    const cleanValue = String(value || '24CS1234').trim() || '24CS1234';

    try {
      // Clear previous children
      while (svgRef.current.firstChild) {
        svgRef.current.removeChild(svgRef.current.firstChild);
      }

      JsBarcode(svgRef.current, cleanValue, {
        format: format || 'CODE128',
        width: Number(width) || 1.6,
        height: Number(height) || 42,
        displayValue: Boolean(displayValue),
        font: font || 'monospace',
        fontSize: Number(fontSize) || 11,
        textMargin: Number(textMargin) || 2,
        lineColor: lineColor || '#000000',
        background: background || '#ffffff',
        margin: Number(margin) || 6,
        flat: true
      });
    } catch (err) {
      console.warn('JsBarcode render warning:', err);
      // Fallback: try standard CODE128 with sanitized alphanumeric
      try {
        const sanitized = cleanValue.replace(/[^A-Za-z0-9_-]/g, '') || '24CS1234';
        JsBarcode(svgRef.current, sanitized, {
          format: 'CODE128',
          width: 1.5,
          height: 38,
          displayValue: false,
          lineColor: '#000000',
          background: '#ffffff',
          margin: 4
        });
      } catch (fallbackErr) {
        console.error('Failed to generate fallback barcode:', fallbackErr);
      }
    }
  }, [value, format, width, height, displayValue, font, fontSize, textMargin, lineColor, background, margin]);

  return (
    <div className={`dynamic-barcode-container orientation-${orientation} ${className}`}>
      <svg
        ref={svgRef}
        className="dynamic-barcode-svg"
        aria-label={`Barcode encoding ${value}`}
        role="img"
      />
    </div>
  );
};

export default React.memo(DynamicBarcode);
