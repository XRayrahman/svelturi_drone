/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337" },
        black: {
          100: "#d3d4d6",
          200: "#a7a9ad",
          300: "#7a7e83",
          400: "#4e535a",
          500: "#222831",
          600: "#1b2027",
          700: "#14181d",
          800: "#0e1014",
          900: "#07080a"
        },
        orange: {
          100: "#fcede0",
          200: "#fadac1",
          300: "#f7c8a3",
          400: "#f5b584",
          500: "#f2a365",
          600: "#c28251",
          700: "#91623d",
          800: "#614128",
          900: "#302114"
        },
      }
    },
    fontFamily: {
      'body': [
        'Inter',
      ], 'sans': [
        'Inter',
      ]
    }
  },
  plugins: [],
}
