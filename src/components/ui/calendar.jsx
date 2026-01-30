"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils.js"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <div>
      <style>{`
        .rdp-weekday { color: #374151 !important; font-weight: 600 !important; font-size: 0.875rem !important; }
        .rdp-day { color: #111827 !important; border-radius: 50% !important; }
        .rdp-day:hover { background-color: #f0fdf4 !important; }
        .rdp-day[data-selected] { background-color: #16a34a !important; color: white !important; font-weight: 600 !important; }
        .rdp-day.rdp-selected { background-color: #16a34a !important; color: white !important; font-weight: 600 !important; }
        .rdp-day.rdp-today { color: #15803d !important; font-weight: 600 !important; }
        .rdp-day.rdp-today[data-selected] { background-color: #16a34a !important; color: white !important; }
        .rdp-day.rdp-outside { color: #d1d5db !important; }
        .rdp-day.rdp-disabled { color: #e5e7eb !important; }
        .rdp-nav_button { color: #374151 !important; background-color: white !important; }
        .rdp-nav_button:hover { color: #111827 !important; background-color: #f3f4f6 !important; }
        .rdp-caption_label { color: #111827 !important; font-weight: 600 !important; }
        .rdp-dropdown { color: #374151 !important; background-color: white !important; border: 1px solid #d1d5db !important; border-radius: 0.375rem !important; padding: 0.25rem 0.5rem !important; font-size: 0.875rem !important; }
        .rdp-dropdown:hover { background-color: #f9fafb !important; }
        .rdp-dropdowns { display: flex !important; gap: 0.5rem !important; }
        .rdp-dropdown_year { width: 5rem !important; }
        .rdp-dropdown_month { width: 7rem !important; }
        .rdp-dropdown_icon { display: none !important; }
        .rdp-cell { outline: 1px solid #e5e7eb !important; }
        .rdp-table { outline: 1px solid #e5e7eb !important; }
      `}</style>
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
            "h-7 w-7 bg-white border border-gray-300 p-0 inline-flex items-center justify-center rounded text-sm transition-colors text-gray-700 hover:bg-gray-100 shadow-sm"
          ),
          button_next: cn(
            "h-7 w-7 bg-white border border-gray-300 p-0 inline-flex items-center justify-center rounded text-sm transition-colors text-gray-700 hover:bg-gray-100 shadow-sm"
          ),
          month_grid: "w-full border-collapse",
          weeks: "w-full",
          weekdays: "flex",
          weekday: "text-gray-700 rounded-md w-8 font-semibold text-xs py-1",
          week: "flex w-full mt-1",
          day: cn(
            "h-10 w-10 p-0 font-normal text-gray-900 hover:bg-green-50 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          ),
          range_end: "range-end",
          selected: "bg-green-600 text-white hover:bg-green-700",
          today: "bg-green-50 text-green-700 font-medium",
          outside: "text-gray-300 opacity-50",
          disabled: "text-gray-300 opacity-50 cursor-not-allowed",
          range_middle: "bg-gray-100",
          hidden: "invisible",
          dropdown: "bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500",
          dropdown_icon: "hidden",
          dropdown_year: "w-20",
          dropdown_month: "w-28",
          ...classNames,
        }}
        components={{
          Chevron: ({ ...props }) => {
            const orientation = props.orientation
            return (
              <svg
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
            )
          },
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
