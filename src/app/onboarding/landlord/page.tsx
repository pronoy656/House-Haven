"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeLandlordScreen } from "@/components/landlord/WelcomeLandlordScreen";
import { LandlordPersonalInfoScreen } from "@/components/landlord/LandlordPersonalInfoScreen";
import { LandlordOtpScreen } from "@/components/landlord/LandlordOtpScreen";
import { LandlordContactScreen } from "@/components/landlord/LandlordContactScreen";
import { LandlordAddressScreen } from "@/components/landlord/LandlordAddressScreen";
import { LandlordOverviewScreen } from "@/components/landlord/LandlordOverviewScreen";
import { LandlordIdentityVerificationScreen } from "@/components/landlord/LandlordIdentityVerificationScreen";
import { ProofOfAddressScreen } from "@/components/landlord/ProofOfAddressScreen";
import { LandlordAllSetScreen } from "@/components/landlord/LandlordAllSetScreen";
import { MobileContainer } from "@/components/MobileContainer";

export type OnboardingStep =
  | "welcome"
  | "personal"
  | "otp"
  | "contact"
  | "address"
  | "overview"
  | "identity"
  | "proof_address"
  | "all_set";

export default function LandlordOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");

  return (
    <MobileContainer>
      {step === "welcome" && (
        <WelcomeLandlordScreen
          onGetStarted={() => setStep("personal")}
          showStatusBar={true}
        />
      )}

      {step === "personal" && (
        <LandlordPersonalInfoScreen
          onBack={() => setStep("welcome")}
          onContinue={() => setStep("otp")}
          showStatusBar={true}
        />
      )}

      {step === "otp" && (
        <LandlordOtpScreen
          email="jamesray@gmail.com"
          onVerify={() => setStep("contact")}
          showStatusBar={true}
        />
      )}

      {step === "contact" && (
        <LandlordContactScreen
          onBack={() => setStep("otp")}
          onContinue={() => setStep("address")}
          showStatusBar={true}
        />
      )}

      {step === "address" && (
        <LandlordAddressScreen
          onBack={() => setStep("contact")}
          onContinue={() => setStep("overview")}
          showStatusBar={true}
        />
      )}

      {step === "overview" && (
        <LandlordOverviewScreen
          onBack={() => setStep("address")}
          onContinue={() => setStep("identity")}
          showStatusBar={true}
        />
      )}

      {step === "identity" && (
        <LandlordIdentityVerificationScreen
          onBack={() => setStep("overview")}
          onNavigateToProofOfAddress={() => setStep("proof_address")}
          onContinue={() => setStep("proof_address")}
          showStatusBar={true}
        />
      )}

      {step === "proof_address" && (
        <ProofOfAddressScreen
          onBack={() => setStep("identity")}
          onContinue={() => setStep("all_set")}
          showStatusBar={true}
        />
      )}

      {step === "all_set" && (
        <LandlordAllSetScreen
          onBack={() => setStep("proof_address")}
          onExploreDashboard={() => router.push("/dashboard")}
          showStatusBar={true}
        />
      )}
    </MobileContainer>
  );
}
