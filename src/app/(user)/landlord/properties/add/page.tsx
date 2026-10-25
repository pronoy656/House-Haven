"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { AddPropertyFlowScreen } from "@/components/landlord/AddPropertyFlowScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LandlordAddPropertyPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <AddPropertyFlowScreen
          onBack={() => router.push("/landlord/properties")}
          onFinish={() => router.push("/landlord/properties")}
          onViewProperty={() => router.push("/landlord/properties/details")}
          showStatusBar={true}
        />
      </Suspense>
    </MobileContainer>
  );
}
