"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface Step2AddressProps {
  postcode: string;
  setPostcode: (val: string) => void;
  selectedAddress: string;
  setSelectedAddress: (val: string) => void;
}

export function Step2Address({
  postcode,
  setPostcode,
  selectedAddress,
  setSelectedAddress,
}: Step2AddressProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Property Address
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Let tenants know where your property is located.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
            Post code
          </label>
          <div className="relative">
            <select
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="12236">12236 (Armagh)</option>
              <option value="12237">12237 (Warrenpoint)</option>
              <option value="12238">12238 (Newry)</option>
              <option value="BT60 3AB">BT60 3AB</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
            Select your address
          </label>
          <div className="relative">
            <select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="7 Great Georges St N, Warrenpoint.">
                7 Great Georges St N, Warrenpoint.
              </option>
              <option value="Maple Apartments, Unit 3B">
                Maple Apartments, Unit 3B
              </option>
              <option value="Riverside Apartments, 12 Elm St">
                Riverside Apartments, 12 Elm St
              </option>
              <option value="1 Cavanacaw Grange, Armagh">
                1 Cavanacaw Grange, Armagh
              </option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
