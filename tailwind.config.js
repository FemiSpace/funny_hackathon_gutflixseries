/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "Inter", "sans-serif"],
      },
      colors: {
        'gutflix-pink': '#f472b6',
        'gutflix-yellow': '#fde68a',
        'gutflix-green': '#bbf7d0',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-slow': 'fadeIn 2s ease-in',
        'slide-in': 'slideIn 1s ease',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
