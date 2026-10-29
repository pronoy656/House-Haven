import React from "react";
import { FinancesView } from "@/components/admin/FinancesView";

export const metadata = {
  title: "Finances & Transactions | Admin Portal",
  description: "Monitor rent payments, service quotes, and contractor payouts.",
};

export default function AdminFinancesPage() {
  return <FinancesView />;
}

