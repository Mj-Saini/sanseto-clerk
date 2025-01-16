/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_clr: "#6e3b37", 
        secondry_clr: "#c42b1e29", 
      },
    },
  },
  plugins: [],
}