"use client";

import React, { Suspense } from "react";
import { TenantIssueDetailsFlowScreen } from "@/components/tenant/TenantIssueDetailsFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantIssueDetailsPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-4 text-center text-slate-400">Loading Issue Details...</div>}>
        <TenantIssueDetailsFlowScreen />
      </Suspense>
    </MobileContainer>
  );
}
