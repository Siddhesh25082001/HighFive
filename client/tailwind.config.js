/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'user': '#25D366',
        'peer': '#075E54'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}