"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RequestDetailsScreen } from "@/components/services/RequestDetailsScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function RequestDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const id = searchParams.get("id") || "req-1";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
  }, []);

  return (
    <RequestDetailsScreen
      onBack={() => router.push("/services/requests?role=service")}
      onNavigateToQuote={() => router.push(`/services/requests/quote?id=${encodeURIComponent(id)}&role=service`)}
      onNavigateToDateTime={() => router.push(`/services/requests/date-time?id=${encodeURIComponent(id)}&role=service`)}
      onNavigateToServices={() => router.push("/services?role=service")}
      onNavigateToRequests={() => router.push("/services/requests?role=service")}
      onNavigateToProfile={() => router.push("/services/profile?role=service")}
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
