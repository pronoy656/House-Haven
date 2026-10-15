"use client";

import React from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";

interface LandlordOverviewScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
  showStatusBar?: boolean;
}

export function LandlordOverviewScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: LandlordOverviewScreenProps) {
  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Navigation & Stepper */}
      <div className="shrink-0 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex flex-col items-center px-4">
          <span className="text-[11px] font-medium text-slate-400 mb-1.5">
            Step 4 of 6
          </span>
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-4/6 h-full bg-[#0891A2] rounded-full transition-all duration-300" />
          </div>
        </div>

        <div className="w-9" />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3.5 text-left pt-1 pb-4">
          {/* Title & Subtitle */}
          <div className="text-center mb-5">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
              Review Your Details
            </h1>
            <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 font-normal">
              Verify your information before identity check.
            </p>
          </div>

          {/* Overview Information Cards */}
          {/* Personal Info Card */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
              <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0891A2]" />
                Personal Information
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-11 h-11 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                JR
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-slate-900">James Ray</h4>
                <p className="text-[11px] text-slate-500">
                  DOB: 09/3/1985 • Gender: Male
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2.5 bg-white p-2.5 rounded-xl border border-slate-100 leading-relaxed italic">
              &ldquo;I&apos;m a property owner passionate about providing safe, clean, and comfortable homes for tenants.&rdquo;
            </p>
          </div>

          {/* Contact Card */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
              <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0891A2]" />
                Contact & Account
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-1.5 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-medium text-slate-800">demo@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-medium text-slate-800">+880 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
              <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0891A2]" />
                Address Details
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-1 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Post code:</span>
                <span className="font-medium text-slate-800">12236</span>
              </div>
              <div className="text-slate-700 font-medium mt-1 leading-snug">
                1 Cavanacaw Grange, Armagh, BT62FU
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="shrink-0 pt-3 border-t border-slate-50">
          <Button
            variant="primary"
            onClick={onContinue}
            className="h-12 font-semibold text-sm w-full"
          >
            Continue to Identity Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
