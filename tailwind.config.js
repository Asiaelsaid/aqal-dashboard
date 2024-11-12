/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        mainColor: "#8133F1",
        textColor: "#F4EBFF",
        hoverColor:"#9654F4"
      },
    },
  },
  plugins: [],
};
