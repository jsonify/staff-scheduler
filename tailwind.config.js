/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f97316',
        background: {
          light: '#ffffff',
          dark: '#0f172a'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

