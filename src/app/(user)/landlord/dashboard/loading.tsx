import React from "react";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function LandlordDashboardLoading() {
  return (
    <MobileContainer>
      <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden animate-pulse">
        {/* Top Header */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200/80 rounded-md" />
              <div className="h-6 w-36 bg-slate-200 rounded-lg" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200/80" />
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-slate-200/70" />
            <div className="h-24 rounded-2xl bg-slate-200/70" />
          </div>

          {/* Activity / Section skeleton */}
          <div className="space-y-3 pt-2">
            <div className="h-5 w-32 bg-slate-200/80 rounded" />
            <div className="w-full h-24 rounded-2xl bg-slate-200/60" />
            <div className="w-full h-24 rounded-2xl bg-slate-200/60" />
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between">
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
        </div>
      </div>
    </MobileContainer>
  );
}

