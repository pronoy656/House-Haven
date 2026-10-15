"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";

interface LandlordAddressScreenProps {
  onBack?: () => void;
  onContinue?: (data: { postcode: string; address: string }) => void;
  showStatusBar?: boolean;
}

export function LandlordAddressScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: LandlordAddressScreenProps) {
  const [postcode, setPostcode] = useState("12236");
  const [selectedAddress, setSelectedAddress] = useState(
    "1 Cavanacaw Grange, Armagh, BT62FU"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const addressOptions = [
    "1 Cavanacaw Grange, Armagh, BT62FU",
    "2 Cavanacaw Grange, Armagh, BT62FU",
    "3 Cavanacaw Grange, Armagh, BT62FU",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContinue) {
      onContinue({ postcode, address: selectedAddress });
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
            Step 3 of 6
          </span>
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-3/6 h-full bg-[#0891A2] rounded-full transition-all duration-300" />
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
              Address Information
            </h1>
            <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 font-normal">
              Let tenants know where you&apos;re based.
            </p>
          </div>

        <div className="space-y-4">
          {/* Post Code */}
          <div className="space-y-1.5 text-left">
            <label className="text-[12px] font-medium text-slate-600 block">
              Post code
            </label>
            <div className="relative">
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Select your address */}
          <div className="space-y-1.5 text-left relative">
            <label className="text-[12px] font-medium text-slate-600 block">
              Select your address
            </label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-700 text-[13px] flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all"
            >
              <span className="truncate">
                {selectedAddress || "Select address"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Address Dropdown Options as shown in the screenshot */}
            {isDropdownOpen && (
              <div className="w-full mt-2 rounded-2xl border border-slate-100 bg-white shadow-xs p-2 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                {addressOptions.map((addr, idx) => {
                  const isSelected = selectedAddress === addr;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedAddress(addr);
                      }}
                      className={`w-full py-3 px-3 text-left text-[12px] sm:text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? "font-semibold text-slate-900 bg-slate-50"
                          : "font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                      }`}
                    >
                      {addr}
                    </button>
                  );
                })}
              </div>
            )}
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
