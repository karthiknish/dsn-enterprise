import * as React from "react";

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

export { Button };
