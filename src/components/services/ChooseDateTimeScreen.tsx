"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";

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
}: ChooseDateTimeScreenProps) {
  // Real present/current date calculations
  const today = useMemo(() => new Date(), []);
  const todayMidnight = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  // Month viewing state (defaults to present month and year)
  const [viewDate, setViewDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Selected date state (defaults to today's date)
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Navigation limits: disable previous month if already at current month
  const isAtCurrentMonth =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() <= today.getMonth();

  const handlePrevMonth = () => {
    if (isAtCurrentMonth) return;
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Build dynamic calendar cells for viewDate
  const calendarCells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: {
      day: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      date: Date;
    }[] = [];

    // Leading padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      cells.push({
        day: d,
        isCurrentMonth: false,
        isPast: true,
        date: new Date(year, month - 1, d),
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      const isPast = cellDate.getTime() < todayMidnight.getTime();
      cells.push({
        day: d,
        isCurrentMonth: true,
        isPast,
        date: cellDate,
      });
    }

    // Trailing padding days to fill full grid rows
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      cells.push({
        day: n,
        isCurrentMonth: false,
        isPast: false,
        date: new Date(year, month + 1, n),
      });
    }

    return cells;
  }, [viewDate, todayMidnight]);

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const formattedSelectedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          date: formattedSelectedDate,
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
            date: formattedSelectedDate,
            time: selectedTime,
          });
        }
      }, 1200);
    }, 400);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden font-sans">
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
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Choose Date
            </h3>
            <span className="text-xs font-bold text-[#0891A2]">
              {formattedSelectedDate}
            </span>
          </div>

          {/* Month Header with Navigation */}
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              disabled={isAtCurrentMonth}
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-slate-900">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400 pb-1">
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
              const isSelected =
                item.isCurrentMonth &&
                item.date.getTime() === selectedDate.getTime();
              const isTodayCell =
                item.isCurrentMonth &&
                item.date.getTime() === todayMidnight.getTime();

              return (
                <div key={idx} className="flex items-center justify-center">
                  <button
                    type="button"
                    disabled={!item.isCurrentMonth || item.isPast}
                    onClick={() => {
                      if (item.isCurrentMonth && !item.isPast) {
                        setSelectedDate(item.date);
                      }
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer text-xs relative ${
                      isSelected
                        ? "bg-[#0891A2] text-white font-bold shadow-xs scale-105"
                        : item.isCurrentMonth && !item.isPast
                        ? isTodayCell
                          ? "border border-[#0891A2] text-[#0891A2] font-bold hover:bg-[#0891A2]/10"
                          : "text-slate-800 hover:bg-slate-100 font-medium"
                        : "text-slate-300 pointer-events-none line-through decoration-slate-200"
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
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Choose Time Slot
            </h3>
            <span className="text-xs font-bold text-[#0891A2]">
              {selectedTime}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`h-11 rounded-2xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "border-[#0891A2] bg-[#DDF4F8] text-[#0891A2] shadow-2xs"
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
            Scheduled for <strong>{formattedSelectedDate}</strong> at{" "}
            <strong>{selectedTime}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
