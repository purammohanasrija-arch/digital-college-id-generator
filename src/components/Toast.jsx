import React from 'react';
import { Sparkles, CheckCircle2, Download, Copy, Image, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'info' }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="toast-icon-green" />;
      case 'download':
        return <Download size={16} className="toast-icon-cyan" />;
      case 'copy':
        return <Copy size={16} className="toast-icon-purple" />;
      case 'image':
        return <Image size={16} className="toast-icon-pink" />;
      default:
        return <Sparkles size={16} className="toast-icon-gold" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="campus-toast-pill"
        role="status"
        aria-live="polite"
      >
        {getIcon()}
        <span className="toast-text">{message}</span>
      </motion.aside>
    </AnimatePresence>
  );
};

export default React.memo(Toast);
