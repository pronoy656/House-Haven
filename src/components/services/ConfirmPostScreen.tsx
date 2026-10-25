"use client";

import React, { useState } from "react";
import { ArrowLeft, Home, Calendar, FileText, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import Image from "next/image";

interface ConfirmPostScreenProps {
  onBack?: () => void;
  onConfirmSuccess?: () => void;
  showStatusBar?: boolean;
}

export function ConfirmPostScreen({
  onBack,
  onConfirmSuccess,
  showStatusBar = true,
}: ConfirmPostScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onConfirmSuccess) {
          onConfirmSuccess();
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

          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Confirm Post
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3.5 text-left pt-1 pb-4">
        <h2 className="text-[17px] font-bold text-slate-900 tracking-tight pb-0.5">
          Review and Confirm
        </h2>

        {/* Card 1: Issue Summary Card */}
        <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3.5 shadow-2xs">
          {/* Issue Photo Thumbnail */}
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
            {/* Electrical Breaker Box Graphic Simulation */}
            <div className="w-full h-full bg-slate-800 p-1 flex flex-col justify-between">
              <div className="flex gap-1">
                <span className="w-1.5 h-6 bg-amber-400 rounded-xs"></span>
                <span className="w-1.5 h-6 bg-red-400 rounded-xs"></span>
                <span className="w-1.5 h-6 bg-blue-400 rounded-xs"></span>
              </div>
              <div className="flex justify-between items-center text-[7px] text-white/70 font-mono">
                <span>240V</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-slate-900 truncate">
              Electricity problem in house
            </h3>
            <p className="text-xs font-bold text-[#0891A2] mt-0.5">
              $75–$100
            </p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-600 font-medium">
              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Zap className="w-2.5 h-2.5 fill-current" />
              </span>
              <span>Electricity</span>
            </div>
          </div>
        </div>

        {/* Card 2: Address Card */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Address</h4>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Rock Rd, Armagh, UK, BT60 3AB
            </p>
          </div>
        </div>

        {/* Card 3: Date & Time Card */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Date &amp; Time</h4>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Mon, Sep 29, 2026 at 10:00 AM
            </p>
          </div>
        </div>

        {/* Card 4: Issue Details Card */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Issue Details</h4>
            <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
              We are currently experiencing an electricity outage affecting several areas. Our team is working to resolve the problem as quickly as possible. We appreciate your patience and will provide updates soon.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-3 shrink-0 z-20 bg-white border-t border-slate-50">
        <Button
          type="button"
          variant="primary"
          onClick={handleConfirm}
          isLoading={isSubmitting}
          className="h-12 font-semibold text-sm tracking-wide"
        >
          Confirm Post
        </Button>
      </div>

      {/* Confirmation Celebration Modal */}
      {isSuccess && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-scale-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Thank you for your concern!
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 max-w-[260px] leading-relaxed">
            Your service request has been confirmed and posted. Redirecting to My Requests...
          </p>
        </div>
      )}
    </div>
  );
}
