"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignUpScreen } from "@/components/SignUpScreen";
import { MobileContainer } from "@/components/MobileContainer";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "tenant";

  return (
    <SignUpScreen
      selectedRole={role}
      onBack={() => router.push("/choose-role")}
      onSignUpSuccess={(userData) => {
        const email = encodeURIComponent(userData.email || "user@example.com");
        router.push(`/otp?email=${email}&role=${role}`);
      }}
      onNavigateToSignIn={() => router.push("/login")}
      showStatusBar={true}
    />
  );
}

export default function SignUpPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading...</div>}>
        <SignUpContent />
      </Suspense>
    </MobileContainer>
  );
}
