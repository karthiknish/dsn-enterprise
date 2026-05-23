function processInlineMarkdown(text) {
	return text
		.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
		.replace(/__(.*?)__/g, "<strong>$1</strong>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")
		.replace(/_(.*?)_/g, "<em>$1</em>")
		.replace(/`(.*?)`/g, "<code>$1</code>")
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
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

	for (const line of lines) {
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
