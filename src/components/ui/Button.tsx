'use client';

import React from 'react';
import { cN } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'font-body font-semibold border-0 rounded-lg transition-all duration-default cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-primary-purple text-neutral-white hover:bg-purple-700 hover:-translate-y-0.5 disabled:bg-neutral-gray-medium disabled:transform-none disabled:cursor-not-allowed',
    secondary: 'bg-neutral-white text-primary-purple border-2 border-primary-purple hover:bg-primary-purple hover:text-neutral-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cN(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};