import type { Metadata } from 'next';
import { Unica_One, Lato } from 'next/font/google';
import './globals.css';

const unicaOne = Unica_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-unica-one',
  display: 'swap',
  fallback: ['Impact', 'Arial Black', 'sans-serif']
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  fallback: ['Arial', 'sans-serif']
});

// Logo component
const LogoIcon = ({ size = "large", variant = "default" }: { size?: "large" | "small", variant?: "default" | "yellow" }) => (
  <a href="/" className="block">
    <img
      src={variant === "yellow" ? "/logo_yellow.png" : "/logo.png"}
      alt="Tietopolitiikka.fi - Takaisin etusivulle"
      width={size === "large" ? "320" : "120"}
      height={size === "large" ? "96" : "36"}
      className="hover:opacity-80 transition-opacity cursor-pointer"
    />
  </a>
);

export const metadata: Metadata = {
  title: 'Tietopolitiikka.fi - Suomen digipolitiikan suunta',
  description: 'Tekoälyavusteinen alusta Suomen tietopolitiikan suositusten tutkimiseen ja keskusteluun.',
  keywords: ['tietopolitiikka', 'digipolitiikka', 'suomi', 'teknologia', 'politiikka'],
  authors: [{ name: 'Tietopolitiikka.fi' }],
  openGraph: {
    title: 'Tietopolitiikka.fi',
    description: 'Tekoälyavusteinen alusta Suomen tietopolitiikan suositusten tutkimiseen',
    type: 'website',
    locale: 'fi_FI',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fi" className={`${unicaOne.variable} ${lato.variable}`}>
      <body className="font-body bg-primary-yellow text-primary-gray-dark antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary-gray-dark border-b border-primary-gray-dark/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <LogoIcon size="large" variant="yellow" />
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                  <a
                    href="/"
                    className="text-neutral-white hover:text-primary-yellow transition-colors font-medium"
                  >
                    Etusivu
                  </a>
                  <a
                    href="/about"
                    className="text-neutral-white hover:text-primary-yellow transition-colors font-medium"
                  >
                    Tietoa meistä
                  </a>
                </nav>

                {/* Mobile menu button */}
                <button
                  type="button"
                  className="md:hidden p-2 rounded-md text-neutral-white hover:text-primary-yellow transition-colors"
                  aria-label="Avaa valikko"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="bg-primary-gray-dark text-neutral-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <LogoIcon size="large" variant="yellow" />
                  </div>
                  <p className="text-neutral-gray-medium text-sm">
                    Parlamentaarinen yhteistyöryhmä Suomen tietopolitiikan kehittämiseksi.
                    Tekoälyavusteinen alusta suositusten tutkimiseen ja keskusteluun.
                  </p>
                </div>

                <div>
                  <h4 className="font-body text-sm font-bold mb-4">Tietoa</h4>
                  <ul className="space-y-2 text-sm text-neutral-gray-medium">
                    <li>
                      <a href="/about" className="hover:text-primary-yellow transition-colors">
                        Tietoa meistä
                      </a>
                    </li>
                    <li>
                      <a href="https://tietopolitiikka.fi/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-yellow transition-colors">
                        Alkuperäinen sivusto
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-neutral-gray-medium mt-8 pt-8 text-center text-sm text-neutral-gray-medium">
                <p>© 2024 Tietopolitiikka.fi. Tekoälyavusteinen sisällöntuotanto Claude Code:lla.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}