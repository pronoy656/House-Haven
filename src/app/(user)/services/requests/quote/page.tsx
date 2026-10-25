"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceQuoteScreen } from "@/components/services/ServiceQuoteScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function ServiceQuoteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "req-1";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
  }, []);

  return (
    <ServiceQuoteScreen
      onBack={() => router.push(`/services/requests/details?id=${encodeURIComponent(id)}&role=service`)}
      onAcceptQuote={() => router.push("/services/requests?role=service")}
      onDeclineQuote={() => router.push("/services/requests?role=service")}
      showStatusBar={true}
    />
  );
}

export default function ServiceQuotePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Quote...</div>}>
        <ServiceQuoteContent />
      </Suspense>
    </MobileContainer>
  );
}
