module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
