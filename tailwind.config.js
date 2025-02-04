/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        siteColor: "#274760",
        secondColor: "#307BC4",
        darkColor:"#151515"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
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
