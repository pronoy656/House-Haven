"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { PropertiesOverviewScreen } from "@/components/landlord/PropertiesOverviewScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LandlordPropertiesPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <PropertiesOverviewScreen
          onBack={() => router.push("/landlord/dashboard")}
          onSelectProperty={() => router.push("/landlord/properties/details")}
          onAddProperty={() => router.push("/landlord/properties/add")}
          onNavigateToDashboard={() => router.push("/landlord/dashboard")}
          onNavigateToApplications={() => router.push("/landlord/applications")}
          onNavigateToProfile={() => router.push("/landlord/profile")}
          onNavigateToNotifications={() => router.push("/landlord/notifications")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
