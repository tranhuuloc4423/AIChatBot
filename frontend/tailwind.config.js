/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6849ff',
        second: '#ffc207',
        'black-100': '#191A1F',
        'black-200': '#1f222b',
        'black-300': '#2b2c31',
        'black-400': '#36373c',
        'black-500': '#0f1621',
        'gray-100': '#8c8d91',
        'gray-200': '#393939'
      }
    }
  },
  plugins: []
}
