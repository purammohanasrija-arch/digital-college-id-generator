import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  icon: Icon,
  helpText,
  rows = 3
}) => {
  const isInvalid = Boolean(error);

  return (
    <div className={`form-group ${isInvalid ? 'has-error' : ''}`}>
      <label htmlFor={name} className="form-label">
        <span className="label-text">
          {label} {required && <span className="required-star">*</span>}
        </span>
        {helpText && <span className="label-help">{helpText}</span>}
      </label>

      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={18} />}

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`form-control ${Icon ? 'with-icon' : ''}`}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`form-control textarea-control ${Icon ? 'with-icon' : ''}`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control ${Icon ? 'with-icon' : ''}`}
          />
        )}
      </div>

      {isInvalid && (
        <div className="error-message">
          <AlertCircle size={14} className="error-icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
