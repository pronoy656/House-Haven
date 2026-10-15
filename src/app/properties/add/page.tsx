"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AddPropertyFlowScreen } from "@/components/landlord/AddPropertyFlowScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function AddPropertyPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <AddPropertyFlowScreen
        initialStep={1}
        onBack={() => router.push("/properties")}
        onFinish={() => router.push("/properties")}
        onViewProperty={() => router.push("/properties/details")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
