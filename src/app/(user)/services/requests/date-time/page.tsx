"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChooseDateTimeScreen } from "@/components/services/ChooseDateTimeScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";
import { serviceRequestApi } from "@/lib/api";

function DateTimeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const handleConfirmAppointment = async (appointment: { date: string; time: string }) => {
    if (id && id.length > 5) {
      try {
        await serviceRequestApi.updateAppointment(id, appointment);
      } catch (err) {
        console.warn("Could not save appointment to backend:", err);
      }
    }
    if (id) {
      router.push(`/services/requests/details?id=${encodeURIComponent(id)}`);
    } else {
      router.push("/services/requests");
    }
  };

  return (
    <ChooseDateTimeScreen
      onBack={() => {
        if (id) {
          router.push(`/services/requests/details?id=${encodeURIComponent(id)}`);
        } else {
          router.push("/services/requests");
        }
      }}
      onConfirmAppointment={handleConfirmAppointment}
      showSuccessModal={true}
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
