import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { loadPublishedPositions } from '@/lib/markdown';

export default async function HomePage() {
  // Load recent positions for the homepage
  const positions = await loadPublishedPositions();
  const recentPositions = positions.slice(0, 6);

  return (
    <div className="min-h-screen bg-primary-yellow">
      {/* Hero Section */}
      <section className="bg-primary-yellow py-12 lg:py-20">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-body text-4xl lg:text-6xl font-bold text-primary-gray-dark mb-6">
              Suomen tietopolitiikan suunta
            </h1>

            <p className="text-lg lg:text-xl text-primary-gray-dark/80 mb-8 max-w-2xl mx-auto lang-fi">
              Tekoälyavusteinen alusta Suomen tietopolitiikan suositusten
              tutkimiseen, analysointiin ja keskusteluun.
            </p>

            {/* Search Interface */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchInput
                placeholder="Hae suosituksia, aiheita tai avainsanoja..."
                className="w-full text-base py-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Selaa kaikkia suosituksia
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-yellow border-b border-primary-gray-dark/20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-body font-bold text-primary-purple mb-2">
                {positions.length}
              </div>
              <div className="text-sm text-primary-gray-dark/70 uppercase tracking-wide">
                Politiikkasuositusta
              </div>
            </div>
            <div>
              <div className="text-3xl font-body font-bold text-primary-purple mb-2">
                8
              </div>
              <div className="text-sm text-primary-gray-dark/70 uppercase tracking-wide">
                Aihealuetta
              </div>
            </div>
            <div>
              <div className="text-3xl font-body font-bold text-primary-purple mb-2">
                62
              </div>
              <div className="text-sm text-primary-gray-dark/70 uppercase tracking-wide">
                Alkuperäistä suositusta
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Positions */}
      <section className="py-16 bg-primary-yellow">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-body text-3xl font-bold text-primary-gray-dark mb-4">
              Uusimmat suositukset
            </h2>
            <p className="text-primary-gray-dark/80 max-w-2xl mx-auto">
              
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentPositions.map((position) => (
              <Card
                key={position.metadata.id}
                className={`position-card-${position.metadata.ui_config?.card_color || 'gray'} h-full`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`tag-${position.metadata.ui_config?.card_color || 'gray'}`}>
                    {position.metadata.type === 'recommendation' && 'Suositus'}
                    {position.metadata.type === 'action' && 'Toimenpide'}
                    {position.metadata.type === 'goal' && 'Tavoite'}
                    {position.metadata.type === 'guideline' && 'Ohje'}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
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
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary">
              Näytä kaikki suositukset
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-gray-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-body text-3xl text-neutral-gray-dark mb-4">
              Miten alusta toimii
            </h2>
            <p className="text-neutral-gray-medium max-w-2xl mx-auto">
              Tekoäly analysoi Tietopolitiikka.fi:n 62 suositusta ja tarjoaa
              työkalut niiden tutkimiseen ja ymmärtämiseen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-body text-xl text-neutral-gray-dark mb-3">
                Tekoälyanalyysi
              </h3>
              <p className="text-neutral-gray-medium">
                Claude-tekoäly analysoi ja jäsentää monimutkaiset politiikkasuositukset
                helposti ymmärrettäviksi kokonaisuuksiksi.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-body text-xl text-neutral-gray-dark mb-3">
                Älykäs haku
              </h3>
              <p className="text-neutral-gray-medium">
                Etsi suosituksia aiheittain, avainsanoittain tai vapaalla tekstillä.
                Haku ymmärtää kontekstia ja merkityksiä.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-gray-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-body text-xl text-neutral-gray-dark mb-3">
                Yhteydet
              </h3>
              <p className="text-neutral-gray-medium">
                Löydä suositusten väliset yhteydet ja riippuvuudet.
                Ymmärrä kokonaisuuksia ja vaikutussuhteita.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}