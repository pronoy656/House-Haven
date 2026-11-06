"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RequestDetailsScreen } from "@/components/services/RequestDetailsScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function RequestDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <RequestDetailsScreen
      requestId={id}
      onBack={() => router.push("/services/requests")}
      onNavigateToQuote={() => router.push(`/services/requests/quote?id=${encodeURIComponent(id)}`)}
      onNavigateToDateTime={() => router.push(`/services/requests/date-time?id=${encodeURIComponent(id)}`)}
      onNavigateToServices={() => router.push("/services")}
      onNavigateToRequests={() => router.push("/services/requests")}
      onNavigateToProfile={() => router.push("/services/profile")}
      showStatusBar={true}
    />
  );
}

export default function RequestDetailsPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Request Details...</div>}>
        <RequestDetailsContent />
      </Suspense>
    </MobileContainer>
  );
}
