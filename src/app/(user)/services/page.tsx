"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ServicesHubScreen } from "@/components/services/ServicesHubScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function ServicesHubContent() {
  const router = useRouter();

  useEffect(() => {
    // If authenticated user enters services hub without userRole, set default to service
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && !localStorage.getItem("userRole")) {
        localStorage.setItem("userRole", "service");
      }
    }
  }, []);

  return (
    <ServicesHubScreen
      onSelectService={(serviceTitle: string) => {
        router.push(`/services/book?service=${encodeURIComponent(serviceTitle)}`);
      }}
      onNavigateToRequests={() => router.push("/services/requests")}
      onNavigateToProfile={() => router.push("/services/profile")}
      showStatusBar={true}
    />
  );
}

export default function ServicesPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Services...</div>}>
        <ServicesHubContent />
      </Suspense>
    </MobileContainer>
  );
}
