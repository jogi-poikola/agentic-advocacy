import React from 'react';
import { cN } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  priority,
  hover = true,
  ...props
}) => {
  const priorityClasses = {
    high: 'border-l-4 border-l-primary-purple',
    medium: 'border-l-4 border-l-primary-yellow',
    low: 'border-l-4 border-l-neutral-gray-medium'
  };

  return (
    <div
      className={cN(
        'position-card',
        priority && priorityClasses[priority],
        hover && 'hover:shadow-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};