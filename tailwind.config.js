/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Include all routes
    "./components/**/*.{js,ts,jsx,tsx}" // Include your components
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkblue: "#14213D",
        yellow: "#FCA311",
        lightgray: "#E5E5E5",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
