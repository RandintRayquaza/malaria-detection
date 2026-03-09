/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF7FF',
          100: '#D9EEFF',
          200: '#B3DCFF',
          300: '#7DC4FF',
          400: '#3AA3FF',
          500: '#0F82F5',
          600: '#0063CC',
          700: '#0051A8',
          800: '#00438A',
          900: '#003A76',
        },
        accent: '#E32B2B',
        surface: '#F8FAFC',
      },
    },
  },
  plugins: [],
};
