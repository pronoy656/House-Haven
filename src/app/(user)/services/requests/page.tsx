"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MyRequestsScreen } from "@/components/services/MyRequestsScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function MyRequestsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
    if (role !== "service" && role !== "services") {
      router.replace("/services/requests?role=service");
    }
  }, [role, router]);

  return (
    <MyRequestsScreen
      onSelectRequest={(requestId: string) => {
        router.push(`/services/requests/details?id=${encodeURIComponent(requestId)}&role=service`);
      }}
      onNavigateToServices={() => router.push("/services?role=service")}
      onNavigateToProfile={() => router.push("/services/profile?role=service")}
      showStatusBar={true}
    />
  );
}

export default function MyRequestsPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Requests...</div>}>
        <MyRequestsContent />
      </Suspense>
    </MobileContainer>
  );
}
