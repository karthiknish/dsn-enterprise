export const initialHomeContactState = {
	formData: {
		name: "",
		email: "",
		phone: "",
		company: "",
		message: "",
		productInterest: "",
	},
	isSubmitting: false,
	submitSuccess: false,
	submitError: false,
	errorMessage: "",
};

export function homeContactReducer(state, action) {
	switch (action.type) {
		case "UPDATE_FIELD":
			return {
				...state,
				formData: {
					...state.formData,
					[action.field]: action.value,
				},
			};
		case "SUBMIT_START":
			return {
				...state,
				isSubmitting: true,
				submitError: false,
				submitSuccess: false,
				errorMessage: "",
			};
		case "SUBMIT_SUCCESS":
			return {
				...initialHomeContactState,
				submitSuccess: true,
			};
		case "SUBMIT_ERROR":
			return {
				...state,
				isSubmitting: false,
				submitError: true,
				errorMessage: action.errorMessage,
			};
		case "CLEAR_SUBMIT_ERROR":
			return {
				...state,
				submitError: false,
				errorMessage: "",
			};
		default:
			return state;
	}
}
