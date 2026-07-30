/**
 * Shared formatters for the admin analytics dashboard.
 *
 * These live outside the components so a number rendered in a metric card, a
 * table cell and a CSV export cannot drift into three different formats.
 */

export const PLACEHOLDER = "—";

const isNum = (value) =>
	value !== null &&
	value !== undefined &&
	value !== "" &&
	Number.isFinite(Number(value));

export function formatCount(value) {
	if (!isNum(value)) return PLACEHOLDER;
	return Number(value).toLocaleString("en-IN");
}

/** GA4 returns rates as a 0–1 fraction. */
export function formatRate(value, digits = 1) {
	if (!isNum(value)) return PLACEHOLDER;
	return `${(Number(value) * 100).toFixed(digits)}%`;
}

export function formatDecimal(value, digits = 2) {
	if (!isNum(value)) return PLACEHOLDER;
	return Number(value).toFixed(digits);
}

/** Seconds → `2m 41s`, which reads faster than a raw second count. */
export function formatDuration(seconds) {
	if (!isNum(seconds)) return PLACEHOLDER;
	const total = Math.round(Number(seconds));
	const mins = Math.floor(total / 60);
	const secs = total % 60;
	if (mins === 0) return `${secs}s`;
	return `${mins}m ${secs}s`;
}

/** Signed percentage change for the comparison badges. */
export function formatChange(change) {
	if (!isNum(change)) return null;
	const n = Number(change);
	const sign = n > 0 ? "+" : "";
	return `${sign}${n.toFixed(Math.abs(n) < 10 ? 1 : 0)}%`;
}

/** `YYYYMMDD` (GA4's date dimension) → `12 Mar`. */
export function formatGaDate(value, { withYear = false } = {}) {
	if (typeof value !== "string" || value.length !== 8)
		return value || PLACEHOLDER;
	const year = Number(value.slice(0, 4));
	const month = Number(value.slice(4, 6)) - 1;
	const day = Number(value.slice(6, 8));
	const date = new Date(Date.UTC(year, month, day));
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		...(withYear ? { year: "numeric" } : {}),
		timeZone: "UTC",
	});
}

export function formatTimestamp(iso) {
	if (!iso) return PLACEHOLDER;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return PLACEHOLDER;
	return date.toLocaleString("en-IN", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export const PERIOD_LABELS = {
	"7d": "Last 7 days",
	"30d": "Last 30 days",
	"90d": "Last 90 days",
	"365d": "Last 12 months",
};
