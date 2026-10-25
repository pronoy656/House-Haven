"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Repeat2,
  MessageSquare,
  FileText,
  Wrench,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { TenantBottomNav } from "./TenantBottomNav";

interface TenantDashboardScreenProps {
  onNavigateToNotifications?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToAgreements?: () => void;
  onNavigateToMaintenance?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToTenantManagement?: () => void;
  initialCompleted?: boolean;
}

interface QuickAccessCard {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}

const GETTING_STARTED_STEPS = [
  {
    step: 1,
    title: "Complete Your Profile",
    description: "Add your personal, employment, and rental history so landlords can understand your application.",
  },
  {
    step: 2,
    title: "Browse Properties",
    description: "Explore available properties that match your budget and preferences.",
    illustration: "/checklist-illustration-3d.png",
  },
  {
    step: 3,
    title: "Like & Match",
    description: "Like properties you're interested in and get matched With landlords.",
  },
  {
    step: 4,
    title: "Chat & Agree",
    description: "Message landlords, arrange viewings, and review agreements all in one place.",
  },
];

export function TenantDashboardScreen({
  onNavigateToNotifications,
  onNavigateToSearch,
  onNavigateToMatches,
  onNavigateToMessages,
  onNavigateToAgreements,
  onNavigateToMaintenance,
  onNavigateToProfile,
  onNavigateToTenantManagement,
  initialCompleted = false,
}: TenantDashboardScreenProps) {
  // State: whether the tenant's profile is complete
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tenantProfileCompleted") === "true" || initialCompleted;
    }
    return initialCompleted;
  });
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "matches" | "maintenance" | "profile">("dashboard");

  const quickAccessGrid: QuickAccessCard[] = [
    {
      id: "matches",
      title: "Matches",
      description: "Mutual matches with landlords",
      count: 0,
      icon: <Repeat2 className="w-4 h-4 stroke-[2.2]" />,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
      onClick: onNavigateToMatches,
    },
    {
      id: "messages",
      title: "Messages",
      description: "Chat with landlords",
      count: 0,
      icon: <MessageSquare className="w-4 h-4 stroke-[2]" />,
      iconBg: "bg-cyan-50",
      iconColor: "text-[#06B6D4]",
      onClick: onNavigateToMessages,
    },
    {
      id: "agreements",
      title: "Agreements",
      description: "Review and sign lease agreements",
      count: 1,
      icon: <FileText className="w-4 h-4 stroke-[2]" />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      onClick: onNavigateToAgreements,
    },
    {
      id: "maintenance",
      title: "Maintenance",
      description: "Report and track issues",
      count: 3,
      icon: <Wrench className="w-4 h-4 stroke-[2]" />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      onClick: onNavigateToMaintenance,
    },
  ];

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none">
      
      {/* Scrollable Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">

        {/* 1. Top Hero Landscape Header */}
        <HeroBanner
          imageSrc="/tenant-banner-landscape.png"
          imageAlt="Welcome Tenant"
          heightClass="h-[152px]"
          gradientOverlay="from-sky-50/95 via-sky-50/70 to-transparent"
        >
          <div className="px-5 pt-4 flex items-start justify-between">
            <div className="pt-1">
              <span className="text-[13px] font-medium text-slate-700 block leading-tight">
                Welcome back
              </span>
              <h1 className="text-[20px] font-extrabold text-slate-900 leading-snug tracking-tight">
                Test Tenant!
              </h1>
              <p className="text-[11.5px] text-slate-500 font-normal mt-0.5">
                Find your perfect rental property
              </p>
            </div>

            <NotificationButton
              onClick={onNavigateToNotifications}
              prefetchHref="/tenant/notifications"
              className="shadow-md border border-white/60"
            />
          </div>
        </HeroBanner>

        {/* Main Body Content Container */}
        <div className="px-5 pt-3 pb-8 space-y-4">

          {/* 2. Top Banner Card: EITHER Incomplete Profile OR "You're all set!" */}
          {!isProfileComplete ? (
            /* Incomplete Profile Setup Card */
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0891A2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xs font-black">!</span>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-800 leading-tight">
                    Complete Your Profile
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Get matched with the perfect properties
                  </p>
                </div>
              </div>

              {/* Progress Bar (36%) */}
              <div className="mt-3.5">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0891A2] h-full rounded-full transition-all duration-500"
                    style={{ width: "36%" }}
                  />
                </div>
                <div className="text-[11px] font-medium text-slate-400 text-right mt-1">
                  36%
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={onNavigateToProfile}
                  prefetchHref="/tenant/profile"
                >
                  Finish Application
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => setIsProfileComplete(true)}
                >
                  Complete Profile Setup
                </Button>
              </div>
            </div>
          ) : (
            /* Completed Profile: "You're all set!" Banner */
            <div className="bg-[#EAFBF3] border border-[#A7F3D0] rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-xs animate-fade-in transition-all duration-300">
              <div className="flex items-start justify-between relative z-10">
                <div className="max-w-[210px]">
                  {/* Green Checkmark Celebration Badge */}
                  <div className="w-8 h-8 relative mb-1">
                    <Image
                      src="/checkmark-badge-3d.png"
                      alt="Check"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0D9488] leading-tight">
                    You&apos;re all set!
                  </h3>
                  <h4 className="text-[12px] font-bold text-slate-800 leading-tight mt-0.5">
                    Your profile and application are complete.
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    You can now start searching for properties that match your requirments
                  </p>
                </div>

                {/* 3D Checklist Illustration with Confetti */}
                <div className="w-[84px] h-[84px] relative shrink-0">
                  <Image
                    src="/checklist-illustration-3d.png"
                    alt="Checklist"
                    fill
                    sizes="84px"
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Search Properties Button */}
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={onNavigateToSearch}
                prefetchHref="/tenant/search"
                className="mt-3 font-bold text-xs sm:text-[13px]"
                leftIcon={<Search className="w-4 h-4 stroke-[2.2]" />}
              >
                Search Properties
              </Button>

              {/* Subtle Switcher for testing/demo */}
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsProfileComplete(false)}
                  className="text-[10px] text-emerald-700 hover:underline cursor-pointer opacity-70"
                >
                  (Click to view Incomplete Profile state)
                </button>
              </div>
            </div>
          )}

          {/* 3. Quick Access Section */}
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 mb-2.5">
              Quick Access
            </h2>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3">
              {quickAccessGrid.map((card) => (
                <div
                  key={card.id}
                  onClick={card.onClick}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-col justify-between hover:border-slate-200 transition-all cursor-pointer"
                >
                  <div>
                    <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} mb-2`}>
                      {card.icon}
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-800 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-800">{card.count}</span>
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3 stroke-[2]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tenant's Management Full Width Card (Active Tenancy) */}
            <div
              onClick={onNavigateToTenantManagement}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between mt-3 hover:border-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0">
                  <Users className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 leading-tight">
                    Tenant&apos;s management
                  </h3>
                  <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">
                    You can see you active tenancy.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">1</span>
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ArrowRight className="w-3 h-3 stroke-[2]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Getting Started Stepper Section */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
              Getting Started
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">
              Complete these steps to find your perfect property
            </p>

            {/* Stepper with continuous vertical line */}
            <div className="relative pl-1">
              {GETTING_STARTED_STEPS.map((stepItem, idx) => {
                const isLast = idx === GETTING_STARTED_STEPS.length - 1;
                return (
                  <div
                    key={stepItem.step}
                    className={`relative flex items-start gap-3 ${isLast ? "" : "pb-6"}`}
                  >
                    {!isLast && (
                      <div className="absolute left-3 top-6 bottom-0 w-[1.5px] bg-[#0891A2]" />
                    )}
                    <div className="relative z-10 w-6 h-6 rounded-full bg-[#0891A2] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                      {stepItem.step}
                    </div>
                    <div className="pt-0.5 flex-1 pr-1">
                      {stepItem.illustration ? (
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-[12.5px] font-bold text-slate-800 leading-tight">
                              {stepItem.title}
                            </h3>
                            <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5 max-w-[190px]">
                              {stepItem.description}
                            </p>
                          </div>
                          <div className="w-12 h-12 relative shrink-0 -mt-1">
                            <Image
                              src={stepItem.illustration}
                              alt={stepItem.title}
                              fill
                              sizes="48px"
                              className="object-contain drop-shadow-sm"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-[12.5px] font-bold text-slate-800 leading-tight">
                            {stepItem.title}
                          </h3>
                          <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5">
                            {stepItem.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Navigation Bar - Fixed */}
      <TenantBottomNav
        activeTab={activeTab}
        onNavigateToDashboard={() => setActiveTab("dashboard")}
        onNavigateToSearch={onNavigateToSearch}
        onNavigateToMatches={onNavigateToMatches}
        onNavigateToMaintenance={onNavigateToMaintenance}
        onNavigateToProfile={onNavigateToProfile}
      />

    </div>
  );
}
