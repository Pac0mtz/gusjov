/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pulled from the Gusjov logo: black circle, white wordmark, gold mark
        // (#f4c074 tagline + bronze→champagne gradient on the G).
        ember: {
          50: '#fbf6eb',
          100: '#f6ebd3',
          200: '#ecd9a6',
          300: '#e0c078',
          400: '#f4c074', // logo "FLOORING SERVICES" gold — accents on dark
          500: '#c68e3c', // logo mark bronze — solid fills / buttons
          600: '#a87430',
          700: '#855b28',
          800: '#6c4a24',
          900: '#593e21',
        },
        oak: {
          50: '#faf7f2',
          100: '#f2ebe0',
          200: '#e3d5c0',
          300: '#cfb797',
          400: '#b8946c',
          500: '#a67c52',
          600: '#8d6544',
          700: '#734f39',
          800: '#5f4233',
          900: '#4f382d',
        },
        charcoal: {
          50: '#f6f6f5',
          100: '#e8e8e6',
          200: '#d0d0cd',
          300: '#aeaea9',
          400: '#85857f',
          500: '#6a6a65',
          600: '#555551',
          700: '#454542',
          800: '#2a2a28',
          900: '#121212',
          950: '#000000', // logo black
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '76rem',
      },
      boxShadow: {
        lift: '0 24px 60px -20px rgba(21, 19, 17, 0.45)',
        card: '0 2px 8px -2px rgba(21, 19, 17, 0.12), 0 12px 32px -12px rgba(21, 19, 17, 0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'soft-rise': {
          '0%': { opacity: '0', transform: 'translateY(22px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.55s ease-out both',
        'soft-rise': 'soft-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionTimingFunction: {
        unveil: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
