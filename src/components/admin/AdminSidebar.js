"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS, LogoutIcon } from "./admin-nav-icons";
import AdminSidebarTooltip from "./AdminSidebarTooltip";

export default function AdminSidebar({
	isCollapsed,
	sidebarOpen,
	onCloseMobile,
	onToggleCollapse,
	user,
	onLogout,
}) {
	const pathname = usePathname();

	return (
		<aside
			id="admin-sidebar"
			aria-label="Admin navigation"
			className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200/80 transform transition-all duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
		>
			<div
				className={`flex items-center h-16 bg-white border-b border-gray-200/80 transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "justify-between px-6"}`}
			>
				{!isCollapsed ? (
					<Link href="/admin" className="flex items-center gap-3">
						<Image
							src="/images/logo.png"
							alt="DSN Enterprises"
							width={32}
							height={32}
							className="w-8 h-8 object-contain flex-shrink-0"
						/>
						<span className="text-lg font-bold tracking-tight text-gray-900 whitespace-nowrap">
							DSN Admin
						</span>
					</Link>
				) : (
					<Link
						href="/admin"
						className="flex items-center justify-center w-full"
					>
						<Image
							src="/images/logo.png"
							alt="DSN Enterprises"
							width={28}
							height={28}
							className="w-7 h-7 object-contain"
						/>
					</Link>
				)}

				<button
					type="button"
					className="lg:hidden text-gray-500 hover:text-gray-900 p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
					onClick={onCloseMobile}
					aria-label="Close menu"
				>
					<svg
						aria-hidden="true"
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{!isCollapsed && (
					<button
						type="button"
						onClick={onToggleCollapse}
						className="hidden lg:flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
						title="Collapse Sidebar"
						aria-label="Collapse sidebar"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
					</button>
				)}
			</div>

			<nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
				{ADMIN_NAV_ITEMS.map((item) => {
					const isActive =
						item.href === "/admin/blog"
							? pathname === "/admin/blog" ||
								(pathname.startsWith("/admin/blog/") &&
									pathname !== "/admin/blog/new")
							: pathname === item.href ||
								(item.href !== "/admin" && pathname.startsWith(item.href));

					return (
						<Link
							key={item.name}
							href={item.href}
							className={`relative flex items-center p-3 rounded-lg transition-all duration-200 group whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
								isActive
									? "bg-accent-50 text-accent-700"
									: "text-gray-600 hover:bg-gray-50 hover:text-accent-700"
							} ${isCollapsed ? "justify-center" : ""}`}
							onClick={onCloseMobile}
						>
							{isActive && (
								<span
									aria-hidden="true"
									className={`absolute rounded-full bg-accent ${isCollapsed ? "left-0.5 top-1/2 -translate-y-1/2 h-5 w-1" : "left-0 top-1/2 -translate-y-1/2 h-5 w-1"}`}
								/>
							)}
							{isCollapsed ? (
								<AdminSidebarTooltip content={item.name}>
									<item.icon
										className={`w-5 h-5 transition-colors flex-shrink-0 ${
											isActive
												? "text-accent"
												: "text-gray-400 group-hover:text-accent"
										}`}
									/>
								</AdminSidebarTooltip>
							) : (
								<>
									<item.icon
										className={`w-5 h-5 transition-colors flex-shrink-0 mr-3 ${
											isActive
												? "text-accent"
												: "text-gray-400 group-hover:text-accent"
										}`}
									/>
									<span className="font-medium">{item.name}</span>
								</>
							)}
						</Link>
					);
				})}
			</nav>

			<div
				className={`p-3 border-t border-gray-200/80 bg-white transition-all duration-300 ${isCollapsed ? "items-center" : ""}`}
			>
				{!isCollapsed ? (
					<div className="rounded-xl border border-gray-200/80 bg-gray-50/60 p-3">
						<div className="flex items-center gap-3 mb-3 px-0.5">
							<div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-sm font-medium text-accent-700 flex-shrink-0">
								{user?.email?.[0].toUpperCase()}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 truncate">
									{user?.email?.split("@")[0]}
								</p>
								<p className="text-xs text-gray-500 truncate">
									Administrator
								</p>
							</div>
						</div>

						<button
							type="button"
							onClick={onLogout}
							className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-white hover:text-red-700 transition-colors border border-gray-200/80 hover:border-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
						>
							<LogoutIcon className="w-4 h-4 mr-2" />
							Sign Out
						</button>
					</div>
				) : (
					<div className="flex flex-col items-center gap-4">
						<AdminSidebarTooltip content={user?.email || "User"}>
							<div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-sm font-medium text-accent-700 cursor-pointer">
								{user?.email?.[0].toUpperCase()}
							</div>
						</AdminSidebarTooltip>
						<AdminSidebarTooltip content="Sign Out">
							<button
								type="button"
								onClick={onLogout}
								className="p-2 text-gray-600 hover:text-red-700 hover:bg-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
								aria-label="Sign out"
							>
								<LogoutIcon className="w-5 h-5" />
							</button>
						</AdminSidebarTooltip>
						<AdminSidebarTooltip content="Expand Sidebar">
							<button
								type="button"
								onClick={onToggleCollapse}
								className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
								aria-label="Expand sidebar"
							>
								<svg
									aria-hidden="true"
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 5l7 7-7 7M5 5l7 7-7 7"
									/>
								</svg>
							</button>
						</AdminSidebarTooltip>
					</div>
				)}
			</div>
		</aside>
	);
}
