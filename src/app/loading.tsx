import React from "react";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function Loading() {
  return (
    <MobileContainer>
      <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden animate-pulse">
        {/* Top Header Skeleton */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-28 bg-slate-200/80 rounded-md" />
              <div className="h-6 w-44 bg-slate-200 rounded-lg" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200/80" />
          </div>

          {/* Banner Skeleton */}
          <div className="w-full h-32 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />

          {/* Search / Filter Skeleton */}
          <div className="w-full h-12 rounded-xl bg-slate-200/70" />

          {/* Grid / List Cards Skeleton */}
          <div className="space-y-3 pt-2">
            <div className="w-full h-20 rounded-2xl bg-slate-200/60" />
            <div className="w-full h-20 rounded-2xl bg-slate-200/60" />
            <div className="w-full h-20 rounded-2xl bg-slate-200/60" />
          </div>
        </div>

        {/* Bottom Nav Skeleton */}
        <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between">
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
          <div className="w-8 h-8 rounded-full bg-slate-200/80" />
        </div>
      </div>
    </MobileContainer>
  );
}
