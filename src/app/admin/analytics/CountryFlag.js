"use client";

import Flags from "country-flag-icons/react/3x2";

/**
 * Small inline flag for a GA4 `countryId` (ISO 3166-1 alpha-2) code.
 * Unknown or empty codes render nothing so rows without a valid country
 * never show a broken box.
 */
export default function CountryFlag({ code }) {
	const iso = (code || "").trim().toUpperCase();
	const Flag = Flags[iso];
	if (!Flag) return null;
	return (
		<Flag
			className="h-3 w-4.5 shrink-0 rounded-xs ring-1 ring-black/10"
			aria-hidden
		/>
	);
}
