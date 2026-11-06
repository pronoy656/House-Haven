"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceQuoteScreen } from "@/components/services/ServiceQuoteScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function ServiceQuoteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <ServiceQuoteScreen
      requestId={id}
      onBack={() => {
        if (id) {
          router.push(`/services/requests/details?id=${encodeURIComponent(id)}`);
        } else {
          router.push("/services/requests");
        }
      }}
      onAcceptQuote={() => {
        if (id) {
          router.push(`/services/requests/details?id=${encodeURIComponent(id)}`);
        } else {
          router.push("/services/requests");
        }
      }}
      onDeclineQuote={() => {
        if (id) {
          router.push(`/services/requests/details?id=${encodeURIComponent(id)}`);
        } else {
          router.push("/services/requests");
        }
      }}
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
