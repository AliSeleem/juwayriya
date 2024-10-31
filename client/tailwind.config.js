/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#51145B',
        'socendery': '#66306E',
        'third': '#B286B8',
        'fourth': '#F0EBEB'
      }
    },
  },
  plugins: [],
}

