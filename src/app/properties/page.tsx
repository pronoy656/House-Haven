"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PropertiesOverviewScreen } from "@/components/landlord/PropertiesOverviewScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function PropertiesPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <PropertiesOverviewScreen
        onBack={() => router.push("/dashboard")}
        onSelectProperty={() => router.push("/properties/details")}
        onAddProperty={() => router.push("/properties/add")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToProfile={() => router.push("/profile")}
        onNavigateToNotifications={() => router.push("/notifications")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
