export function deriveMetaTitle(title) {
	if (!title) return "";
	return title.length > 60 ? `${title.substring(0, 57)}...` : title;
}

export function deriveMetaDescription({ excerpt, content }) {
	let description = "";
	if (excerpt) {
		description = excerpt;
	} else if (content) {
		description = content
			.replace(/<[^>]*>/g, " ")
			.replace(/\s+/g, " ")
			.trim();
	}
	if (!description) return "";
	return description.length > 160
		? `${description.substring(0, 157)}…`
		: description;
}

export function applyNewPostSeoFields(prev, { title, excerpt, content }) {
	const next = { ...prev };
	if (title && !prev.metaTitle) {
		next.metaTitle = deriveMetaTitle(title);
	}
	if (!prev.metaDescription) {
		const metaDescription = deriveMetaDescription({ excerpt, content });
		if (metaDescription) next.metaDescription = metaDescription;
	}
	return next;
}

export function applyEditPostSeoFields(prev, original, { title, excerpt, content }) {
	const next = { ...prev };
	if (
		title &&
		(!prev.metaTitle || prev.metaTitle === original?.metaTitle)
	) {
		const metaTitle = deriveMetaTitle(title);
		if (metaTitle !== prev.metaTitle) next.metaTitle = metaTitle;
	}
	if (!prev.metaDescription || prev.metaDescription === original?.metaDescription) {
		const metaDescription = deriveMetaDescription({ excerpt, content });
		if (metaDescription && metaDescription !== prev.metaDescription) {
			next.metaDescription = metaDescription;
		}
	}
	return next;
}
