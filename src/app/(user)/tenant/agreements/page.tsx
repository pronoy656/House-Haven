"use client";

import React, { Suspense } from "react";
import { TenantAgreementsFlowScreen } from "@/components/tenant/TenantAgreementsFlowScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function TenantAgreementsPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-4 text-center text-slate-400">Loading Agreements...</div>}>
        <TenantAgreementsFlowScreen />
      </Suspense>
    </MobileContainer>
  );
}
