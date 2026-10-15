"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MobileStatusBar } from "./MobileStatusBar";
import { Button } from "./ui/Button";

interface SplashScreenProps {
  onSignUp?: () => void;
  onSignIn?: () => void;
  onSlideChange?: (slide: 1 | 2) => void;
  initialSlide?: 1 | 2;
  showStatusBar?: boolean;
}

export function SplashScreen({
  onSignUp,
  onSignIn,
  onSlideChange,
  initialSlide = 1,
  showStatusBar = true,
}: SplashScreenProps) {
  // Slide 1: "Manage with Ease" (with "Get Started" button)
  // Slide 2: "Find Better Tenants, Landlord Faster" (with "Sign Up" & "Sign in" buttons)
  const [currentSlide, setCurrentSlide] = useState<1 | 2>(initialSlide);

  useEffect(() => {
    setCurrentSlide(initialSlide);
  }, [initialSlide]);

  const handleGoToSlide2 = () => {
    setCurrentSlide(2);
    if (onSlideChange) onSlideChange(2);
  };

  const handleGoToSlide1 = () => {
    setCurrentSlide(1);
    if (onSlideChange) onSlideChange(1);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] flex flex-col justify-between overflow-hidden text-white select-none bg-slate-950">
      {/* Background Image with Ambient Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentSlide === 1 ? "/splash-villa-luxury.jpg" : "/splash-building.jpg"}
          alt="House Haven Atmosphere"
          fill
          priority
          className="object-cover transition-all duration-700 ease-in-out scale-100"
        />
        {/* Subtle Top Vignette Overlay for logo readability */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>
        {/* Bottom Dark Gradient Overlay focused precisely behind text & buttons */}
        <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none"></div>
      </div>

      {/* Top Branding Section */}
      <div className="shrink-0 relative z-10 px-6 pt-5 pb-2 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <Image
            src="/logo-2.png"
            alt="House Haven"
            width={78}
            height={78}
            className="w-[72px] sm:w-[78px] h-auto object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <button
            type="button"
            onClick={handleGoToSlide1}
            aria-label="Slide 1 - Manage with Ease"
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === 1 ? "w-5 bg-[#0891A2]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
          <button
            type="button"
            onClick={handleGoToSlide2}
            aria-label="Slide 2 - Find Better Tenants"
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === 2 ? "w-5 bg-[#0891A2]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        </div>
      </div>

      {/* Spacer to push content down nicely */}
      <div className="flex-1 min-h-0" />

      {/* Bottom Content Area - Fixed within viewport */}
      <div className="shrink-0 relative z-10 px-6 pb-6 pt-2 flex flex-col justify-end">
        {currentSlide === 1 ? (
          /* Slide 1: Manage with Ease (First Screen) */
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2.5">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight leading-[1.16]">
                Manage
                <br />
                with Ease
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed pr-2">
                Track applications, schedule viewings, handle maintenance and communicate with tenants effortlessly.
              </p>
            </div>

            {/* Get Started Button advances to Slide 2 */}
            <div className="pt-1">
              <Button
                variant="primary"
                onClick={handleGoToSlide2}
                className="h-12 text-sm font-semibold tracking-wide border-0 outline-none"
              >
                Get Started
              </Button>
            </div>
          </div>
        ) : (
          /* Slide 2: Find Better Tenants, Landlord Faster (Second Screen) */
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2.5">
              <h1 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight leading-[1.18]">
                Find Better Tenants,
                <br />
                Landlord Faster
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed pr-2">
                List your properties, review applications and manage everything in one place — all from your phone.
              </p>
            </div>

            {/* Slide 2 Buttons: Sign Up & Sign in */}
            <div className="space-y-3 pt-1">
              <Button
                variant="primary"
                onClick={onSignUp}
                className="h-12 text-sm font-semibold tracking-wide border-0 outline-none shadow-none"
              >
                Sign Up
              </Button>
              <Button
                variant="secondary"
                onClick={onSignIn}
                className="h-12 text-sm font-semibold tracking-wide border border-[#0891A2] text-[#0891A2] hover:bg-[#0891A2]/10"
              >
                Sign in
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
