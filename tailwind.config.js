/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: "#00000",
        secondary: "#FFFFFF",
        blue: "#3958F9",
        lightGray: "#D9D9D9",
        darkGray: "#91929C",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        xxsm: "10px",
        xsm: "13px",
        sm: "20px",
        md: "25px",
        lg: "36px",
      },
      screens: {
        lg: "1055px",
        sm: "400px",
      },
    },
  },
  plugins: [],
};

