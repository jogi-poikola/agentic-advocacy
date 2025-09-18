import React from 'react';
import Link from 'next/link';
import { cN } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: 'default' | 'purple' | 'gray' | 'yellow';
  size?: 'sm' | 'md';
}

export const Tag: React.FC<TagProps> = ({
  children,
  href,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-primary-yellow text-primary-gray-dark hover:bg-primary-purple hover:text-neutral-white',
    purple: 'bg-primary-purple text-neutral-white hover:bg-purple-700',
    gray: 'bg-neutral-gray-light text-primary-gray-dark hover:bg-neutral-gray-medium',
    yellow: 'bg-primary-yellow text-primary-gray-dark hover:bg-primary-purple hover:text-neutral-white'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1'
  };

  const baseClasses = cN(
    'tag-pill',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  );
};