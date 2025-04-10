/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006dae',
        background: '#f5f5f5',
      },
    },
  },
  plugins: [],
};
