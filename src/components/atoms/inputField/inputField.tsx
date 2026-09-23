import React from 'react';
import './inputField.css';

export interface InputFieldProps {
  label?: string;
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  isTextArea?: boolean;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  isTextArea = false,
  rows = 4,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`c-inputField ${error ? 'hasError' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="c-inputField__label">
          {label}
          {required && <span className="c-inputField__required">*</span>}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="c-inputField__control c-inputField__control--textarea"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="c-inputField__control"
        />
      )}

      {error && <span className="c-inputField__error">{error}</span>}
    </div>
  );
};
