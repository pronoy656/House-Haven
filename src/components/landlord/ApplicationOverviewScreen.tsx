"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  Heart,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "@/components/ui/Button";
import { LandlordBottomNav } from "./LandlordBottomNav";

interface ApplicationOverviewScreenProps {
  onBack?: () => void;
  onSelectApplication?: (id: string) => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  showStatusBar?: boolean;
}

export function ApplicationOverviewScreen({
  onBack,
  onSelectApplication,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToNotifications,
  showStatusBar = true,
}: ApplicationOverviewScreenProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const applications = [
    {
      id: "app-1",
      name: "Jerome Bell",
      applied: "Applied 2 days ago",
      rent: "£2000/mo",
      verified: true,
      status: "Pending Review",
      statusBadge: "bg-[#FFEDD5] text-[#EA580C]",
      type: "pending",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "app-2",
      name: "Brooklyn Simmons",
      applied: "Applied 5 days ago",
      rent: "£2000/mo",
      verified: true,
      status: "Approved",
      statusBadge: "bg-[#FFEDD5] text-[#EA580C]",
      type: "approved",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "app-3",
      name: "Theresa Webb",
      applied: "Applied 6 days ago",
      rent: "£2000/mo",
      verified: true,
      status: "Approved",
      statusBadge: "bg-[#FFEDD5] text-[#EA580C]",
      type: "approved",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "app-4",
      name: "Wade Warren",
      applied: "Applied 9 days ago",
      rent: "£2000/mo",
      verified: true,
      status: "Rejected",
      statusBadge: "bg-[#FEE2E2] text-[#DC2626]",
      type: "rejected",
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const filtered = applications.filter((app) => {
    if (filter === "pending") return app.type === "pending";
    if (filter === "approved") return app.type === "approved";
    if (filter === "rejected") return app.type === "rejected";
    return true;
  });

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white">
        <Button
          variant="icon"
          size="icon-sm"
          onClick={onBack || onNavigateToDashboard}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-[17px] font-bold text-slate-900">
          Application Overview
        </h1>

        <Button
          variant="icon"
          size="icon-sm"
          onClick={onNavigateToNotifications}
          prefetchHref="/landlord/notifications"
          title="Notifications"
          className="relative"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891A2] rounded-full ring-2 ring-white" />
        </Button>
      </div>

      {/* Filter Tabs - Fixed/Sticky */}
      <div className="px-5 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-20 bg-white border-b border-slate-50">
        <Button
          type="button"
          variant="pill"
          size="xs"
          isActive={filter === "all"}
          onClick={() => setFilter("all")}
          className="px-3.5 py-1.5"
        >
          All(12)
        </Button>
        <Button
          type="button"
          variant="pill"
          size="xs"
          isActive={filter === "pending"}
          onClick={() => setFilter("pending")}
          className="px-3.5 py-1.5"
        >
          Pending (8)
        </Button>
        <Button
          type="button"
          variant="pill"
          size="xs"
          isActive={filter === "approved"}
          onClick={() => setFilter("approved")}
          className="px-3.5 py-1.5"
        >
          Approved (4)
        </Button>
        <Button
          type="button"
          variant="pill"
          size="xs"
          isActive={filter === "rejected"}
          onClick={() => setFilter("rejected")}
          className="px-3.5 py-1.5"
        >
          Rejected
        </Button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-3 text-left">
        {filtered.map((item) => {
          const isFav = !!favorites[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onSelectApplication?.(item.id)}
              className="p-3.5 bg-white border border-slate-100/90 hover:border-slate-200 hover:shadow-xs rounded-2xl flex items-center justify-between transition-all shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 ring-1 ring-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.applied}
                  </p>

                  {/* Badges Row */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
                      Verified
                    </span>
                    <span
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${item.statusBadge}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Rent */}
                  <div className="text-[12px] font-bold text-slate-800 mt-1">
                    {item.rent}
                  </div>
                </div>
              </div>

              {/* Heart Button */}
              <button
                type="button"
                onClick={(e) => toggleFavorite(item.id, e)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFav ? "fill-rose-500 text-rose-500" : "text-rose-500"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab="applications"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToProperties={onNavigateToProperties}
        onNavigateToApplications={() => {}}
        onNavigateToMessages={onNavigateToMessages}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  );
}
