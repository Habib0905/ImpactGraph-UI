/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    extend: {

    keyframes: {
        "fade-in-left": {
          "0%": {
              opacity: 0,
              transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
          },
      },
      },
      animation: {
          fadein: 'fade-in 1s ease-in-out 0.25s 1',
          fadeinleft: 'fade-in-left 1s ease-in-out 0.05s 1',
        },

    fontFamily: {
      abc : ["Gupter","EB Garamond"],
      abc2 : ["Gupter","Roboto Slab"]
    }
  }
  },
  plugins: [require("daisyui")],
};
