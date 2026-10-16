"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Check, Clock } from "lucide-react";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantNotificationsPage() {
  const router = useRouter();

  const notifications = [
    {
      id: "1",
      title: "Appointment Proposed",
      description: "Landlord proposed 3 times for Kitchen Sink Leak repair.",
      time: "2 hours ago",
      unread: true,
      link: "/tenant/maintenance/issue-details",
    },
    {
      id: "2",
      title: "Agreement Ready to Sign",
      description: "Riverside Apartments lease agreement is ready for signature.",
      time: "Yesterday",
      unread: false,
      link: "/tenant/agreements",
    },
    {
      id: "3",
      title: "New Mutual Match",
      description: "You have a new property match in Belfast.",
      time: "3 days ago",
      unread: false,
      link: "/tenant/matches",
    },
  ];

  return (
    <MobileContainer>
      <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
        
        {/* Status Bar */}
        <div className="shrink-0 pt-2.5 px-6 flex items-center justify-between text-slate-800 text-[13px] font-semibold tracking-tight z-20">
          <span>19:27</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
            </svg>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            <div className="w-5 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/tenant/dashboard")}
              className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Notifications
            </h1>
            <div className="w-9 h-9" />
          </div>

          <div className="space-y-2.5">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(item.link)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  item.unread
                    ? "bg-white border-teal-100 shadow-xs"
                    : "bg-white/80 border-slate-100 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-slate-800">
                    {item.title}
                  </h4>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#0891A2]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-[9.5px] text-slate-400 mt-2 block">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MobileContainer>
  );
}
