/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      abc : ["Gupter","EB Garamond"],
      abc2 : ["Gupter","Roboto Slab"]
    }
  },
  plugins: [require("daisyui")],
};
