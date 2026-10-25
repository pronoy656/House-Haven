"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";

export interface LeaseSuccessViewProps {
  onViewAgreement: () => void;
  onBackToAgreements: () => void;
}

export function LeaseSuccessView({
  onViewAgreement,
  onBackToAgreements,
}: LeaseSuccessViewProps) {
  return (
    <div className="p-4 pb-6 flex flex-col flex-1 justify-between items-center text-center animate-in zoom-in-95 duration-200 relative overflow-hidden">
      {/* Static Confetti on all sides around the image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top Left */}
        <div className="absolute top-12 left-10 w-3 h-3 rounded-full bg-[#0891A2]" />
        <div className="absolute top-16 left-22 w-4.5 h-2 rounded-full bg-[#38BDF8] -rotate-45" />
        <div className="absolute top-28 left-8 w-3 h-4 rounded-xs bg-[#FDE047] rotate-12" />
        <div className="absolute top-38 left-14 text-[#EC4899] text-base font-bold">✦</div>
        <div className="absolute top-52 left-10 w-4.5 h-2 rounded-full bg-[#A855F7] -rotate-30" />
        <div className="absolute top-22 left-32 w-2 h-2 rounded-full bg-[#FB923C]" />

        {/* Top Right */}
        <div className="absolute top-12 right-14 text-[#F59E0B] text-lg font-bold">✦</div>
        <div className="absolute top-18 right-8 w-4.5 h-2 rounded-full bg-[#FB7185] rotate-45" />
        <div className="absolute top-30 right-10 w-3 h-3 rounded-full bg-[#10B981]" />
        <div className="absolute top-40 right-6 text-[#14B8A6] text-base font-bold">★</div>
        <div className="absolute top-52 right-12 w-3 h-3 rounded-full bg-[#FB923C]" />
        <div className="absolute top-24 right-28 w-2 h-2 rounded-full bg-[#6366F1]" />

        {/* Sides & Corners */}
        <div className="absolute top-64 left-6 w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
        <div className="absolute top-64 right-6 text-[#FBBF24] text-xs font-bold">★</div>
        <div className="absolute top-72 left-16 w-3 h-2 rounded-full bg-[#EC4899] rotate-45" />
        <div className="absolute top-72 right-16 w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        <div className="absolute top-8 left-36 text-[#A855F7] text-xs font-bold">✦</div>
        <div className="absolute top-8 right-36 w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
      </div>

      {/* Central Illustration using public/Frame.png */}
      <div className="pt-6 flex flex-col items-center relative z-10">
        <div className="relative w-52 h-52 sm:w-56 sm:h-56 drop-shadow-sm">
          <Image
            src="/Frame.png"
            alt="Lease Signed Successfully!"
            fill
            sizes="(max-width: 480px) 224px, 224px"
            className="object-contain"
            priority
          />
        </div>

        {/* Title & Description */}
        <h2 className="text-[17px] font-bold text-slate-900 mt-4 tracking-tight">
          Lease Signed Successfully!
        </h2>
        <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5 max-w-[270px] mx-auto">
          Your lease agreement has been signed and submitted. A copy has been sent to your email.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2 mt-auto pt-6 relative z-10">
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          onClick={onViewAgreement}
        >
          View Agreement
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          fullWidth
          onClick={onBackToAgreements}
        >
          Back to Agreements
        </Button>
      </div>
    </div>
  );
}
