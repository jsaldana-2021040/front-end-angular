/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      spacing: {
        '1.5': '6px',
        '11': '42px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

