/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        siteColor: "#274760",
        secondColor: "#307BC4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        move: {
          "0%": { bottom: "-100%", right: "-100%" },

          "30%": { bottom: "0", right: "0" },

          "60%": { bottom: "5%", right: "50%" },

          "80%": { bottom: "0", right: "70%" },
          "100%": { bottom: "-100%", right: "100%" },
        },
      },
      animation: {
        move: "move 3s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip-triangle": {
          clipPath: "polygon(50% 0, 0 50%, 100% 50%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  darkMode:'class',
};
