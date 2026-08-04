/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#090b10',
          800: '#11141e',
          700: '#1a1f2c',
          600: '#252c3d',
          500: '#343d54',
        },
        brand: {
          500: '#6366f1',
          600: '#4f46e5',
          400: '#818cf8',
          accent: '#ec4899',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
