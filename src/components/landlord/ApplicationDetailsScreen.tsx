"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "@/components/ui/Button";
import { LandlordBottomNav } from "./LandlordBottomNav";

interface ApplicationDetailsScreenProps {
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  showStatusBar?: boolean;
}

export function ApplicationDetailsScreen({
  onBack,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToNotifications,
  showStatusBar = true,
}: ApplicationDetailsScreenProps) {
  const [isMatchExpanded, setIsMatchExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [decisionState, setDecisionState] = useState<"none" | "passed" | "loved">("none");
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownload = (docName: string) => {
    setDownloadToast(`Opening ${docName}...`);
    setTimeout(() => setDownloadToast(null), 2500);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Status Bar */}
      {showStatusBar && <MobileStatusBar time="19:27" />}

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white border-b border-slate-50">
        <Button
          variant="secondary"
          size="icon-md"
          onClick={onBack || onNavigateToApplications}
          aria-label="Back"
          prefetchHref="/landlord/applications"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </Button>

        <h1 className="text-[17.5px] font-bold text-slate-900 tracking-tight">
          Applications details
        </h1>

        <Button
          variant="icon"
          size="icon-md"
          onClick={onNavigateToNotifications}
          aria-label="Notifications"
          prefetchHref="/landlord/notifications"
          className="relative"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#0891A2] rounded-full ring-2 ring-white" />
        </Button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3 space-y-4 text-left">
        {/* Toast Notification */}
        {downloadToast && (
          <div className="p-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl text-center shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
            {downloadToast}
          </div>
        )}

        {/* 1. Tenant Profile Card */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-[68px] h-[68px] rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/80 shrink-0 relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Brooklyn Simmons"
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>

            {/* Info & Badges */}
            <div className="space-y-1">
              <h2 className="text-[16px] font-bold text-slate-900 leading-tight">
                Brooklyn Simmons
              </h2>
              <p className="text-[11.5px] text-slate-400">
                Applied 2 days ago
              </p>

              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]">
                  Pending Review
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Favorite Heart Button */}
          <Button
            variant="icon"
            size="icon-sm"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="Add to favorites"
            className="text-rose-500 hover:bg-rose-50 shrink-0 mt-0.5"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isFavorite
                  ? "fill-rose-500 text-rose-500 scale-110"
                  : "text-rose-400 hover:text-rose-600"
              }`}
            />
          </Button>
        </div>

        {/* 2. Property Card */}
        <div className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 relative">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80"
                alt="Riverside Apartments"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13.5px] font-bold text-slate-900 leading-tight truncate">
                Riverside Apartments
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                123 Rental Street
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Sent on Sep 12, 26
              </p>
            </div>
          </div>

          {/* Rent Price */}
          <div className="text-right shrink-0 pl-2">
            <span className="text-[13.5px] font-bold text-[#0891A2] block leading-tight">
              £2,500
            </span>
            <span className="text-[11px] font-semibold text-[#0891A2]">
              /month
            </span>
          </div>
        </div>

        {/* 3. Interactive Expandable Application Match Card (Image 1 collapsed, Image 2 expanded) */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-4 shadow-2xs transition-all">
          {/* Header Row (Clickable toggle) */}
          <div
            onClick={() => setIsMatchExpanded((prev) => !prev)}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              {/* 50% Circular Progress Indicator SVG */}
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  {/* Background Track (50% grey) */}
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-slate-200 fill-none"
                    strokeWidth="6"
                  />
                  {/* Foreground Value (50% teal #0891A2) */}
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-[#0891A2] fill-none transition-all duration-500"
                    strokeWidth="6"
                    strokeDasharray="163.36"
                    strokeDashoffset="81.68"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[13px] font-bold text-slate-900 leading-none">
                    50%
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-medium leading-none mt-0.5">
                    match
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-[14.5px] font-bold text-slate-900 group-hover:text-[#0891A2] transition-colors leading-tight">
                  Application match
                </h3>
                <p className="text-[11.5px] text-slate-400 mt-0.5">
                  2 of 4 requirements met
                </p>
              </div>
            </div>

            {/* Toggle Chevron */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-700 transition-colors">
              {isMatchExpanded ? (
                <ChevronUp className="w-5 h-5 stroke-[2]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2]" />
              )}
            </div>
          </div>

          {/* Expanded Breakdown (Image 2) */}
          {isMatchExpanded && (
            <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Section 1: Matches */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-slate-900">
                    Matches
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Match Item 1: Lease duration */}
                <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                        Lease duration
                      </h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Required: 12 months
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="w-px h-7 bg-slate-100" />
                    <div>
                      <span className="text-[11px] font-medium text-slate-700 block">
                        Tenant:
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        12 months
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Item 2: References */}
                <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                        References
                      </h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Required: 1 reference
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="w-px h-7 bg-slate-100" />
                    <div>
                      <span className="text-[11px] font-medium text-slate-700 block">
                        Tenant:
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        1 provided
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Dose not match */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-slate-900">
                    Does not match
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Not Match Item 1: Income requirement */}
                <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-orange-500">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                        Income requirement
                      </h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Required: £30k/year
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="w-px h-7 bg-slate-100" />
                    <div>
                      <span className="text-[11px] font-medium text-slate-700 block">
                        Tenant:
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        £10k/year
                      </span>
                    </div>
                  </div>
                </div>

                {/* Not Match Item 2: Move-in date */}
                <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-orange-500">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                        Move-in date
                      </h4>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Required: sep 1, 2026
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="w-px h-7 bg-slate-100" />
                    <div>
                      <span className="text-[11px] font-medium text-slate-700 block">
                        Tenant:
                      </span>
                      <span className="text-[10.5px] text-slate-500">
                        sep 12, 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Tenant Overview Details (Year, Work, Salary, Lease Duration, References) */}
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Year
              </span>
              <span className="text-[13.5px] font-bold text-slate-900 mt-0.5 block">
                28 Year old
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Work
              </span>
              <span className="text-[13.5px] font-bold text-slate-900 mt-0.5 block">
                Professional
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Salary
              </span>
              <span className="text-[13.5px] font-bold text-slate-900 mt-0.5 block">
                £ 10k
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Lease Duration
              </span>
              <span className="text-[13.5px] font-bold text-slate-900 mt-0.5 block">
                12 months
              </span>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-medium text-slate-400 block">
              References
            </span>
            <span className="text-[13.5px] font-bold text-slate-900 mt-0.5 block">
              Mosfiqur Rahman
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              mosfiqurrahmansifat@gmail.com
            </span>
          </div>
        </div>

        {/* 5. Tenant Documents Section */}
        <div className="space-y-2.5 pt-2 pb-2">
          <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Tenant Documents
          </h3>

          <div className="space-y-2">
            {[
              {
                id: "doc-1",
                name: "Credit_Report.pdf",
                date: "Uploaded on sep 12, 2026",
              },
              {
                id: "doc-2",
                name: "Tax Returns.pdf",
                date: "Uploaded on sep 12, 2026",
              },
              {
                id: "doc-3",
                name: "Pay Slips.pdf",
                date: "Uploaded on sep 12, 2026",
              },
            ].map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleDownload(doc.name)}
                className="p-3 bg-[#F8FAFC] hover:bg-slate-100/80 border border-slate-100 rounded-2xl flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-3">
                  {/* Red PDF Icon badge */}
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex flex-col items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-rose-500" />
                    <span className="text-[7.5px] font-black text-rose-600 leading-none mt-0.5">
                      PDF
                    </span>
                  </div>

                  <div>
                    <h4 className="text-[12.5px] font-bold text-slate-800 leading-tight group-hover:text-[#0891A2] transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      {doc.date}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#0891A2] transition-colors">
                  <Download className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Action Decision State / Buttons */}
        <div className="pt-1 pb-2">
          {decisionState === "none" ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDecisionState("passed")}
                className="flex-1"
              >
                Pass
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setDecisionState("loved")}
                leftIcon={<Heart className="w-4 h-4 text-white fill-white/20" />}
                className="flex-1"
              >
                Love
              </Button>
            </div>
          ) : decisionState === "loved" ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Application Approved &amp; Loved ❤️</span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setDecisionState("none")}
                className="text-[11px] font-semibold text-emerald-800 underline p-0 h-auto"
              >
                Reset
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <X className="w-4 h-4" />
                <span>Application Passed</span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setDecisionState("none")}
                className="text-[11px] font-semibold text-slate-800 underline p-0 h-auto"
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab="applications"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToProperties={onNavigateToProperties}
        onNavigateToApplications={onNavigateToApplications}
        onNavigateToMessages={onNavigateToMessages}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  );
}
