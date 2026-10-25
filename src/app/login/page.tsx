"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WelcomeBackScreen } from "@/components/WelcomeBackScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LoginPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <WelcomeBackScreen
        onNavigateToSignUp={() => router.push("/choose-role")}
        onLoginSuccess={() => {
          const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
          if (role === "tenant") {
            router.push("/tenant/dashboard");
          } else if (role === "services" || role === "service") {
            router.push("/services?role=service");
          } else {
            router.push("/landlord/dashboard");
          }
        }}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
