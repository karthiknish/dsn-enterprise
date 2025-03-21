/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#374941",
          light: "#4a6257",
          dark: "#2a3831",
        },
        secondary: {
          DEFAULT: "#B5C3AB",
          light: "#c7d2be",
          dark: "#9aaa8e",
        },
      },
    },
  },
  plugins: [],
};
