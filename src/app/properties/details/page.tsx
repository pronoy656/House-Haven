"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PropertyDetailsScreen } from "@/components/landlord/PropertyDetailsScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function PropertyDetailsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <PropertyDetailsScreen
        onBack={() => router.push("/properties")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToProfile={() => router.push("/profile")}
        onNavigateToNotifications={() => router.push("/notifications")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
