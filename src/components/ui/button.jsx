import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

function Button({ className, variant, size, ref, ...props }) {
	return (
		<button
			type={props.type ?? "button"}
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
}

/**
 * Link-styled button — renders a Next.js <Link> with the same variant
 * classes as Button. Use for navigational CTAs that look like buttons.
 */
function LinkButton({ className, variant, size, href, ...props }) {
	return (
		<Link
			href={href}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, LinkButton };
