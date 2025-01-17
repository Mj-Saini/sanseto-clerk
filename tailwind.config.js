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
        hover_secondry_clr: "#c42b1e09", 
        tertiary_clr: "#c42b1e",
        light_success_clr: "#4caf5029",

      },
    },
  },
  plugins: [],
}