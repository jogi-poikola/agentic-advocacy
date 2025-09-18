import { Button } from '@/components/ui/Button';
import { loadPage, parseMarkdown } from '@/lib/pages';
import { notFound } from 'next/navigation';

export default function AboutPage() {
  const page = loadPage('about');

  if (!page) {
    notFound();
  }

  const { metadata, content } = page;
  const parsedContent = parseMarkdown(content);

  return (
    <div className="min-h-screen bg-primary-yellow">
      <div className="container-wide py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-body text-4xl font-bold text-primary-gray-dark mb-6">
              {metadata.title}
            </h1>
            {metadata.subtitle && (
              <p className="text-xl text-primary-gray-dark/80 max-w-2xl mx-auto">
                {metadata.subtitle}
              </p>
            )}
          </div>

          {/* Main Content */}
          <div className="bg-neutral-white rounded-lg p-8 md:p-12 shadow-sm mb-12">
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
                  case 'link':
                    return (
                      <a
                        key={element.key}
                        href={element.href}
                        className="text-primary-purple hover:underline"
                        target={element.href?.startsWith('http') ? '_blank' : undefined}
                        rel={element.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {element.content}
                      </a>
                    );
                  case 'spacer':
                    return <div key={element.key} className="h-4" />;
                  default:
                    return null;
                }
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button variant="primary" size="lg">
                <a href="/" className="flex items-center">
                  ← Takaisin etusivulle
                </a>
              </Button>
              <Button variant="secondary" size="lg">
                <a href="https://tietopolitiikka.fi/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center">
                  Virallinen sivusto
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}