"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MobileContainer } from "@/components/MobileContainer";
import { TenantBoostScreen } from "@/components/tenant/TenantBoostScreen";

export default function TenantBoostPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <TenantBoostScreen
        onBack={() => router.push("/tenant/profile")}
        onSelectBoost={(plan) => router.push(`/tenant/payment?plan=${plan}`)}
      />
    </MobileContainer>
  );
}
