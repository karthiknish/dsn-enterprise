"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils.js"
import { Calendar } from "./calendar.jsx"

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef(null)
  const buttonRef = React.useRef(null)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const [currentMonth, setCurrentMonth] = React.useState(value ? new Date(value) : new Date())

  const date = value ? new Date(value) : undefined

  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      // Format using local time to avoid off-by-one/timezone issues
      const formatted = format(selectedDate, 'yyyy-MM-dd')
      onChange(formatted)
      setCurrentMonth(selectedDate)
    } else {
      onChange("")
    }
    setOpen(false)
  }

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 4,
        left: rect.left,
      })
    }
  }

  React.useEffect(() => {
    if (open) {
      updatePosition()
    }
  }, [open])

  // Close when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full justify-start text-left font-normal px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
          !date ? "text-gray-400" : "text-gray-900"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 inline text-gray-500" />
        {date ? format(date, "PPP") : <span>{placeholder}</span>}
      </button>

      {open && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            initialFocus
            captionLayout="dropdown"
            startMonth={new Date(2000, 0, 1)}
            endMonth={new Date(2030, 11, 31)}
          />
        </div>
      )}
    </div>
  )
}
