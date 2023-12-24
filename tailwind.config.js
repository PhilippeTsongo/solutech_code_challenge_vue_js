/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index/html",  "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'sm': '576px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}

