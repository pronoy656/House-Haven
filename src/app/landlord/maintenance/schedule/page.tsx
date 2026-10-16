"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailsFlowScreen } from "@/components/landlord/IssueDetailsFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LandlordMaintenanceSchedulePage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <IssueDetailsFlowScreen
          initialView="schedule_appointment"
          onBack={() => router.push("/landlord/maintenance")}
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
