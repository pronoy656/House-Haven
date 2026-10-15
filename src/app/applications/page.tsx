"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ApplicationOverviewScreen } from "@/components/landlord/ApplicationOverviewScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ApplicationsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <ApplicationOverviewScreen
        onBack={() => router.push("/dashboard")}
        onSelectApplication={() => router.push("/applications/details")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToProfile={() => router.push("/profile")}
        onNavigateToNotifications={() => router.push("/notifications")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
