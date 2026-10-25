"use client";

import React, { useState } from "react";
import { ArrowLeft, Calendar, ChevronDown, UploadCloud } from "lucide-react";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

interface LandlordPersonalInfoScreenProps {
  onBack?: () => void;
  onContinue?: (data: {
    fullName: string;
    dob: string;
    gender: string;
    description: string;
  }) => void;
  showStatusBar?: boolean;
}

export function LandlordPersonalInfoScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: LandlordPersonalInfoScreenProps) {
  const [fullName, setFullName] = useState("James Ray");
  const [dob, setDob] = useState("09/3/1985");
  const [gender, setGender] = useState("Male");
  const [description, setDescription] = useState(
    "I'm a property owner passionate about providing safe, clean, and comfortable homes for tenants."
  );
  const [photoSelected, setPhotoSelected] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContinue) {
      onContinue({ fullName, dob, gender, description });
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
            Step 1 of 6
          </span>
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-1/6 h-full bg-[#0891A2] rounded-full transition-all duration-300" />
          </div>
        </div>

        <div className="w-9" />
      </div>

      {/* Main Content Form */}
      <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 pt-1 pb-4">
          {/* Title & Subtitle */}
          <div className="text-center mb-5">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
              Personal Information
            </h1>
            <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 font-normal">
              Tell us a bit about yourself.
            </p>
          </div>

        <div className="space-y-4">
          {/* Photo Upload Box */}
          <div className="w-full bg-[#F8FAFC] border border-slate-100/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center">
            <button
              type="button"
              onClick={() => setPhotoSelected(!photoSelected)}
              className="w-16 h-16 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] flex flex-col items-center justify-center transition-all cursor-pointer shadow-xs group"
            >
              <UploadCloud className="w-6 h-6 stroke-[2.2] group-hover:scale-105 transition-transform" />
              <span className="text-[9.5px] font-bold mt-0.5">
                {photoSelected ? "Uploaded" : "Add photo"}
              </span>
            </button>
            <p className="text-[11px] text-slate-400 mt-3 font-normal">
              Required • One clear profile portrait.
            </p>
          </div>

          {/* Full Name */}
          <InputField
            label="Full Name"
            type="text"
            variant="filled"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="bg-[#F8FAFC] border-slate-100 text-xs sm:text-[13px] rounded-xl h-11"
          />

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            type="text"
            variant="filled"
            leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="09/3/1985"
            className="bg-[#F8FAFC] border-slate-100 text-xs sm:text-[13px] rounded-xl h-11"
          />

          {/* Gender */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white appearance-none cursor-pointer transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[12.5px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all resize-none"
            />
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
