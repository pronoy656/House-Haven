"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ApplicationOverviewScreen } from "@/components/landlord/ApplicationOverviewScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LandlordApplicationsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <ApplicationOverviewScreen
          onBack={() => router.push("/landlord/dashboard")}
          onSelectApplication={() => router.push("/landlord/applications/details")}
          onNavigateToDashboard={() => router.push("/landlord/dashboard")}
          onNavigateToProperties={() => router.push("/landlord/properties")}
          onNavigateToProfile={() => router.push("/landlord/profile")}
          onNavigateToNotifications={() => router.push("/landlord/notifications")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
