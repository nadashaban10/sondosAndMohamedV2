/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Cinzel', 'serif'],
        arabic: ['Amiri', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        ruqaa: ['"Aref Ruqaa"', 'Amiri', 'serif'],
      },
      colors: {
        ink: 'rgba(var(--rgb-foreground), <alpha-value>)',
        paper: 'rgba(var(--rgb-surface), <alpha-value>)',
        mist: 'rgba(var(--rgb-background), <alpha-value>)',
        muted: 'rgba(var(--rgb-muted), <alpha-value>)',
        dim: 'rgba(var(--rgb-muted), <alpha-value>)',
        rose: {
          DEFAULT: 'rgba(var(--rgb-primary), <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgba(var(--rgb-accent), <alpha-value>)',
          soft: 'rgba(var(--rgb-accent-soft), <alpha-value>)',
          deep: 'rgba(var(--rgb-accent-deep), <alpha-value>)',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1s ease both',
        'scale-in': 'scaleIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-flora': 'floatFlora 8s ease-in-out infinite',
        'float-flora-alt': 'floatFloraAlt 9.5s ease-in-out infinite',
        'float-petal': 'floatPetal 5s ease-in-out infinite',
        'shimmer-line': 'shimmerLine 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatFlora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(10px, -16px, 0) rotate(5deg)' },
        },
        floatFloraAlt: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(-12px, 12px, 0) rotate(-6deg)' },
        },
        floatPetal: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg) scale(1)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translate(var(--petal-drift-x, 18px), -28px) rotate(12deg) scale(1.16)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translate(0, -52px) rotate(0deg) scale(1.1)',
            opacity: '0.55',
          },
          '75%': {
            transform: 'translate(calc(-1 * var(--petal-drift-x, 18px)), -22px) rotate(-11deg) scale(1.12)',
            opacity: '0.38',
          },
        },
        shimmerLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
