"use client";

import { cn } from "@/lib/utils";
import { specifications } from "@/content/api-gauges-data";

const apiSpecs = [
  {
    title: "API Specification 5B",
    description:
      "Covers threading, gauging, and thread inspection of casing, tubing, and line pipe threads. Includes requirements for:",
    items: [
      "Round threads (8 TPI for casing, 10 TPI for tubing)",
      "Buttress threads (5 TPI)",
      "Line pipe threads (NPT)",
      "Working and reference gauges",
      "L1, L2, L3 gauge lengths",
    ],
  },
  {
    title: "API Specification 7-2",
    description:
      "Covers threading and gauging of rotary shouldered thread connections used on drill pipe and BHA. Includes:",
    items: [
      "NC (Numbered Connection) threads",
      "IF (Internal Flush) connections",
      "REG (Regular) connections",
      "FH (Full Hole) connections",
      "Standoff and pitch diameter gauges",
    ],
  },
];

const industries = [
  { label: "Oil & Gas Exploration", icon: "oil" },
  { label: "Drilling Operations", icon: "drill" },
  { label: "OCTG Manufacturing", icon: "oil" },
  { label: "Pipe & Tube Mills", icon: "drill" },
];

export default function ApiGaugesStandardsSection() {
  return (
    <section className="bg-muted/50 py-32">
      <div className="container mx-auto px-4">
        {/* Compliance1-style two-column layout */}
        <div className="mb-16 grid gap-9 lg:grid-cols-2">
          {/* Left: intro column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-medium text-balance lg:text-5xl">
              API Specifications 5B & 7-2
            </h2>
            <p className="text-lg text-muted-foreground">
              DSN Enterprises manufactures API gauges in full conformity with
              API Specification 5B and 7-2. Every gauge is certified,
              calibrated, and traceable to API master gauges, ensuring
              precision thread inspection for oilfield tubulars and rotary
              shouldered connections.
            </p>
          </div>

          {/* Right: API spec cards */}
          <div className="flex flex-col gap-6">
            {apiSpecs.map((spec) => (
              <div
                key={spec.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm lg:p-12"
              >
                <div>
                  <h2 className="text-xl font-medium lg:text-2xl">
                    {spec.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground/80">
                    {spec.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {spec.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Technical Specifications + Industries */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Technical Specifications table */}
          <div className="rounded-xl border border-border bg-background p-6 lg:p-8">
            <h2 className="mb-6 text-2xl font-medium">
              Technical Specifications
            </h2>
            <table className="w-full">
              <tbody>
                {specifications.map((spec) => (
                  <tr
                    key={spec.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 text-sm text-muted-foreground">
                      {spec.label}
                    </td>
                    <td className="py-3 text-right text-sm font-medium">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Industries Served */}
          <div className="rounded-xl border border-border bg-background p-6 lg:p-8">
            <h2 className="mb-6 text-2xl font-medium">
              Industries Served
            </h2>
            <ul className="space-y-3">
              {industries.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon === "oil" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M12 2a6 6 0 0 0-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 0 0-6-6z" />
                        <circle cx="12" cy="8" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    )}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
