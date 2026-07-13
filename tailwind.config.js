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
      fontSize: {
        'hero': ['clamp(64px, 10vw, 110px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero-sm': ['clamp(40px, 6vw, 72px)', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        'widest-xl': '0.15em',
      },
      boxShadow: {
        'ember': '0 8px 32px rgba(255,107,26,0.25)',
        'ember-lg': '0 20px 60px rgba(255,107,26,0.2)',
        'gold': '0 8px 32px rgba(232,185,74,0.2)',
        'purple': '0 8px 32px rgba(59,16,99,0.4)',
      },
    },
  },
  plugins: [],
}
