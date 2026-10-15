"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandlordNotificationScreen } from "@/components/landlord/LandlordNotificationScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <LandlordNotificationScreen
        onBack={() => router.back()}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToMessages={() => router.push("/maintenance")}
        onNavigateToProfile={() => router.push("/profile")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
