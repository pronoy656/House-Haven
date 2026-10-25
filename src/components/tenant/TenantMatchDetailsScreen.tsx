"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bed,
  Bath,
  Car,
  CalendarCheck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { Avatar } from "@/components/shared/Avatar";
import { TenantBottomNav } from "./TenantBottomNav";

interface TenantMatchDetailsScreenProps {
  onBackToDashboard?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMaintenance?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  onViewLandlordProfile?: () => void;
  initialProceeded?: boolean;
}

const PROPERTY_IMAGES = [
  "/great-georges-home.jpg",
  "/great-georges-interior.jpg",
  "/splash-livingroom-opt2.jpg",
];

const PROPERTY_TAGS = [
  "Disabled Access",
  "Garden",
  "Furnished",
  "Parking Available",
  "Built 1960",
];

export function TenantMatchDetailsScreen({
  onBackToDashboard,
  onNavigateToSearch,
  onNavigateToMaintenance,
  onNavigateToProfile,
  onNavigateToNotifications,
  onViewLandlordProfile,
  initialProceeded = false,
}: TenantMatchDetailsScreenProps) {
  // State 1: Viewing completed, deciding whether to proceed
  // State 2: Proceeded -> "Awaiting tenancy approval"
  const [hasProceeded, setHasProceeded] = useState<boolean>(initialProceeded);
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "matches" | "maintenance" | "profile">("matches");
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none">

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">

        {/* 1. Top Hero Landscape Header */}
        <HeroBanner
          imageSrc="/tenant-matches-banner.png"
          imageAlt="Match Details"
          gradientOverlay="from-purple-50/95 via-purple-50/70 to-transparent"
        >
          <div className="px-5 pt-4 flex items-center justify-between">
            <h1 className="text-[19px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Match Details
            </h1>

            <NotificationButton
              onClick={onNavigateToNotifications}
              prefetchHref="/tenant/notifications"
            />
          </div>
        </HeroBanner>

        {/* 2. Main Content Body */}
        <div className="px-5 pt-3 pb-8 space-y-4">

          {/* High-Resolution Property Photo Gallery with £ 830 /pcm Badge */}
          <div className="relative w-full h-[225px] rounded-3xl overflow-hidden bg-slate-900 shadow-sm group">
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activePhotoIdx * 100}%)` }}
            >
              {PROPERTY_IMAGES.map((img, idx) => (
                <div key={idx} className="relative w-full h-full shrink-0">
                  <Image
                    src={img}
                    alt={`7 Great Georges Street photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 480px) 100vw, 440px"
                    priority={idx === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Price Tag Badge on Top Right */}
            <div className="absolute top-3.5 right-3.5 bg-[#0891A2] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 backdrop-blur-xs">
              £ 830 /pcm
            </div>

            {/* Photo Counter Badge on Top Left */}
            <div className="absolute top-3.5 left-3.5 bg-black/45 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md z-10 backdrop-blur-xs">
              {activePhotoIdx + 1} / {PROPERTY_IMAGES.length}
            </div>

            {/* Left / Right Chevron Controls */}
            <button
              type="button"
              onClick={() => setActivePhotoIdx((prev) => (prev - 1 + PROPERTY_IMAGES.length) % PROPERTY_IMAGES.length)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => setActivePhotoIdx((prev) => (prev + 1) % PROPERTY_IMAGES.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Next photo"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-3 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
              {PROPERTY_IMAGES.map((_, idx) => (
                <span
                  key={idx}
                  className={`rounded-full transition-all duration-200 ${
                    idx === activePhotoIdx ? "w-3 h-2 bg-white shadow-xs" : "w-1.5 h-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Property Title & Address */}
          <div>
            <h2 className="text-[17px] font-extrabold text-slate-900 leading-tight">
              7 Great Georges Street
            </h2>
            <p className="text-[11.5px] text-slate-500 font-normal mt-0.5">
              7 Great Georges St N, Warrenpoint, Newry BT34 3HS, UK
            </p>
          </div>

          {/* Specs Bar (2 Bedrooms, 2 Bathrooms, 1 Parking) */}
          <div className="flex items-center justify-between bg-white rounded-2xl py-3 px-4 border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#0891A2] stroke-[2]" />
              <span className="text-xs font-semibold text-slate-700">2 Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-[#0891A2] stroke-[2]" />
              <span className="text-xs font-semibold text-slate-700">2 Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#0891A2] stroke-[2]" />
              <span className="text-xs font-semibold text-slate-700">1 Parking</span>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {PROPERTY_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#E0F2FE]/70 text-[#0369A1] text-[11px] font-medium border border-sky-100/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Monthly Rent Comparison Notice Card */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-normal">Monthly rent</span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-900">£ 1200 Monthly</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              This listing also advertises £830 /pcm. These rental figures differ; confirm the rent before proceeding.
            </p>
          </div>

          {/* Landlord Profile Snippet */}
          <div
            onClick={onViewLandlordProfile}
            className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs cursor-pointer hover:border-slate-200 transition-colors"
          >
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Landlord Test"
              size="md"
            />
            <div>
              <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                Landlord Test
              </h4>
              <span className="text-[11px] text-[#0891A2] hover:underline font-medium">
                View landlord profile
              </span>
            </div>
          </div>

          {/* Viewing Completed Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-slate-800 stroke-[2.2]" />
              <h3 className="text-[13.5px] font-bold text-slate-900">
                Viewing completed
              </h3>
            </div>
            <div className="text-xs font-semibold text-slate-700">
              Sep 15, 2026 · 10:00 AM
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Scheduled viewing time has passed. Your post-viewing decision is now available.
            </p>
          </div>

          {/* 3. DYNAMIC DECISION SECTION (Before Proceeding vs Awaiting Approval) */}
          {!hasProceeded ? (
            /* STATE 1: Would you like to proceed? */
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3 pt-4">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900 leading-tight">
                  Would you like to proceed?
                </h3>
                <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1">
                  You&apos;ve completed your viewing. Let the landlord know your decision. No tenancy has been accepted yet.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* Proceed Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => setHasProceeded(true)}
                  className="font-bold text-xs sm:text-[13px]"
                >
                  I&apos;m Interested – Proceed with Property
                </Button>

                {/* Not Interested Button */}
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={onBackToDashboard}
                  prefetchHref="/tenant/dashboard"
                  className="font-semibold text-xs"
                >
                  Not Interested – Do Not Proceed
                </Button>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-tight pt-1">
                Proceeding keeps this property in Matches until both you and the landlord agree.
              </p>
            </div>
          ) : (
            /* STATE 2: Awaiting tenancy approval */
            <div className="space-y-4 animate-fade-in">
              {/* Mint Green Status Card */}
              <div className="bg-[#EAFBF3] border border-[#A7F3D0] rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0D9488] stroke-[2.2]" />
                  <h3 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                    Awaiting tenancy approval
                  </h3>
                </div>

                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  You chose to proceed with this property. The landlord has been notified.
                </p>

                {/* Table of Decisions */}
                <div className="bg-white/80 rounded-xl p-3 space-y-2 border border-emerald-100/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Your decision</span>
                    <span className="font-semibold text-slate-900">Interested - Proceeding</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    <span className="text-slate-500">Landlord decision</span>
                    <span className="font-semibold text-slate-700">Awaiting approval</span>
                  </div>
                </div>

                <p className="text-[10.5px] text-slate-500 leading-relaxed pt-1">
                  This property stays in Matches until both parties agree. It is not yet an active tenancy.
                </p>
              </div>

              {/* What happens next? Section */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-2">
                <h3 className="text-[14px] font-bold text-slate-900">
                  What happens next?
                </h3>
                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                  Once both parties agree, the property moves to Active Tenancy / Management &amp; Maintenance. Agreements will be available there.
                </p>

                {/* Back to Matches Button */}
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={onBackToDashboard}
                  prefetchHref="/tenant/dashboard"
                  className="mt-2 font-semibold text-xs"
                >
                  Back to Matches
                </Button>

                {/* Undo Toggle for reviewer testing */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setHasProceeded(false)}
                    className="text-[10px] text-emerald-700 hover:underline cursor-pointer opacity-70"
                  >
                    (Click to switch back to &quot;Would you like to proceed?&quot; state)
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Bottom Navigation Bar */}
      <TenantBottomNav
        activeTab={activeTab}
        onNavigateToDashboard={onBackToDashboard}
        onNavigateToSearch={onNavigateToSearch}
        onNavigateToMatches={() => setActiveTab("matches")}
        onNavigateToMaintenance={onNavigateToMaintenance}
        onNavigateToProfile={onNavigateToProfile}
      />

    </div>
  );
}
