/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'from-dynasty-purple',
    'to-dynasty-orange',
    'text-dynasty-purple',
    'text-dynasty-orange',
    'bg-dynasty-purple',
    'bg-dynasty-orange',
  ],
  theme: {
    extend: {
      colors: {
        'dynasty': {
          'purple': '#5B2A86',
          'purple-dark': '#3D1A5C',
          'purple-light': '#7B4FA2',
          'orange': '#FF7A00',
          'orange-dark': '#CC6200',
          'orange-light': '#FF9A40',
          'cream': '#F8F6FB',
          'charcoal': '#221934',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
