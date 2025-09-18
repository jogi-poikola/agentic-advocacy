import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { loadPosition, loadPublishedPositions } from '@/lib/markdown';
import { getTypeDisplayName } from '@/lib/search';
import { parseMarkdown } from '@/lib/pages';

interface PositionPageProps {
  params: {
    id: string;
  };
}

export default async function PositionPage({ params }: PositionPageProps) {
  const position = loadPosition(params.id);

  if (!position || position.metadata.status !== 'public') {
    notFound();
  }

  // Get related positions
  const allPositions = await loadPublishedPositions();
  const relatedPositions = allPositions
    .filter(p =>
      p.metadata.id !== position.metadata.id &&
      (
        p.metadata.category === position.metadata.category ||
        p.metadata.tags.some(tag => position.metadata.tags.includes(tag))
      )
    )
    .slice(0, 3);

  const parsedContent = parseMarkdown(position.content);

  return (
    <div className="min-h-screen bg-primary-yellow">
      <div className="container-wide py-8">

        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            ← Takaisin
          </Button>
        </div>

        {/* Position Header */}
        <div className="bg-neutral-white rounded-lg p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`tag-${position.metadata.ui_config?.card_color || 'gray'} px-3 py-1 text-sm rounded-full`}>
                  {getTypeDisplayName(position.metadata.type)}
                </span>
                <span className="text-sm text-neutral-gray-medium">
                  ID: {position.metadata.id}
                </span>
              </div>

              <h1 className="font-body text-3xl lg:text-4xl font-bold text-primary-gray-dark mb-4">
                {position.metadata.title}
              </h1>

              <p className="text-lg text-primary-gray-dark/80 mb-6">
                {position.metadata.justification}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {position.metadata.tags.map((tag) => (
                  <Tag
                    key={tag}
                    variant={position.metadata.ui_config?.card_color || 'gray'}
                    size="sm"
                    href={`/search?tags=${encodeURIComponent(tag)}`}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>

              <div className="text-sm text-neutral-gray-medium">
                <span className="font-medium">Kategoria:</span> {position.metadata.category}
              </div>
            </div>

            {position.metadata.ui_config?.icon && (
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="w-16 h-16 bg-primary-purple rounded-full flex items-center justify-center">
                  {position.metadata.ui_config.icon === 'shield' && (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {position.metadata.ui_config.icon === 'cpu-chip' && (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  )}
                  {position.metadata.ui_config.icon === 'signal' && (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  )}
                  {position.metadata.ui_config.icon === 'building-office' && (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {position.metadata.ui_config.icon === 'academic-cap' && (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expected Outcomes */}
        {position.metadata.expected_outcomes && position.metadata.expected_outcomes.length > 0 && (
          <div className="bg-neutral-white rounded-lg p-8 mb-8">
            <h2 className="font-body text-xl font-bold text-primary-gray-dark mb-4">
              Odotetut tulokset
            </h2>
            <ul className="space-y-2">
              {position.metadata.expected_outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-purple mr-2 mt-1">•</span>
                  <span className="text-primary-gray-dark">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-neutral-white rounded-lg p-8 md:p-12 mb-8">
          <div className="prose-content">
            {parsedContent.map((element) => {
              switch (element.type) {
                case 'h2':
                  return (
                    <h2
                      key={element.key}
                      className="font-body text-2xl font-bold text-primary-gray-dark mb-4 mt-8 first:mt-0"
                      dangerouslySetInnerHTML={{ __html: element.html || element.content }}
                    />
                  );
                case 'h3':
                  return (
                    <h3
                      key={element.key}
                      className="font-body text-xl font-bold text-primary-gray-dark mb-3 mt-6"
                      dangerouslySetInnerHTML={{ __html: element.html || element.content }}
                    />
                  );
                case 'p':
                  return (
                    <p
                      key={element.key}
                      className="text-primary-gray-dark mb-4 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: element.html || element.content }}
                    />
                  );
                case 'list':
                  return (
                    <div
                      key={element.key}
                      className="text-primary-gray-dark mb-2 ml-4 flex items-start"
                    >
                      <span className="text-primary-purple mr-2 mt-1">•</span>
                      <span dangerouslySetInnerHTML={{ __html: element.html || element.content }} />
                    </div>
                  );
                case 'spacer':
                  return <div key={element.key} className="h-4" />;
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-neutral-white rounded-lg p-8 mb-8">
          <h2 className="font-body text-xl font-bold text-primary-gray-dark mb-4">
            Metatiedot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-primary-gray-dark">Tekijä:</span>
              <span className="ml-2 text-neutral-gray-medium">{position.metadata.author}</span>
            </div>
            <div>
              <span className="font-medium text-primary-gray-dark">Luotu:</span>
              <span className="ml-2 text-neutral-gray-medium">
                {new Date(position.metadata.created).toLocaleDateString('fi-FI')}
              </span>
            </div>
            <div>
              <span className="font-medium text-primary-gray-dark">Päivitetty:</span>
              <span className="ml-2 text-neutral-gray-medium">
                {new Date(position.metadata.updated).toLocaleDateString('fi-FI')}
              </span>
            </div>
            <div>
              <span className="font-medium text-primary-gray-dark">Tila:</span>
              <span className="ml-2 text-neutral-gray-medium">
                {position.metadata.status === 'public' ? 'Julkinen' : position.metadata.status}
              </span>
            </div>
          </div>
        </div>

        {/* Related Positions */}
        {relatedPositions.length > 0 && (
          <div className="mb-8">
            <h2 className="font-body text-2xl font-bold text-primary-gray-dark mb-6">
              Liittyvät suositukset
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPositions.map((relatedPosition) => (
                <Card
                  key={relatedPosition.metadata.id}
                  className={`position-card-${relatedPosition.metadata.ui_config?.card_color || 'gray'} h-full cursor-pointer hover:shadow-lg transition-shadow`}
                  onClick={() => window.location.href = `/position/${relatedPosition.metadata.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`tag-${relatedPosition.metadata.ui_config?.card_color || 'gray'}`}>
                      {getTypeDisplayName(relatedPosition.metadata.type)}
                    </span>
                  </div>

                  <h3 className="font-body text-lg text-neutral-gray-dark mb-3 line-clamp-2">
                    {relatedPosition.metadata.title}
                  </h3>

                  <p className="text-sm text-neutral-gray-medium mb-4 line-clamp-3">
                    {relatedPosition.metadata.justification}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {relatedPosition.metadata.tags.slice(0, 3).map((tag) => (
                      <Tag
                        key={tag}
                        variant={relatedPosition.metadata.ui_config?.card_color || 'gray'}
                        size="sm"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="text-xs text-neutral-gray-medium">
                    {relatedPosition.metadata.category}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => window.location.href = '/search'}>
            Selaa lisää suosituksia
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Takaisin etusivulle
          </Button>
        </div>

      </div>
    </div>
  );
}