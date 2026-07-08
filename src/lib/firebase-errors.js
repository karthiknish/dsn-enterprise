// Maps Firebase Storage/Firestore error codes to messages an admin user can
// actually act on, instead of a generic "failed" string that hides whether
// the problem is permissions, quota, or connectivity.
export function describeStorageError(error, fallback = "Upload failed.") {
	switch (error?.code) {
		case "storage/unauthorized":
			return "You don't have permission to upload images. Try signing in again.";
		case "storage/canceled":
			return "Upload was canceled.";
		case "storage/quota-exceeded":
			return "Storage quota exceeded. Contact an administrator.";
		case "storage/retry-limit-exceeded":
			return "Upload timed out. Check your connection and try again.";
		default:
			return fallback;
	}
}

export function describeFirestoreError(error, fallback = "Something went wrong.") {
	switch (error?.code) {
		case "permission-denied":
			return "You don't have permission to do that. Try signing in again.";
		case "unavailable":
			return "Could not reach the server. Check your connection and try again.";
		case "resource-exhausted":
			return "Too many requests right now. Please try again shortly.";
		default:
			return fallback;
	}
}
