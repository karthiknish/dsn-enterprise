export const initialPexelsPickerState = {
	query: "",
	photos: [],
	loading: false,
	error: "",
	hasMore: true,
};

export function pexelsPickerReducer(state, action) {
	switch (action.type) {
		case "SET_QUERY":
			return { ...state, query: action.query };
		case "LOAD_START":
			return { ...state, loading: true, error: "" };
		case "LOAD_SUCCESS":
			return {
				...state,
				loading: false,
				photos: action.photos,
				hasMore: action.hasMore,
			};
		case "LOAD_ERROR":
			return { ...state, loading: false, error: action.error };
		case "APPEND_PHOTOS":
			return {
				...state,
				loading: false,
				photos: [...state.photos, ...action.photos],
				hasMore: action.hasMore,
			};
		default:
			return state;
	}
}
