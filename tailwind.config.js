/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        mainColor: "#8133F1",
        textColor: "#F4EBFF",
        hoverColor: "#9654F4",
        purple: {
          600: "#6B46C1",
          800: "#553C9A",
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
