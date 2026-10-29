import React from "react";
import { ServiceRequestsView } from "@/components/admin/ServiceRequestsView";

export const metadata = {
  title: "Service Requests | Admin Portal",
  description: "Manage incoming service requests, dispatch quotes, and assign contractors.",
};

export default function AdminRequestsPage() {
  return <ServiceRequestsView />;
}

