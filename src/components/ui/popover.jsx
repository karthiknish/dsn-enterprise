"use client";

import { cn } from "@/lib/utils";

function Popover({
	className,
	align: _align = "center",
	sideOffset: _sideOffset = 4,
	ref,
	...props
}) {
	return (
		<div
			ref={ref}
			className={cn(
				"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute mt-2",
				className,
			)}
			{...props}
		/>
	);
}

function PopoverTrigger({ className, children, ref, ...props }) {
	return (
		<button
			type="button"
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

function PopoverContent({ className, children, ref, ...props }) {
	return (
		<div ref={ref} className={cn("relative w-full", className)} {...props}>
			{children}
		</div>
	);
}

function PopoverAnchor({ className, ref, ...props }) {
	return <div ref={ref} className={className} {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
