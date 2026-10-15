"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ApplicationDetailsScreen } from "@/components/landlord/ApplicationDetailsScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ApplicationDetailsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <ApplicationDetailsScreen
        onBack={() => router.push("/applications")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToMessages={() => router.push("/maintenance")}
        onNavigateToProfile={() => router.push("/profile")}
        onNavigateToNotifications={() => router.push("/notifications")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
