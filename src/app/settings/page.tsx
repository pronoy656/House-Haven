"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandlordProfileFlowScreen } from "@/components/landlord/LandlordProfileFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <LandlordProfileFlowScreen
        initialView="setting"
        onBack={() => router.push("/dashboard")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onLogout={() => router.push("/login")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
