"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ProfileScreen } from "@/components/services/ProfileScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";
import { authApi } from "@/lib/api";

function ServicesProfileContent() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      router.push("/login");
    }
  };

  return (
    <ProfileScreen
      onNavigateToServices={() => router.push("/services")}
      onNavigateToRequests={() => router.push("/services/requests")}
      onLogout={handleLogout}
      showStatusBar={true}
    />
  );
}

export default function ServicesProfilePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Profile...</div>}>
        <ServicesProfileContent />
      </Suspense>
    </MobileContainer>
  );
}
