/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f6f4",
          100: "#cceee9",
          200: "#99dfd3",
          300: "#66cfbd",
          400: "#33bfA7",
          500: "#0ea5a4",
          600: "#0b8f89",
          700: "#0a7a72",
          800: "#075e56",
          900: "#05473f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
