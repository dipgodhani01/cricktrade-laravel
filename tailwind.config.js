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
        rotate1: {
          from: { transform: "rotateX(50deg) rotateZ(110deg)" },
          to: { transform: "rotateX(50deg) rotateZ(470deg)" },
        },
        rotate2: {
          from: { transform: "rotateX(20deg) rotateY(50deg) rotateZ(20deg)" },
          to: { transform: "rotateX(20deg) rotateY(50deg) rotateZ(380deg)" },
        },
        rotate3: {
          from: { transform: "rotateX(40deg) rotateY(130deg) rotateZ(450deg)" },
          to: { transform: "rotateX(40deg) rotateY(130deg) rotateZ(90deg)" },
        },
        rotate4: {
          from: { transform: "rotateX(70deg) rotateZ(270deg)" },
          to: { transform: "rotateX(70deg) rotateZ(630deg)" },
        },
      },
      animation: {
        scalePulse: "scalePulse 1s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        spinReverse: "spinReverse 1.5s linear infinite",
        pulseDot: "pulseDot 1s ease-in-out infinite",
        orbitRotate: "orbitRotate 3s linear infinite",
        rotate1: "rotate1 2s linear infinite",
        rotate2: "rotate2 2s linear infinite",
        rotate3: "rotate3 2s linear infinite",
        rotate4: "rotate4 2s linear infinite",
      },
    },
  },
  plugins: [],
};
