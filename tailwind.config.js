/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff1493',
          orange: '#ff5733',
          red: '#ff4444',
          purple: '#aa3bff',
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(50px, 50px) scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'neon-glow': {
          '0%, 100%': {
            textShadow: '0 0 10px rgba(255, 20, 147, 0.5), 0 0 20px rgba(255, 20, 147, 0.3)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 20, 147, 0.8), 0 0 40px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 87, 51, 0.4)',
          },
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to right, #ff1493, #ff5733, #ff4444)',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
}
