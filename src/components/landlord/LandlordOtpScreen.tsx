"use client";

import React, { useState, useEffect } from "react";
import { MobileStatusBar } from "../MobileStatusBar";
import { HouseHavenLogo } from "../HouseHavenLogo";
import { Button } from "../ui/Button";

interface LandlordOtpScreenProps {
  email?: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  showStatusBar?: boolean;
}

export function LandlordOtpScreen({
  email = "jamesray@gmail.com",
  onVerify,
  onResend,
  showStatusBar = true,
}: LandlordOtpScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(20);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (onVerify) {
        onVerify(otp.join("") || "123456");
      }
    }, 400);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-center pt-4 pb-4 text-center">
        {/* House Haven Logo */}
        <div className="mb-8">
          <HouseHavenLogo variant="light" width={110} height={70} />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
          Verification Account
        </h1>
        <p className="text-[12px] sm:text-[13px] text-slate-400 mt-2 max-w-[280px] font-normal leading-relaxed">
          Enter verification code sent to your email address
          <br />
          <span className="text-slate-600 font-medium">{email}</span>
        </p>

        {/* 6-Digit OTP Boxes */}
        <div className="flex items-center justify-center gap-2.5 my-8">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              placeholder="-"
              className="w-10 h-12 sm:w-11 sm:h-13 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-center text-lg font-bold text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
            />
          ))}
        </div>

        {/* Verify Button */}
        <div className="w-full">
          <Button
            variant="primary"
            onClick={handleVerify}
            isLoading={isVerifying}
            className="h-12 font-semibold text-sm w-full"
          >
            Verify Account
          </Button>
        </div>

        {/* Resend Footer */}
        <div className="mt-6 text-[12px] text-slate-400">
          Don&apos;t receive the code?{" "}
          {countdown > 0 ? (
            <span className="text-slate-500 font-medium">
              <span className="text-[#0891A2] font-semibold">Resend</span> in{" "}
              {countdown} second
            </span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCountdown(20);
                if (onResend) onResend();
              }}
              className="text-[#0891A2] font-semibold hover:underline cursor-pointer"
            >
              Resend now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
