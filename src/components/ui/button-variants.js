import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				// Solid primary button — used for main CTAs site-wide
				default: "bg-primary text-white hover:bg-primary-dark hover:shadow-md active:scale-[0.98]",
				// Outline button — border + transparent background (secondary CTAs)
				outline:
					"border-2 border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.98]",
				// White button — for use on dark/primary backgrounds (hero, page heroes)
				onDark:
					"bg-white text-primary hover:bg-secondary-light hover:shadow-lg active:scale-[0.98]",
				// Ghost button — no border/background, subtle hover
				ghost: "text-primary hover:bg-primary/5 active:scale-[0.98]",
				// Destructive — for dangerous actions (admin)
				destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
			},
			size: {
				default: "py-3 px-6",
				sm: "py-2 px-4 text-xs",
				lg: "py-3.5 px-8 text-base",
				icon: "h-10 w-10 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
