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
	const [isCollapsed, setIsCollapsed] = useState(() => {
		if (typeof window === "undefined") return false;
		try {
			const storedState = localStorage.getItem("adminSidebarCollapsed:v1");
			return storedState ? JSON.parse(storedState) : false;
		} catch {
			return false;
		}
	});

	useEffect(() => {
		if (!loading && !user && pathname !== "/admin/login") {
			push("/admin/login");
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

	if (!user && pathname !== "/admin/login") {
		return null;
	}

	if (pathname === "/admin/login") {
		return children;
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
