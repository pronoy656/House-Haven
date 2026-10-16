"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { LandlordDashboardScreen } from "@/components/landlord/LandlordDashboardScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LandlordDashboardPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <LandlordDashboardScreen
          onSignOut={() => router.push("/login")}
          onNavigateToProperties={() => router.push("/landlord/properties")}
          onNavigateToApplications={() => router.push("/landlord/applications")}
          onNavigateToIssueDetails={() => router.push("/landlord/maintenance")}
          onNavigateToProfile={() => router.push("/landlord/profile")}
          onNavigateToNotifications={() => router.push("/landlord/notifications")}
          onNavigateToServiceHub={() => router.push("/services")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
