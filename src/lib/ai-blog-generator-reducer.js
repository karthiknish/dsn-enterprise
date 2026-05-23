export const initialAiBlogGeneratorState = {
	topic: "",
	keywords: "",
	isGenerating: false,
	isGeneratingMeta: false,
	isLoadingIdeas: false,
	error: "",
	blogIdeas: [],
	showIdeas: false,
	copied: false,
	generatedContent: "",
	improveInstruction: "",
	isImproving: false,
};

export function aiBlogGeneratorReducer(state, action) {
	switch (action.type) {
		case "SET_TOPIC":
			return { ...state, topic: action.topic };
		case "SET_KEYWORDS":
			return { ...state, keywords: action.keywords };
		case "SET_ERROR":
			return { ...state, error: action.error };
		case "CLEAR_ERROR":
			return { ...state, error: "" };
		case "GENERATE_START":
			return { ...state, isGenerating: true, error: "" };
		case "GENERATE_SUCCESS":
			return {
				...state,
				isGenerating: false,
				generatedContent: action.content,
			};
		case "GENERATE_END":
			return { ...state, isGenerating: false };
		case "META_START":
			return { ...state, isGeneratingMeta: true, error: "" };
		case "META_END":
			return { ...state, isGeneratingMeta: false };
		case "IDEAS_START":
			return { ...state, isLoadingIdeas: true, error: "" };
		case "IDEAS_SUCCESS":
			return {
				...state,
				isLoadingIdeas: false,
				blogIdeas: action.ideas,
				showIdeas: true,
			};
		case "IDEAS_END":
			return { ...state, isLoadingIdeas: false };
		case "HIDE_IDEAS":
			return { ...state, showIdeas: false };
		case "SELECT_IDEA":
			return {
				...state,
				topic: action.title,
				keywords: action.keywords,
				showIdeas: false,
			};
		case "SET_COPIED":
			return { ...state, copied: action.copied };
		case "SET_IMPROVE_INSTRUCTION":
			return { ...state, improveInstruction: action.instruction };
		case "IMPROVE_START":
			return { ...state, isImproving: true, error: "" };
		case "IMPROVE_SUCCESS":
			return {
				...state,
				isImproving: false,
				generatedContent: action.content,
			};
		case "IMPROVE_END":
			return { ...state, isImproving: false };
		default:
			return state;
	}
}
