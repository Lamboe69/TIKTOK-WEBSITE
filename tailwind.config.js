/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1B1024',
        ember: '#FF6B1A',
        'ember-dark': '#CC5200',
        'crown-gold': '#E8B94A',
        ivory: '#FFF7F0',
        'dynasty-purple': '#3B1063',
        'dynasty-purple-light': '#6B3FA0',
        'dynasty-purple-deep': '#1F0A38',
        'dynasty-purple-mid': '#2D1050',
        'brand': {
          '900': '#1B1024',
          '800': '#2D1050',
          '700': '#3B1063',
          '600': '#6B3FA0',
          '500': '#9B7EC8',
          '400': '#C4A8E8',
          '300': '#DDD0F0',
          '200': '#EDE6F8',
          '100': '#F5F0FC',
          '50':  '#FAF7FE',
        },
        'accent': {
          DEFAULT: '#FF6B1A',
          light: '#FFB380',
          dark: '#CC5200',
        },
        'gold': {
          DEFAULT: '#E8B94A',
          light: '#F5D98A',
          dark: '#B8891A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
