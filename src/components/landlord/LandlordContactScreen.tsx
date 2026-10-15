"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Eye, EyeOff } from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";

interface LandlordContactScreenProps {
  onBack?: () => void;
  onContinue?: (data: {
    email: string;
    phone: string;
    countryCode: string;
  }) => void;
  showStatusBar?: boolean;
}

export function LandlordContactScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: LandlordContactScreenProps) {
  const [email, setEmail] = useState("demo@gmail.com");
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("123 456 7890");
  const [password, setPassword] = useState("••••••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContinue) {
      onContinue({ email, phone: phoneNumber, countryCode });
    }
  };

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
            Step 2 of 6
          </span>
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-2/6 h-full bg-[#0891A2] rounded-full transition-all duration-300" />
          </div>
        </div>

        <div className="w-9" />
      </div>

      {/* Main Content Form */}
      <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 pt-1 pb-4">
          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
              Contact and Password
            </h1>
            <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 font-normal">
              How can tenants reach you and your password
            </p>
          </div>

        <div className="space-y-4">
          {/* Email Address */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@gmail.com"
              className="w-full h-11 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Phone Number
            </label>
            <div className="flex gap-2">
              {/* Country Code Picker */}
              <div className="relative w-[110px] shrink-0">
                <button
                  type="button"
                  className="w-full h-11 px-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between text-slate-800 text-[13px] hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {/* BD Flag */}
                    <span className="text-base leading-none">🇧🇩</span>
                    <span className="font-medium text-slate-700">{countryCode}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Number Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123 456 7890"
                className="flex-1 h-11 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="shrink-0 pt-3 border-t border-slate-50">
          <Button
            type="submit"
            variant="primary"
            className="h-12 font-semibold text-sm"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
