"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WelcomeBackScreen } from "@/components/WelcomeBackScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const emailParam = searchParams.get("email") || "";
  const roleParam = searchParams.get("role") || "";
  const redirectParam = searchParams.get("redirect") || "";

  return (
    <WelcomeBackScreen
      initialEmail={emailParam}
      isVerified={isVerified}
      onNavigateToSignUp={() => router.push("/choose-role")}
      onLoginSuccess={() => {
        if (redirectParam) {
          router.push(redirectParam);
          return;
        }
        const storedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
        const role = storedRole || roleParam;
        if (role === "admin" || role === "super_admin") {
          router.push("/admin/dashboard");
        } else if (role === "tenant" || role === "user") {
          router.push("/tenant/dashboard");
        } else if (role === "services" || role === "service") {
          router.push("/services?role=service");
        } else {
          router.push("/landlord/dashboard");
        }
      }}
      showStatusBar={true}
    />
  );
}

export default function LoginPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Login...</div>}>
        <LoginContent />
      </Suspense>
    </MobileContainer>
  );
}
