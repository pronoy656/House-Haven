"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/shared/Button";

interface PaymentSuccessScreenProps {
  planTitle?: string;
  planPrice?: string;
  cardLast4?: string;
  transactionId?: string;
  onDone: () => void;
  onGoToDashboard?: () => void;
}

export function PaymentSuccessScreen({
  planTitle = "Boost Profile",
  planPrice = "£9.99",
  cardLast4 = "9382",
  transactionId = "HH-784912",
  onDone,
  onGoToDashboard,
}: PaymentSuccessScreenProps) {
  const currentDate = "Today, 10:38 AM";

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-10 pb-4 flex flex-col items-center text-center relative z-10">
        
        {/* Clean 3D Glossy Green Checkmark Badge (100% Confetti-Free) */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 flex items-center justify-center">
          {/* Ambient soft glow / outer ring */}
          <div className="absolute inset-0 rounded-full bg-[#86EFAC]/30 blur-xs pointer-events-none" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#86EFAC]/60 flex items-center justify-center p-2 shadow-xs">
            {/* Glossy inner 3D button */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#22C55E] via-[#16A34A] to-[#15803D] flex items-center justify-center shadow-[0_8px_18px_rgba(22,163,74,0.32),inset_0_2px_3px_rgba(255,255,255,0.65),inset_0_-3px_5px_rgba(0,0,0,0.2)] relative overflow-hidden">
              {/* Specular gloss highlight reflection */}
              <div className="absolute top-0 inset-x-2 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
              {/* Crisp white checkmark icon */}
              <Check className="w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[3.5] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] relative z-10" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug">
          Card Added Successfully!
        </h1>
        <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1.5 max-w-[280px]">
          Your payment method has been verified and your profile boost is now active.
        </p>

        {/* Receipt / Confirmation Card */}
        <div className="w-full mt-6 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 text-left shadow-2xs space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <span className="text-xs font-semibold text-slate-700">Service Plan</span>
            <span className="text-xs font-bold text-slate-900">{planTitle}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <span className="text-xs font-semibold text-slate-700">Amount Paid</span>
            <span className="text-xs font-extrabold text-[#0891A2]">{planPrice}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <span className="text-xs font-semibold text-slate-700">Payment Method</span>
            <span className="text-xs font-medium text-slate-900">
              Mastercard •••• {cardLast4}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <span className="text-xs font-semibold text-slate-700">Transaction ID</span>
            <span className="text-xs font-mono font-medium text-slate-500">
              #{transactionId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Date</span>
            <span className="text-xs font-medium text-slate-900">{currentDate}</span>
          </div>

        </div>

      </div>

      {/* Action Buttons Footer */}
      <div className="shrink-0 px-5 pt-2 pb-6 space-y-2.5 bg-white border-t border-slate-100 relative z-10">
        <Button
          variant="primary"
          fullWidth
          onClick={onDone}
          className="h-12 rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
        >
          <span>Go to Profile</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Button>

        {onGoToDashboard && (
          <Button
            variant="outline"
            fullWidth
            onClick={onGoToDashboard}
            className="h-11 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs"
          >
            Go to Dashboard
          </Button>
        )}
      </div>

    </div>
  );
}
