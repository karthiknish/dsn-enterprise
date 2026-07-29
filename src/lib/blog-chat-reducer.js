/**
 * State for the AI blog studio chat.
 *
 * Timeline entries are what the editor sees: their own messages, the agent's
 * replies, and the research steps in between. Draft/report live outside the
 * timeline because they are replaced, not appended.
 */

export const initialBlogChatState = {
	timeline: [],
	input: "",
	running: false,
	error: "",
	draft: null,
	report: null,
	sources: [],
	appliedAt: null,
};

let entryId = 0;
const nextId = () => {
	entryId += 1;
	return `e${entryId}`;
};

export function blogChatReducer(state, action) {
	switch (action.type) {
		case "SET_INPUT":
			return { ...state, input: action.input };

		case "SUBMIT":
			return {
				...state,
				input: "",
				running: true,
				error: "",
				timeline: [
					...state.timeline,
					{ id: nextId(), kind: "user", content: action.content },
				],
			};

		case "ASSISTANT":
			return {
				...state,
				timeline: [
					...state.timeline,
					{ id: nextId(), kind: "assistant", content: action.content },
				],
			};

		case "TOOL_CALL":
			return {
				...state,
				timeline: [
					...state.timeline,
					{
						id: nextId(),
						kind: "tool",
						callId: action.id,
						name: action.name,
						args: action.args,
						status: "running",
						summary: null,
					},
				],
			};

		case "TOOL_RESULT":
			return {
				...state,
				timeline: state.timeline.map((entry) =>
					entry.kind === "tool" && entry.callId === action.id
						? { ...entry, status: "done", summary: action.summary }
						: entry,
				),
			};

		case "TOOL_ERROR":
			return {
				...state,
				timeline: state.timeline.map((entry) =>
					entry.kind === "tool" && entry.callId === action.id
						? { ...entry, status: "error", error: action.error }
						: entry,
				),
			};

		case "DRAFT":
			return {
				...state,
				draft: action.draft,
				report: action.report,
				timeline: [
					...state.timeline,
					{
						id: nextId(),
						kind: "draft",
						title: action.draft.title,
						score: action.report?.score ?? null,
						wordCount: action.report?.wordCount ?? null,
					},
				],
			};

		case "REVISION":
			return {
				...state,
				timeline: [
					...state.timeline,
					{
						id: nextId(),
						kind: "revision",
						attempt: action.attempt,
						issues: action.report?.issues?.map((i) => i.id) || [],
					},
				],
			};

		case "DONE":
			return {
				...state,
				running: false,
				sources: action.sources?.length ? action.sources : state.sources,
			};

		case "ERROR":
			return { ...state, running: false, error: action.error };

		case "APPLIED":
			return { ...state, appliedAt: Date.now() };

		case "RESET":
			return { ...initialBlogChatState };

		default:
			return state;
	}
}
