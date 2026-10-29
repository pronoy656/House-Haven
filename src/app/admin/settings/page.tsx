import React from "react";
import { SettingsView } from "@/components/admin/SettingsView";

export const metadata = {
  title: "Platform Settings | Admin Portal",
  description: "Configure fees, automation rules, and operational contacts.",
};

export default function AdminSettingsPage() {
  return <SettingsView />;
}

