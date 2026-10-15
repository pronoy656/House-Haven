"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandlordProfileFlowScreen } from "@/components/landlord/LandlordProfileFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ReviewsPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <LandlordProfileFlowScreen
        initialView="reviews"
        onBack={() => router.push("/profile")}
        onNavigateToDashboard={() => router.push("/dashboard")}
        onNavigateToProperties={() => router.push("/properties")}
        onNavigateToApplications={() => router.push("/applications")}
        onLogout={() => router.push("/login")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
