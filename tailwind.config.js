/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // Make sure to include all React files
  ],
  theme: {
    extend: {      fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
},
  },
  plugins: [],
}
;

