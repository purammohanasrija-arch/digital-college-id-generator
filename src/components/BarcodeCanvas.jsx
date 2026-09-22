import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeCanvas = ({
  value,
  width = 1.6,
  height = 38,
  fontSize = 11,
  className = '',
  displayValue = true
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const raw = (value || 'STU-2024-8842').trim();
    // Keep ASCII printable characters (Code 128)
    const sanitized = raw.replace(/[^\x20-\x7E]/g, '') || 'STU-2024-8842';

    const draw = (val) => {
      JsBarcode(canvasRef.current, val, {
        format: 'CODE128',
        lineColor: '#000000',
        width: width,
        height: height,
        displayValue: displayValue,
        fontSize: fontSize,
        font: 'monospace',
        fontOptions: 'bold',
        textMargin: 3,
        margin: 6,
        background: '#ffffff'
      });
    };

    try {
      draw(sanitized);
    } catch (err) {
      console.warn('Primary barcode draw error, attempting fallback:', err);
      // Fallback: strip to alphanumeric only
      const alphanumeric = sanitized.replace(/[^a-zA-Z0-9]/g, '') || 'STUDENT';
      try {
        draw(alphanumeric);
      } catch (fallbackErr) {
        console.error('Barcode drawing failed completely:', fallbackErr);
      }
    }
  }, [value, width, height, fontSize, displayValue]);

  return (
    <div className={`barcode-canvas-wrapper ${className}`}>
      <canvas ref={canvasRef} className="barcode-canvas-element" />
    </div>
  );
};

export default BarcodeCanvas;
