/**
 * Tailwind v4 PostCSS setup.
 *
 * v4 moved the PostCSS plugin into `@tailwindcss/postcss`, and it handles
 * `@import` and vendor prefixing itself — so `autoprefixer` and any
 * `postcss-import` step are gone. There is only one config file now; the old
 * `postcss.config.js` + `postcss.config.mjs` pair was ambiguous.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
