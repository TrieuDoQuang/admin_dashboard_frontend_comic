/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "media",
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        "black-50": "rgba(0, 0, 0, 0.5)",
      }),
      colors: {
        blur: "rgba(0, 0, 0, 0.5)",
        dimBlack: "rgba(26,26,26)",
        primary: {
          DEFAULT: "#1a56db",
          50: "#f9fafb",
          100: "#f4f6f8",
          200: "#e5eaf0",
          300: "#d2d9e3",
          400: "#a6b0d0",
          500: "#7484ba",
          600: "#5e67a2",
          700: "#4d528b",
          800: "#3c3f73",
          900: "#313761",
        },
      },
      animation: {
        "bounce-one": "bounce-one 1s",
        appear: "appear 0.5s ease-in-out",
        appearRight: "appearRight ease-in-out .3s",
        notification:
          "notification ease-in-out .3s, fadeOut 3s .3s ease-in-out forwards",
      },
      keyframes: {
        "bounce-one": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(-20px)" },
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(20%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        appearRight: {
          "0%": { opacity: "0", transform: "translateX(20%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        notification: {
          "0%": { opacity: "0", transform: "translateX(20%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeOut: { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
