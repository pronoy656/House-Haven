"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WelcomeBackScreen } from "@/components/WelcomeBackScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function LoginPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <WelcomeBackScreen
        onNavigateToSignUp={() => router.push("/choose-role")}
        onLoginSuccess={() => router.push("/dashboard")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
