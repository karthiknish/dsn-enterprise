function processInlineMarkdown(text) {
	return text
		.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
		.replace(/__(.*?)__/g, "<strong>$1</strong>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")
		.replace(/_(.*?)_/g, "<em>$1</em>")
		.replace(/`(.*?)`/g, "<code>$1</code>")
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function isTableRow(line) {
	return typeof line === "string" && /^\s*\|.*\|\s*$/.test(line);
}

function isTableSeparator(line) {
	return (
		typeof line === "string" && /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(line)
	);
}

function splitTableRow(line) {
	return line
		.trim()
		.replace(/^\||\|$/g, "")
		.split("|")
		.map((cell) => cell.trim());
}

function alignmentOf(separatorCell) {
	const left = separatorCell.startsWith(":");
	const right = separatorCell.endsWith(":");
	if (left && right) return "center";
	if (right) return "right";
	return null;
}

export function markdownToHtml(markdown) {
	if (!markdown) return "";

	const lines = markdown.split("\n");
	let html = "";
	let inList = false;
	let listType = null;

	const closeList = () => {
		if (inList) {
			html += listType === "ul" ? "</ul>" : "</ol>";
			inList = false;
			listType = null;
		}
	};

	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i];

		// GitHub-style table: a header row, a |---|---| separator, then body rows.
		// Without this, comparison tables render as literal pipe characters.
		if (isTableRow(line) && isTableSeparator(lines[i + 1])) {
			closeList();
			const headers = splitTableRow(line);
			const aligns = splitTableRow(lines[i + 1]).map(alignmentOf);

			let row = i + 2;
			const body = [];
			while (row < lines.length && isTableRow(lines[row])) {
				body.push(splitTableRow(lines[row]));
				row += 1;
			}

			const cell = (tag, text, index) => {
				const align = aligns[index];
				const style = align ? ` style="text-align:${align}"` : "";
				return `<${tag}${style}>${processInlineMarkdown(text)}</${tag}>`;
			};

			html += "<table><thead><tr>";
			html += headers.map((h, index) => cell("th", h, index)).join("");
			html += "</tr></thead><tbody>";
			for (const cells of body) {
				html += `<tr>${cells.map((c, index) => cell("td", c, index)).join("")}</tr>`;
			}
			html += "</tbody></table>";

			i = row - 1;
			continue;
		}

		if (line.match(/^###### /)) {
			closeList();
			html += `<h6>${line.replace(/^###### /, "")}</h6>`;
			continue;
		}
		if (line.match(/^##### /)) {
			closeList();
			html += `<h5>${line.replace(/^##### /, "")}</h5>`;
			continue;
		}
		if (line.match(/^#### /)) {
			closeList();
			html += `<h4>${line.replace(/^#### /, "")}</h4>`;
			continue;
		}
		if (line.match(/^### /)) {
			closeList();
			html += `<h3>${line.replace(/^### /, "")}</h3>`;
			continue;
		}
		if (line.match(/^## /)) {
			closeList();
			html += `<h2>${line.replace(/^## /, "")}</h2>`;
			continue;
		}
		if (line.match(/^# /)) {
			closeList();
			html += `<h1>${line.replace(/^# /, "")}</h1>`;
			continue;
		}
		if (line.match(/^---+$/)) {
			closeList();
			html += "<hr>";
			continue;
		}
		if (line.match(/^>\s*/)) {
			closeList();
			html += `<blockquote><p>${line.replace(/^>\s*/, "")}</p></blockquote>`;
			continue;
		}
		if (line.match(/^\s*[-*+]\s+/)) {
			const content = line.replace(/^\s*[-*+]\s+/, "");
			if (!inList || listType !== "ul") {
				if (inList) html += "</ol>";
				html += "<ul>";
				inList = true;
				listType = "ul";
			}
			html += `<li>${processInlineMarkdown(content)}</li>`;
			continue;
		}
		if (line.match(/^\s*\d+\.\s+/)) {
			const content = line.replace(/^\s*\d+\.\s+/, "");
			if (!inList || listType !== "ol") {
				if (inList) html += "</ul>";
				html += "<ol>";
				inList = true;
				listType = "ol";
			}
			html += `<li>${processInlineMarkdown(content)}</li>`;
			continue;
		}
		if (line.trim() === "") {
			closeList();
			continue;
		}
		closeList();
		html += `<p>${processInlineMarkdown(line)}</p>`;
	}

	if (inList) {
		html += listType === "ul" ? "</ul>" : "</ol>";
	}

	return html;
}
