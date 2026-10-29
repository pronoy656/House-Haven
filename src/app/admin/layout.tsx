import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel | House Haven",
  description: "Operations control, service requests, contractor dispatch and quotes management.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col md:flex-row text-slate-800 antialiased selection:bg-[#0891A2]/20 selection:text-[#0891A2]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

