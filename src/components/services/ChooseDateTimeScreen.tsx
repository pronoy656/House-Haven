"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";

interface ChooseDateTimeScreenProps {
  onBack?: () => void;
  onConfirmAppointment?: (appointment: { date: string; time: string }) => void;
  buttonText?: string;
  showSuccessModal?: boolean;
  showStatusBar?: boolean;
}

export function ChooseDateTimeScreen({
  onBack,
  onConfirmAppointment,
  buttonText = "Confirm Appointment",
  showSuccessModal = false,
  showStatusBar = true,
}: ChooseDateTimeScreenProps) {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // March 2025 calendar days setup
  // Days from previous month (Feb): 27, 28
  // Days in March: 1 to 31
  // Days in next month (Apr): 1, 2
  const calendarCells = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isCurrentMonth: true })),
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleConfirm = () => {
    if (!showSuccessModal) {
      if (onConfirmAppointment) {
        onConfirmAppointment({
          date: `March ${selectedDay}, 2025`,
          time: selectedTime,
        });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onConfirmAppointment) {
          onConfirmAppointment({
            date: `March ${selectedDay}, 2025`,
            time: selectedTime,
          });
        }
      }, 1200);
    }, 400);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header */}
      <div className="pt-2 pb-3 shrink-0 z-20 bg-white">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Choose Date &amp; Time
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1 space-y-5 text-left pt-1 pb-4">
        {/* Choose Date Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-slate-500 pl-1">
            Choose Date
          </h3>

          {/* Month Header */}
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-slate-900">
              March 2025
            </span>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-[11px] font-medium text-slate-600 pb-1">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
            {calendarCells.map((item, idx) => {
              const isSelected = item.isCurrentMonth && item.day === selectedDay;
              return (
                <div key={idx} className="flex items-center justify-center">
                  <button
                    type="button"
                    disabled={!item.isCurrentMonth}
                    onClick={() => item.isCurrentMonth && setSelectedDay(item.day)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0891A2] text-white font-bold shadow-xs"
                        : item.isCurrentMonth
                        ? "text-slate-800 hover:bg-slate-100 font-normal"
                        : "text-slate-300 pointer-events-none"
                    }`}
                  >
                    {item.day}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Choose Time Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-medium text-slate-500 pl-1">
            Choose Time
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`h-12 rounded-2xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "border-[#0891A2] bg-[#DDF4F8] text-slate-900 shadow-2xs"
                      : "border-slate-200/90 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50/60"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-3 shrink-0 z-20 bg-white border-t border-slate-50">
        <Button
          type="button"
          variant="primary"
          onClick={handleConfirm}
          isLoading={isSubmitting}
          className="h-12 font-semibold text-sm tracking-wide"
        >
          {buttonText}
        </Button>
      </div>

      {/* Appointment Confirmation Toast / Celebration Modal */}
      {isSuccess && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-scale-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Appointment Confirmed!
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 max-w-[260px] leading-relaxed">
            Scheduled for <strong>March {selectedDay}, 2025</strong> at{" "}
            <strong>{selectedTime}</strong>. Returning to My Requests...
          </p>
        </div>
      )}
    </div>
  );
}
