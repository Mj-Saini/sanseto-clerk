/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parimary: "#ffe4e6", 
        secondry_clr: "#c42b1e29", 
      },
    },
  },
  plugins: [],
}