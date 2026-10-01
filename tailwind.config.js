/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        satya: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
          950: '#031728',
        },
        cyber: {
          cyan: '#00f0ff',
          teal: '#00ff9d',
          rose: '#ff2a6d',
          purple: '#9d4edd',
          amber: '#ffb703',
          dark: '#090d16',
          panel: '#111827',
          card: '#1f2937'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanLine 3s linear infinite',
        'glow': 'glowPulse 2s ease-in-out infinite alternate',
        'radar': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 4px rgba(2, 132, 199, 0.5))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.8))' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'neon-rose': '0 0 20px rgba(255, 42, 109, 0.35)',
        'neon-teal': '0 0 20px rgba(0, 255, 157, 0.35)',
        'neon-indigo': '0 0 20px rgba(79, 70, 229, 0.35)',
      }
    },
  },
  plugins: [],
}
