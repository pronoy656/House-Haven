"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ApplicationDetailsScreen } from "@/components/landlord/ApplicationDetailsScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LandlordApplicationDetailsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <ApplicationDetailsScreen
          onBack={() => router.push("/landlord/applications")}
          onNavigateToDashboard={() => router.push("/landlord/dashboard")}
          onNavigateToProperties={() => router.push("/landlord/properties")}
          onNavigateToApplications={() => router.push("/landlord/applications")}
          onNavigateToProfile={() => router.push("/landlord/profile")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
