# Design-system lint (`@shadcn/lint`)

`@shadcn/lint` checks how the Tailwind components are *used* — which classes are
allowed on which component, whether colours come from the theme, whether values
are on scale. It is the linter the design system is verified with.

Run it with:

```bash
npm run lint:design      # eslint src
```

`npm run lint` is still Biome (formatting + correctness). The two are separate
and both are expected to pass.

## Why this needed a Tailwind v4 upgrade

The plugin's theme-aware rules (`no-raw-colors`, `no-unknown-classes`,
`no-arbitrary-values`) read the project's tokens from `@theme` blocks. This
project was on Tailwind v3 with the palette in `tailwind.config.js` and the raw
values in `:root`, so there was no `@theme` for the linter to read.

Tailwind was upgraded to v4 on 16 Sep 2026:

- `tailwindcss@4` + `@tailwindcss/postcss@4`; `autoprefixer` removed (v4
  prefixes and resolves `@import` itself).
- Two ambiguous PostCSS configs (`postcss.config.js` and `.mjs`) collapsed into
  one ESM `postcss.config.mjs`.
- `src/app/globals.css` now imports `tailwindcss` in one statement.
- `src/theme/index.css` was split: utility-generating colours into
  `@theme static`, and the values that are only ever read with `var()` (the raw
  semantic scales, border/social/chart colours, spacing reference values) stay
  in `:root`. `@theme static` keeps every variable in the output, which is what
  makes the existing `var(--color-…)` uses in arbitrary values safe.
- The v3 config's palette remapping was preserved as `@theme` aliases, so
  `red-*`/`yellow-*`/`blue-*`/`purple-*` still resolve to the project's
  error/warning/info/AI tokens rather than Tailwind's raw palette. Everything
  else **adopts the v4 defaults** deliberately: shadows, radii, ring width and
  the default border colour now use v4's values, which is a visible change.
- `tailwind.config.js` deleted; `components.json` no longer points at it.
- Removed v3 utilities rewritten: `flex-shrink-0`→`shrink-0` (32),
  `bg-gradient-to-*`→`bg-linear-to-*` (34), `bg-opacity-*`→slash syntax (12).

## Why ESLint "ran" but had never actually worked

`eslint.config.mjs` used `@eslint/eslintrc` `FlatCompat` to load
`next/core-web-vitals` in eslintrc form. Against `eslint-config-next@16` and
`eslint-plugin-react@7.37` that throws *"Converting circular structure to
JSON"* before any file is linted. `npm run lint` is Biome, so nobody noticed.

Fixed by importing Next 16's flat config directly:

```js
import next from "eslint-config-next/core-web-vitals";
export default [...next, { plugins: { shadcn }, rules: { … } }];
```

## Rules enabled

| Rule | Severity | What it enforces |
|---|---|---|
| `shadcn/no-unknown-classes` | error | classes Tailwind cannot generate |
| `shadcn/no-inline-styles` | error | no `style={{…}}` / `<style>` |
| `shadcn/no-raw-colors` | error | theme tokens, not the raw palette |
| `shadcn/no-arbitrary-values` | error | on-scale values, not `p-[13px]` |
| `shadcn/no-restyle` | error | components own their own styling; `layout` may be overridden |
| `shadcn/require-static-classes` | error | no unreadable dynamic class values |

`settings.shadcn.ui = "@/components/ui"` so the UI primitives are recognised, and
`note` appends the house rule to every message.

## Findings: 393 → 0 errors

The first run reported 84 files and 393 findings. All error-level findings are
fixed; 4 warnings remain (below). What each category needed:

### Fixed in code

| Rule | Before | Fix |
|---|---|---|
| `no-unknown-classes` | 33 | Real breakage. Removed dead `prose-lg`/`prose-sm`/`prose-headings:*` (the typography plugin was never installed, so only the hand-written `.prose` was doing anything — the image radius it asked for is now a real `.prose img` rule). Installed `tw-animate-css` so the Popover's `animate-in`/`zoom-in-95`/`slide-in-from-*` classes work. Declared `@utility scrollbar-hide`. Replaced the `field-error` hook class with a `data-field-error` attribute. Removed redundant dead `font-oswald` (headings already get Oswald from a base rule). |
| `no-inline-styles` | 16 | Runtime values now pass CSS custom properties (`--bar-width`, `--dot-color`, `--float-x/y`) consumed by `@utility bar-fill` / `chart-dot` / `floating-panel`. The two `<style>` elements (TipTap editor tables, react-day-picker overrides) moved into `globals.css`, and `EditorStyles.js` was deleted. |
| `no-raw-colors` | 87 | Raw palette mapped onto the project's semantic tokens: `green-*`/`emerald-*` → `success-*`, `amber-*` → `yellow-*` (warning), `purple-900`→`purple-800`, `yellow-900`→`yellow-800`. Added the missing shadcn component tokens (`muted`, `muted-foreground`, `ring`, `destructive`, `popover`, `card`, …) and promoted `--color-border` and a `--color-gray-950` (overlay scrim) into `@theme`. |
| `no-arbitrary-values` | 129 | Off-scale type/scale values became tokens (`--text-2xs`, `--text-3xs`, `--text-md`, `--scale-98/99/102`, `--ease-snappy`), and exact scale equivalents were applied (`max-w-[240px]`→`max-w-60`, `min-h-[320px]`→`min-h-80`, `rounded-[2px]`→`rounded-xs`, …). Variable shorthand `bg-[color:var(--x)]` → `bg-(color:--x)`. The remaining 32 decorative values (gradients, `calc()`, viewport heights, custom grid templates, percentages) are allowlisted explicitly in `eslint.config.mjs`. |
| `no-restyle` | 115 | `src/components/ui/*` are thin primitives that exist to be composed with `className`, so the contract now says so: `TableRow`, `TableHead`, `TableCell`, `LinkButton`, `CollapsibleTrigger`, `Badge` and `Calendar` get explicit `allow` lists. `Button`, `Card` and the rest stay locked. Two genuinely redundant `border-b` overrides were removed from the analytics tables. |
| React/Next | 19 | Escaped 4 unescaped apostrophes; `setLoading(true)`/`setFetchError(null)` removed where the initial state already matched (they were noise in `[]`-dep effects); loading reset moved from an effect into the retry handler; `Date.now()` moved out of render in `useGoogleAdsTracking`; a stale ref in a `HeaderMobileNav` cleanup captured before use; an `<a href="/blog">` became `<Link>`; a ref passed to an argument-less factory stopped being passed; and a genuine syntax error (`<h2>` closed with `</h1>`) in `compliance1.jsx` was fixed. |

### Remaining warnings (4)

`@next/next/no-img-element` in `compare-products1.jsx`, `compliance1.jsx` (×2) and
`feature72.jsx`. All three files are **unused shadcnblocks templates** — no
import reaches them. Converting their remote `<img>` sources to `next/image`
would mean adding `remotePatterns` to `next.config.js` for images nothing
renders. Left as warnings (`npm run lint:design` exits 0); delete the files if
the templates are not wanted.

## Notes

- `biome.json` gained `css.parser.tailwindDirectives: true` — without it Biome
  cannot parse `@theme`/`@utility` and `npm run lint` breaks on the stylesheets.
- Biome errors went from 110 to 76 as a side effect of formatting the files
  touched here; that backlog is unrelated to this work and predates it.
- The v4 upgrade **adopts v4's defaults** for shadows, radii, ring width and the
  default border colour, so a visual pass over key pages is worthwhile before
  deploying even though every utility compiles.

