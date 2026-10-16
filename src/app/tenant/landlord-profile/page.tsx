"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TenantLandlordProfileScreen } from "@/components/tenant/TenantLandlordProfileScreen";
import { MobileContainer } from "@/components/MobileContainer";

function LandlordProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view") === "reviews" ? "reviews" : "profile";

  return (
    <TenantLandlordProfileScreen
      initialView={viewParam}
      onBack={() => router.push("/tenant/matches")}
      onNavigateToDashboard={() => router.push("/tenant/dashboard")}
      onNavigateToSearch={() => router.push("/tenant/search")}
      onNavigateToMatches={() => router.push("/tenant/matches")}
      onNavigateToApplications={() => router.push("/tenant/agreements")}
      onNavigateToProperties={() => router.push("/tenant/matches")}
    />
  );
}

export default function TenantLandlordProfilePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Profile...</div>}>
        <LandlordProfileContent />
      </Suspense>
    </MobileContainer>
  );
}
