/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fff8ef',
        beige: '#fff3e6',
        'soft-blue': '#eaf8fb',
        orange: {
          DEFAULT: '#f58232',
          bright: '#ff7a1a',
          deep: '#e76e1a',
          soft: '#ffe5cf',
        },
        teal: {
          DEFAULT: '#138fa1',
          deep: '#087b86',
          soft: '#d6f0f4',
          ink: '#0b5b67',
        },
        navy: '#142033',
        ink: '#142033',
        muted: '#5b6577',
      },
      fontFamily: {
        display: ['Chewy', 'system-ui', 'sans-serif'],
        body: ['"Nunito Sans"', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(20, 32, 51, 0.12)',
        soft: '0 4px 14px -6px rgba(20, 32, 51, 0.10)',
        glow: '0 16px 40px -16px rgba(245, 130, 50, 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'paw-pattern':
          "radial-gradient(rgba(19,143,161,0.08) 1.5px, transparent 1.5px)",
      },
    },
  },
  plugins: [],
}
