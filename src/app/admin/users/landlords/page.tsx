import React from "react";
import { UsersView } from "@/components/admin/UsersView";

export const metadata = {
  title: "Landlords Directory | Admin Portal",
  description: "View and manage all registered landlords and property owners.",
};

export default function AdminLandlordsPage() {
  return (
    <UsersView
      forcedRole="Landlord"
      title="Landlords Directory"
      subtitle="View and manage verified property owners, portfolio managers, and landlords."
    />
  );
}
