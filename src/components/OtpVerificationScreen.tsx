"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "./ui/Button";
import { MobileStatusBar } from "./MobileStatusBar";

interface OtpVerificationScreenProps {
  email?: string;
  onBack?: () => void;
  onVerifySuccess?: () => void;
  showStatusBar?: boolean;
}

export function OtpVerificationScreen({
  email = "alex@example.com",
  onBack,
  onVerifySuccess,
  showStatusBar = true,
}: OtpVerificationScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Pasting full code
      const pasted = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onVerifySuccess) {
        onVerifySuccess();
      }
    }, 600);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Bar with Back Button */}
      <div className="shrink-0 flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9"></div>
        )}
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Verification
        </span>
        <div className="w-9"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center items-center px-1 py-4">
        {/* Shield Icon container */}
        <div className="w-16 h-16 rounded-2xl bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center mb-6 shadow-sm">
          <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Verify Your Email
          </h1>
          <p className="text-xs text-slate-500 mt-2 max-w-[280px] leading-relaxed">
            Enter the 6-digit verification code sent to <br />
            <strong className="text-slate-800 font-medium">{email}</strong>
          </p>
        </div>

        {/* 6-Digit OTP inputs */}
        <form onSubmit={handleVerify} className="w-full space-y-6">
          <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(e.target.value.replace(/\D/g, ""), index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-11 h-13 text-center text-lg font-bold text-slate-900 bg-[#F4F6F9] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#0891A2] focus:ring-2 focus:ring-[#0891A2]/20 transition-all"
              />
            ))}
          </div>

          {/* Resend Timer */}
          <div className="text-center text-xs text-slate-500 pt-1">
            Didn&apos;t receive the code?{" "}
            {timer > 0 ? (
              <span className="font-semibold text-slate-700">Resend in 00:{timer < 10 ? `0${timer}` : timer}</span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(45)}
                className="font-semibold text-[#0891A2] hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="h-12 font-semibold text-sm tracking-wide w-full"
            >
              Verify &amp; Continue
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="shrink-0 text-center text-xs text-slate-400 pt-2">
        Secured by House Haven Identity
      </div>
    </div>
  );
}
