import { notFound } from 'next/navigation';
import { loadPosition, loadAllPositions } from '@/lib/markdown';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { PositionCard } from '@/components/ui/PositionCard';

interface PositionPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all positions
export async function generateStaticParams() {
  const positions = await loadAllPositions();
  return positions.map((position) => ({
    id: position.metadata.id,
  }));
}

export default async function PositionPage({ params }: PositionPageProps) {
  const position = await loadPosition(params.id);

  if (!position) {
    notFound();
  }

  const { metadata, content } = position;

  // Load related positions (those with shared tags or dependencies)
  const allPositions = await loadAllPositions();
  const relatedPositions = allPositions
    .filter(p =>
      p.metadata.id !== metadata.id &&
      (
        // Positions that depend on this one
        p.metadata.dependencies?.some(dep => dep.position_id === metadata.id) ||
        // Positions this one depends on
        metadata.dependencies?.some(dep => dep.position_id === p.metadata.id) ||
        // Positions with shared tags
        p.metadata.tags.some(tag => metadata.tags.includes(tag))
      )
    )
    .slice(0, 3);

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconProps = {
      className: "w-6 h-6",
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
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get type label
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

  const cardColor = metadata.ui_config?.card_color || 'gray';

  return (
    <div className="min-h-screen bg-neutral-gray-light">
      {/* Breadcrumbs */}
      <div className="bg-neutral-white border-b border-neutral-gray-light">
        <div className="container-wide py-4">
          <nav className="flex items-center space-x-2 text-sm text-neutral-gray-medium">
            <a href="/" className="hover:text-primary-purple transition-colors">
              Etusivu
            </a>
            <span>/</span>
            <a href="/positions" className="hover:text-primary-purple transition-colors">
              Kannanotot
            </a>
            <span>/</span>
            <span className="text-neutral-gray-dark">
              {metadata.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className={`tag-${cardColor} text-sm px-3 py-1`}>
                    {getTypeLabel(metadata.type)}
                  </span>
                  <span className="text-sm text-neutral-gray-medium">
                    #{metadata.id}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-neutral-gray-medium">
                  {metadata.ui_config?.icon && getIcon(metadata.ui_config.icon)}
                </div>
              </div>

              <h1 className="font-heading text-3xl lg:text-4xl text-neutral-gray-dark mb-4 leading-tight">
                {metadata.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray-medium mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Päivitetty {formatDate(metadata.updated)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{metadata.author}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{metadata.category}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <Tag key={tag} variant={cardColor} size="md">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Card>

            {/* Justification */}
            <Card className="p-8">
              <h2 className="font-heading text-2xl text-neutral-gray-dark mb-4">
                Perustelut
              </h2>
              <p className="text-neutral-gray-medium leading-relaxed text-lg">
                {metadata.justification}
              </p>
            </Card>

            {/* Expected Outcomes */}
            {metadata.expected_outcomes && metadata.expected_outcomes.length > 0 && (
              <Card className="p-8">
                <h2 className="font-heading text-2xl text-neutral-gray-dark mb-4">
                  Odotetut tulokset
                </h2>
                <ul className="space-y-3">
                  {metadata.expected_outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-primary-${cardColor === 'purple' ? 'purple' : cardColor === 'yellow' ? 'yellow' : 'gray-dark'} mt-2 flex-shrink-0`} />
                      <span className="text-neutral-gray-medium leading-relaxed">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Dependencies */}
            {metadata.dependencies && metadata.dependencies.length > 0 && (
              <Card className="p-8">
                <h2 className="font-heading text-2xl text-neutral-gray-dark mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>Riippuvuudet</span>
                </h2>
                <div className="space-y-3">
                  {metadata.dependencies.map((dep, index) => (
                    <div key={index} className="p-4 bg-neutral-gray-light rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-primary-purple">
                          Suositus #{dep.position_id}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-gray-medium">
                        {dep.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Main Content */}
            <Card className="p-8">
              <h2 className="font-heading text-2xl text-neutral-gray-dark mb-6">
                Yksityiskohtainen kuvaus
              </h2>
              <div className="prose-content">
                {/* Parse and render markdown content */}
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h3 key={index} className="text-xl font-heading text-neutral-gray-dark mt-6 mb-3 first:mt-0">
                        {line.replace('## ', '')}
                      </h3>
                    );
                  } else if (line.startsWith('- ')) {
                    return (
                      <div key={index} className="flex items-start space-x-2 mb-2">
                        <span className="text-primary-purple mt-1">•</span>
                        <span>{line.replace('- ', '')}</span>
                      </div>
                    );
                  } else if (line.trim() === '') {
                    return <div key={index} className="h-4" />;
                  } else if (line.startsWith('---')) {
                    return <hr key={index} className="my-6 border-neutral-gray-light" />;
                  } else if (line.startsWith('*') && line.endsWith('*')) {
                    return (
                      <p key={index} className="text-sm text-neutral-gray-medium italic mb-4">
                        {line.replace(/^\*/, '').replace(/\*$/, '')}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-heading text-lg text-neutral-gray-dark mb-4">
                Toiminnot
              </h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Jaa suositus
                </Button>
                <Button variant="secondary" className="w-full">
                  Lataa PDF
                </Button>
                <Button variant="ghost" className="w-full">
                  Lisää kommentti
                </Button>
              </div>
            </Card>

            {/* Status and Metadata */}
            <Card className="p-6">
              <h3 className="font-heading text-lg text-neutral-gray-dark mb-4">
                Tiedot
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-gray-medium">Tila:</span>
                  <span className="font-medium">
                    {metadata.status === 'public' ? 'Julkinen' :
                     metadata.status === 'draft' ? 'Luonnos' : 'Ei julkaistu'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-gray-medium">Prioriteetti:</span>
                  <span className="font-medium">
                    {metadata.ui_config?.priority_level === 'high' ? 'Korkea' :
                     metadata.ui_config?.priority_level === 'medium' ? 'Keskitaso' : 'Matala'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-gray-medium">Luotu:</span>
                  <span className="font-medium">
                    {formatDate(metadata.created)}
                  </span>
                </div>
                {metadata.review_status?.ai_generated && (
                  <div className="flex justify-between">
                    <span className="text-neutral-gray-medium">Lähde:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      AI-generoitu
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Related Positions */}
            {relatedPositions.length > 0 && (
              <Card className="p-6">
                <h3 className="font-heading text-lg text-neutral-gray-dark mb-4">
                  Liittyvät suositukset
                </h3>
                <div className="space-y-4">
                  {relatedPositions.map((relatedPosition) => (
                    <div key={relatedPosition.metadata.id}>
                      <PositionCard
                        position={relatedPosition}
                        showDescription={false}
                        showTags={false}
                        className="p-4"
                        onClick={() => window.location.href = `/positions/${relatedPosition.metadata.id}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Back to Positions */}
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => window.history.back()}>
            ← Takaisin
          </Button>
        </div>
      </div>
    </div>
  );
}