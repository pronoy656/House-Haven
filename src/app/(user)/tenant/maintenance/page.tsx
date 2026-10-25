"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { TenantMaintenanceHubScreen } from "@/components/tenant/TenantMaintenanceHubScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantMaintenancePage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <TenantMaintenanceHubScreen
        onBackToDashboard={() => router.push("/tenant/dashboard")}
        onNavigateToSearch={() => router.push("/tenant/search")}
        onNavigateToMatches={() => router.push("/tenant/matches")}
        onNavigateToProfile={() => router.push("/tenant/profile")}
        onNavigateToNotifications={() => router.push("/tenant/notifications")}
        onViewIssueDetails={() => router.push("/tenant/maintenance/issue-details")}
      />
    </MobileContainer>
  );
}
