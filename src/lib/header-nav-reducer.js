export function createInitialHeaderNavState() {
	if (typeof window === "undefined") {
		return {
			isOpen: false,
			scrolled: false,
			isHome: true,
			productDropdown: false,
			companyDropdown: false,
			mobileProductExpanded: false,
			mobileCompanyExpanded: false,
		};
	}

	return {
		isOpen: false,
		scrolled: window.scrollY > 10,
		isHome: window.location.pathname === "/",
		productDropdown: false,
		companyDropdown: false,
		mobileProductExpanded: false,
		mobileCompanyExpanded: false,
	};
}

export function headerNavReducer(state, action) {
	switch (action.type) {
		case "SCROLL_UPDATE":
			return {
				...state,
				scrolled: action.scrolled,
				isHome: action.isHome,
			};
		case "TOGGLE_MENU":
			return { ...state, isOpen: !state.isOpen };
		case "CLOSE_MENU":
			return { ...state, isOpen: false };
		case "SET_PRODUCT_DROPDOWN":
			return { ...state, productDropdown: action.open };
		case "SET_COMPANY_DROPDOWN":
			return { ...state, companyDropdown: action.open };
		case "SET_MOBILE_PRODUCT_EXPANDED":
			return { ...state, mobileProductExpanded: action.expanded };
		case "SET_MOBILE_COMPANY_EXPANDED":
			return { ...state, mobileCompanyExpanded: action.expanded };
		default:
			return state;
	}
}
