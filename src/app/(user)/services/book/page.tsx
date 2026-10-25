"use client";

import React, { Suspense } from "react";
import { MobileContainer } from "@/components/shared/MobileContainer";
import { ServiceBookingFlowScreen } from "@/components/services/ServiceBookingFlowScreen";

export default function ServiceBookingPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Booking...</div>}>
        <ServiceBookingFlowScreen />
      </Suspense>
    </MobileContainer>
  );
}
