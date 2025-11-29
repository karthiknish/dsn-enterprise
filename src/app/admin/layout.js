"use client";

import { AuthProvider } from "@/context/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminRootLayout({ children }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
