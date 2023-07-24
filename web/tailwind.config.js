/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: '#00FF00',
        tertiary: '#0000FF',
      },
      backgroundColor: {
        primary: 'var(--primary-color)', // Assuming you want to use the primary-color defined in :root
      },
      fontSize: {
        '9xl': '4rem',
      },
      maxWidth: {
        1200: '1200px',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
      },
      colors: {
        'text-red': 'var(--text-color-red)',
        'text-blue': 'var(--text-color-blue)',
      },
      height: {
        'hero-xs': '20rem',
        'hero-sm': '30rem',
        'hero-md': '40rem',
      },
      width: {
        'hero-xs': '30rem',
        'hero-sm': '40rem',
        'hero-md': '50rem',
      },
      fontSize: {
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
}
