export const initialImageDialogState = {
	url: "",
	alt: "",
	isDragging: false,
	preview: null,
	fileName: "",
};

export function imageDialogReducer(state, action) {
	switch (action.type) {
		case "SET_URL":
			return { ...state, url: action.url, preview: null, fileName: "" };
		case "SET_ALT":
			return { ...state, alt: action.alt };
		case "SET_DRAGGING":
			return { ...state, isDragging: action.isDragging };
		case "SET_FILE_PREVIEW":
			return {
				...state,
				url: action.url,
				preview: action.preview,
				fileName: action.fileName,
			};
		case "CLEAR_FILE":
			return { ...state, url: "", preview: null, fileName: "" };
		default:
			return state;
	}
}
