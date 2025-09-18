import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { loadPublishedPositions } from '@/lib/markdown';
import { getTypeDisplayName } from '@/lib/search';

export default async function SearchPage() {
  // Load all positions for static display
  const positions = await loadPublishedPositions();

  return (
    <div className="min-h-screen bg-primary-yellow">
      {/* Header */}
      <section className="bg-primary-yellow py-12">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-body text-4xl lg:text-5xl font-bold text-primary-gray-dark mb-6">
              Kaikki suositukset
            </h1>

            <p className="text-lg text-primary-gray-dark/80 mb-8 max-w-2xl mx-auto">
              Selaa kaikkia {positions.length} politiikkasuositusta. Voit suodattaa tuloksia käyttämällä tageja.
            </p>

            {/* Simple Search Form */}
            <div className="max-w-2xl mx-auto mb-8">
              <form action="/search" method="get" className="search-container">
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
                <input
                  name="q"
                  type="search"
                  className="search-input w-full text-base py-3"
                  placeholder="Hae suosituksia, aiheita tai avainsanoja..."
                  aria-label="Hakukenttä"
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-primary-yellow">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position) => (
              <Link key={position.metadata.id} href={`/position/${position.metadata.id}`}>
                <Card
                  className={`position-card-${position.metadata.ui_config?.card_color || 'gray'} h-full cursor-pointer hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`tag-${position.metadata.ui_config?.card_color || 'gray'}`}>
                      {getTypeDisplayName(position.metadata.type)}
                    </span>
                    <div className="flex items-center text-xs text-neutral-gray-medium">
                      {position.metadata.ui_config?.icon === 'shield' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                      {position.metadata.ui_config?.icon === 'cpu-chip' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      )}
                      {position.metadata.ui_config?.icon === 'signal' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 717.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      )}
                      {position.metadata.ui_config?.icon === 'building-office' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {position.metadata.ui_config?.icon === 'academic-cap' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h3 className="font-body text-lg text-neutral-gray-dark mb-3 line-clamp-2">
                    {position.metadata.title}
                  </h3>

                  <p className="text-sm text-neutral-gray-medium mb-4 line-clamp-3">
                    {position.metadata.justification}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {position.metadata.tags.slice(0, 3).map((tag) => (
                      <Tag
                        key={tag}
                        variant={position.metadata.ui_config?.card_color || 'gray'}
                        size="sm"
                      >
                        {tag}
                      </Tag>
                    ))}
                    {position.metadata.tags.length > 3 && (
                      <span className="text-xs text-neutral-gray-medium">
                        +{position.metadata.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-neutral-gray-medium">
                    {position.metadata.category}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="btn-secondary">
              Takaisin etusivulle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}