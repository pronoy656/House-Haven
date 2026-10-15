"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IssueDetailsFlowScreen } from "@/components/landlord/IssueDetailsFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function MaintenanceCompletedPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <IssueDetailsFlowScreen
        initialView="make_completed"
        onBack={() => router.push("/maintenance")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onNavigateToProfile={() => router.push("/profile")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
