import React from 'react';
import { cN } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-primary-gray-dark mb-1 font-body"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cN(
          'form-input w-full',
          error && 'border-semantic-error',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-semantic-error font-body">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1 text-xs text-neutral-gray-medium font-body">
          {helpText}
        </p>
      )}
    </div>
  );
};