"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  LayoutGrid,
  Building,
  FileText,
  MessageSquareMore,
  User,
} from "lucide-react";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { LandlordBottomNav } from "./LandlordBottomNav";

interface PropertiesOverviewScreenProps {
  onBack?: () => void;
  onSelectProperty?: (propertyId: string) => void;
  onAddProperty?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  showStatusBar?: boolean;
}

export function PropertiesOverviewScreen({
  onBack,
  onSelectProperty,
  onAddProperty,
  onNavigateToDashboard,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToNotifications,
  showStatusBar = true,
}: PropertiesOverviewScreenProps) {
  const [filter, setFilter] = useState<"all" | "available" | "off_market" | "rented">("all");

  const properties = [
    {
      id: "riverside-1",
      title: "Riverside Apartments",
      address: "123 Rental Street",
      date: "Sent on Sep 12, 26",
      status: "Available",
      statusBadge: "bg-[#DCFCE7] text-[#16A34A]",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "riverside-2",
      title: "Riverside Apartments",
      address: "123 Rental Street",
      date: "Sent on Sep 12, 26",
      status: "Off Market",
      statusBadge: "bg-[#FEF3C7] text-[#D97706]",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "riverside-3",
      title: "Riverside Apartments",
      address: "123 Rental Street",
      date: "Sent on Sep 12, 25",
      status: "Rented",
      statusBadge: "bg-[#FEE2E2] text-[#DC2626]",
      image:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const filteredProperties = properties.filter((p) => {
    if (filter === "available") return p.status === "Available";
    if (filter === "off_market") return p.status === "Off Market";
    if (filter === "rented") return p.status === "Rented";
    return true;
  });

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white">
        <button
          type="button"
          onClick={onBack || onNavigateToDashboard}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[17px] font-bold text-slate-900">
          Properties Overview
        </h1>

        <NotificationButton
          size="sm"
          role="landlord"
          dotColor="primary"
          onClick={onNavigateToNotifications}
          prefetchHref="/landlord/notifications"
        />
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-4 text-left">
        {/* Donut Chart with Legend (Matching Image 1 Left) */}
        <div className="flex items-center justify-center gap-6 py-2">
          {/* Donut Chart SVG */}
          <div className="relative w-[110px] h-[110px] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100 fill-none"
                strokeWidth="10"
              />
              {/* 3 Active (50% = 125.6) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#0891A2] fill-none"
                strokeWidth="10"
                strokeDasharray="125.66 251.32"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* 2 Pending (33% = 83.7) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#BAE6FD] fill-none"
                strokeWidth="10"
                strokeDasharray="83.77 251.32"
                strokeDashoffset="-125.66"
                strokeLinecap="round"
              />
              {/* 1 Rented (17% = 41.8) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#F97316] fill-none"
                strokeWidth="10"
                strokeDasharray="41.88 251.32"
                strokeDashoffset="-209.43"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[22px] font-bold text-slate-900 leading-none">
                6
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                Properties
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0891A2]" />
              <span className="font-medium text-slate-700">3 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#BAE6FD]" />
              <span className="font-medium text-slate-700">2 Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span className="font-medium text-slate-700">1 Rented</span>
            </div>
          </div>
        </div>

        {/* Section: My Properties */}
        <div className="space-y-3 pt-1">
          <h2 className="text-[16px] font-bold text-slate-900">
            My Properties
          </h2>

          {/* Filter Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All(3)
            </button>
            <button
              type="button"
              onClick={() => setFilter("available")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === "available"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Available (1)
            </button>
            <button
              type="button"
              onClick={() => setFilter("off_market")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === "off_market"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Off Market
            </button>
            <button
              type="button"
              onClick={() => setFilter("rented")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === "rented"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Rented
            </button>
          </div>

          {/* Property Cards List */}
          <div className="space-y-2.5">
            {filteredProperties.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProperty?.(item.id)}
                className="p-3 bg-[#F8FAFC] hover:bg-slate-100/70 border border-slate-100 rounded-2xl flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-bold text-slate-900 leading-tight truncate group-hover:text-[#0891A2] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {item.address}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.date}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${item.statusBadge}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>

          {/* Add Property Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              onClick={onAddProperty}
              className="h-12 font-semibold text-sm w-full rounded-full"
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab="properties"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToProperties={() => {}}
        onNavigateToApplications={onNavigateToApplications}
        onNavigateToMessages={onNavigateToMessages}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  );
}
