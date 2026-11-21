/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3daec',
          300: '#95bede',
          400: '#5f9dcd',
          500: '#3980ba',
          600: '#28659b',
          700: '#21517d',
          800: '#1e4467',
          900: '#1b3a56',
          950: '#112538',
        }
      }
    },
  },
  plugins: [],
}

