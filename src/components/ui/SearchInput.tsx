'use client';

import React from 'react';
import { cN } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  showIcon?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  showIcon = true,
  className,
  placeholder = "Hae tietopolitiikan ehdotuksia...",
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSearch) {
      onSearch(value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={cN('search-container', className)}>
      {showIcon && (
        <svg
          className="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        aria-label="Hakukenttä"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};