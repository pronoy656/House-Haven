"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ServicesHubScreen } from "@/components/services/ServicesHubScreen";
import { MobileContainer } from "@/components/MobileContainer";

function ServicesHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
    // Ensure URL consistently has role=service
    if (role !== "service" && role !== "services") {
      router.replace("/services?role=service");
    }
  }, [role, router]);

  return (
    <ServicesHubScreen
      onSelectService={(serviceTitle: string) => {
        router.push(`/services/book?service=${encodeURIComponent(serviceTitle)}&role=service`);
      }}
      onNavigateToRequests={() => router.push("/services/requests?role=service")}
      onNavigateToProfile={() => router.push("/services/profile?role=service")}
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
