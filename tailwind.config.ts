import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shiny-gradient-1": "repeating-linear-gradient(45deg, #fde047, #ffffff, #eab308, #ffffff, #fde047)",
        "shiny-gradient-2": "repeating-linear-gradient(45deg, #ffffff, #fde047, #ffffff, #eab308, #ffffff)",
        "shiny-gradient-3": "repeating-linear-gradient(45deg, #ffffff, #4d4d4d, #ffffff, #4d4d4d, #ffffff)"
      },
      colors: {
        primary: {
          light: '#fde047', // yellow-400
          DEFAULT: '#facc15', // yellow-500
          dark: '#eab308' // yellow-600
        },
        secondary: {
          light: '#fcd34d', // yellow-300
          DEFAULT: '#fbbf24', // yellow-400
          dark: '#f59e0b' // yellow-500
        }
      }
    },
  },
  plugins: [],
};
export default config;
