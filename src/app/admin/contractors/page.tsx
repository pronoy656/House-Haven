import React from "react";
import { ContractorsView } from "@/components/admin/ContractorsView";

export const metadata = {
  title: "Contractors & Trades | Admin Portal",
  description: "Manage registered trade partners, verified technicians, and availability.",
};

export default function AdminContractorsPage() {
  return <ContractorsView />;
}

