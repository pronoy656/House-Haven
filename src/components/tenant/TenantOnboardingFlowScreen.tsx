"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Step1Profile } from "./onboarding/Step1Profile";
import { Step2ApplicationInfo } from "./onboarding/Step2ApplicationInfo";

interface TenantOnboardingFlowScreenProps {
  onComplete?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export function TenantOnboardingFlowScreen({
  onComplete,
  onSkip,
  onBack,
}: TenantOnboardingFlowScreenProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tenantProfileCompleted", "true");
    }
    if (onComplete) {
      onComplete();
    } else {
      router.push("/tenant/dashboard");
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      router.push("/tenant/dashboard");
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      {/* NAVIGATION BAR & STEP INDICATOR */}
      <div className="shrink-0 px-4 pt-3.5 pb-2 flex items-center relative">
        <Button
          variant="icon"
          size="icon-sm"
          onClick={() => {
            if (currentStep === 2) {
              setCurrentStep(1);
            } else if (onBack) {
              onBack();
            } else {
              router.push("/otp");
            }
          }}
          className="z-10"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </Button>

        {/* Center Progress Bar & Step Text */}
        <div className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10.5px] font-medium text-slate-400 mb-1">
            Step {currentStep} of 2
          </span>
          <div className="w-28 h-1 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#0891A2] transition-all duration-300"
              style={{ width: currentStep === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>
      </div>

      {/* SCROLLABLE FORM BODY */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3">
        {currentStep === 1 ? (
          <Step1Profile onContinue={() => setCurrentStep(2)} />
        ) : (
          <Step2ApplicationInfo onFinish={handleFinish} onSkip={handleSkip} />
        )}
      </div>
    </div>
  );
}
