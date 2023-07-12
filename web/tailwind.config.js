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
      fontSize: {
        '9xl': '4rem',
      },
      maxWidth: {
        '1200': '1200px',
      },
    },
  },
  plugins: [],
}
