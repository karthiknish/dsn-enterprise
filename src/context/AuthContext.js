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

// If onAuthStateChanged never fires (network blocked, IndexedDB unavailable in
// private browsing, ad blockers severing Firebase Auth requests, domains
// blocked), `loading` would stay true forever and AdminLayout would render a
// spinner that never resolves. This safety net turns it false after 10 seconds
// so the login page becomes reachable and the user can retry.
const AUTH_INIT_TIMEOUT_MS = 10_000;

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authError, setAuthError] = useState(null);

	useEffect(() => {
		let resolved = false;

		const markDone = (err) => {
			if (resolved) return;
			resolved = true;
			if (err) {
				console.error("Auth initialization failed:", err);
				setAuthError(err);
			}
			setUser(null);
			setLoading(false);
		};

		const timeoutId = setTimeout(() => {
			if (!resolved) {
				markDone(
					new Error(
						"Auth initialization timed out. Check your network and Firebase configuration.",
					),
				);
			}
		}, AUTH_INIT_TIMEOUT_MS);

		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				resolved = true;
				clearTimeout(timeoutId);
				setUser(user);
				setAuthError(null);
				setLoading(false);
			},
			(error) => {
				// Without this, a listener error (e.g. auth/network-request-failed)
				// would leave `loading` stuck true forever with no feedback.
				resolved = true;
				clearTimeout(timeoutId);
				console.error("Auth state listener error:", error);
				setUser(null);
				setAuthError(error);
				setLoading(false);
			},
		);

		return () => {
			clearTimeout(timeoutId);
			unsubscribe();
		};
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
