import AdminLayout from "@/components/admin/AdminLayout";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
	title: "Admin - DSN Enterprises",
	robots: {
		index: false,
		follow: false,
	},
};

export default function AdminRootLayout({ children }) {
	return (
		<AuthProvider>
			<AdminLayout>{children}</AdminLayout>
		</AuthProvider>
	);
}
