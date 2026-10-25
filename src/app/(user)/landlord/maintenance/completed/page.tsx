"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { IssueDetailsFlowScreen } from "@/components/landlord/IssueDetailsFlowScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LandlordMaintenanceCompletedPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <IssueDetailsFlowScreen
          initialView="make_completed"
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
