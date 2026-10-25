"use client";

import React, { useState } from "react";
import { ArrowLeft, MoreVertical, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

import { PaymentSuccessScreen } from "@/components/tenant/PaymentSuccessScreen";

interface TenantPaymentScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  planTitle?: string;
  planPrice?: string;
}

export function TenantPaymentScreen({
  onBack,
  onSuccess,
  planTitle = "Boost Profile",
  planPrice = "£9.99",
}: TenantPaymentScreenProps) {
  const [cardNumber, setCardNumber] = useState("7124 **** **** 9382");
  const [cardHolder, setCardHolder] = useState("Samuel Tan");
  const [expiry, setExpiry] = useState("07/30");
  const [cvv, setCvv] = useState("482");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 700);
  };

  if (isDone) {
    const cardLast4 = cardNumber.replace(/\D/g, "").slice(-4) || "9382";
    return (
      <PaymentSuccessScreen
        planTitle={planTitle}
        planPrice={planPrice}
        cardLast4={cardLast4}
        onDone={onSuccess}
      />
    );
  }

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Top Header */}
      <div className="shrink-0 px-5 pt-3.5 pb-2 flex items-center justify-between">
        <Button
          variant="icon"
          size="icon-sm"
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </Button>

        <h1 className="text-[18px] font-bold text-slate-900 tracking-tight">
          Payment
        </h1>

        <button
          type="button"
          aria-label="More options"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <MoreVertical className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-5">
        
        {/* Interactive Credit Card Graphic */}
        <div className="relative w-full h-[184px] rounded-3xl p-5 bg-gradient-to-tr from-[#0891A2] via-[#0E7490] to-[#06B6D4] text-white shadow-md flex flex-col justify-between overflow-hidden select-none">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          {/* Top Row: Chip & Mastercard Logo */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Gold SIM Chip */}
            <div className="w-10 h-7 rounded-md bg-amber-300/90 border border-amber-200/60 p-1 flex items-center justify-around shadow-2xs">
              <div className="w-full h-full border border-amber-500/40 rounded-xs flex flex-col justify-between p-0.5">
                <div className="w-full h-[1px] bg-amber-600/40" />
                <div className="w-full h-[1px] bg-amber-600/40" />
              </div>
            </div>

            {/* Mastercard Interlocking Logo */}
            <div className="flex items-center -space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-red-500/90 shadow-xs" />
              <div className="w-6 h-6 rounded-full bg-amber-500/90 shadow-xs" />
            </div>
          </div>

          {/* Center Row: Card Number */}
          <div className="relative z-10 pt-1">
            <span className="text-[8px] uppercase tracking-wider text-white/70 block font-medium">
              Card Number
            </span>
            <div className="text-[17px] font-mono font-semibold tracking-wider text-white drop-shadow-xs">
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
          </div>

          {/* Bottom Row: Holder & Expiry */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[8px] uppercase tracking-wider text-white/70 block font-medium">
                Card Holder
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-white truncate block">
                {cardHolder || "YOUR NAME"}
              </span>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[8px] uppercase tracking-wider text-white/70 block font-medium">
                Expires
              </span>
              <span className="text-xs font-semibold text-white">
                {expiry || "MM/YY"}
              </span>
            </div>
          </div>
        </div>

        {/* Selected Plan Summary Banner */}
        <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              {planTitle}
            </span>
            <span className="text-[11px] text-slate-500">
              Immediate activation upon payment
            </span>
          </div>
          <span className="text-sm font-extrabold text-[#0891A2]">
            {planPrice}
          </span>
        </div>

        {/* Payment Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          
          {/* Card Number */}
          <InputField
            label="Card Number"
            type="text"
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter Card Number"
          />

          {/* Card Holder Name */}
          <InputField
            label="Card Holder Name"
            type="text"
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Enter Card Holder Name"
          />

          {/* Expired & CVV Code Row */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Expired"
              type="text"
              required
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="text-center"
            />

            <InputField
              label="CVV Code"
              type="password"
              required
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              showPasswordToggle={false}
              className="text-center"
            />
          </div>

          {/* Success Notification */}
          {isDone && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Card Authorized! Activating your profile boost...</span>
            </div>
          )}

          {/* Add Card Submit Button */}
          <div className="pt-3 pb-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isProcessing}
              className="h-12 rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-sm shadow-xs"
            >
              Add Card
            </Button>
          </div>

        </form>

      </div>

    </div>
  );
}
