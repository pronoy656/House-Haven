"use client";

import React from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { InputField } from "@/components/shared/InputField";

interface Step4PricingProps {
  monthlyRent: number;
  setMonthlyRent: (val: number) => void;
  depositAmount: string;
  setDepositAmount: (val: string) => void;
  leaseDuration: string;
  setLeaseDuration: (val: string) => void;
  availableFrom: string;
  setAvailableFrom: (val: string) => void;
  petPolicy: string;
  setPetPolicy: (val: string) => void;
  ratesOption: string;
  setRatesOption: (val: string) => void;
}

export function Step4Pricing({
  monthlyRent,
  setMonthlyRent,
  depositAmount,
  setDepositAmount,
  leaseDuration,
  setLeaseDuration,
  availableFrom,
  setAvailableFrom,
  petPolicy,
  setPetPolicy,
  ratesOption,
  setRatesOption,
}: Step4PricingProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Pricing &amp; Availability
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Set your rent, deposit, and availability dates.
        </p>
      </div>

      <div className="space-y-2 pt-1">
        <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
          Monthly Rent
        </label>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-slate-900">
            £{monthlyRent.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400">per month</span>
        </div>

        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={monthlyRent}
          onChange={(e) => {
            const val = Number(e.target.value);
            setMonthlyRent(val);
            setDepositAmount(`£${val.toLocaleString()}`);
          }}
          className="w-full accent-[#0891A2] h-2 bg-slate-100 rounded-lg cursor-pointer"
        />
        <span className="text-[11px] text-slate-400 block">
          Range: £100 – £5,000 per month
        </span>
      </div>

      <InputField
        label="Deposit Amount"
        labelClassName="text-xs sm:text-[13px] font-semibold text-slate-700"
        type="text"
        variant="outlined"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Enter deposit amount"
        className="rounded-xl font-semibold"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
            Lease Duration
          </label>
          <div className="relative">
            <select
              value={leaseDuration}
              onChange={(e) => setLeaseDuration(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
              <option value="24 months">24 months</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <InputField
          label="Available From"
          labelClassName="text-xs sm:text-[13px] font-semibold text-slate-700"
          type="text"
          variant="outlined"
          leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          className="rounded-xl font-semibold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
            Pet Policy
          </label>
          <div className="relative">
            <select
              value={petPolicy}
              onChange={(e) => setPetPolicy(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="Pets Allowed">Pets Allowed</option>
              <option value="No Pets">No Pets</option>
              <option value="Cats Only">Cats Only</option>
              <option value="Dogs Only">Dogs Only</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
            Rates
          </label>
          <div className="relative">
            <select
              value={ratesOption}
              onChange={(e) => setRatesOption(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="Tenant pays rates">Tenant pays rates</option>
              <option value="Landlord pays rates">Landlord pays rates</option>
              <option value="Rates included in rent">Rates included in rent</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
