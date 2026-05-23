export function getEditDraftRestoreState(postId, postData) {
	const draftKey = `blog-draft-edit-${postId}`;
	if (typeof window === "undefined" || !postData) {
		return { showRestoreDialog: false, savedDraft: null };
	}

	const saved = localStorage.getItem(draftKey);
	if (!saved) {
		return { showRestoreDialog: false, savedDraft: null };
	}

	try {
		const parsed = JSON.parse(saved);
		const isDifferent =
			parsed.title !== postData.title || parsed.content !== postData.content;
		if (isDifferent) {
			return { showRestoreDialog: true, savedDraft: parsed };
		}
	} catch {
		localStorage.removeItem(draftKey);
	}

	return { showRestoreDialog: false, savedDraft: null };
}
