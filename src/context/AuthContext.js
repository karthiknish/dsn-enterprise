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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

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
		() => ({ user, login, signup, logout, loading }),
		[user, login, signup, logout, loading],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
