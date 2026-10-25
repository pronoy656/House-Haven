"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { LandlordProfileFlowScreen } from "@/components/landlord/LandlordProfileFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LandlordSettingsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Settings...</div>}>
        <LandlordProfileFlowScreen
          initialView="setting"
          onBack={() => router.push("/landlord/dashboard")}
          onNavigateToDashboard={() => router.push("/landlord/dashboard")}
          onNavigateToProperties={() => router.push("/landlord/properties")}
          onNavigateToApplications={() => router.push("/landlord/applications")}
          onLogout={() => router.push("/login")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
