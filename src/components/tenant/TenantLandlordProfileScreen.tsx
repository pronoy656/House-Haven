"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  Building,
  Home,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  MailCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { StarRating } from "@/components/shared/StarRating";
import { Avatar } from "@/components/shared/Avatar";
import { TenantBottomNav } from "./TenantBottomNav";

interface TenantLandlordProfileScreenProps {
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToProperties?: () => void;
  initialView?: "profile" | "reviews";
}

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  comment: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Kim Borrdy",
    rating: 4.5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    comment: "Amazing! The room is good than the picture. Thanks for amazing experience!",
  },
  {
    id: "rev-2",
    name: "Mirai Kamazuki",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    comment: "The service is on point, and I really like the facilities. Good job!",
  },
  {
    id: "rev-3",
    name: "Jzenklen",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    comment: "The service is on point, and I really like the facilities. Good job!",
  },
  {
    id: "rev-4",
    name: "Rezikan Akay",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    comment: "The service is on point, and I really like the facilities. Good job!",
  },
  {
    id: "rev-5",
    name: "Rezingkaly",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    comment: "The service is on point, and I really like the facilities. Good job!",
  },
  {
    id: "rev-6",
    name: "Andiziky",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
    comment: "The service is on point, and I really like the facilities. Good job!",
  },
];

export function TenantLandlordProfileScreen({
  onBack,
  onNavigateToDashboard,
  onNavigateToSearch,
  onNavigateToMatches,
  onNavigateToApplications,
  onNavigateToProperties,
  initialView = "profile",
}: TenantLandlordProfileScreenProps) {
  // Current view: "profile" = Landlord Profile, "reviews" = John Wick Reviews
  const [currentView, setCurrentView] = useState<"profile" | "reviews">(initialView);

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none">

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 1: Landlord Profile View (Cover, Avatar, Stats, About)
         ───────────────────────────────────────────────────────────── */}
      {currentView === "profile" && (
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">

          {/* Top Cover Banner */}
          <div className="relative w-full h-[180px] bg-slate-200 shrink-0">
            <Image
              src="/landlord-cover.jpg"
              alt="Landlord Cover"
              fill
              sizes="(max-width: 480px) 100vw, 440px"
              priority
              className="object-cover"
            />
            {/* Soft Dark Vignette for contrast */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Floating Back Button */}
            <Button
              variant="icon"
              size="icon-sm"
              onClick={onBack}
              className="absolute top-4 left-4 bg-white/80 hover:bg-white backdrop-blur-md z-20 shadow-sm"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </Button>
          </div>

          {/* Landlord Info Body */}
          <div className="px-5 pb-8 space-y-5 -mt-10 relative z-10">

            {/* Overlapping Avatar */}
            <div className="w-[84px] h-[84px] rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 relative">
              <Image
                src="/john-wick-avatar.jpg"
                alt="John Wick"
                fill
                sizes="84px"
                priority
                className="object-cover"
              />
            </div>

            {/* Header: Name, Role, Rating */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[21px] font-extrabold text-slate-900 leading-tight">
                  John Wick
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Landlord</span>
                  <span>·</span>
                  <span>Member since Jan 2023</span>
                </div>
              </div>

              {/* Rating Pill (Clickable -> Opens Reviews View) */}
              <div
                onClick={() => setCurrentView("reviews")}
                className="text-right cursor-pointer group"
                title="View all reviews"
              >
                <div className="flex items-center gap-1.5 justify-end">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-[16px] font-extrabold text-slate-900 leading-none">
                    4.8
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-[#0891A2] group-hover:underline transition-colors mt-0.5 block">
                  (32 reviews)
                </span>
              </div>
            </div>

            {/* 3 Stat Cards in a row */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs text-center flex flex-col items-center justify-center gap-0.5">
                <Home className="w-4 h-4 text-slate-700 stroke-[2] mb-0.5" />
                <div className="text-[17px] font-extrabold text-slate-900 leading-tight">
                  6
                </div>
                <span className="text-[10.5px] text-slate-400 font-medium">Properties</span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs text-center flex flex-col items-center justify-center gap-0.5">
                <Users className="w-4 h-4 text-slate-700 stroke-[2] mb-0.5" />
                <div className="text-[17px] font-extrabold text-slate-900 leading-tight">
                  20
                </div>
                <span className="text-[10.5px] text-slate-400 font-medium">Tenants</span>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs text-center flex flex-col items-center justify-center gap-0.5">
                <Calendar className="w-4 h-4 text-slate-700 stroke-[2] mb-0.5" />
                <div className="text-[17px] font-extrabold text-slate-900 leading-tight">
                  3+
                </div>
                <span className="text-[10.5px] text-slate-400 font-medium">Year active</span>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-3 pt-1">
              <h2 className="text-[15px] font-bold text-slate-900">
                About
              </h2>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-slate-700 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">Lives in New York, NY</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">Identity verified</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <MailCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">Email verified</span>
                </div>
              </div>
            </div>

            {/* View Properties Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToProperties}
                className="w-full py-3.5 rounded-full bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                View Properties
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 2: John Wick Reviews (Rating Breakdown & Reviews List)
         ───────────────────────────────────────────────────────────── */}
      {currentView === "reviews" && (
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">

          {/* Reusable Header */}
          <ScreenHeader
            title="John Wick Reviews"
            onBack={() => setCurrentView("profile")}
          />

          {/* Reviews Content */}
          <div className="px-5 pt-2 pb-8 space-y-4">

            {/* Rating Breakdown Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
              {/* Left Score Block */}
              <div className="space-y-1">
                <div className="text-[34px] font-black text-slate-900 leading-none">
                  4.4
                </div>
                {/* Reusable Star Rating */}
                <StarRating rating={4.4} size="md" />
                <div className="text-[11px] text-slate-400 font-medium">
                  Based on 32 review
                </div>
              </div>

              {/* Right Rating Progress Bars */}
              <div className="flex-1 max-w-[150px] space-y-1.5">
                {[
                  { stars: 1, width: "12%" },
                  { stars: 2, width: "15%" },
                  { stars: 3, width: "18%" },
                  { stars: 4, width: "55%" },
                  { stars: 5, width: "75%" },
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-medium w-2 text-right">
                      {item.stars}
                    </span>
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0891A2] h-full rounded-full"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section List */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] font-bold text-slate-900">
                Reviews (32)
              </h2>

              <div className="space-y-3.5">
                {REVIEWS_DATA.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          src={rev.avatar}
                          alt={rev.name}
                          size="sm"
                        />
                        <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                          {rev.name}
                        </h3>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-900">
                          {rev.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pl-1">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION BAR (Standardized reusable component)
         ───────────────────────────────────────────────────────────── */}
      <TenantBottomNav
        activeTab="profile"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToSearch={onNavigateToSearch}
        onNavigateToMatches={onNavigateToMatches}
        onNavigateToProfile={() => setCurrentView("profile")}
      />

    </div>
  );
}
