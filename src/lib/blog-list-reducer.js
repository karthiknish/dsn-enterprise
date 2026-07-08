export const BLOG_LIST_ITEMS_PER_PAGE = 10;

export const initialBlogListState = {
	posts: [],
	total: 0,
	totalPages: 1,
	loading: true,
	deleting: null,
	searchTerm: "",
	notification: null,
	showDeleteDialog: null,
	currentPage: 1,
	fetchError: null,
};

export function blogListReducer(state, action) {
	switch (action.type) {
		case "LOAD_START":
			return { ...state, loading: true, fetchError: null };
		case "LOAD_SUCCESS":
			return {
				...state,
				posts: action.posts,
				total: action.total,
				totalPages: action.totalPages,
				loading: false,
				fetchError: null,
				currentPage: Math.min(state.currentPage, action.totalPages || 1),
			};
		case "LOAD_ERROR":
			return {
				...state,
				loading: false,
				fetchError: action.error,
			};
		case "SET_SEARCH":
			return { ...state, searchTerm: action.searchTerm, currentPage: 1 };
		case "SET_PAGE":
			return { ...state, currentPage: action.page };
		case "SET_NOTIFICATION":
			return { ...state, notification: action.notification };
		case "CLEAR_NOTIFICATION":
			return { ...state, notification: null };
		case "SHOW_DELETE_DIALOG":
			return { ...state, showDeleteDialog: action.target };
		case "HIDE_DELETE_DIALOG":
			return { ...state, showDeleteDialog: null };
		case "DELETE_START":
			return { ...state, deleting: action.id, showDeleteDialog: null };
		case "DELETE_SUCCESS":
			return { ...state, deleting: null };
		case "DELETE_ERROR":
			return { ...state, deleting: null };
		default:
			return state;
	}
}
