"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ServicesHubScreen } from "@/components/ServicesHubScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ServicesPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <ServicesHubScreen
        onSelectService={(serviceTitle) => {
          router.push(`/dashboard`);
        }}
        onNavigateToRequests={() => router.push("/dashboard")}
        onNavigateToProfile={() => router.push("/profile")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
