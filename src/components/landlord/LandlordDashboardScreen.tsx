"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Building,
  FileText,
  MessageSquareMore,
  User,
  Bell,
  ChevronRight,
  Home,
  RefreshCw,
  Wrench,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LandlordBottomNav } from "./LandlordBottomNav";
import { MobileStatusBar } from "../MobileStatusBar";

interface LandlordDashboardScreenProps {
  onSignOut?: () => void;
  onNavigateToServiceHub?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToIssueDetails?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  showStatusBar?: boolean;
}

type TabType = "dashboard" | "properties" | "applications" | "messages" | "profile";

export function LandlordDashboardScreen({
  onSignOut,
  onNavigateToServiceHub,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToIssueDetails,
  onNavigateToProfile,
  onNavigateToNotifications,
  showStatusBar = true,
}: LandlordDashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header: Greeting & Profile - Fixed/Sticky */}
      <div className="shrink-0 z-20 bg-white px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-50">
        <div>
          <span className="text-[12px] text-slate-400 font-normal block leading-tight">
            Good morning
          </span>
          <h1 className="text-[19px] font-bold text-slate-900 leading-tight">
            John Smith
          </h1>
          <span className="text-[11px] text-slate-400 font-normal">
            Landlord
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="icon"
            size="icon-sm"
            onClick={onNavigateToNotifications}
            prefetchHref="/landlord/notifications"
            className="w-9 h-9 rounded-full relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891A2] rounded-full ring-2 ring-white" />
          </Button>

          {/* Profile Avatar */}
          <div
            onClick={onNavigateToProfile}
            className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 ring-1 ring-slate-200 shrink-0 cursor-pointer hover:opacity-90 transition-opacity relative"
            title="Profile"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="John Smith"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area (Scrollable Middle) */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-5 pt-3 text-left space-y-4">
        {/* Top Properties Overview Banner (Brand #0891A2) */}
        <div
          onClick={onNavigateToProperties || (() => setActiveTab("properties"))}
          className="w-full bg-[#0891A2] hover:bg-[#078090] transition-colors rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none">6</div>
              <span className="text-[12.5px] font-medium text-white/90 mt-0.5 block">
                Properties Overview
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>

        {/* 2x2 Grid of Stat Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Applications */}
          <div
            onClick={onNavigateToApplications || (() => setActiveTab("applications"))}
            className="p-3.5 rounded-2xl bg-[#EBF5FF] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#2563EB]">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-slate-900 block leading-tight">
                12
              </span>
              <span className="text-[11.5px] font-medium text-slate-600">
                Applications
              </span>
            </div>
          </div>

          {/* Card 2: Matches */}
          <div className="p-3.5 rounded-2xl bg-[#E6F8F3] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#0D9488]">
              <RefreshCw className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-slate-900 block leading-tight">
                10
              </span>
              <span className="text-[11.5px] font-medium text-slate-600">
                Matches
              </span>
            </div>
          </div>

          {/* Card 3: Maintenance */}
          <div
            onClick={onNavigateToIssueDetails}
            className="p-3.5 rounded-2xl bg-[#FFF4EB] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#EA580C]">
              <Wrench className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-slate-900 block leading-tight">
                03
              </span>
              <span className="text-[11.5px] font-medium text-slate-600">
                Maintenance
              </span>
            </div>
          </div>

          {/* Card 4: Messages */}
          <div
            onClick={() => setActiveTab("messages")}
            className="p-3.5 rounded-2xl bg-[#FDF0F4] flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-start text-[#E11D48]">
              <MessageCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-slate-900 block leading-tight">
                06
              </span>
              <span className="text-[11.5px] font-medium text-slate-600">
                Messages
              </span>
            </div>
          </div>
        </div>

        {/* Section: Recent Activity */}
        <div className="space-y-3 pt-1">
          <h2 className="text-[16px] font-bold text-slate-900">
            Recent Activity
          </h2>

          <div className="space-y-2.5 divide-y divide-slate-100">
            {/* Activity 1 */}
            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-10 h-10 rounded-full bg-[#EBF5FF] text-[#2563EB] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                  New application received
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  New application received
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  2 hours Ago
                </span>
              </div>
            </div>

            {/* Activity 2 */}
            <div
              onClick={onNavigateToIssueDetails}
              className="flex items-center gap-3.5 pt-2.5 cursor-pointer hover:bg-slate-50/80 p-1.5 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#FFF4EB] text-[#EA580C] flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                  Maintenance issue reported
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Unit 3B - Leaking faucet
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  5 hours Ago
                </span>
              </div>
            </div>

            {/* Activity 3 */}
            <div
              onClick={onNavigateToIssueDetails}
              className="flex items-center gap-3.5 pt-2.5 cursor-pointer hover:bg-slate-50/80 p-1.5 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#E6F8F3] text-[#0D9488] flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                  Maintenance issue reported
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Unit 3B - Leaking faucet
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  5 hours Ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Hub Banner */}
        <div
          onClick={onNavigateToServiceHub}
          className="w-full bg-[#E6F8F3] hover:bg-[#DCF4EE] transition-colors rounded-2xl p-3.5 flex items-center justify-between cursor-pointer"
        >
          <div>
            <h3 className="text-[13.5px] font-bold text-slate-900 leading-tight">
              Service Hub
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Request quotes for property services
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab={activeTab}
        onNavigateToDashboard={() => setActiveTab("dashboard")}
        onNavigateToProperties={onNavigateToProperties || (() => setActiveTab("properties"))}
        onNavigateToApplications={onNavigateToApplications || (() => setActiveTab("applications"))}
        onNavigateToMessages={() => setActiveTab("messages")}
        onNavigateToProfile={onNavigateToProfile || (() => setActiveTab("profile"))}
      />
    </div>
  );
}
