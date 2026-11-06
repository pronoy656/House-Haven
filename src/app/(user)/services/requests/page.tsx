"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { MyRequestsScreen } from "@/components/services/MyRequestsScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function MyRequestsContent() {
  const router = useRouter();

  return (
    <MyRequestsScreen
      onSelectRequest={(requestId: string) => {
        router.push(`/services/requests/details?id=${encodeURIComponent(requestId)}`);
      }}
      onNavigateToServices={() => router.push("/services")}
      onNavigateToProfile={() => router.push("/services/profile")}
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
