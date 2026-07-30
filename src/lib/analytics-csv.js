/**
 * CSV export for the analytics dashboard.
 *
 * Built from the payload already in memory, so exporting costs no extra GA4
 * API quota.
 */

/**
 * Quote every field and neutralise leading `=`, `+`, `-`, `@`.
 * GA dimensions include user-influenced strings (referrer host, page path);
 * without the prefix guard a crafted value becomes a live formula when the
 * file is opened in Excel or Sheets.
 */
function cell(value) {
	if (value === null || value === undefined) return '""';
	let str = String(value);
	if (/^[=+\-@\t\r]/.test(str)) str = `'${str}`;
	return `"${str.replace(/"/g, '""')}"`;
}

function section(title, headers, rows) {
	return [
		cell(title),
		headers.map(cell).join(","),
		...rows.map((row) => row.map(cell).join(",")),
		"",
	].join("\n");
}

export function buildAnalyticsCsv(data) {
	if (!data) return "";

	const blocks = [
		section(
			"Summary",
			["Metric", "Current", "Previous", "Change %"],
			Object.entries(data.metrics || {}).map(([name, m]) => [
				name,
				m?.value ?? "",
				m?.previous ?? "",
				m?.change === null || m?.change === undefined
					? ""
					: m.change.toFixed(2),
			]),
		),
		section(
			"Daily trend",
			["Date", "Users", "Sessions", "Page views"],
			(data.trends || []).map((r) => [
				r.date,
				r.users,
				r.sessions,
				r.pageViews,
			]),
		),
		section(
			"Top pages",
			["Path", "Views", "Users", "Avg session duration (s)"],
			(data.topPages || []).map((r) => [
				r.path,
				r.views,
				r.users,
				Math.round(r.avgDuration || 0),
			]),
		),
		section(
			"Landing pages",
			["Landing page", "Sessions", "Bounce rate"],
			(data.landingPages || []).map((r) => [r.label, r.sessions, r.bounceRate]),
		),
		section(
			"Traffic sources",
			["Source / Medium", "Sessions", "Users"],
			(data.referrers || []).map((r) => [r.label, r.sessions, r.users]),
		),
		section(
			"Channels",
			["Channel", "Sessions", "Engagement rate"],
			(data.channels || []).map((r) => [r.label, r.sessions, r.engagementRate]),
		),
		section(
			"Devices",
			["Device", "Sessions", "Bounce rate"],
			(data.devices || []).map((r) => [r.label, r.sessions, r.bounceRate]),
		),
		section(
			"Countries",
			["Country", "Users", "Sessions"],
			(data.countries || []).map((r) => [r.label, r.users, r.sessions]),
		),
	];

	const header = [
		`"DSN Enterprises analytics export"`,
		`"Period","${data.period || ""}"`,
		`"Range","${data.range?.startDate || ""} to ${data.range?.endDate || ""}"`,
		`"Generated","${data.fetchedAt || ""}"`,
		"",
	].join("\n");

	return header + blocks.join("\n");
}

/** Triggers a client-side download; no-ops outside the browser. */
export function downloadAnalyticsCsv(data) {
	if (typeof window === "undefined") return;
	const csv = buildAnalyticsCsv(data);
	if (!csv) return;

	const blob = new Blob([`\uFEFF${csv}`], {
		type: "text/csv;charset=utf-8;",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `analytics-${data.period || "export"}-${new Date()
		.toISOString()
		.slice(0, 10)}.csv`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
