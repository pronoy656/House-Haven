"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandlordDashboardScreen } from "@/components/landlord/LandlordDashboardScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <LandlordDashboardScreen
        onSignOut={() => router.push("/login")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToIssueDetails={() => router.push("/maintenance")}
        onNavigateToProfile={() => router.push("/profile")}
        onNavigateToNotifications={() => router.push("/notifications")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
