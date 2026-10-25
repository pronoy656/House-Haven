"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  Calendar as CalendarIcon,
  Send,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { Badge } from "@/components/shared/Badge";
import { Avatar } from "@/components/shared/Avatar";
import { AgreementItem, ChatMessage } from "./types";

export interface AgreementDetailsViewProps {
  agreement: AgreementItem;
  chatMessages: ChatMessage[];
  chatInput: string;
  onChatInputChange: (text: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
  onNavigateToNotifications: () => void;
  onReviewAndSign: () => void;
  onViewAgreementDoc: () => void;
  onOpenReviewModal: () => void;
}

export function AgreementDetailsView({
  agreement,
  chatMessages,
  chatInput,
  onChatInputChange,
  onSendMessage,
  onBack,
  onNavigateToNotifications,
  onReviewAndSign,
  onViewAgreementDoc,
  onOpenReviewModal,
}: AgreementDetailsViewProps) {
  const isPending = agreement.status === "Pending Signature";
  const isSigned = agreement.status === "Signed";
  const isSignedEnd =
    agreement.status === "Signed End" || agreement.status === "Under Review";

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-200">
      {/* Reusable Header */}
      <ScreenHeader
        title="Agreements Details"
        onBack={onBack}
        rightAction={
          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
        }
        className="px-4 pt-3 pb-2"
      />

      <div className="p-4 pb-6 flex-1 flex flex-col">
        {/* Hero Property Interior Image */}
        <div className="w-full h-48 rounded-2xl overflow-hidden relative mb-3 bg-slate-900 shadow-xs border border-slate-100">
          <Image
            src="/great-georges-interior.jpg"
            alt="Riverside Apartments Luxury Living Room"
            fill
            sizes="(max-width: 480px) 100vw, 440px"
            className="object-cover"
            priority
          />
        </div>

        {/* Property Title & Address */}
        <div className="flex items-start gap-2.5 mb-3.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
              {agreement.title}
            </h2>
            <p className="text-[11.5px] text-slate-400 mt-0.5">
              {agreement.address}
            </p>
          </div>
        </div>

        {/* Landlord Profile Row */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <Avatar
            src="/john-wick-avatar.jpg"
            alt="John Wick"
            size="sm"
          />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wide">
              Landlord
            </p>
            <h3 className="text-xs font-bold text-slate-800">John Wick</h3>
          </div>
        </div>

        {/* CASE A: PENDING SIGNATURE */}
        {isPending && (
          <>
            {/* 3 Lease Terms Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                  <p className="text-xs font-bold text-slate-800">12 Months</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                  <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 col-span-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                  <p className="text-xs font-bold text-slate-800">£1,850</p>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-xs font-bold text-slate-800">Status</span>
              <Badge variant="warning" size="xs">Pending Signature</Badge>
            </div>

            {/* Landlord Chat Box */}
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs mb-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <Avatar
                  src="/john-wick-avatar.jpg"
                  alt="Landlord Test"
                  size="xs"
                  isOnline
                />
                <div className="flex-1">
                  <p className="text-[11.5px] font-bold text-slate-800 leading-tight">
                    Landlord Test
                  </p>
                  <span className="text-[9.5px] text-emerald-600 font-medium">Online Now</span>
                </div>
              </div>

              <div className="py-2.5 space-y-2 max-h-36 overflow-y-auto no-scrollbar">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "tenant" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] text-[11px] p-2 rounded-xl leading-relaxed shadow-2xs ${
                        msg.sender === "tenant"
                          ? "bg-teal-50 text-slate-800 rounded-tr-xs border border-teal-100"
                          : "bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <InputField
                  type="text"
                  variant="outlined"
                  inputSize="sm"
                  value={chatInput}
                  onChange={(e) => onChatInputChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
                  placeholder="Type a message..."
                  containerClassName="flex-1"
                  className="rounded-full bg-slate-50 border-slate-200/80"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="icon-xs"
                  onClick={onSendMessage}
                  className="w-7 h-7 shrink-0 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Review & Sign Button */}
            <div className="mt-auto pt-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={onReviewAndSign}
              >
                Review & Sign
              </Button>
            </div>
          </>
        )}

        {/* CASE B: SIGNED */}
        {isSigned && (
          <>
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                  <p className="text-xs font-bold text-slate-800">12 Months</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                  <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                  <p className="text-xs font-bold text-slate-800">£1,850</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Year Built</p>
                  <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-slate-800">Status</span>
              <Badge variant="success" size="xs">Signed</Badge>
            </div>

            <div className="mt-auto pt-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={onViewAgreementDoc}
              >
                View Agreement
              </Button>
            </div>
          </>
        )}

        {/* CASE C: SIGNED END / UNDER REVIEW */}
        {isSignedEnd && (
          <>
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                  <p className="text-xs font-bold text-slate-800">12 Months</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                  <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                  <p className="text-xs font-bold text-slate-800">£1,850</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                  <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Year Built</p>
                  <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-slate-800">Status</span>
              <Badge variant="warning" size="xs">Pending Signature</Badge>
            </div>

            <div className="mt-auto pt-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={onOpenReviewModal}
              >
                Give Landlord Review
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
