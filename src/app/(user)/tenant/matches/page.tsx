"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { TenantMatchDetailsScreen } from "@/components/tenant/TenantMatchDetailsScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantMatchesPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <TenantMatchDetailsScreen
        onBackToDashboard={() => router.push("/tenant/dashboard")}
        onNavigateToSearch={() => router.push("/tenant/search")}
        onNavigateToMaintenance={() => router.push("/tenant/maintenance")}
        onNavigateToProfile={() => router.push("/tenant/profile")}
        onNavigateToNotifications={() => router.push("/tenant/notifications")}
        onViewLandlordProfile={() => router.push("/tenant/landlord-profile")}
        initialProceeded={false}
      />
    </MobileContainer>
  );
}
