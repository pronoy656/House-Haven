"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Check,
  X,
  PartyPopper,
  MessageSquare,
  FileCheck,
  CheckCheck,
  LayoutGrid,
  Building,
  FileText,
  MessageSquareMore,
  User,
  Clock,
  Sparkles,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";

export interface NotificationItem {
  id: string;
  type: "application" | "report" | "confirmation" | "message" | "success";
  title: string;
  highlightText?: string;
  time: string;
  dateGroup: "Today" | "Yesterday" | "Earlier";
  avatar?: string;
  isCelebration?: boolean;
  unread?: boolean;
  actionRequired?: boolean;
  actionStatus?: "pending" | "accepted" | "rejected";
}

interface LandlordNotificationScreenProps {
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

export function LandlordNotificationScreen({
  onBack,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
  showStatusBar = true,
}: LandlordNotificationScreenProps) {
  const [filter, setFilter] = useState<"all" | "unread" | "requests">("all");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState<"all" | "today" | "yesterday">("all");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      type: "application",
      title: "“John Wick” Tenants lover you property",
      highlightText: "John Wick",
      time: "2 hours Ago",
      dateGroup: "Today",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      unread: true,
      actionRequired: true,
      actionStatus: "pending",
    },
    {
      id: "notif-2",
      type: "report",
      title: "You have some request for property report to check",
      time: "2 hours Ago",
      dateGroup: "Today",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      unread: true,
      actionRequired: false,
    },
    {
      id: "notif-3",
      type: "confirmation",
      title: "Your confirm the ranter",
      time: "2 hours Ago",
      dateGroup: "Today",
      isCelebration: true,
      unread: false,
      actionRequired: false,
    },
    {
      id: "notif-4",
      type: "success",
      title: "Your give rent a property successfuly",
      time: "2 hours Ago",
      dateGroup: "Yesterday",
      isCelebration: true,
      unread: false,
      actionRequired: false,
    },
    {
      id: "notif-5",
      type: "message",
      title: "You have a have a new message from William on March 09, 2025",
      highlightText: "William",
      time: "2 hours Ago",
      dateGroup: "Yesterday",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      unread: false,
      actionRequired: false,
    },
    {
      id: "notif-6",
      type: "report",
      title: "You have some request for property report to check",
      time: "2 hours Ago",
      dateGroup: "Yesterday",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      unread: false,
      actionRequired: false,
    },
  ]);

  const handleAction = (id: string, status: "accepted" | "rejected") => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, actionStatus: status, unread: false } : item
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread" && !item.unread) return false;
    if (filter === "requests" && !item.actionRequired) return false;
    if (selectedDateFilter === "today" && item.dateGroup !== "Today") return false;
    if (selectedDateFilter === "yesterday" && item.dateGroup !== "Yesterday") return false;
    return true;
  });

  const todayList = filteredNotifications.filter((n) => n.dateGroup === "Today");
  const yesterdayList = filteredNotifications.filter((n) => n.dateGroup === "Yesterday");

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Optional In-app Status Bar */}
      {showStatusBar && <MobileStatusBar time="19:27" />}

      {/* Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white border-b border-slate-50">
        <button
          type="button"
          onClick={onBack || onNavigateToDashboard}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <h1 className="text-[18px] font-bold text-slate-900 tracking-tight">
          Notification
        </h1>

        {/* Calendar Filter Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDatePicker((prev) => !prev)}
            aria-label="Filter by date"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              selectedDateFilter !== "all" || showDatePicker
                ? "bg-[#0891A2] text-white shadow-xs"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Date Picker Popover */}
          {showDatePicker && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Filter Date
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedDateFilter("all");
                  setShowDatePicker(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  selectedDateFilter === "all"
                    ? "bg-[#0891A2]/10 text-[#0891A2]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>All Days</span>
                {selectedDateFilter === "all" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDateFilter("today");
                  setShowDatePicker(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  selectedDateFilter === "today"
                    ? "bg-[#0891A2]/10 text-[#0891A2]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Today Only</span>
                {selectedDateFilter === "today" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDateFilter("yesterday");
                  setShowDatePicker(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  selectedDateFilter === "yesterday"
                    ? "bg-[#0891A2]/10 text-[#0891A2]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Yesterday Only</span>
                {selectedDateFilter === "yesterday" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Quick Actions Bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between gap-2 shrink-0 bg-white">
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#0891A2] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-[#0891A2] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span
                className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  filter === "unread" ? "bg-white text-[#0891A2]" : "bg-[#0891A2] text-white"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilter("requests")}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filter === "requests"
                ? "bg-[#0891A2] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Requests
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="text-[11px] font-semibold text-[#0891A2] hover:text-[#0e7490] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark read</span>
          </button>
        )}
      </div>

      {/* Main Notification Feed (Scrollable) */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-4 text-left">
        {/* Date Group: Today */}
        {todayList.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[15.5px] font-bold text-slate-900 tracking-tight pt-1">
              Today
            </h2>

            <div className="space-y-3.5">
              {todayList.map((item) => (
                <div key={item.id} className="space-y-2.5">
                  <div className="flex items-start gap-3.5">
                    {/* Avatar or Celebration Icon */}
                    {item.isCelebration ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/80 flex items-center justify-center shrink-0 shadow-2xs">
                        <PartyPopper className="w-5 h-5 text-amber-500 fill-amber-400/30" />
                      </div>
                    ) : (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-1 ring-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt="Notification avatar"
                          className="w-full h-full object-cover"
                        />
                        {item.unread && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#0891A2] rounded-full ring-2 ring-white" />
                        )}
                      </div>
                    )}

                    {/* Content text & timestamp */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-[13px] font-medium text-slate-800 leading-snug">
                        {item.title}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons for Request (Reject / Accept) */}
                  {item.actionRequired && (
                    <div className="pl-14">
                      {item.actionStatus === "pending" ? (
                        <div className="flex items-center gap-3 pt-0.5">
                          <button
                            type="button"
                            onClick={() => handleAction(item.id, "rejected")}
                            className="flex-1 h-9 rounded-full border border-[#0891A2] bg-white text-[#0891A2] font-semibold text-xs hover:bg-cyan-50/60 active:scale-98 transition-all cursor-pointer shadow-2xs"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAction(item.id, "accepted")}
                            className="flex-1 h-9 rounded-full bg-[#0891A2] hover:bg-[#078090] active:scale-98 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
                          >
                            Accept
                          </button>
                        </div>
                      ) : item.actionStatus === "accepted" ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Tenant Application Accepted</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
                          <X className="w-3.5 h-3.5" />
                          <span>Application Declined</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thin bottom divider */}
                  <div className="border-b border-slate-100 pt-1.5" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date Group: Yesterday */}
        {yesterdayList.length > 0 && (
          <div className="space-y-3 pt-1">
            <h2 className="text-[15.5px] font-bold text-slate-900 tracking-tight">
              Yesterday
            </h2>

            <div className="space-y-3.5">
              {yesterdayList.map((item) => (
                <div key={item.id} className="space-y-2.5">
                  <div className="flex items-start gap-3.5">
                    {/* Avatar or Celebration Icon */}
                    {item.isCelebration ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/80 flex items-center justify-center shrink-0 shadow-2xs">
                        <PartyPopper className="w-5 h-5 text-amber-500 fill-amber-400/30" />
                      </div>
                    ) : (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-1 ring-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt="Notification avatar"
                          className="w-full h-full object-cover"
                        />
                        {item.unread && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#0891A2] rounded-full ring-2 ring-white" />
                        )}
                      </div>
                    )}

                    {/* Content text & timestamp */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-[13px] font-medium text-slate-800 leading-snug">
                        {item.title}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Thin bottom divider */}
                  <div className="border-b border-slate-100 pt-1.5" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              No notifications found
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              You are all caught up for this selected filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setSelectedDateFilter("all");
              }}
              className="text-xs font-semibold text-[#0891A2] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="h-16 bg-white border-t border-slate-100 px-3 flex items-center justify-around shrink-0 shadow-xs z-20">
        <button
          type="button"
          onClick={onNavigateToDashboard}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Dashboard</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProperties}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Building className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Properties</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToApplications}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <FileText className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Applications</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToMessages}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <MessageSquareMore className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Messages</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProfile}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Profile</span>
        </button>
      </nav>
    </div>
  );
}
