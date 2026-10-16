"use client";

import React from "react";
import {
  ArrowLeft,
  Home,
  Calendar,
  FileText,
  Zap,
  MessageSquare,
  ClipboardList,
  User,
} from "lucide-react";
import { MobileStatusBar } from "@/components/MobileStatusBar";

interface RequestDetailsScreenProps {
  onBack?: () => void;
  onNavigateToQuote?: () => void;
  onNavigateToDateTime?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToRequests?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

export function RequestDetailsScreen({
  onBack,
  onNavigateToQuote,
  onNavigateToDateTime,
  onNavigateToServices,
  onNavigateToRequests,
  onNavigateToProfile,
  showStatusBar = true,
}: RequestDetailsScreenProps) {
  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="pt-4 pb-3 px-6 shrink-0 z-20 bg-white">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Request Details
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3.5 text-left px-6 pt-1 pb-4">
        <h2 className="text-[17px] font-bold text-slate-900 tracking-tight pb-0.5">
          Review and Confirm
        </h2>

        {/* Card 1: Issue Summary Card */}
        <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3.5 shadow-2xs">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 p-1 flex flex-col justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-6 bg-amber-400 rounded-xs"></span>
              <span className="w-1.5 h-6 bg-red-400 rounded-xs"></span>
              <span className="w-1.5 h-6 bg-blue-400 rounded-xs"></span>
            </div>
            <div className="flex justify-between items-center text-[7px] text-white/70 font-mono">
              <span>240V</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3 className="text-xs font-bold text-slate-900 truncate">
                Electricity problem in house
              </h3>
            </div>
            <p className="text-xs font-bold text-[#0891A2] mt-0.5">
              $75–$100
            </p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-2 h-2 fill-current" />
                </span>
                <span>Electricity</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7]/80 text-[#D97706]">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Address Card */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Address</h4>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Rock Rd, Armagh, UK, BT60 3AB
            </p>
          </div>
        </div>

        {/* Card 3: Date & Time Card (Clickable) */}
        <div
          onClick={onNavigateToDateTime}
          className="p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl flex items-start gap-3 shadow-2xs transition-colors cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#0891A2]/10 group-hover:text-[#0891A2] flex items-center justify-center text-slate-600 shrink-0 mt-0.5 transition-colors">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Date &amp; Time</h4>
              <span className="text-[10px] text-[#0891A2] font-semibold group-hover:underline">Change</span>
            </div>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Mon, Sep 29, 2026 at 10:00 AM
            </p>
          </div>
        </div>

        {/* Card 4: Issue Details Card */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Issue Details</h4>
            <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
              We are currently experiencing an electricity outage affecting several areas. Our team is working to resolve the problem as quickly as possible. We appreciate your patience and will provide updates soon.
            </p>
          </div>
        </div>

        {/* Card 5: Admin Message Card (Clickable - Leads to Service Quote) */}
        <div
          onClick={onNavigateToQuote}
          className="p-3.5 bg-white border border-slate-200 hover:border-[#0891A2] hover:bg-cyan-50/20 rounded-2xl flex items-start justify-between shadow-2xs relative transition-all cursor-pointer group"
        >
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#0891A2]/10 group-hover:text-[#0891A2] flex items-center justify-center text-slate-600 shrink-0 mt-0.5 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0891A2] transition-colors">
                  Admin
                </h4>
              </div>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                Quote received. Review details.
              </p>
            </div>
          </div>

          {/* Red Notification Badge */}
          <span className="w-4.5 h-4.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
            1
          </span>
        </div>
      </div>

      {/* Bottom Tab Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium z-20">
        {/* Services Tab */}
        <button
          type="button"
          onClick={onNavigateToServices}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span>Services</span>
        </button>

        {/* My Requests Tab (Active) */}
        <button
          type="button"
          onClick={onNavigateToRequests || onBack}
          className="flex flex-col items-center gap-1 text-[#0891A2] font-semibold cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 stroke-[2.2]" />
          <span>My Requests</span>
        </button>

        {/* Profile Tab */}
        <button
          type="button"
          onClick={onNavigateToProfile}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
