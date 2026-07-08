"use client";

import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { auth } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => use(AuthContext);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authError, setAuthError] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				setUser(user);
				setAuthError(null);
				setLoading(false);
			},
			(error) => {
				// Without this, a listener error (e.g. auth/network-request-failed)
				// would leave `loading` stuck true forever with no feedback.
				console.error("Auth state listener error:", error);
				setAuthError(error);
				setLoading(false);
			},
		);

		return () => unsubscribe();
	}, []);

	const login = useCallback(async (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	}, []);

	const signup = useCallback(async (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}, []);

	const logout = useCallback(async () => {
		return signOut(auth);
	}, []);

	const value = useMemo(
		() => ({ user, login, signup, logout, loading, authError }),
		[user, login, signup, logout, loading, authError],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
