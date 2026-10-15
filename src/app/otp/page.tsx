"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OtpVerificationScreen } from "@/components/OtpVerificationScreen";
import { MobileContainer } from "@/components/MobileContainer";

function OtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";
  const role = searchParams.get("role") || "tenant";

  return (
    <OtpVerificationScreen
      email={email}
      onBack={() => router.push(`/signup?role=${role}`)}
      onVerifySuccess={() => {
        if (role === "services") {
          router.push("/services");
        } else {
          router.push("/dashboard");
        }
      }}
      showStatusBar={true}
    />
  );
}

export default function OtpPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <OtpContent />
      </Suspense>
    </MobileContainer>
  );
}
