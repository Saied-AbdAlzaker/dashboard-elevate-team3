/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'danger': '#A6252A',
        'primary': '#0063D01A',
      }
    },
  },
  plugins: [],
}

