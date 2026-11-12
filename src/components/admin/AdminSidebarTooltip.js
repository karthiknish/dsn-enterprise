"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Tooltip for the collapsed admin rail.
 *
 * WHY THIS IS PORTALLED AND FIXED
 * -------------------------------
 * The first version positioned the bubble `absolute left-full` inside the
 * nav. The nav is a scroll container (`overflow-y-auto`), and a scroll
 * container clips absolutely-positioned descendants on *both* axes whatever
 * z-index they carry — `z-50` cannot escape an ancestor's overflow. The
 * result was a tooltip sliced off exactly at the rail's border, half a word
 * visible.
 *
 * Pulling it out of the page flow is not enough on its own either: the
 * <aside> carries `translate-x-0`, and a transform creates a containing block
 * for fixed descendants, so `fixed` would have been measured against the
 * sidebar rather than the viewport. Rendering into document.body sidesteps
 * both the clipping context and the transformed ancestor, so the bubble can
 * genuinely sit over the content pane.
 *
 * Position is measured from the trigger's rect at show time, so it stays
 * correct at any scroll offset, and it is dismissed on scroll rather than
 * left to drift away from the icon it describes.
 */
export default function AdminSidebarTooltip({ children, content }) {
	const triggerRef = useRef(null);
	const [position, setPosition] = useState(null);
	const tooltipId = useId();

	const show = useCallback(() => {
		const trigger = triggerRef.current;
		if (!trigger) return;
		const icon = trigger.getBoundingClientRect();
		// Anchor to the rail's edge, not the icon's. Measuring from the icon
		// put the bubble's first ~20px over the rail, which is what made the
		// original read as a clipped label rather than a tooltip. Vertical
		// centring still follows the row being described.
		const rail = trigger.closest("#admin-sidebar") || trigger;
		const edge = rail.getBoundingClientRect().right;
		setPosition({ top: icon.top + icon.height / 2, left: edge + 8 });
	}, []);

	const hide = useCallback(() => setPosition(null), []);

	// A fixed bubble cannot follow a scrolling rail, so it retires instead of
	// pointing at the wrong row. Capture phase catches the nav's own scroll,
	// which does not bubble to window.
	useEffect(() => {
		if (!position) return undefined;
		window.addEventListener("scroll", hide, true);
		return () => window.removeEventListener("scroll", hide, true);
	}, [position, hide]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: the operable element is the <Link> rendered as this span's child; the span only observes that link's hover and focus to position a portalled tooltip, and is never itself a control.
		<span
			ref={triggerRef}
			className="relative flex items-center justify-center"
			onMouseEnter={show}
			onMouseLeave={hide}
			// React's focus events bubble, so this covers the link inside and
			// gives keyboard users the same label mouse users get. Escape
			// dismisses without moving focus.
			onFocus={show}
			onBlur={hide}
			onKeyDown={(event) => {
				if (event.key === "Escape") hide();
			}}
			aria-describedby={position ? tooltipId : undefined}
		>
			{children}
			{position &&
				typeof document !== "undefined" &&
				createPortal(
					<span
						role="tooltip"
						id={tooltipId}
						style={{ top: position.top, left: position.left }}
						className="pointer-events-none fixed z-[60] -translate-y-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg"
					>
						{content}
					</span>,
					document.body,
				)}
		</span>
	);
}
