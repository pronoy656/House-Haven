import React from "react";
import { UsersView } from "@/components/admin/UsersView";

export const metadata = {
  title: "Service Clients Directory | Admin Portal",
  description: "View and manage clients booking maintenance, repairs, and home services.",
};

export default function AdminServiceClientsPage() {
  return (
    <UsersView
      forcedRole="Service Client"
      title="Service Clients Directory"
      subtitle="View and manage clients requesting repairs, plumbing, electrical, and trades services."
    />
  );
}
