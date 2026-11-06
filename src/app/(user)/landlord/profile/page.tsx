"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { LandlordProfileFlowScreen } from "@/components/landlord/LandlordProfileFlowScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";
import { authApi } from "@/lib/api";

export default function LandlordProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      router.push("/login");
    }
  };

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <LandlordProfileFlowScreen
          initialView="setting"
          onBack={() => router.push("/landlord/dashboard")}
          onNavigateToDashboard={() => router.push("/landlord/dashboard")}
          onNavigateToProperties={() => router.push("/landlord/properties")}
          onNavigateToApplications={() => router.push("/landlord/applications")}
          onNavigateToNotifications={() => router.push("/landlord/notifications")}
          onLogout={handleLogout}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
