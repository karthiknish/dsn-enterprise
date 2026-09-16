import { plugin as shadcn } from "@shadcn/lint";
import next from "eslint-config-next/core-web-vitals";

/**
 * Flat ESLint config.
 *
 * `eslint-config-next@16` ships a flat config array, so it is spread directly.
 * The previous config used `@eslint/eslintrc` FlatCompat to load
 * "next/core-web-vitals" in eslintrc form; that combination throws
 * "Converting circular structure to JSON" against eslint-plugin-react 7.37, so
 * ESLint never actually ran in this project — `npm run lint` is Biome only.
 *
 * @shadcn/lint is registered here because this is the config that covers the UI
 * files. Rule policy and the outstanding findings live in
 * docs/DESIGN-SYSTEM-LINT.md.
 */

/**
 * Arbitrary values the design system permits.
 *
 * Everything tokenisable has been moved onto the scale (see
 * docs/DESIGN-SYSTEM-LINT.md), so what is left is deliberately outside it:
 * viewport-relative heights, `calc()` sizing, decorative grid/radial
 * backgrounds and their tile sizes, custom grid templates, and a couple of
 * one-off display type sizes. Listing them explicitly is the point — an
 * exception should be visible in the config, not implied by a broad category.
 */
const ALLOWED_ARBITRARY_VALUES = [
	// Decorative backgrounds and their tile sizes
	"bg-[linear-gradient(135deg,#f6f8f4_0%,#e8ede3_100%)]",
	"bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]",
	"bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]",
	"bg-[radial-gradient(#374941_1px,transparent_1px)]",
	"bg-[radial-gradient(circle_at_80%_20%,var(--color-secondary-light)_0%,transparent_50%)]",
	"bg-[size:20px_20px]",
	"bg-[size:24px_24px]",
	"bg-[size:40px_40px]",
	"bg-[size:48px_48px]",
	// Custom grid templates
	"grid-cols-[1.3fr_auto_1fr_auto_1fr]",
	"grid-cols-[5fr_7fr]",
	"lg:grid-cols-[5fr_7fr]",
	"md:grid-cols-[1.3fr_auto_1fr_auto_1fr]",
	// Viewport-relative and calc() sizing
	"min-h-[40vh]",
	"min-h-[50vh]",
	"min-h-[calc(100dvh-4rem)]",
	"min-h-[inherit]",
	"max-h-[90vh]",
	"max-h-[calc(90vh-180px)]",
	"max-w-[min(100vw-2rem,24rem)]",
	"w-[calc(100%-2rem)]",
	// Percentage sizing and offsets
	"max-w-[60%]",
	"max-w-[85%]",
	"max-w-[92%]",
	"left-[12%]",
	"right-[12%]",
	// One-off display type
	"leading-[1.1]",
	"lg:text-[3.25rem]",
	"text-[11rem]",
	"text-[3.25rem]",
	"tracking-[0.12em]",
	"tracking-[0.15em]",
];

const eslintConfig = [
	...next,
	{
		files: ["src/**/*.{js,jsx,ts,tsx}"],
		plugins: { shadcn },
		settings: {
			shadcn: {
				ui: "@/components/ui",
				note: "DSN design system: use theme tokens (primary, accent, secondary, the var(--color-*) scale) rather than raw palette colours.",
			},
		},
		rules: {
			/**
			 * `src/components/ui/*` are thin primitives, not locked components.
			 * TableRow / TableHead / TableCell / LinkButton exist to be composed
			 * with `className` at the call site, so the contract says so
			 * explicitly rather than reporting ~115 legitimate overrides.
			 * Button, Card and Badge stay locked to their own variants.
			 */
			"shadcn/no-restyle": [
				"error",
				{
					allow: ["layout"],
					contracts: [
						{
							pattern: "^TableRow$",
							allow: ["layout", "spacing", "typography", "color", "shape", "effects"],
						},
						{
							pattern: "^Calendar$",
							allow: ["layout", "spacing", "typography", "color"],
						},
						{
							pattern: "^TableHead$",
							allow: ["layout", "spacing", "typography", "color", "shape"],
						},
						{
							pattern: "^TableCell$",
							allow: ["layout", "spacing", "typography", "color", "shape"],
						},
						{
							pattern: "^LinkButton$",
							allow: [
								"layout",
								"spacing",
								"typography",
								"color",
								"shape",
								"effects",
							],
						},
						{
							pattern: "^CollapsibleTrigger$",
							allow: ["layout", "spacing", "typography", "color", "motion"],
						},
						{
							pattern: "^Badge$",
							allow: ["layout", "spacing", "typography", "color"],
						},
					],
				},
			],
			"shadcn/no-raw-colors": "error",
			"shadcn/no-arbitrary-values": [
				"error",
				{ allow: ["layout", ...ALLOWED_ARBITRARY_VALUES] },
			],
			"shadcn/no-inline-styles": "error",
			"shadcn/no-unknown-classes": "error",
			"shadcn/require-static-classes": "error",
		},
	},
];

export default eslintConfig;
