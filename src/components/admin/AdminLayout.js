"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

function getAdminPageTitle(pathname) {
	const exact = {
		"/admin": "Dashboard",
		"/admin/analytics": "Analytics",
		"/admin/blog": "Blog posts",
		"/admin/blog/new": "Create post",
		"/admin/contacts": "Contacts",
	};
	if (exact[pathname]) return exact[pathname];
	if (/^\/admin\/blog\/[^/]+\/edit$/.test(pathname)) return "Edit post";
	return "Admin";
}

export default function AdminLayout({ children }) {
	const { user, logout, loading } = useAuth();
	const { push } = useRouter();
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	// Starts false (matching the server-rendered markup) and is synced from
	// localStorage after mount, so the client's first hydration pass never
	// disagrees with the server's — a mismatch here previously let the
	// sidebar width and content offset briefly (or persistently) desync.
	const [isCollapsed, setIsCollapsed] = useState(false);

	useEffect(() => {
		try {
			const storedState = localStorage.getItem("adminSidebarCollapsed:v1");
			if (storedState) setIsCollapsed(JSON.parse(storedState));
		} catch {
			// ignore malformed/inaccessible storage
		}
	}, []);

	// Redirect logic in a single effect so all hooks run before any return.
	useEffect(() => {
		if (loading) return;
		if (!user && pathname !== "/admin/login") {
			push("/admin/login");
		}
		if (user && pathname === "/admin/login") {
			push("/admin");
		}
	}, [user, loading, push, pathname]);

	const toggleSidebar = () => {
		const newState = !isCollapsed;
		setIsCollapsed(newState);
		localStorage.setItem("adminSidebarCollapsed:v1", JSON.stringify(newState));
	};

	const handleLogout = async () => {
		await logout();
		push("/admin/login");
	};

	// Let the login page render even while the auth state is still resolving.
	// Without this, a hung onAuthStateChanged leaves the user stuck on a
	// forever-spinner with no way to retry. (See AuthContext timeout.)
	if (pathname === "/admin/login") {
		return children;
	}

	if (loading) {
		return (
			<output
				className="min-h-screen flex items-center justify-center bg-gray-50 w-full"
				aria-live="polite"
			>
				<span className="sr-only">Loading</span>
				<div
					className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
					aria-hidden
				/>
			</output>
		);
	}

	if (!user) {
		return null;
	}

	const pageTitle = getAdminPageTitle(pathname);

	return (
		<div className="min-h-screen bg-gray-50">
			{sidebarOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-gray-950 bg-opacity-50 lg:hidden"
					aria-label="Close sidebar"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<AdminSidebar
				isCollapsed={isCollapsed}
				sidebarOpen={sidebarOpen}
				onCloseMobile={() => setSidebarOpen(false)}
				onToggleCollapse={toggleSidebar}
				user={user}
				onLogout={handleLogout}
			/>

			<div
				className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}
			>
				<AdminHeader
					pageTitle={pageTitle}
					sidebarOpen={sidebarOpen}
					isCollapsed={isCollapsed}
					onOpenSidebar={() => setSidebarOpen(true)}
				/>

				<main
					id="admin-main"
					className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"
				>
					{children}
				</main>
			</div>
		</div>
	);
}
