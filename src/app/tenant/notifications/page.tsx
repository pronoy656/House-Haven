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
        
        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 pt-5 pb-6 space-y-4">
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
