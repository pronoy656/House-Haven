"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RoleSelectionScreen } from "@/components/RoleSelectionScreen";
import { MobileContainer } from "@/components/MobileContainer";

export default function ChooseRolePage() {
  const router = useRouter();

  const handleContinue = (role: string) => {
    if (role === "landlord") {
      router.push("/onboarding/landlord");
    } else if (role === "tenant") {
      router.push("/signup?role=tenant");
    } else {
      router.push("/signup?role=services");
    }
  };

  return (
    <MobileContainer>
      <RoleSelectionScreen
        brandTitle="House Haven"
        onContinue={handleContinue}
        onNavigateToSignIn={() => router.push("/login")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
