"use client";

import React, { useState, useEffect } from "react";
import { Zap, Home, ClipboardList, User, AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { getAuthToken, serviceRequestApi } from "@/lib/api";

interface RequestItem {
  id: string;
  title: string;
  date: string;
  category: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled" | "Quote Accepted";
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
  const [liveRequests, setLiveRequests] = useState<RequestItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const fallbackRequests: RequestItem[] = [
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
      title: "Boiler servicing & heating check",
      date: "Oct 02, 2026 . 02:00 PM",
      category: "Heating",
      status: "In Progress",
    },
    {
      id: "req-3",
      title: "Damp and mould inspection",
      date: "Oct 12, 2026 . 11:30 AM",
      category: "Damp & Mould",
      status: "Completed",
    },
  ];

  useEffect(() => {
    const token = getAuthToken();
    const guestRequestId =
      typeof window !== "undefined" ? localStorage.getItem("recentRequestId") : null;

    if (!token && !guestRequestId) {
      setIsGuest(true);
      return;
    }

    setIsLoading(true);

    if (token) {
      serviceRequestApi
        .getMyRequests(activeFilter)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const mapped: RequestItem[] = data.map((item: any) => {
              const isAccepted = item.quotation?.status === "accepted";
              const computedStatus =
                isAccepted && item.status !== "In Progress" && item.status !== "Completed"
                  ? "Quote Accepted"
                  : item.status || "Pending";

              return {
                id: item._id,
                title: item.issue || `${item.serviceCategory} request`,
                date: item.appointment?.date
                  ? `${item.appointment.date} · ${item.appointment.time}`
                  : new Date(item.createdAt || Date.now()).toLocaleDateString(),
                category: item.serviceCategory,
                status: computedStatus,
                hasNotification: item.quotation?.status === "received",
              };
            });
            setLiveRequests(mapped);
          } else if (Array.isArray(data) && data.length === 0) {
            setLiveRequests([]);
          }
        })
        .catch((err) => {
          console.warn("Could not fetch requests from backend:", err.message);
          setLiveRequests([]);
        })
        .finally(() => setIsLoading(false));
    } else if (guestRequestId) {
      serviceRequestApi
        .getRequestDetails(guestRequestId)
        .then((item) => {
          if (item) {
            const isAccepted = item.quotation?.status === "accepted";
            const computedStatus =
              isAccepted && item.status !== "In Progress" && item.status !== "Completed"
                ? "Quote Accepted"
                : item.status || "Pending";

            const mapped: RequestItem = {
              id: item._id,
              title: item.issue || `${item.serviceCategory} request`,
              date: item.appointment?.date
                ? `${item.appointment.date} · ${item.appointment.time}`
                : new Date(item.createdAt || Date.now()).toLocaleDateString(),
              category: item.serviceCategory,
              status: computedStatus,
              hasNotification: item.quotation?.status === "received",
            };
            setLiveRequests([mapped]);
          } else {
            setLiveRequests([]);
          }
        })
        .catch(() => {
          setLiveRequests([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeFilter]);

  const requestsToDisplay = liveRequests !== null ? liveRequests : [];

  const filtered = requestsToDisplay.filter((r) => {
    if (activeFilter === "All") return true;
    return r.status === activeFilter;
  });

  const getStatusBadge = (status: RequestItem["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/60";
      case "Quote Accepted":
        return "bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold";
      case "In Progress":
        return "bg-sky-50 text-sky-700 border border-sky-200/60";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200/60";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
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

      {/* Guest User Banner if not logged in */}
      {isGuest && (
        <div className="mx-5 mt-2.5 p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-[11px] leading-tight">
              Guest Mode: Sign in to track your live requests &amp; quotes.
            </span>
          </div>
          <Link
            href="/login?redirect=/services/requests"
            className="flex items-center gap-1 font-bold text-[#0891A2] hover:underline shrink-0 text-xs ml-2"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </Link>
        </div>
      )}

      {/* Requests List */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-2.5 text-left">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading your requests...</div>
        ) : isGuest ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ClipboardList className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sign in to Track Requests</h3>
            <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
              Track your service appointments, technician quotations, and real-time status updates.
            </p>
            <div className="pt-2">
              <Link
                href="/login?redirect=/services/requests"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#0891A2] text-white font-semibold text-xs shadow-xs hover:bg-[#0e7490] transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <ClipboardList className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No {activeFilter === "All" ? "" : activeFilter.toLowerCase()} requests
            </h3>
            <p className="text-xs text-slate-400 max-w-[220px] mx-auto">
              You haven&apos;t placed any service requests under this filter yet.
            </p>
            <button
              type="button"
              onClick={onNavigateToServices}
              className="mt-2 text-xs font-semibold text-[#0891A2] hover:underline cursor-pointer"
            >
              Browse all services &rarr;
            </button>
          </div>
        ) : (
          filtered.map((item) => (
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
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100">
                <Zap className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-xs font-bold text-slate-900 truncate tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {item.date}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="shrink-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-20">
        <button
          type="button"
          onClick={onNavigateToServices}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1 text-[#0891A2] cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Requests</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProfile}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
