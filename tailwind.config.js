/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#392780',
        'accent-pink': '#E00CF2',
        'accent-cyan': '#04F5F3',
        'space-dark': '#0b0926',
        'space-darker': '#070618',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'rotate': 'rotate 3s linear infinite',
        'twinkle': 'twinkle 4s infinite alternate',
        'shooting': 'shooting 6s linear infinite',
        'float': 'float 20s infinite alternate ease-in-out',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 20px rgba(4, 245, 243, 0.5)' },
          '50%': { textShadow: '0 0 30px rgba(4, 245, 243, 0.8)' },
        },
        'rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'twinkle': {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '0.7' },
        },
        'shooting': {
          '0%': {
            transform: 'translateX(0) rotate(var(--rotation))',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '20%': {
            transform: 'translateX(300px) rotate(var(--rotation))',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(300px) rotate(var(--rotation))',
            opacity: '0',
          },
        },
        'float': {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '50%': {
            transform: 'translate(30px, -20px) scale(1.1)',
          },
          '100%': {
            transform: 'translate(-20px, 30px) scale(0.9)',
          },
        },
        'slideInRight': {
          'from': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
}