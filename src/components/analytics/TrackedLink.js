"use client";

import * as gtag from "@/lib/gtag";

/**
 * An anchor that reports its own click before the browser follows it.
 *
 * Phone, email and WhatsApp were the largest measurement blind spot on the
 * site: `click_to_call` and `click_to_email` recorded nothing at all across 90
 * days, because the only tracked phone link lived on /thank-you while every
 * `tel:` and `mailto:` in the footer, the contact page and the city landing
 * pages was plain markup. Four of those call sites are server components, which
 * cannot take an `onClick` at all — hence a client component small enough to be
 * dropped into them without converting the page.
 *
 * @param {"phone"|"email"|"whatsapp"} kind - which event to send
 * @param {string} location - where on the site the click happened, for reporting
 */
export default function TrackedLink({
	href,
	kind,
	location = "unknown",
	children,
	...rest
}) {
	const handleClick = () => {
		const value = String(href || "");
		if (kind === "phone") {
			gtag.trackPhoneClick(value.replace(/^tel:/, ""), location);
		} else if (kind === "email") {
			gtag.trackEmailClick(
				value.replace(/^mailto:/, "").split("?")[0],
				location,
			);
		} else if (kind === "whatsapp") {
			gtag.trackWhatsAppClick(location);
		}
	};

	return (
		<a href={href} onClick={handleClick} {...rest}>
			{children}
		</a>
	);
}
