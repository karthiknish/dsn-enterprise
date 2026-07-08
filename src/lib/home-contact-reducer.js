export const initialHomeContactState = {
	formData: {
		name: "",
		email: "",
		phone: "",
		company: "",
		message: "",
		productInterest: "",
	},
	fieldErrors: {},
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
		case "SET_FIELD_ERRORS":
			return {
				...state,
				fieldErrors: action.fieldErrors,
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
				fieldErrors: action.fieldErrors || state.fieldErrors,
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
