export const initialTiptapEditorUiState = {
	showLinkDialog: false,
	showImageDialog: false,
	linkDialogKey: 1,
	imageDialogKey: 2,
	linkUrl: "",
	isDragging: false,
};

export function tiptapEditorUiReducer(state, action) {
	switch (action.type) {
		case "OPEN_LINK_DIALOG":
			return {
				...state,
				linkUrl: action.linkUrl,
				linkDialogKey: state.linkDialogKey + 1,
				showLinkDialog: true,
			};
		case "CLOSE_LINK_DIALOG":
			return { ...state, showLinkDialog: false };
		case "OPEN_IMAGE_DIALOG":
			return {
				...state,
				imageDialogKey: state.imageDialogKey + 1,
				showImageDialog: true,
			};
		case "CLOSE_IMAGE_DIALOG":
			return { ...state, showImageDialog: false };
		case "SET_DRAGGING":
			return { ...state, isDragging: action.isDragging };
		default:
			return state;
	}
}
