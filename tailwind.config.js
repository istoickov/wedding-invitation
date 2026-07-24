/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b0000",
        secondary: "#5f5e5a",
        tertiary: "#735c00",
        "outline-variant": "#e3beb8",
        "on-surface-variant": "#5a403c",
        background: "#fff8f5",
        "surface-container-low": "#fbf2ed",
        "surface-container": "#f5ece7",
        surface: "#fff8f5",
        "surface-container-highest": "#e9e1dc",
        "surface-dim": "#e1d8d4",
        "surface-container-high": "#efe6e2",
      },
      fontFamily: {
        headline: ["Playfair Display", "serif"],
        body: ["Libre Caslon Text", "serif"],
        label: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
