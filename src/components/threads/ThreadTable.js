import Link from "next/link";

/**
 * Presentational table for thread reference data.
 *
 * Reference data is scanned, not read, so the priorities are numeric
 * alignment, a header that stays put on a long table, and horizontal scroll
 * on a phone rather than wrapping a dimension across two lines (a wrapped
 * number in a table like this is a misread waiting to happen).
 *
 * @param {{ key: string, label: string, sub?: string, align?: "left"|"right" }[]} columns
 * @param {Record<string, any>[]} rows
 * @param {string} [caption] Visually-hidden table caption for screen readers.
 * @param {string} [note] Footnote rendered under the table.
 * @param {(row: Record<string, any>) => string} [rowHref] Makes the first cell a link.
 * @param {(row: Record<string, any>) => boolean} [isEmphasised] Highlights a row.
 */
export default function ThreadTable({
	columns,
	rows,
	caption,
	note,
	rowHref,
	isEmphasised,
}) {
	return (
		<figure className="my-6">
			<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
				<table className="w-full text-sm border-collapse">
					{caption && <caption className="sr-only">{caption}</caption>}
					<thead>
						<tr className="bg-primary text-white">
							{columns.map((col) => (
								<th
									key={col.key}
									scope="col"
									className={`px-3 py-3 font-semibold whitespace-nowrap ${
										col.align === "right" ? "text-right" : "text-left"
									}`}
								>
									{col.label}
									{col.sub && (
										<span className="block text-3xs font-normal text-white/70">
											{col.sub}
										</span>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							const emphasised = isEmphasised?.(row) ?? false;
							const href = rowHref?.(row);
							return (
								<tr
									key={row.designation ?? row.size ?? index}
									className={`border-t border-gray-100 ${
										emphasised
											? "bg-secondary/25"
											: index % 2 === 1
												? "bg-gray-50/70"
												: "bg-white"
									}`}
								>
									{columns.map((col, colIndex) => {
										const value = row[col.key];
										const isFirst = colIndex === 0;
										return (
											<td
												key={col.key}
												className={`px-3 py-2.5 tabular-nums whitespace-nowrap ${
													col.align === "right" ? "text-right" : "text-left"
												} ${
													isFirst
														? "font-semibold text-primary"
														: "text-gray-700"
												}`}
											>
												{isFirst && href ? (
													<Link
														href={href}
														className="underline decoration-secondary decoration-2 underline-offset-2 hover:text-primary-dark"
													>
														{value}
													</Link>
												) : (
													(value ?? "—")
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{note && (
				<figcaption className="mt-2 text-xs text-gray-500 leading-relaxed">
					{note}
				</figcaption>
			)}
		</figure>
	);
}
