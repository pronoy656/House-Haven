"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandlordProfileFlowScreen } from "@/components/landlord/LandlordProfileFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <LandlordProfileFlowScreen
        initialView="setting"
        onBack={() => router.push("/dashboard")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToNotifications={() => router.push("/notifications")}
        onLogout={() => router.push("/login")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
