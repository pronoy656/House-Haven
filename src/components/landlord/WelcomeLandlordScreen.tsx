"use client";

import React from "react";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";

interface WelcomeLandlordScreenProps {
  onGetStarted?: () => void;
  showStatusBar?: boolean;
}

export function WelcomeLandlordScreen({
  onGetStarted,
  showStatusBar = true,
}: WelcomeLandlordScreenProps) {
  const perks = [
    "List your properties",
    "Find qualified tenants",
    "Manage applications",
    "Get support anytime",
  ];

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-5 pb-6 text-slate-900 overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-center pt-2 pb-2 text-center">
        {/* Top House Illustration */}
        <div className="relative w-full max-w-[280px] h-[170px] mb-6 flex items-center justify-center">
          <Image
            src="/landlord-house-illustration.png"
            alt="Welcome Landlord Illustration"
            fill
            sizes="280px"
            className="object-contain"
            priority
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
          Welcome, Landlord!
        </h1>
        <p className="text-[12.5px] sm:text-[13px] text-slate-500 mt-2 max-w-[280px] font-normal leading-relaxed">
          Let&apos;s set up your profile to start listing properties and find trusted tenants.
        </p>

        {/* Perks Box */}
        <div className="w-full mt-7 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-white shadow-xs text-left space-y-3.5">
          {perks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#0891A2] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="text-[13.5px] font-medium text-slate-700">
                {perk}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4">
        <Button
          variant="primary"
          onClick={onGetStarted}
          className="h-12 font-semibold text-sm flex items-center justify-center gap-2 group"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
