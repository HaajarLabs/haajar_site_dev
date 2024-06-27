const { BiBorderRadius } = require('react-icons/bi');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        flipbottom: {
          '0%': {
            transform: 'rotateX(0)'
          },
          '100%': {
            transform: 'rotateX(-180deg)'
          }
        },
      },
      animation: {
        flipbottom: 'flip-bottom 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) both'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      backgroundImage: {

        'hero-pattern': "url('./src/ssets/hero.PNG')",
        'login-back': "url('./src/assets/login.PNG')",
        'pattern': "url('./src/assets/about_bg.svg')",


      },
      colors: {
        primary: "#ffffff",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        vilane_bold: ["Vilane-Bold", "sans-serif"],
        vilane_Extra_light: ["Vilane-Extra-Light", "sans-serif"],
        vilane_Light: ["Vilane-Light", "sans-serif"],
        vilane_Medium: ["Vilane-Medium", "sans-serif"],
        vilane_Regular: ["Vilane-Regular", "sans-serif"],
        vilane_Semi_bold: ["Vilane-Semi-Bold", "sans-serif"],
        vilane_Thin: ["Vilane-Thin", "sans-serif"],
      },
    },
    screens: {
      xs: "320px",
      ss: "375px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};