/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        samurai: { gold: '#D4AF37', dark: '#0a0a0a', gray: '#1c1c1c' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'serif'], 
      }
    },
  },
  plugins: [],
}