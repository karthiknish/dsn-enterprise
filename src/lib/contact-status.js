export function getContactStatusColor(status) {
	switch (status) {
		case "new":
			return "bg-primary/10 text-primary";
		case "contacted":
			return "bg-yellow-100 text-yellow-800";
		case "resolved":
			return "bg-success-100 text-success-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
}

export function previewContactMessage(msg) {
	if (!msg || typeof msg !== "string") return ",";
	const t = msg.trim();
	if (t.length <= 80) return t;
	return `${t.slice(0, 80)}…`;
}
