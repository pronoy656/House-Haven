"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { TenantDashboardScreen } from "@/components/tenant/TenantDashboardScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function TenantDashboardPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <TenantDashboardScreen
        onNavigateToNotifications={() => router.push("/tenant/notifications")}
        onNavigateToSearch={() => router.push("/tenant/search")}
        onNavigateToMatches={() => router.push("/tenant/matches")}
        onNavigateToMessages={() => router.push("/tenant/notifications")}
        onNavigateToAgreements={() => router.push("/tenant/agreements")}
        onNavigateToMaintenance={() => router.push("/tenant/maintenance")}
        onNavigateToProfile={() => router.push("/tenant/profile")}
        onNavigateToTenantManagement={() => router.push("/tenant/agreements")}
        initialCompleted={false}
      />
    </MobileContainer>
  );
}
