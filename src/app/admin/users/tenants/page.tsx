import React from "react";
import { UsersView } from "@/components/admin/UsersView";

export const metadata = {
  title: "Tenants Directory | Admin Portal",
  description: "View and manage all registered tenants on HouseHaven.",
};

export default function AdminTenantsPage() {
  return (
    <UsersView
      forcedRole="Tenant"
      title="Tenants Directory"
      subtitle="View and manage all registered tenants, leases, and identity verifications."
    />
  );
}
