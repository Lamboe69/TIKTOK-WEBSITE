/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          '900': '#0C1222',
          '800': '#111827',
          '700': '#1F2937',
          '600': '#374151',
          '500': '#6B7280',
          '400': '#9CA3AF',
          '300': '#D1D5DB',
          '200': '#E5E7EB',
          '100': '#F3F4F6',
          '50':  '#F9FAFB',
        },
        'accent': {
          DEFAULT: '#C084FC',
          light: '#E9D5FF',
          dark: '#9333EA',
        },
        'gold': {
          DEFAULT: '#F59E0B',
          light: '#FDE68A',
          dark: '#D97706',
        },
        'surface': '#FFFFFF',
        'muted': '#F8FAFC',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
