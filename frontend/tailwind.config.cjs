/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'davalRed': '#f76346',
        'davaldark': '#Of0f0f',
        'textColor': '#252b36',
        'greyIsh': '#f1f4f8',
      }
    },
  },
  plugins: [],
}
