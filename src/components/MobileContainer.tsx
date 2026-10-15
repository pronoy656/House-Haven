"use client";

import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="h-[100dvh] w-full bg-white sm:bg-slate-100 flex justify-center selection:bg-[#0891A2]/20 selection:text-[#0891A2] overflow-hidden">
      {/* On mobile: 100% full width and dynamic viewport height (100dvh).
          On desktop: clean, centered responsive web app container (max 440px) at 100dvh with subtle shadow, no side border seams. */}
      <div className="w-full sm:max-w-[440px] h-full max-h-[100dvh] bg-white sm:shadow-xl flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
