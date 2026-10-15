"use client";

import React, { useState } from "react";
import { ArrowLeft, Bell, Plus, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { MobileStatusBar } from "./MobileStatusBar";
import Image from "next/image";

interface ServiceQuoteScreenProps {
  onBack?: () => void;
  onAcceptQuote?: () => void;
  onDeclineQuote?: () => void;
  showStatusBar?: boolean;
}

export function ServiceQuoteScreen({
  onBack,
  onAcceptQuote,
  onDeclineQuote,
  showStatusBar = true,
}: ServiceQuoteScreenProps) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "contractor",
      type: "card",
      title: "Electrical service",
      address: "Rock Rd, Armagh",
      caption: "Electrical service quote requested.",
    },
    {
      id: 2,
      sender: "user",
      type: "text",
      text: "Quote received. Review details.",
    },
    {
      id: 3,
      sender: "contractor",
      type: "text",
      text: "Quote ready to review.",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        type: "text",
        text: chatInput.trim(),
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">
      {/* Top Header */}
      <div className="px-5 pt-2 pb-3 shrink-0 z-20 bg-white flex items-center justify-between border-b border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-base font-bold text-slate-900 tracking-tight">
          Service Quote
        </h1>

        <button
          type="button"
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages and Quote Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-4 space-y-4 text-left">
        {/* Message 1: Contractor request card */}
        <div className="flex items-start gap-2.5">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
            <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-[10px] text-white font-bold">
              ES
            </div>
          </div>

          {/* Card Bubble */}
          <div className="flex-1 bg-[#F4F9FD] border border-sky-100 rounded-2xl p-3 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800 relative">
                <Image
                  src="/splash-building.jpg"
                  alt="Property"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Electrical service
                </h4>
                <p className="text-[10px] text-slate-400">Rock Rd, Armagh</p>
              </div>
            </div>
            <p className="text-[11.5px] text-slate-600 pt-2 font-normal">
              Electrical service quote requested.
            </p>
          </div>
        </div>

        {/* Message 2: Admin/User right aligned */}
        <div className="flex items-end justify-end gap-2">
          <div className="bg-white border border-slate-200 text-slate-800 px-3.5 py-2 rounded-2xl rounded-br-xs text-xs shadow-2xs max-w-[240px]">
            Quote received. Review details.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#6B21A8] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            MR
          </div>
        </div>

        {/* Message 3: Contractor response */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
            <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-[10px] text-white font-bold">
              ES
            </div>
          </div>
          <div className="bg-[#F4F9FD] border border-sky-100 text-slate-800 px-3.5 py-2 rounded-2xl rounded-tl-xs text-xs shadow-2xs max-w-[240px]">
            Quote ready to review.
          </div>
        </div>

        {/* Dynamic messages */}
        {messages.slice(3).map((m) => (
          <div key={m.id} className="flex items-end justify-end gap-2">
            <div className="bg-white border border-slate-200 text-slate-800 px-3.5 py-2 rounded-2xl text-xs shadow-2xs max-w-[240px]">
              {m.text}
            </div>
            <div className="w-7 h-7 rounded-full bg-[#6B21A8] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              MR
            </div>
          </div>
        ))}

        {/* Service Quote Summary Card */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-5 shadow-2xs mt-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Service Quote
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 font-normal">
            Scope of work: electrical service
          </p>
          <p className="text-xs text-slate-600 mt-1 font-normal">
            Quoted price: £250
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            type="button"
            variant="primary"
            onClick={onAcceptQuote}
            className="h-12 font-semibold text-sm tracking-wide"
          >
            Accept Quote
          </Button>

          <button
            type="button"
            onClick={onDeclineQuote}
            className="w-full h-12 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Decline Quote
          </button>
        </div>
      </div>

      {/* Bottom Chat Input Bar */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            aria-label="Add attachment"
          >
            <Plus className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder=""
            className="flex-1 h-10 px-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
          />

          <button
            type="submit"
            className="w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
