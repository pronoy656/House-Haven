"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { TenantOnboardingFlowScreen } from "@/components/tenant/TenantOnboardingFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantOnboardingPortalPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <TenantOnboardingFlowScreen
          onComplete={() => router.push("/tenant/dashboard")}
          onSkip={() => router.push("/tenant/dashboard")}
          onBack={() => router.push("/otp?role=tenant")}
        />
      </Suspense>
    </MobileContainer>
  );
}
