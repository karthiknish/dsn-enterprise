"use client";

import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils.js";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
	return (
		<div>
			<DayPicker
				showOutsideDays={showOutsideDays}
				className={cn("text-sm", className)}
				classNames={{
					months: "flex flex-col space-y-2",
					month: "space-y-2",
					caption: "flex justify-center pt-1 relative items-center gap-2",
					caption_label: "hidden",
					caption_dropdowns: "flex gap-1",
					nav: "space-x-1 flex items-center",
					button_previous: cn(
						"h-7 w-7 bg-white border border-gray-300 p-0 inline-flex items-center justify-center rounded text-sm transition-colors text-gray-700 hover:bg-gray-100 shadow-sm",
					),
					button_next: cn(
						"h-7 w-7 bg-white border border-gray-300 p-0 inline-flex items-center justify-center rounded text-sm transition-colors text-gray-700 hover:bg-gray-100 shadow-sm",
					),
					month_grid: "w-full border-collapse",
					weeks: "w-full",
					weekdays: "flex",
					weekday: "text-gray-700 rounded-md w-8 font-semibold text-xs py-1",
					week: "flex w-full mt-1",
					day: cn(
						"h-10 w-10 p-0 font-normal text-gray-900 hover:bg-accent-50 rounded-full transition-colors cursor-pointer flex items-center justify-center",
					),
					selected: "bg-accent text-white hover:bg-accent-700",
					today: "bg-accent-50 text-accent-700 font-medium",
					outside: "text-gray-300 opacity-50",
					// Passed straight to react-day-picker as its classNames hook,
					// not a Tailwind class.
					// eslint-disable-next-line shadcn/no-unknown-classes
					range_end: "range-end",
					disabled: "text-gray-300 opacity-50 cursor-not-allowed",
					range_middle: "bg-gray-100",
					hidden: "invisible",
					dropdown:
						"bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent",
					dropdown_icon: "hidden",
					dropdown_year: "w-20",
					dropdown_month: "w-28",
					...classNames,
				}}
				components={{
					Chevron: ({ ...props }) => {
						const orientation = props.orientation;
						return (
							<svg
								aria-hidden="true"
								className={`h-4 w-4 ${orientation === "left" ? "" : "-scale-x-100"}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						);
					},
				}}
				{...props}
			/>
		</div>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
