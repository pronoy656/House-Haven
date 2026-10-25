"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";

interface LandlordAllSetScreenProps {
  onBack?: () => void;
  onExploreDashboard?: () => void;
  showStatusBar?: boolean;
}

export function LandlordAllSetScreen({
  onBack,
  onExploreDashboard,
  showStatusBar = true,
}: LandlordAllSetScreenProps) {
  const features = [
    {
      icon: "🏡",
      label: "List and manage properties",
    },
    {
      icon: "📝",
      label: "Receive tenant applications",
    },
    {
      icon: "💬",
      label: "Chat with potential tenants",
    },
    {
      icon: "💳",
      label: "Track leases and payments",
    },
    {
      icon: "🎧",
      label: "Get support anytime",
    },
  ];

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header & Completed Stepper */}
      <div className="shrink-0 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex flex-col items-center px-4">
          <span className="text-[11px] font-medium text-slate-400 mb-1.5">
            Step 6 of 6
          </span>
          <div className="w-28 h-1.5 bg-[#0891A2] rounded-full overflow-hidden" />
        </div>

        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-center pt-1 pb-4 text-center">
        {/* Title & Subtitle */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
          You&apos;re all set!
        </h1>
        <p className="text-[12.5px] sm:text-[13px] text-slate-400 mt-1 max-w-[280px] font-normal leading-relaxed">
          Start managing your properties and connect with trusted tenants.
        </p>

        {/* House Illustration */}
        <div className="relative w-full max-w-[270px] h-[155px] my-3 flex items-center justify-center">
          <Image
            src="/landlord-house-illustration.png"
            alt="All set house illustration"
            fill
            sizes="270px"
            className="object-contain"
            priority
          />
        </div>

        {/* 5 Features Checklist Card */}
        <div className="w-full p-4 rounded-2xl border border-slate-100 bg-white shadow-xs text-left space-y-3.5">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-lg leading-none shrink-0 w-6 text-center">
                {feat.icon}
              </span>
              <span className="text-[13px] font-medium text-slate-700 leading-snug">
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Dashboard Button */}
      <div className="shrink-0 pt-3 border-t border-slate-50">
        <Button
          variant="primary"
          onClick={onExploreDashboard}
          className="h-12 font-semibold text-sm w-full"
        >
          Explore Dashboard
        </Button>
      </div>
    </div>
  );
}
