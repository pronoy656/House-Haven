"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChooseDateTimeScreen } from "@/components/services/ChooseDateTimeScreen";
import { MobileContainer } from "@/components/MobileContainer";

function DateTimeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "req-1";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
  }, []);

  return (
    <ChooseDateTimeScreen
      onBack={() => router.push(`/services/requests/details?id=${encodeURIComponent(id)}&role=service`)}
      onConfirmAppointment={() => {
        router.push("/services/requests?role=service");
      }}
      showStatusBar={true}
    />
  );
}

export default function DateTimePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Calendar...</div>}>
        <DateTimeContent />
      </Suspense>
    </MobileContainer>
  );
}
