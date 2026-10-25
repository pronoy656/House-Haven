"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { TenantSearchFlowScreen } from "@/components/tenant/TenantSearchFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantSearchPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <TenantSearchFlowScreen
        onBackToDashboard={() => router.push("/tenant/dashboard")}
        onNavigateToPropertyDetails={(propertyId) => router.push("/tenant/matches")}
        onNavigateToNotifications={() => router.push("/tenant/notifications")}
        onNavigateToMatches={() => router.push("/tenant/matches")}
        onNavigateToApplications={() => router.push("/tenant/agreements")}
        onNavigateToProfile={() => router.push("/tenant/profile")}
      />
    </MobileContainer>
  );
}
