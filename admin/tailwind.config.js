/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./public/index.php",
    "./resources/**/*.blade.php",
  ],
  theme: {
    colors: {
      "white": '#f2f2f2',
      "graphite": '#4d4d4d',
      "black": '#1a1a1a',
      "blue": '#00b2ff',
    },
    extend: {
      screens: {
        'xs': '475px',
        'sm': '576px',
        'md': '834px',
        'lg': '992px',
        'xl': '1340px',
        'xxl': '1840px',
      }
    },
  },
  plugins: [],
  important: true,
}
