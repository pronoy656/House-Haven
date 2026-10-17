"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Home,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Send,
  Building2,
  Check,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TenantBottomNav } from "./TenantBottomNav";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { id: "slot-1", date: "Sep 20, 2026", time: "3:50–4:50 PM" },
  { id: "slot-2", date: "Sep 21, 2026", time: "10:00–11:00 AM" },
  { id: "slot-3", date: "Sep 22, 2026", time: "2:00–3:00 PM" },
];

export function TenantIssueDetailsFlowScreen() {
  const router = useRouter();

  // Role toggle to see both Tenant view and Landlord view (Screen 4 from Frame)
  const [viewMode, setViewMode] = useState<"tenant" | "landlord">("tenant");

  // Selection state
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Appointment status: "pending" | "confirmed"
  const [appointmentStatus, setAppointmentStatus] = useState<"pending" | "confirmed">("pending");

  // Confirmed slot details
  const [confirmedSlot, setConfirmedSlot] = useState<TimeSlot | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleConfirmAppointment = () => {
    if (!selectedSlotId) return;
    const slot = TIME_SLOTS.find((s) => s.id === selectedSlotId);
    if (!slot) return;

    setConfirmedSlot(slot);
    setAppointmentStatus("confirmed");
    showToast("Appointment confirmed! Your landlord has been notified.");
  };

  const handleReschedule = () => {
    setAppointmentStatus("pending");
    setSelectedSlotId(null);
    setConfirmedSlot(null);
    showToast("Appointment cancelled. Please select a new suitable time.");
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top duration-200">
          {toastMessage}
        </div>
      )}

      {/* View Mode Switcher Pill (Tenant vs Landlord View from Frame 4) */}
      <div className="shrink-0 px-4 pt-3.5 pb-1.5 flex justify-center">
        <div className="inline-flex bg-slate-200/80 p-0.5 rounded-full text-[10px] font-semibold gap-1">
          <Button
            type="button"
            variant="pill"
            size="xs"
            isActive={viewMode === "tenant"}
            onClick={() => setViewMode("tenant")}
            className="px-3 py-1"
          >
            Tenant View
          </Button>
          <Button
            type="button"
            variant="pill"
            size="xs"
            isActive={viewMode === "landlord"}
            onClick={() => setViewMode("landlord")}
            className="px-3 py-1"
          >
            Landlord View
          </Button>
        </div>
      </div>

      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 pb-6 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <Button
            variant="icon"
            size="icon-sm"
            onClick={() => router.push("/tenant/maintenance")}
            prefetchHref="/tenant/maintenance"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </Button>

          <h1 className="text-[16.5px] font-bold text-slate-900 tracking-tight">
            Issue Details
          </h1>

          <Button
            variant="icon"
            size="icon-sm"
            onClick={() => router.push("/tenant/notifications")}
            prefetchHref="/tenant/notifications"
            className="relative"
          >
            <Bell className="w-4 h-4 stroke-[2]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0891A2] rounded-full" />
          </Button>
        </div>

        {/* Hero Image Container with Dynamic Badge */}
        <div className="w-full h-44 rounded-2xl overflow-hidden relative mb-3 bg-slate-900 shadow-2xs">
          <Image
            src="/kitchen-sink-leak-real.png"
            alt="Kitchen Sink Leak"
            fill
            className="object-cover"
            priority
          />
          
          {/* Status Badge overlay on top-right */}
          <div className="absolute top-2.5 right-2.5">
            {appointmentStatus === "confirmed" && viewMode === "tenant" ? (
              <span className="text-[9.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#059669] border border-[#A7F3D0] shadow-xs">
                Complete
              </span>
            ) : (
              <span className="text-[9.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] shadow-xs">
                Pending repair
              </span>
            )}
          </div>
        </div>

        {/* Issue Title & Description */}
        <div className="mb-3.5">
          <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
            Kitchen Sink Leak
          </h2>
          <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
            Water is leaking from the kitchen sink since yesterday.
          </p>
        </div>

        {/* Property & Reporter Info Rows (Matching Frame) */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs space-y-2.5 mb-4">
          {/* Property */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
              <Home className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between flex-1 text-xs">
              <span className="text-slate-400 font-medium">Property</span>
              <span className="text-slate-800 font-semibold truncate max-w-[180px]">
                Maple Apartments - Unit 3B
              </span>
            </div>
          </div>

          {/* Reported by */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between flex-1 text-xs">
              <span className="text-slate-400 font-medium">Reported by</span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-slate-200 relative shrink-0">
                  <Image
                    src="/john-wick-avatar.jpg"
                    alt="Jerome Bell"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-slate-800 font-semibold">Jerome Bell</span>
              </div>
            </div>
          </div>

          {/* Reported Date */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between flex-1 text-xs">
              <span className="text-slate-400 font-medium">Reported</span>
              <span className="text-slate-800 font-semibold">
                Sep 12, 2026 10:45 AM
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1 & 2: TENANT APPOINTMENT SECTION                         */}
        {/* ============================================================== */}
        {viewMode === "tenant" && (
          <>
            {/* SUBCASE A: PENDING SELECTION / CONFIRMATION */}
            {appointmentStatus === "pending" && (
              <div className="mb-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                  Available appointment times
                </h3>

                {/* Action Needed Callout Box */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-3 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11.5px] font-bold text-[#1D4ED8] leading-tight">
                      Action needed
                    </h4>
                    <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                      The landlord has proposed the following appointment times. Please select a suitable time.
                    </p>
                  </div>
                </div>

                {/* 3 Time Slot Selection Cards */}
                <div className="space-y-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-[#F0FDFA] border-[#0891A2] shadow-xs"
                            : "bg-white border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        {/* Radio button indicator */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "border-[#0891A2] bg-[#0891A2]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        {/* Date & Time */}
                        <div className="flex-1 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{slot.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px] mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{slot.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Confirm Appointment Button */}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    disabled={!selectedSlotId}
                    onClick={handleConfirmAppointment}
                  >
                    Confirm Appointment
                  </Button>

                  {/* Subtexts */}
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    {selectedSlotId
                      ? "One time selected. Confirm to book your visit."
                      : "Select one time to enable confirmation."}
                  </p>
                  <p className="text-[10px] text-slate-400 text-center mt-0.5">
                    Contractor details have not been provided yet.
                  </p>
                </div>
              </div>
            )}

            {/* SUBCASE B: APPOINTMENT CONFIRMED (Screen 3) */}
            {appointmentStatus === "confirmed" && (
              <div className="mb-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                  Confirmed appointment
                </h3>

                {/* Confirmed Callout Box */}
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11.5px] font-bold text-[#059669] leading-tight">
                      Appointment confirmed
                    </h4>
                    <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                      Your landlord has been notified. The issue remains pending until the repair is completed.
                    </p>
                  </div>
                </div>

                {/* Confirmed Slot Card */}
                <div className="bg-white rounded-2xl p-3 border border-emerald-100 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{confirmedSlot?.date || "Sep 20, 2026"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px] mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{confirmedSlot?.time || "3:50–4:50 PM"}</span>
                      </div>
                    </div>
                    <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      Confirmed
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center">
                  Contractor details have not been provided yet.
                </p>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: LANDLORD APPOINTMENT PROPOSALS SECTION (Screen 4)       */}
        {/* ============================================================== */}
        {viewMode === "landlord" && (
          <div className="mb-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Appointment proposals
            </h3>

            {/* Awaiting tenant confirmation callout */}
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-3 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11.5px] font-bold text-[#1D4ED8] leading-tight">
                  Awaiting tenant confirmation
                </h4>
                <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                  Jerome Bell has been notified. An appointment is not yet booked; the tenant must confirm one time.
                </p>
              </div>
            </div>

            {/* List of 3 proposed slots */}
            <div className="space-y-2">
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{slot.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px] mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{slot.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Contractor details have not been provided yet.
            </p>

            <div className="text-[10px] text-slate-400 text-center space-y-0.5 pt-1">
              <p>Submitted Sep 18, 2026 · 12:00 PM</p>
              <p>No time has been confirmed by the tenant.</p>
            </div>

            <button
              type="button"
              onClick={() => showToast("Status updated!")}
              className="w-full py-3 rounded-full bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer active:scale-[0.99] text-center"
            >
              Update Status
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* UPDATES & HISTORY (Vertical Timeline matching screenshots)      */}
        {/* ============================================================== */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            Updates & history
          </h3>
          <p className="text-[10px] text-slate-400 mb-3">
            Sample updates and repair messages
          </p>

          <div className="relative pl-5 space-y-4 border-l-2 border-slate-100 ml-1.5">
            {/* If Confirmed, topmost Solve/Confirmed event is visible */}
            {appointmentStatus === "confirmed" && (
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#0891A2] ring-4 ring-teal-50" />
                <h4 className="text-xs font-bold text-slate-800 leading-tight">
                  Solve
                </h4>
                <p className="text-[9.5px] text-slate-400 mt-0.5">
                  Sep 19, 2026 · 03:25 PM
                </p>
                <p className="text-[10.5px] text-slate-500 mt-0.5">
                  Jerome Bell confirmed solve this
                </p>
              </div>
            )}

            {/* Event 1 */}
            <div className="relative">
              <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#0891A2] ring-4 ring-teal-50" />
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Appointment times proposed
              </h4>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Sep 18, 2026 · 12:00 PM
              </p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                Three times sent. Tenant notified.
              </p>
            </div>

            {/* Event 2 */}
            <div className="relative">
              <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#0891A2] ring-4 ring-teal-50" />
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Landlord reviewed the issue
              </h4>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Sep 18, 2026 · 11:50 AM
              </p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                A repair visit is being arranged.
              </p>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#0891A2] ring-4 ring-teal-50" />
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Update requested
              </h4>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Sep 15, 2026 · 11:00 AM
              </p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                Jerome Bell requested a repair update.
              </p>
            </div>

            {/* Event 4 */}
            <div className="relative">
              <span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#0891A2] ring-4 ring-teal-50" />
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Issue reported
              </h4>
              <p className="text-[9.5px] text-slate-400 mt-0.5">
                Sep 12, 2026 · 10:45 AM
              </p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                Kitchen Sink Leak submitted.
              </p>
            </div>
          </div>

          {/* Action button below timeline */}
          <div className="mt-4">
            {appointmentStatus === "confirmed" && viewMode === "tenant" ? (
              <div className="space-y-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleReschedule}
                  className="bg-white border-slate-200 text-slate-700"
                >
                  Reschedule
                </Button>
                <p className="text-[9.5px] text-slate-400 text-center">
                  Rescheduling will send a new proposal to the tenant for confirmation.
                </p>
              </div>
            ) : (
              <Button
                type="button"
                variant={selectedSlotId ? "primary" : "secondary"}
                size="md"
                fullWidth
                onClick={() => showToast("Update request sent to landlord!")}
              >
                Request an Update
              </Button>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MESSAGES SECTION (Matching Frame)                              */}
        {/* ============================================================== */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight mb-2">
            Messages
          </h3>

          <div className="space-y-2.5">
            {/* Landlord Message */}
            <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs">
              <h4 className="text-[11px] font-bold text-slate-800 leading-tight">
                Landlord - Sep 18, 12:00 PM
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Please choose a suitable time. We will arrange access to inspect the kitchen sink leak.
              </p>
            </div>

            {/* Tenant Message (Appears when confirmed, Screen 3 & 4) */}
            {appointmentStatus === "confirmed" && (
              <div className="bg-[#F0FDFA] rounded-2xl p-3 border border-teal-100 shadow-2xs animate-in fade-in duration-200">
                <h4 className="text-[11px] font-bold text-[#0891A2] leading-tight">
                  Jerome Bell - Sep 18, 12:15 PM
                </h4>
                <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                  {confirmedSlot?.date || "Sep 20"}, {confirmedSlot?.time || "3:50–4:50 PM"} works for me. I will be home to provide access.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* BOTTOM NAVIGATION BAR (Standardized reusable component)        */}
      {/* ============================================================== */}
      <TenantBottomNav activeTab="maintenance" />

    </div>
  );
}
