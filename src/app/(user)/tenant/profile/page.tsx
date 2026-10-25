"use client";

import React, { Suspense } from "react";
import { MobileContainer } from "@/components/shared/MobileContainer";
import { TenantProfileScreen } from "@/components/tenant/TenantProfileScreen";

export default function TenantProfilePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <TenantProfileScreen />
      </Suspense>
    </MobileContainer>
  );
}
