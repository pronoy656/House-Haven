"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, ChevronDown, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileStatusBar } from "@/components/MobileStatusBar";
import Image from "next/image";

interface TenantProfileScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
  showStatusBar?: boolean;
}

export function TenantProfileScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: TenantProfileScreenProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("12236");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onContinue) {
        onContinue();
      }
    }, 400);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header with Back button and Step Progress - Fixed/Sticky */}
      <div className="shrink-0 z-20 bg-white pb-3">
        <div className="relative flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Step 1 of 2 indicator with progress bar */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-slate-400 mb-1.5">
              Step 1 of 2
            </span>
            <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden flex">
              <div className="w-1/2 h-full bg-[#0891A2] rounded-full"></div>
            </div>
          </div>

          {/* Spacer */}
          <div className="w-9"></div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mt-3">
          <h1 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
            Tenant Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Complete your personal information.
          </p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
        {/* Scrollable Form Fields */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 pr-0.5">
          {/* Profile Photo Card */}
          <div className="bg-[#F4F7FB] rounded-2xl p-3">
          <div className="bg-white rounded-xl py-6 flex flex-col items-center justify-center shadow-xs border border-slate-100/60">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
            {photoPreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#0891A2] cursor-pointer group"
              >
                <Image
                  src={photoPreview}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Change
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-[#E5F0FA] flex flex-col items-center justify-center cursor-pointer hover:bg-[#d8e8f7] transition-colors"
              >
                <UploadCloud className="w-7 h-7 text-slate-600 mb-0.5" />
                <span className="text-[11px] font-semibold text-[#2B7FFF]">
                  Add photo
                </span>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pl-1 font-normal">
            Required · One clear profile portrait.
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3 pt-1">
          {/* Date of birth */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Date of birth
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Select date"
              className="w-full h-12 px-5 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all"
            />
          </div>

          {/* Phone number */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full h-12 px-5 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all"
            />
          </div>

          {/* Post code */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Post code
            </label>
            <div className="relative">
              <select
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full h-12 px-5 pr-10 bg-[#F4F6F9] text-slate-900 rounded-2xl text-sm appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all cursor-pointer"
              >
                <option value="12236">12236</option>
                <option value="BT1 1AA">BT1 1AA (Belfast)</option>
                <option value="SW1A 1AA">SW1A 1AA (London)</option>
                <option value="M1 1AE">M1 1AE (Manchester)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Select your address */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Select your address
            </label>
            <div className="relative">
              <select
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-12 px-5 pr-10 bg-[#F4F6F9] text-slate-900 rounded-2xl text-sm appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 outline-none transition-all cursor-pointer"
              >
                <option value="">Select address</option>
                <option value="14 Victoria Street, Apartment 2B">14 Victoria Street, Apartment 2B</option>
                <option value="28 High Street, Flat 4">28 High Street, Flat 4</option>
                <option value="105 Kingsway Road">105 Kingsway Road</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button - Fixed Sticky at Bottom */}
      <div className="shrink-0 z-20 pt-3">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="h-12 text-sm font-semibold tracking-wide border-0 shadow-none outline-none"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
