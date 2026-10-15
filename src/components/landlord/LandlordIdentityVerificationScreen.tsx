"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Camera,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
  RefreshCw,
  Sun,
  Eye,
  Maximize2,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";
import { Button } from "../ui/Button";

interface LandlordIdentityVerificationScreenProps {
  onBack?: () => void;
  onNavigateToProofOfAddress?: () => void;
  onContinue?: () => void;
  showStatusBar?: boolean;
}

export type IdentitySubFlow =
  | "main"
  | "id_front_instructions"
  | "id_front_camera"
  | "id_front_review"
  | "id_back_instructions"
  | "id_back_camera"
  | "id_back_review"
  | "selfie_intro"
  | "selfie_camera";

export function LandlordIdentityVerificationScreen({
  onBack,
  onNavigateToProofOfAddress,
  onContinue,
  showStatusBar = true,
}: LandlordIdentityVerificationScreenProps) {
  const [subFlow, setSubFlow] = useState<IdentitySubFlow>("main");
  const [govIdDone, setGovIdDone] = useState(false);
  const [selfieDone, setSelfieDone] = useState(false);
  const [proofDone, setProofDone] = useState(false);

  // Camera simulation state
  const [flashActive, setFlashActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVerifyingSelfie, setIsVerifyingSelfie] = useState(false);
  const [selfieVerified, setSelfieVerified] = useState(false);

  // Trigger camera shutter flash animation
  const handleShutterClick = (nextFlow: IdentitySubFlow) => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setSubFlow(nextFlow);
    }, 280);
  };

  // Selfie capture & verification
  const handleSelfieVerify = () => {
    setIsVerifyingSelfie(true);
    setTimeout(() => {
      setIsVerifyingSelfie(false);
      setSelfieVerified(true);
      setSelfieDone(true);
      setTimeout(() => {
        if (onNavigateToProofOfAddress) {
          onNavigateToProofOfAddress();
        } else if (onContinue) {
          onContinue();
        }
      }, 1000);
    }, 1400);
  };

  // Back button handler
  const handleBack = () => {
    switch (subFlow) {
      case "id_front_instructions":
        setSubFlow("main");
        break;
      case "id_front_camera":
        setSubFlow("id_front_instructions");
        break;
      case "id_front_review":
        setSubFlow("id_front_camera");
        break;
      case "id_back_instructions":
        setSubFlow("id_front_review");
        break;
      case "id_back_camera":
        setSubFlow("id_back_instructions");
        break;
      case "id_back_review":
        setSubFlow("id_back_camera");
        break;
      case "selfie_intro":
        setSubFlow("main");
        break;
      case "selfie_camera":
        setSubFlow("selfie_intro");
        break;
      case "main":
      default:
        onBack?.();
        break;
    }
  };

  // Step 1: Main Overview continue button
  const handleMainContinue = () => {
    if (!govIdDone) {
      setSubFlow("id_front_instructions");
    } else if (!selfieDone) {
      setSubFlow("selfie_intro");
    } else {
      if (onNavigateToProofOfAddress) {
        onNavigateToProofOfAddress();
      } else if (onContinue) {
        onContinue();
      }
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Shutter White Flash overlay */}
      {isCapturing && (
        <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-ping opacity-90 duration-200" />
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. MAIN SCREEN: 3 Cards (Gov ID, Selfie, Proof of Address)
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "main" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          {/* Top Header & Stepper */}
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-[11px] font-medium text-slate-400 mb-1.5">
                Step 5 of 6
              </span>
              <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-5/6 h-full bg-[#0891A2] rounded-full transition-all duration-300" />
              </div>
            </div>

            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4">
            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
                Identity Verification
              </h1>
              <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 font-normal">
                Verify your identity to build trust with tenants.
              </p>
            </div>

            {/* 3 Verification Cards */}
            <div className="space-y-3.5">
              {/* Card 1: Government ID (Selected by default) */}
              <div
                onClick={() => setSubFlow("id_front_instructions")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  govIdDone
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-[#0891A2] bg-[#F0FDFA] shadow-xs ring-1 ring-[#0891A2]/20"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-9 rounded-md bg-[#60A5FA]/15 border border-[#3B82F6]/30 p-1 flex items-center gap-1.5 shrink-0">
                    <div className="w-4 h-5 rounded-xs bg-[#EF4444]/80 flex items-center justify-center text-[7px] text-white font-bold">
                      👤
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="w-full h-1 bg-[#3B82F6]/60 rounded" />
                      <div className="w-3/4 h-1 bg-[#3B82F6]/40 rounded" />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                        Government ID
                      </h3>
                      {!govIdDone && (
                        <span className="text-[9.5px] font-semibold bg-[#0891A2] text-white px-1.5 py-0.5 rounded-full">
                          Ready to scan
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Passport, Driver&apos;s License, or National ID
                    </p>
                  </div>
                </div>

                {govIdDone ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-[#0891A2] flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0891A2]" />
                  </div>
                )}
              </div>

              {/* Card 2: Selfie Verification */}
              <div
                onClick={() => {
                  if (govIdDone) setSubFlow("selfie_intro");
                  else setSubFlow("id_front_instructions");
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selfieDone
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-slate-100 bg-white hover:border-slate-200 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center text-xl shrink-0">
                    🤳
                  </div>

                  <div className="text-left">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                      Selfie Verification
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Take a selfie to confirm it&apos;s you
                    </p>
                  </div>
                </div>

                {selfieDone ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-200 shrink-0" />
                )}
              </div>

              {/* Card 3: Proof of Address */}
              <div
                onClick={() => onNavigateToProofOfAddress?.()}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  proofDone
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-slate-100 bg-white hover:border-slate-200 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">
                    🏠📍
                  </div>

                  <div className="text-left">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                      Proof of Address
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Utility bill, bank statement, etc.
                    </p>
                  </div>
                </div>

                {proofDone ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-slate-200 shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="shrink-0 pt-3 border-t border-slate-50">
            <Button
              variant="primary"
              onClick={handleMainContinue}
              className="h-12 font-semibold text-sm w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FRONT ID GUIDELINES SCREEN
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_front_instructions" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Front of ID • Step 1
            </span>
            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4 flex flex-col justify-between">
            <div>
              <div className="text-center mb-5">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                  Scan the front side of government ID card
                </h2>
                <p className="text-[12px] text-slate-400 mt-1">
                  Ensure all details and your photo are sharp and readable.
                </p>
              </div>

              {/* Humanized ID Front Illustration */}
              <div className="w-full max-w-[320px] mx-auto p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-lg border border-slate-700/60 relative overflow-hidden my-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🇬🇧</span>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-200">
                      United Kingdom • National ID
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 font-semibold">
                    GBR-928401
                  </span>
                </div>

                <div className="pt-3 flex items-center gap-3.5">
                  <div className="w-16 h-20 bg-slate-700 rounded-lg border border-white/20 flex flex-col items-center justify-center text-2xl relative overflow-hidden shrink-0 shadow-inner">
                    👨‍💼
                    <div className="absolute bottom-0 inset-x-0 bg-cyan-600/80 text-[7px] text-center font-bold uppercase tracking-tighter py-0.5 text-white">
                      Photo
                    </div>
                  </div>

                  <div className="flex-1 text-left space-y-1">
                    <div>
                      <span className="text-[8.5px] text-slate-400 uppercase block">Name</span>
                      <span className="text-[13px] font-bold text-white tracking-wide">
                        JAMES RAY
                      </span>
                    </div>
                    <div>
                      <span className="text-[8.5px] text-slate-400 uppercase block">Date of Birth</span>
                      <span className="text-[11px] font-semibold text-slate-200">
                        09 / 03 / 1985
                      </span>
                    </div>
                    <div>
                      <span className="text-[8.5px] text-slate-400 uppercase block">Expires</span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        12 / 2032
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Guidance Tips */}
              <div className="space-y-2.5 mt-5 text-left max-w-[320px] mx-auto">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Use good lighting, avoid glare and shadows
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-[#0891A2] flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Keep all 4 corners visible inside the frame
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Make sure text is sharp and not blurry
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-3 border-t border-slate-50">
            <Button
              variant="primary"
              onClick={() => setSubFlow("id_front_camera")}
              className="h-12 font-semibold text-sm w-full flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Front Side</span>
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. FRONT ID CAMERA VIEWFINDER
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_front_camera" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between bg-slate-950 text-white -m-6 p-6">
          <div className="shrink-0 pb-3 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-white/80 tracking-wide">
              Front of ID
            </span>
            <button
              type="button"
              onClick={() => setFlashActive(!flashActive)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                flashActive ? "bg-amber-400 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>

          {/* Camera Viewport with Corner Brackets */}
          <div className="flex-1 flex flex-col items-center justify-center relative my-2">
            <div className="relative w-full max-w-[320px] h-[200px] rounded-2xl border-2 border-white/20 overflow-hidden flex flex-col justify-between p-3 bg-slate-900/40 backdrop-blur-xs shadow-2xl">
              {/* Corner focus brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-3 border-l-3 border-[#0891A2] rounded-tl-sm pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-3 border-r-3 border-[#0891A2] rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-3 border-l-3 border-[#0891A2] rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-3 border-r-3 border-[#0891A2] rounded-br-sm pointer-events-none" />

              {/* Animated Scan Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0891A2] to-transparent animate-pulse opacity-80" />

              <div className="flex items-center justify-between text-white/70 text-[10px]">
                <span>UNITED KINGDOM</span>
                <span>ID CARD</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-14 bg-white/10 rounded border border-white/20 flex items-center justify-center text-xl">
                  👨‍💼
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="w-24 h-2 bg-white/40 rounded" />
                  <div className="w-32 h-1.5 bg-white/20 rounded" />
                  <div className="w-20 h-1.5 bg-white/20 rounded" />
                </div>
              </div>

              <div className="text-center text-[10px] text-[#0891A2] font-semibold tracking-wider uppercase">
                Align front inside frame
              </div>
            </div>

            <p className="text-xs text-white/60 mt-4 font-normal">
              Hold steady • Card detected
            </p>
          </div>

          {/* Shutter Button Bar */}
          <div className="shrink-0 flex items-center justify-around pt-2">
            <div className="w-10" />
            <button
              type="button"
              onClick={() => handleShutterClick("id_front_review")}
              className="w-18 h-18 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg cursor-pointer group"
              aria-label="Take Photo"
            >
              <div className="w-13 h-13 rounded-full bg-white group-active:scale-90 transition-transform" />
            </button>
            <div className="w-10" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. FRONT ID PHOTO REVIEW / OVERVIEW
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_front_review" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> Front Photo Captured
            </span>
            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4 flex flex-col justify-center">
            <div className="text-center mb-4">
              <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                Review Front Photo
              </h2>
              <p className="text-[12px] text-slate-400 mt-1">
                Is your photo and all text clearly readable?
              </p>
            </div>

            {/* Captured Photo Preview Card */}
            <div className="w-full max-w-[320px] mx-auto p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl shadow-xl border-2 border-emerald-500/80 relative overflow-hidden my-2">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center gap-1 shadow-xs">
                <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified
              </div>

              <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/10">
                <span className="text-base">🇬🇧</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                  United Kingdom • National ID
                </span>
              </div>

              <div className="pt-3 flex items-center gap-3.5">
                <div className="w-16 h-20 bg-slate-700 rounded-lg border border-white/20 flex flex-col items-center justify-center text-2xl relative overflow-hidden shrink-0 shadow-inner">
                  👨‍💼
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-600/90 text-[7px] text-center font-bold uppercase py-0.5 text-white">
                    Clear
                  </div>
                </div>

                <div className="flex-1 text-left space-y-1">
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase block">Name</span>
                    <span className="text-[13px] font-bold text-white">JAMES RAY</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase block">Date of Birth</span>
                    <span className="text-[11px] font-semibold text-slate-200">09/03/1985</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase block">Card Number</span>
                    <span className="text-[10px] text-cyan-300 font-mono">GBR-928401-K</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-emerald-600 font-medium mt-3 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High quality • No glare detected
            </p>
          </div>

          {/* Action Buttons: Retake & Next */}
          <div className="shrink-0 pt-3 border-t border-slate-50 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubFlow("id_front_camera")}
              className="flex-1 h-12 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake</span>
            </button>
            <div className="flex-1">
              <Button
                variant="primary"
                onClick={() => setSubFlow("id_back_instructions")}
                className="h-12 font-semibold text-sm w-full"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. BACK ID GUIDELINES SCREEN
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_back_instructions" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Back of ID • Step 2
            </span>
            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4 flex flex-col justify-between">
            <div>
              <div className="text-center mb-5">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                  Scan the back side of government ID card
                </h2>
                <p className="text-[12px] text-slate-400 mt-1">
                  Turn your card over and place the back side within the frame.
                </p>
              </div>

              {/* Humanized ID Back Illustration */}
              <div className="w-full max-w-[320px] mx-auto p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-lg border border-slate-700/60 relative overflow-hidden my-3">
                {/* Magnetic Stripe */}
                <div className="w-full h-8 bg-slate-950 rounded-xs mb-3 -mx-4 px-4 flex items-center">
                  <div className="w-full h-1 bg-white/10" />
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-400 uppercase">Issuing Authority</span>
                    <span className="text-[10px] font-semibold block text-slate-200">
                      HM PASSPORT OFFICE
                    </span>
                  </div>
                  {/* Barcode graphic */}
                  <div className="w-24 h-6 bg-white/20 rounded flex items-center justify-between px-1">
                    <div className="w-0.5 h-4 bg-white" />
                    <div className="w-1.5 h-4 bg-white" />
                    <div className="w-0.5 h-4 bg-white" />
                    <div className="w-2 h-4 bg-white" />
                    <div className="w-1 h-4 bg-white" />
                    <div className="w-0.5 h-4 bg-white" />
                  </div>
                </div>

                {/* Machine Readable Zone (MRZ) */}
                <div className="mt-3 p-2 bg-slate-950/70 rounded-lg font-mono text-[9px] text-slate-300 leading-tight tracking-wider">
                  <div>IDGBR92840188&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                  <div>8503095M3212318GBR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;6</div>
                  <div>RAY&lt;&lt;JAMES&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                </div>
              </div>

              {/* Guidance Tips */}
              <div className="space-y-2.5 mt-5 text-left max-w-[320px] mx-auto">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-[#0891A2] flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Align the entire back of the card inside the frame
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Do not cover barcodes or text lines with fingers
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-3 border-t border-slate-50">
            <Button
              variant="primary"
              onClick={() => setSubFlow("id_back_camera")}
              className="h-12 font-semibold text-sm w-full flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Back Side</span>
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. BACK ID CAMERA VIEWFINDER
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_back_camera" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between bg-slate-950 text-white -m-6 p-6">
          <div className="shrink-0 pb-3 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-white/80 tracking-wide">
              Back of ID
            </span>
            <button
              type="button"
              onClick={() => setFlashActive(!flashActive)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                flashActive ? "bg-amber-400 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>

          {/* Camera Viewport with Corner Brackets */}
          <div className="flex-1 flex flex-col items-center justify-center relative my-2">
            <div className="relative w-full max-w-[320px] h-[200px] rounded-2xl border-2 border-white/20 overflow-hidden flex flex-col justify-between p-3 bg-slate-900/40 backdrop-blur-xs shadow-2xl">
              <div className="absolute top-2 left-2 w-6 h-6 border-t-3 border-l-3 border-[#0891A2] rounded-tl-sm pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-3 border-r-3 border-[#0891A2] rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-3 border-l-3 border-[#0891A2] rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-3 border-r-3 border-[#0891A2] rounded-br-sm pointer-events-none" />

              <div className="w-full h-6 bg-black/80 rounded-xs mb-2 flex items-center justify-center">
                <span className="text-[8px] text-white/40 tracking-widest font-mono">MAGNETIC STRIPE</span>
              </div>

              <div className="space-y-1 px-1">
                <div className="w-full h-1.5 bg-white/25 rounded" />
                <div className="w-3/4 h-1.5 bg-white/25 rounded" />
              </div>

              <div className="bg-black/50 p-1.5 rounded font-mono text-[8px] text-[#0891A2] text-center tracking-wider">
                IDGBR92840188&lt;&lt;&lt;&lt;&lt;&lt;RAY&lt;&lt;JAMES&lt;&lt;&lt;
              </div>

              <div className="text-center text-[10px] text-[#0891A2] font-semibold tracking-wider uppercase">
                Align back inside frame
              </div>
            </div>

            <p className="text-xs text-white/60 mt-4 font-normal">
              Hold steady • Barcode in focus
            </p>
          </div>

          {/* Shutter Button Bar */}
          <div className="shrink-0 flex items-center justify-around pt-2">
            <div className="w-10" />
            <button
              type="button"
              onClick={() => handleShutterClick("id_back_review")}
              className="w-18 h-18 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg cursor-pointer group"
              aria-label="Take Photo"
            >
              <div className="w-13 h-13 rounded-full bg-white group-active:scale-90 transition-transform" />
            </button>
            <div className="w-10" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. BACK ID PHOTO REVIEW / OVERVIEW (Confirm & Retake)
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "id_back_review" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> Back Photo Captured
            </span>
            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4 flex flex-col justify-center">
            <div className="text-center mb-4">
              <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                Review Back Photo
              </h2>
              <p className="text-[12px] text-slate-400 mt-1">
                Ensure barcode and text lines are sharp and legible.
              </p>
            </div>

            {/* Captured Back Photo Preview Card */}
            <div className="w-full max-w-[320px] mx-auto p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl shadow-xl border-2 border-emerald-500/80 relative overflow-hidden my-2">
              <div className="w-full h-7 bg-slate-950 rounded-xs mb-3 -mx-4 px-4 flex items-center">
                <div className="w-full h-1 bg-white/10" />
              </div>

              <div className="flex items-center justify-between py-1 text-[10px]">
                <span className="text-slate-300 font-semibold">HM PASSPORT OFFICE</span>
                <span className="text-emerald-400 font-mono text-[9px]">BARCODE SCANNED ✓</span>
              </div>

              <div className="mt-2.5 p-2 bg-slate-950/80 rounded font-mono text-[8.5px] text-slate-200 leading-snug">
                <div>IDGBR92840188&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                <div>8503095M3212318GBR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;6</div>
                <div>RAY&lt;&lt;JAMES&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
              </div>
            </div>

            <p className="text-center text-[11px] text-emerald-600 font-medium mt-3 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Both sides captured • Ready for selfie match
            </p>
          </div>

          {/* Action Buttons: Retake & Confirm */}
          <div className="shrink-0 pt-3 border-t border-slate-50 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubFlow("id_back_camera")}
              className="flex-1 h-12 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake</span>
            </button>
            <div className="flex-1">
              <Button
                variant="primary"
                onClick={() => {
                  setGovIdDone(true);
                  setSubFlow("selfie_intro");
                }}
                className="h-12 font-semibold text-sm w-full"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. SELFIE INTRODUCTION SCREEN ("Ready to take selfie")
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "selfie_intro" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="shrink-0 pb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Step 2 of 3 • Facial Match
            </span>
            <div className="w-9" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-1 pb-4 flex flex-col justify-between">
            <div>
              <div className="text-center mb-4">
                <span className="text-[11px] font-bold text-[#0891A2] uppercase tracking-wider bg-[#E0F7FA] px-2.5 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Step 2: Facial Verification
                </span>
                <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">
                  Ready to take a selfie
                </h2>
                <p className="text-[12.5px] text-slate-500 mt-1 max-w-[280px] mx-auto">
                  We will compare your selfie with your ID photo to confirm it&apos;s really you.
                </p>
              </div>

              {/* Humanized Friendly Selfie Graphic */}
              <div className="w-full max-w-[220px] mx-auto my-3 relative flex items-center justify-center">
                <div className="w-40 h-48 rounded-[48%] border-4 border-[#0891A2]/30 bg-gradient-to-b from-sky-50 to-cyan-100 flex flex-col items-center justify-center relative shadow-md overflow-hidden">
                  <div className="text-6xl mb-1 select-none">
                    👨‍💼
                  </div>
                  <div className="absolute bottom-2 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full shadow-xs text-[10px] font-bold text-[#0891A2] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ID Match Ready
                  </div>
                </div>
              </div>

              {/* Friendly Tips */}
              <div className="space-y-2 text-left max-w-[320px] mx-auto mt-4">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Look directly into the camera with a neutral expression
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Remove glasses, hats, or face coverings
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-700">
                    Ensure your face is well-lit without strong shadows
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-3 border-t border-slate-50">
            <Button
              variant="primary"
              onClick={() => setSubFlow("selfie_camera")}
              className="h-12 font-semibold text-sm w-full"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. ACTIVE SELFIE CAMERA SCANNER ("Take Photo & Verify")
         ───────────────────────────────────────────────────────────── */}
      {subFlow === "selfie_camera" && (
        <div className="flex-1 min-h-0 flex flex-col justify-between bg-slate-950 text-white -m-6 p-6">
          <div className="shrink-0 pb-3 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-white/80 tracking-wide">
              Selfie Verification
            </span>
            <div className="w-9" />
          </div>

          {/* Oval Biometric Viewfinder */}
          <div className="flex-1 flex flex-col items-center justify-center relative my-2">
            <div className="relative w-full max-w-[280px] h-[300px] rounded-3xl bg-slate-900 overflow-hidden flex items-center justify-center shadow-2xl border border-white/10">
              {/* Oval Frame */}
              <div className="w-[190px] h-[250px] rounded-[50%] border-2 border-[#0891A2] relative flex items-center justify-center overflow-hidden shadow-[0_0_25px_rgba(8,145,162,0.4)]">
                {/* Laser scan sweep */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0891A2] to-transparent shadow-[0_0_10px_#0891A2] animate-pulse opacity-90" />
                <div className="text-7xl select-none opacity-80">
                  👨‍💼
                </div>
              </div>

              {/* Status pill overlay */}
              <div className="absolute bottom-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/15">
                {isVerifyingSelfie
                  ? "Analyzing facial landmarks..."
                  : selfieVerified
                  ? "Face matched with ID ✓"
                  : "Center your face in the oval"}
              </div>
            </div>

            <p className="text-xs text-white/60 mt-4 font-normal">
              Hold still • Looking straight ahead
            </p>
          </div>

          {/* Shutter Button Bar */}
          <div className="shrink-0 pt-3">
            <Button
              variant="primary"
              onClick={handleSelfieVerify}
              isLoading={isVerifyingSelfie}
              className="h-12 font-semibold text-sm w-full flex items-center justify-center gap-2 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              <span>{selfieVerified ? "Verified!" : "Take Photo & Verify"}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
