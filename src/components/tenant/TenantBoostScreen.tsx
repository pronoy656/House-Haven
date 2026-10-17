"use client";

import React from "react";
import { ArrowLeft, ArrowUp, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TenantBoostScreenProps {
  onBack: () => void;
  onSelectBoost: (plan: "boost" | "agent") => void;
}

export function TenantBoostScreen({
  onBack,
  onSelectBoost,
}: TenantBoostScreenProps) {
  const boostFeatures = [
    "Profile shown at the top of searches",
    "Higher visibility to landlords",
    "Stand out from other tenants",
    "Highlight profile with premium badge",
  ];

  const agentFeatures = [
    "We actively search for suitable properties",
    "We contact landlords on your behalf",
    "Help with your application to make you stand out",
    "Advice to help you become a stronger tenant",
    "Access to off-platform and upcoming properties",
    "Property alerts, viewing coordination and support",
  ];

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Top Header */}
      <div className="shrink-0 px-5 pt-3.5 pb-2">
        <Button
          variant="icon"
          size="icon-sm"
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </Button>

        {/* Title & Subtitle */}
        <div className="text-center pt-2 pb-1">
          <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
            Find Your Home Faster
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Choose a service to get ahead
          </p>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-4">
        
        {/* CARD 1: Boost Profile */}
        <div className="bg-[#F0FDFB] border border-teal-100 rounded-3xl p-5 space-y-4 shadow-2xs">
          
          {/* Header Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0891A2] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Boost Profile
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Get noticed by landlords
              </p>
            </div>
          </div>

          {/* Dark Price Box */}
          <div className="bg-[#0B2535] text-white rounded-2xl p-4 space-y-0.5 shadow-2xs">
            <div className="text-[22px] font-extrabold tracking-tight">
              £9.99
            </div>
            <div className="text-xs text-slate-300 font-normal">
              7 days · save 25%
            </div>
          </div>

          {/* Benefit Bullet Points */}
          <div className="space-y-2.5 pt-1">
            {boostFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0 mt-1" />
                <span className="text-xs text-slate-700 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => onSelectBoost("boost")}
              className="h-11 rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-xs shadow-xs"
            >
              Boost Now
            </Button>
          </div>
        </div>

        {/* CARD 2: We're Your Agent */}
        <div className="bg-[#F0FDFB] border border-teal-100 rounded-3xl p-5 space-y-4 shadow-2xs pb-5">
          
          {/* Header Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0891A2] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Home className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                We’re Your Agent
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                We act on your behalf to find you a home
              </p>
            </div>
          </div>

          {/* Dark Price Box */}
          <div className="bg-[#0B2535] text-white rounded-2xl p-4 space-y-0.5 shadow-2xs">
            <div className="text-[22px] font-extrabold tracking-tight">
              £20.00
            </div>
            <div className="text-xs text-slate-300 font-normal">
              per week · subscription
            </div>
          </div>

          {/* Benefit Bullet Points */}
          <div className="space-y-2.5 pt-1">
            {agentFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0 mt-1" />
                <span className="text-xs text-slate-700 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => onSelectBoost("agent")}
              className="h-11 rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-xs shadow-xs"
            >
              Get Us to Find a Home for You
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
