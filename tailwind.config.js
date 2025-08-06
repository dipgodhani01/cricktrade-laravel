/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseDot: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1.2)",
          },
        },
        orbitRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        scalePulse: "scalePulse 1s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        spinReverse: "spinReverse 1.5s linear infinite",
        pulseDot: "pulseDot 1s ease-in-out infinite",
        orbitRotate: "orbitRotate 3s linear infinite",
      },
    },
  },
  plugins: [],
};
