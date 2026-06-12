/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        navy: "#03449d",
        deepNavy: "#071226",
        capsuleOrange: "#ff6b00",
        safetyGreen: "#10b981",
        dangerRed: "#ef4444",
        softBlue: "#eaf3ff"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
