"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { PropertyDetailsScreen } from "@/components/landlord/PropertyDetailsScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LandlordPropertyDetailsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <PropertyDetailsScreen
          onBack={() => router.push("/landlord/properties")}
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
