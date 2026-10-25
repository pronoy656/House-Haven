"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";

interface SelectAddressScreenProps {
  onBack?: () => void;
  onContinue?: (addressData: { postcode: string; address: string }) => void;
  showStatusBar?: boolean;
}

export function SelectAddressScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: SelectAddressScreenProps) {
  const [postcode, setPostcode] = useState("12236");
  const [address, setAddress] = useState("Rock Rd, Armagh, UK, BT60 3AB");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onContinue) {
        onContinue({
          postcode: postcode || "12236",
          address: address || "Rock Rd, Armagh, UK, BT60 3AB",
        });
      }
    }, 300);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header */}
      <div className="shrink-0 pb-3">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Select Address
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleContinue} className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-5 pt-1 pb-4">
          {/* Post code */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Post code
            </label>
            <div className="relative">
              <select
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full h-13 px-5 pr-10 bg-[#F4F6F9] text-slate-900 text-sm rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 outline-none transition-all cursor-pointer"
              >
                <option value="12236">12236</option>
                <option value="BT60 3AB">BT60 3AB (Armagh)</option>
                <option value="BT1 1AA">BT1 1AA (Belfast)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Select your address */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Select your address
            </label>
            <div className="relative">
              <select
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-13 px-5 pr-10 bg-[#F4F6F9] text-slate-900 text-sm rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 outline-none transition-all cursor-pointer"
              >
                <option value="Rock Rd, Armagh, UK, BT60 3AB">Rock Rd, Armagh, UK, BT60 3AB</option>
                <option value="14 Victoria Street, Apartment 2B">14 Victoria Street, Apartment 2B</option>
                <option value="28 High Street, Flat 4">28 High Street, Flat 4</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom Continue Button */}
        <div className="shrink-0 pt-3 border-t border-slate-50">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="h-12 font-semibold text-sm tracking-wide"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
