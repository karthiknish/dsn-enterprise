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
        blog: {
          accent: "var(--color-blog-accent)",
          "accent-dark": "var(--color-blog-accent-dark)",
        },
        text: {
          main: "var(--color-text-main)",
          heading: "var(--color-text-heading)",
          body: "var(--color-text-body)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          placeholder: "var(--color-text-placeholder)",
          light: "var(--color-text-light)",
          lighter: "var(--color-text-lighter)",
          onPrimary: "var(--color-text-on-primary)",
          onLight: "var(--color-text-on-light)",
          link: "var(--color-text-link)",
          "link-hover": "var(--color-text-link-hover)",
          success: "var(--color-text-success)",
          error: "var(--color-text-error)",
          warning: "var(--color-text-warning)",
        },
      },
    },
  },
  plugins: [],
};
