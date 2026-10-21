/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Khmer OS Moul Light'", "'Moul'", "cursive"],
        logo: ["'Khmer OS Moul Light'", "'Moul'", "cursive"],
        moulLight: ["'Khmer OS Moul Light'", "'Moul'", "cursive"],
        body: ["'Kantumruy Pro'", "sans-serif"],
        serifAccent: ["'Cormorant Garamond'", "serif"],
        scriptAccent: ["'Pinyon Script'", "cursive"],
      },
      colors: {
        navy: {
          950: '#080d17',
          900: '#0f172a',
          800: '#151f33',
          700: '#1a2639',
          600: '#23324c',
          500: '#2f4265',
        },
        gold: {
          50: '#fdfbf5',
          100: '#fcf6ba',
          200: '#fbf5b7',
          300: '#f4e082',
          400: '#dfb738',
          500: '#bf953f',
          600: '#b38728',
          700: '#aa771c',
          800: '#8a5c10',
          900: '#5e3d07',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf8f4',
          200: '#f5f0e6',
          300: '#ede4d3',
          400: '#e0d1b9',
        },
        ruby: {
          700: '#8f1d2c',
          800: '#6d131f',
          900: '#4e0a13',
        }
      },
      backgroundImage: {
        'gold-metallic': 'linear-gradient(135deg, #7a5214 0%, #e8c86d 35%, #9e6f1f 65%, #69430c 100%)',
        'gold-metallic-soft': 'linear-gradient(135deg, rgba(122,82,20,0.92) 0%, rgba(232,200,109,0.95) 35%, rgba(158,111,31,0.92) 65%, rgba(105,67,12,0.95) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #69430c 0%, #7a5214 20%, #e8c86d 50%, #7a5214 80%, #69430c 100%)',
        'royal-gradient': 'linear-gradient(180deg, #0f172a 0%, #1a2639 50%, #0f172a 100%)',
        'royal-card': 'radial-gradient(circle at 50% 0%, #22334d 0%, #141c2c 60%, #0d131f 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(223, 183, 56, 0.28)',
        'gold-glow-lg': '0 0 40px rgba(223, 183, 56, 0.4)',
        'luxury': '0 10px 30px -5px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(191, 149, 63, 0.25)',
        'luxury-hover': '0 20px 40px -10px rgba(15, 23, 42, 0.35), 0 0 0 1.5px rgba(191, 149, 63, 0.5)',
        'inner-gold': 'inset 0 0 12px rgba(191, 149, 63, 0.25)',
      },
      animation: {
        'shimmer': 'shimmer 4s infinite linear',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
