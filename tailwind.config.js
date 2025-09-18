/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#ffde59',
          purple: '#5e17eb',
          'gray-dark': '#383838',
        },
        neutral: {
          white: '#ffffff',
          'gray-light': '#f5f5f5',
          'gray-medium': '#cccccc',
          'gray-dark': '#383838',
        },
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        }
      },
      fontFamily: {
        heading: ['Unica One', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      transitionDuration: {
        'default': '200ms',
        'slow': '300ms',
      },
      maxWidth: {
        'container': '1200px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}