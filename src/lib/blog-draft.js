export function loadNewBlogDraftRestore() {
	if (typeof window === "undefined") {
		return { savedDraft: null, showRestoreDialog: false };
	}
	const saved = localStorage.getItem("blog-draft-new");
	if (!saved) {
		return { savedDraft: null, showRestoreDialog: false };
	}
	try {
		const parsed = JSON.parse(saved);
		if (parsed.title || parsed.content) {
			return { savedDraft: parsed, showRestoreDialog: true };
		}
	} catch {
		localStorage.removeItem("blog-draft-new");
	}
	return { savedDraft: null, showRestoreDialog: false };
}
