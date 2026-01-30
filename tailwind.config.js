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
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light: "var(--color-secondary-light)",
          dark: "var(--color-secondary-dark)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-dark)",
        },
        industry: {
          api: "var(--color-industry-api)",
          automotive: "var(--color-industry-automotive)",
          aerospace: "var(--color-industry-aerospace)",
          engineering: "var(--color-industry-engineering)",
          "oil-gas": "var(--color-industry-oil-gas)",
          medical: "var(--color-industry-medical)",
          power: "var(--color-industry-power)",
          electronics: "var(--color-industry-electronics)",
        },
        blog: {
          accent: "var(--color-blog-accent)",
          "accent-dark": "var(--color-blog-accent-dark)",
        },
      },
    },
  },
  plugins: [],
};
