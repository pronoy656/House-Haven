"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { authApi } from "@/lib/api";

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
}: OtpVerificationScreenProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
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

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      setErrorMessage("Please enter the complete verification code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authApi.verifyAccount({
        email,
        oneTimeCode: code,
      });

      setInfoMessage("Verification successful! Redirecting to login...");
      setTimeout(() => {
        if (onVerifySuccess) {
          onVerifySuccess();
        }
      }, 700);
    } catch (err: any) {
      console.error("Verification error:", err);
      setErrorMessage(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authApi.resendOtp(email);
      setInfoMessage("A new verification code has been generated.");
      setTimer(45);
      setTimeout(() => setInfoMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to resend code.");
    }
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
        {/* Verification Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-6 shadow-xs">
          <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-center">
          Verify Your Email
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 text-center max-w-[280px]">
          Please enter the 6-digit code sent to{" "}
          <span className="font-semibold text-slate-800 break-all">{email}</span>
        </p>

        {errorMessage && (
          <div className="w-full mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {infoMessage && (
          <div className="w-full mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl text-center">
            {infoMessage}
          </div>
        )}

        {/* OTP Input Fields */}
        <form onSubmit={handleVerify} className="w-full mt-8">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border bg-slate-50/50 transition-all outline-none ${
                  digit
                    ? "border-teal-500 text-slate-900 bg-white ring-2 ring-teal-500/20"
                    : "border-slate-200 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                }`}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-8"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>
        </form>

        {/* Resend Code Section */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
