import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1622',
          light: '#0a1f3a',
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b3c5dd',
          300: '#8da9cc',
          400: '#6788bb',
          500: '#4267aa',
          600: '#355488',
          700: '#284066',
          800: '#1c2c44',
          900: '#0A1622',
        },
        ivory: '#F9F7F2',
        champagne: {
          DEFAULT: '#C5A059',
          light: '#D4B876',
          dark: '#A8863F',
        },
        'near-black': '#1A1A1A',
        'off-white': '#F4F7F9',
      },
      fontFamily: {
        serif: ['var(--font-vazir)', 'Vazirmatn', 'system-ui', 'sans-serif'],
        sans: ['var(--font-vazir)', 'Vazirmatn', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '0em' }],
        'section': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.15', letterSpacing: '0em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 7.5rem)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s ease forwards',
        'scale-in': 'scale-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
