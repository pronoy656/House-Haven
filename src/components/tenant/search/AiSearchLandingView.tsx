"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Clock,
  UserCheck,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { HeroBanner } from "@/components/shared/HeroBanner";

export interface AiSearchLandingViewProps {
  onStartAiSearch: () => void;
  onNavigateToNotifications?: () => void;
}

export function AiSearchLandingView({
  onStartAiSearch,
  onNavigateToNotifications,
}: AiSearchLandingViewProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">
      {/* 1. Reusable Top Hero Landscape Header */}
      <HeroBanner
        imageSrc="/tenant-matches-banner.png"
        imageAlt="Search Properties"
        heightClass="h-[142px]"
        gradientOverlay="from-purple-50/95 via-purple-50/70 to-transparent"
      >
        <div className="px-5 pt-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Search
            </h1>
            <p className="text-[11.5px] text-slate-500 font-medium mt-0.5">
              Find your perfect match
            </p>
          </div>

          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
        </div>
      </HeroBanner>

      {/* Body Content */}
      <div className="px-5 pt-2 pb-6 space-y-4">
        {/* AI Search Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1 pr-2">
              {/* AI Badge Icon */}
              <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#0891A2] mb-3 shadow-2xs">
                <Sparkles className="w-4 h-4 stroke-[2.2]" />
              </div>

              <h3 className="text-[22px] font-extrabold text-slate-900 leading-tight">
                AI Search
              </h3>
              <p className="text-[11.5px] text-slate-500 leading-relaxed mt-2 max-w-[200px]">
                Let AI find the perfect properties for you based on your preferences, budget, and lifestyle.
              </p>
            </div>

            {/* Watermark Illustration Graphic */}
            <div className="w-28 h-28 relative shrink-0 -mr-1 flex items-center justify-center">
              {/* Ambient Soft Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/15 via-sky-400/5 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Watermark Image */}
              <div className="w-24 h-24 relative opacity-25 select-none pointer-events-none transform rotate-3">
                <Image
                  src="/checklist-illustration-3d.png"
                  alt="Watermark Checklist"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              {/* Floating 3D Search Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-11 h-11 bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] rounded-full shadow-md shadow-sky-500/25 border-2 border-white flex items-center justify-center text-white transform -rotate-6">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* 3 Feature Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-[#059669] text-[11px] font-medium">
              <Clock className="w-3 h-3 stroke-[2.2]" />
              <span>Save time</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-[#4F46E5] text-[11px] font-medium">
              <Sparkles className="w-3 h-3 stroke-[2.2]" />
              <span>Better matches</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/80 border border-amber-100 text-[#D97706] text-[11px] font-medium">
              <UserCheck className="w-3 h-3 stroke-[2.2]" />
              <span>Personalized</span>
            </div>
          </div>

          {/* Start AI Search Button */}
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onStartAiSearch}
            className="mt-5 font-semibold text-sm"
            rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.2]" />}
          >
            Start AI Search
          </Button>
        </div>
      </div>
    </div>
  );
}
