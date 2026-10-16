"use client";

import React, { useState } from "react";
import { Zap, Home, ClipboardList, User } from "lucide-react";
import { MobileStatusBar } from "@/components/MobileStatusBar";

interface RequestItem {
  id: string;
  title: string;
  date: string;
  category: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  hasNotification?: boolean;
}

interface MyRequestsScreenProps {
  onSelectRequest?: (requestId: string) => void;
  onNavigateToServices?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

export function MyRequestsScreen({
  onSelectRequest,
  onNavigateToServices,
  onNavigateToProfile,
  showStatusBar = true,
}: MyRequestsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Pending" | "In Progress" | "Completed">("All");

  const requests: RequestItem[] = [
    {
      id: "req-1",
      title: "Electricity problem in house",
      date: "Sep 29, 2026 . 10:00 AM",
      category: "Electricity",
      status: "Pending",
      hasNotification: true,
    },
    {
      id: "req-2",
      title: "Electricity problem in house",
      date: "Sep 29, 2026 . 10:00 AM",
      category: "Electricity",
      status: "In Progress",
    },
    {
      id: "req-3",
      title: "Electricity problem in house",
      date: "Sep 29, 2026 . 10:00 AM",
      category: "Electricity",
      status: "Pending",
    },
    {
      id: "req-4",
      title: "Electricity problem in house",
      date: "Sep 29, 2026 . 10:00 AM",
      category: "Electricity",
      status: "In Progress",
    },
    {
      id: "req-5",
      title: "Electricity problem in house",
      date: "Sep 29, 2026 . 10:00 AM",
      category: "Electricity",
      status: "Cancelled",
    },
  ];

  const filtered = requests.filter((r) => {
    if (activeFilter === "All") return true;
    return r.status === activeFilter;
  });

  const getStatusBadge = (status: RequestItem["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-[#FEF3C7]/80 text-[#D97706]";
      case "In Progress":
        return "bg-[#E0F2FE] text-[#0284C7]";
      case "Completed":
        return "bg-[#D1FAE5] text-[#059669]";
      case "Cancelled":
        return "bg-[#FEE2E2] text-[#DC2626]";
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">
      {/* Header - Fixed/Sticky */}
      <div className="pt-3 pb-3 px-5 shrink-0 z-20 bg-white text-center border-b border-slate-50">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
          My Requests
        </h1>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between gap-1.5 mt-3">
          {(["All", "Pending", "In Progress", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-2.5 text-left">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectRequest && onSelectRequest(item.id)}
            className="relative p-3 bg-white border border-slate-200/90 rounded-2xl flex items-center gap-3 hover:border-slate-300 hover:shadow-xs transition-all duration-150 cursor-pointer shadow-2xs group"
          >
            {/* Notification Badge */}
            {item.hasNotification && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs">
                1
              </span>
            )}

            {/* Thumbnail */}
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

            {/* Information */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-xs font-bold text-slate-900 truncate">
                  {item.title}
                </h3>
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5">
                {item.date}
              </p>

              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-2 h-2 fill-current" />
                  </span>
                  <span>{item.category}</span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tab Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium">
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
