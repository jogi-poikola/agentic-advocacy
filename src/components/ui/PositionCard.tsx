import React from 'react';
import { Card } from './Card';
import { Tag } from './Tag';
import type { Position } from '@/lib/markdown';

interface PositionCardProps {
  position: Position;
  onClick?: () => void;
  className?: string;
  showDescription?: boolean;
  showTags?: boolean;
  maxTags?: number;
}

export function PositionCard({
  position,
  onClick,
  className = '',
  showDescription = true,
  showTags = true,
  maxTags = 3
}: PositionCardProps) {
  const { metadata } = position;
  const cardColor = metadata.ui_config?.card_color || 'gray';
  const priorityLevel = metadata.ui_config?.priority_level || 'medium';

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconProps = {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    };

    switch (iconName) {
      case 'shield':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'cpu-chip':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'signal':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        );
      case 'building-office':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'academic-cap':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      default:
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  // Type label mapping
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'Suositus';
      case 'action':
        return 'Toimenpide';
      case 'goal':
        return 'Tavoite';
      case 'guideline':
        return 'Ohje';
      default:
        return type;
    }
  };

  // Priority indicator
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <div className="w-2 h-2 bg-red-500 rounded-full" title="Korkea prioriteetti" />
        );
      case 'medium':
        return (
          <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Keskitaso prioriteetti" />
        );
      case 'low':
        return (
          <div className="w-2 h-2 bg-green-500 rounded-full" title="Matala prioriteetti" />
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      className={`position-card-${cardColor} h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`tag-${cardColor}`}>
            {getTypeLabel(metadata.type)}
          </span>
          {getPriorityIndicator(priorityLevel)}
        </div>

        <div className="flex items-center space-x-2 text-neutral-gray-medium">
          <span className="text-xs">
            {metadata.id}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-body text-lg text-neutral-gray-dark mb-3 line-clamp-2 leading-tight">
        {metadata.title}
      </h3>

      {/* Description */}
      {showDescription && (
        <p className="text-sm text-neutral-gray-medium mb-4 line-clamp-3 leading-relaxed">
          {metadata.justification}
        </p>
      )}

      {/* Expected Outcomes Preview */}
      {metadata.expected_outcomes && metadata.expected_outcomes.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-neutral-gray-medium mb-1 font-medium">
            Tavoitteet:
          </div>
          <ul className="text-xs text-neutral-gray-medium space-y-0.5">
            {metadata.expected_outcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-purple mr-1 mt-0.5">•</span>
                <span className="line-clamp-1">{outcome}</span>
              </li>
            ))}
            {metadata.expected_outcomes.length > 2 && (
              <li className="text-neutral-gray-medium/70 italic">
                +{metadata.expected_outcomes.length - 2} lisää...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Tags */}
      {showTags && metadata.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {metadata.tags.slice(0, maxTags).map((tag) => (
            <Tag
              key={tag}
              variant={cardColor}
              size="sm"
              className="text-xs"
            >
              {tag}
            </Tag>
          ))}
          {metadata.tags.length > maxTags && (
            <span className="text-xs text-neutral-gray-medium self-center">
              +{metadata.tags.length - maxTags}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-neutral-gray-medium mt-auto">
        <div className="flex items-center space-x-2">
          <span>{metadata.category}</span>
          {metadata.dependencies && metadata.dependencies.length > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{metadata.dependencies.length}</span>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {metadata.review_status?.ai_generated && (
            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">
              AI
            </span>
          )}
          <time dateTime={metadata.updated} title={`Päivitetty ${formatDate(metadata.updated)}`}>
            {formatDate(metadata.updated)}
          </time>
        </div>
      </div>
    </Card>
  );
}

// Loading card for skeleton states
export function PositionCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <Card className={`position-card h-full ${className}`}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="loading-shimmer h-6 w-20 rounded-full" />
          <div className="loading-shimmer h-4 w-4 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="loading-shimmer h-5 w-full rounded" />
          <div className="loading-shimmer h-5 w-3/4 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="loading-shimmer h-4 w-full rounded" />
          <div className="loading-shimmer h-4 w-full rounded" />
          <div className="loading-shimmer h-4 w-2/3 rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-1 mb-4">
          <div className="loading-shimmer h-5 w-16 rounded-full" />
          <div className="loading-shimmer h-5 w-20 rounded-full" />
          <div className="loading-shimmer h-5 w-12 rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between">
          <div className="loading-shimmer h-4 w-24 rounded" />
          <div className="loading-shimmer h-4 w-16 rounded" />
        </div>
      </div>
    </Card>
  );
}