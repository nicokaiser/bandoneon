/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  darkMode: 'class',
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
