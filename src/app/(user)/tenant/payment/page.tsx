"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileContainer } from "@/components/MobileContainer";
import { TenantPaymentScreen } from "@/components/tenant/TenantPaymentScreen";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const isAgent = plan === "agent";
  const planTitle = isAgent ? "We're Your Agent" : "Boost Profile";
  const planPrice = isAgent ? "£20.00 / week" : "£9.99 (7 days)";

  return (
    <TenantPaymentScreen
      onBack={() => router.push("/tenant/boost")}
      onSuccess={() => router.push("/tenant/profile?boosted=true")}
      planTitle={planTitle}
      planPrice={planPrice}
    />
  );
}

export default function TenantPaymentPage() {
  return (
    <MobileContainer>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full p-8 text-center text-sm text-slate-500">
            Loading payment...
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </MobileContainer>
  );
}
