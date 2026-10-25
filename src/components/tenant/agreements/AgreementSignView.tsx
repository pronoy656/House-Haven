"use client";

import React, { useRef, useState } from "react";
import {
  FileText,
  RotateCcw,
  Upload,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { MONTH_NAMES } from "./mockData";

export interface AgreementSignViewProps {
  onBack: () => void;
  onNavigateToNotifications: () => void;
  onSignSuccess: () => void;
}

export function AgreementSignView({
  onBack,
  onNavigateToNotifications,
  onSignSuccess,
}: AgreementSignViewProps) {
  const [signMethod, setSignMethod] = useState<"draw" | "type" | "upload">("draw");
  const [typedSignature, setTypedSignature] = useState("Andy Lexsian");
  const [fullName, setFullName] = useState("Andy Lexsian");

  // Date picker state
  const [signDate, setSignDate] = useState("24 february 1996");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(1); // 1 = February
  const [calYear, setCalYear] = useState(1996);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Canvas drawing ref and state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0F172A";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handlePickDate = (dayNum: number) => {
    const monthName = MONTH_NAMES[calMonth].toLowerCase();
    setSignDate(`${dayNum} ${monthName} ${calYear}`);
    setIsDatePickerOpen(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignSuccess();
    }, 1200);
  };

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-200">
      {/* Reusable Header */}
      <ScreenHeader
        title="Agreements Review"
        onBack={onBack}
        rightAction={
          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
        }
        className="px-4 pt-3 pb-2"
      />

      <div className="p-4 pb-6 flex-1 flex flex-col">
        {/* Document Card */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-3 mb-4">
          <div className="w-9 h-11 rounded-lg bg-red-500 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs relative">
            <div className="w-2.5 h-2 bg-red-600 absolute top-0 right-0 rounded-bl-sm" />
            <FileText className="w-4 h-4 text-white" />
            <span className="text-[7.5px] font-black tracking-tighter mt-0.5">PDF</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-slate-900 truncate">
              Credit_Report.pdf
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              12 page . 2.4 MB
            </p>
          </div>
        </div>

        {/* Signature Tabs */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            {(["draw", "type", "upload"] as const).map((method) => (
              <Button
                key={method}
                type="button"
                variant="pill"
                size="sm"
                isActive={signMethod === method}
                onClick={() => setSignMethod(method)}
                className="px-5 py-1.5 capitalize"
              >
                {method}
              </Button>
            ))}
          </div>

          {/* Signature Canvas Area */}
          <div className="w-full h-36 bg-white rounded-2xl border border-slate-200/90 relative overflow-hidden flex flex-col justify-between p-2 shadow-2xs">
            {signMethod === "draw" && (
              <>
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={120}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="text-[11px] text-slate-400 italic">
                      Draw signature here
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-600 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md cursor-pointer border border-slate-100"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </>
            )}

            {signMethod === "type" && (
              <div className="flex-1 flex flex-col items-center justify-center p-2">
                <InputField
                  type="text"
                  variant="outlined"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Type your signature..."
                  className="w-full text-center text-2xl font-serif italic text-slate-800 bg-transparent border-0 border-b border-dashed border-slate-300 rounded-none focus:ring-0 focus:border-[#0891A2] py-2"
                  style={{ fontFamily: "Georgia, cursive" }}
                />
                <span className="text-[10px] text-slate-400 mt-2">
                  Electronic Signature Representation
                </span>
              </div>
            )}

            {signMethod === "upload" && (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl m-1 bg-slate-50/50">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <p className="text-[11px] font-semibold text-slate-700">
                  Upload Signature Image
                </p>
                <p className="text-[9.5px] text-slate-400">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields: Full Name & Interactive Date Picker */}
        <div className="space-y-3 mb-6 relative">
          <InputField
            label="Full Name"
            type="text"
            variant="outlined"
            inputSize="sm"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="font-medium"
          />

          {/* Date Input with Calendar Trigger */}
          <div className="relative">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Date
            </label>
            <div
              onClick={() => setIsDatePickerOpen(true)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium flex items-center justify-between cursor-pointer hover:border-[#0891A2] transition-colors"
            >
              <span>{signDate || "Select a date"}</span>
              <CalendarIcon className="w-4 h-4 text-[#0891A2]" />
            </div>

            {/* Calendar Dropdown Modal / Popup */}
            {isDatePickerOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 animate-in zoom-in-95 duration-150">
                {/* Month & Year Navigation */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (calMonth === 0) {
                        setCalMonth(11);
                        setCalYear((y) => y - 1);
                      } else {
                        setCalMonth((m) => m - 1);
                      }
                    }}
                    className="p-1 hover:bg-slate-100 rounded-md text-slate-600 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-bold text-slate-800">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (calMonth === 11) {
                        setCalMonth(0);
                        setCalYear((y) => y + 1);
                      } else {
                        setCalMonth((m) => m + 1);
                      }
                    }}
                    className="p-1 hover:bg-slate-100 rounded-md text-slate-600 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Day of Week Labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const isToday = dayNum === 24 && calMonth === 1 && calYear === 1996;
                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => handlePickDate(dayNum)}
                        className={`h-7 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center ${
                          isToday
                            ? "bg-[#0891A2] text-white font-bold"
                            : "hover:bg-teal-50 hover:text-[#0891A2] text-slate-700"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                {/* Close Date Picker Button */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(false)}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-0.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div className="mt-auto">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              <span>Sign & Submit</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
