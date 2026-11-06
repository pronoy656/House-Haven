"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  Send,
  CheckCircle2,
  X,
  Clock,
  ShieldCheck,
  AlertCircle,
  Zap,
  Phone,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import Image from "next/image";
import { serviceRequestApi } from "@/lib/api";

interface ServiceQuoteScreenProps {
  requestId?: string;
  onBack?: () => void;
  onAcceptQuote?: () => void;
  onDeclineQuote?: () => void;
  showStatusBar?: boolean;
}

export function ServiceQuoteScreen({
  requestId,
  onBack,
  onAcceptQuote,
  onDeclineQuote,
}: ServiceQuoteScreenProps) {
  const [request, setRequest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [userMessages, setUserMessages] = useState<
    { id: number; text: string; time: string }[]
  >([]);

  useEffect(() => {
    if (!requestId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    serviceRequestApi
      .getRequestDetails(requestId)
      .then((data) => {
        if (data) {
          setRequest(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load quote details:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestId]);

  const handleAccept = async () => {
    if (!requestId) return;
    setIsUpdating(true);
    try {
      await serviceRequestApi.updateQuoteStatus(requestId, {
        status: "accepted",
      });
      setRequest((prev: any) =>
        prev
          ? {
              ...prev,
              quotation: { ...prev.quotation, status: "accepted" },
            }
          : prev
      );
      setActionFeedback("Quote accepted! The contractor has been scheduled.");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("serviceRequestsUpdated"));
      }
      setTimeout(() => {
        if (onAcceptQuote) onAcceptQuote();
      }, 1200);
    } catch (err: any) {
      console.warn("Could not accept quote:", err);
      setActionFeedback("Could not update quote on server. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecline = async () => {
    if (!requestId) return;
    setIsUpdating(true);
    try {
      await serviceRequestApi.updateQuoteStatus(requestId, {
        status: "declined",
      });
      setRequest((prev: any) =>
        prev
          ? {
              ...prev,
              quotation: { ...prev.quotation, status: "declined" },
            }
          : prev
      );
      setActionFeedback("Quote declined.");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("serviceRequestsUpdated"));
      }
      setTimeout(() => {
        if (onDeclineQuote) onDeclineQuote();
      }, 1200);
    } catch (err: any) {
      console.warn("Could not decline quote:", err);
      setActionFeedback("Could not update quote on server. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setUserMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setChatInput("");
  };

  const category = request?.serviceCategory || "General Service";
  const issue = request?.issue || "Service Request";
  const address = request?.address || "Address not provided";
  const photo =
    request?.photos && request.photos.length > 0 ? request.photos[0] : null;
  const quoteStatus = request?.quotation?.status || "pending";
  const quotedAmount = request?.quotation?.quotedAmount;
  const estimatedPrice = request?.quotation?.estimatedPrice;
  const quoteNotes = request?.quotation?.quoteNotes;
  const appointmentDate = request?.appointment?.date;
  const appointmentTime = request?.appointment?.time;
  const submittedDate = request?.createdAt
    ? new Date(request.createdAt).toLocaleDateString()
    : "Recently";

  const contractorName =
    typeof request?.assignedContractor === "object" && request?.assignedContractor?.name
      ? request.assignedContractor.name
      : typeof request?.assignedContractor === "string"
      ? request.assignedContractor
      : null;

  const contractorPhone =
    typeof request?.assignedContractor === "object" && request?.assignedContractor?.phone
      ? request.assignedContractor.phone
      : "+44 28 9012 3456";

  const contractorTrade =
    typeof request?.assignedContractor === "object" && request?.assignedContractor?.trade
      ? request.assignedContractor.trade
      : `${category} Specialist`;

  const contractorRating =
    typeof request?.assignedContractor === "object" && request?.assignedContractor?.rating
      ? request.assignedContractor.rating
      : 4.9;

  const isQuoteReady =
    quoteStatus === "received" ||
    (typeof quotedAmount === "number" && quotedAmount > 0 && quoteStatus !== "pending");

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 shrink-0 z-20 bg-white flex items-center justify-between border-b border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-base font-bold text-slate-900 tracking-tight">
          Service Quotation
        </h1>

        <div className="w-9"></div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className="mx-5 mt-2.5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 shadow-xs animate-fade-in z-30">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3.5 space-y-3.5 text-left">
        {isLoading ? (
          <div className="py-24 text-center space-y-2">
            <div className="w-8 h-8 mx-auto border-2 border-[#0891A2] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Loading quotation details from server...</p>
          </div>
        ) : !request ? (
          <div className="py-20 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Request Not Found</h3>
            <p className="text-xs text-slate-500">
              Could not load the quotation details for this request.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-[#0891A2] hover:underline cursor-pointer"
            >
              &larr; Back
            </button>
          </div>
        ) : (
          <>
            {/* Real Service Request Summary Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-3 shadow-2xs">
              {photo ? (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-slate-300">
                  <Image
                    src={photo}
                    alt="Problem issue photo"
                    fill
                    sizes="56px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-[#0891A2]/10 border border-[#0891A2]/20 flex items-center justify-center text-[#0891A2] shrink-0">
                  <Zap className="w-6 h-6 stroke-[2]" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0891A2] bg-[#0891A2]/10 px-2 py-0.5 rounded-md">
                    {category}
                  </span>
                  {request._id && (
                    <span className="text-[10px] font-mono text-slate-400">
                      #SR-{String(request._id).slice(-5).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-900 truncate mt-1">
                  {issue}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {address}
                </p>
              </div>
            </div>

            {/* QUOTATION STATUS DISPLAY (DYNAMIC) */}
            {quoteStatus === "accepted" ? (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-sm font-bold text-emerald-950">
                        Quote Accepted
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                      Agreed: £{quotedAmount}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    You accepted the quotation of <strong>£{quotedAmount}</strong>. {contractorName ? "Your certified contractor has been scheduled and dispatched." : "Operations desk is assigning your specialist."}
                    {appointmentDate ? ` Target arrival on ${appointmentDate}` : ""}
                    {appointmentTime ? ` at ${appointmentTime}` : ""}.
                  </p>
                </div>

                {/* Assigned Contractor Card */}
                {contractorName && (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-2xl shadow-2xs space-y-2.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-blue-600" />
                        Assigned Specialist
                      </span>
                      <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                        ★ {contractorRating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-0.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#0891A2] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                          {contractorName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{contractorName}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">{contractorTrade}</p>
                        </div>
                      </div>

                      {contractorPhone && (
                        <a
                          href={`tel:${contractorPhone}`}
                          className="px-3 py-1.5 bg-[#0891A2] hover:bg-[#067a88] text-white text-[11px] font-semibold rounded-xl flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : quoteStatus === "declined" ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-rose-600" />
                    <h3 className="text-sm font-bold text-rose-950">
                      Quote Declined
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                    Declined
                  </span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  You declined the quotation for this service request. If you need assistance or a revised quote, please submit a new request or message our support.
                </p>
              </div>
            ) : isQuoteReady ? (
              /* ACTIVE QUOTE RECEIVED READY FOR ACCEPT/DECLINE */
              <div className="bg-[#F8FAFC] border-2 border-[#0891A2] rounded-3xl p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#0891A2] uppercase tracking-wider block">
                      Contractor Quote Received
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Ready for Approval
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 uppercase">
                    Action Needed
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Official Quoted Price:</span>
                    <span className="text-lg font-extrabold text-[#0891A2]">
                      £{quotedAmount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Target Appointment:</span>
                    <span className="font-semibold text-slate-800">
                      {appointmentDate || "To be confirmed"} {appointmentTime ? `at ${appointmentTime}` : ""}
                    </span>
                  </div>
                  {quoteNotes && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                        Technician Notes:
                      </span>
                      <p className="text-[11.5px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {quoteNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Accept / Decline Action Buttons */}
                <div className="space-y-2 pt-1">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleAccept}
                    isLoading={isUpdating}
                    className="h-11 font-semibold text-xs tracking-wide cursor-pointer shadow-xs"
                  >
                    Accept Quote (£{quotedAmount})
                  </Button>

                  <button
                    type="button"
                    onClick={handleDecline}
                    disabled={isUpdating}
                    className="w-full h-10 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Decline Quote
                  </button>
                </div>
              </div>
            ) : (
              /* REAL PENDING QUOTATION STATUS (AWAITING ADMIN / CONTRACTOR QUOTE) */
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Quotation Status
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        Awaiting Contractor Quote
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                    Pending
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-amber-100 rounded-2xl text-xs space-y-2 text-slate-600">
                  <p className="text-[11.5px] text-slate-700 leading-relaxed">
                    Your request for <strong>{issue}</strong> has been logged into the system. The House Haven operations desk is assigning a certified technician to inspect the problem and calculate an itemized price.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Submitted On:</span>
                    <strong className="text-slate-800">{submittedDate}</strong>
                  </div>
                  {estimatedPrice && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Client Estimated Budget:</span>
                      <strong className="text-[#0891A2]">
                        {estimatedPrice.startsWith("£") ? estimatedPrice : `£${estimatedPrice}`}
                      </strong>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Turnaround Time:</span>
                    <span className="text-amber-700 font-semibold">
                      Typically 2–4 hours
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/70 border border-amber-100 rounded-2xl flex items-center gap-2 text-[11px] text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Once the quote is prepared, you will receive an alert to review and approve the final price.
                  </span>
                </div>
              </div>
            )}

            {/* Live Message Thread / Audit Trail */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight pl-1">
                Activity &amp; Communications
              </h4>

              {/* Message 1: System / Client Submission */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  You
                </div>
                <div className="bg-[#0891A2] text-white p-3 rounded-2xl rounded-tl-xs text-xs shadow-2xs max-w-[270px]">
                  <p className="font-semibold">{issue}</p>
                  <p className="text-[10px] text-white/80 mt-1">
                    Submitted request for {category} on {submittedDate}.
                  </p>
                </div>
              </div>

              {/* Message 2: Operations Response */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#0891A2] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  HH
                </div>
                <div className="bg-slate-100 border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-xs text-xs shadow-2xs max-w-[270px] space-y-1">
                  <p className="font-semibold text-slate-900 text-[11.5px]">
                    House Haven Operations
                  </p>
                  {isQuoteReady ? (
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      We have reviewed your request and generated an official quote of <strong>£{quotedAmount}</strong>. Please review and accept or decline.
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      We have received your service request for {address}. Our team is verifying contractor availability and preparing your quote.
                    </p>
                  )}
                  <span className="text-[9px] text-slate-400 block pt-0.5">
                    {submittedDate}
                  </span>
                </div>
              </div>

              {/* User Dynamic Chat Messages */}
              {userMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2.5 justify-end">
                  <div className="bg-[#0891A2] text-white p-3 rounded-2xl rounded-tr-xs text-xs shadow-2xs max-w-[270px]">
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-white/70 block pt-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    You
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Chat Message Input Form */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <InputField
            type="text"
            variant="outlined"
            placeholder="Type note or question..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 text-xs"
          />

          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="w-10 h-10 rounded-2xl bg-[#0891A2] disabled:opacity-40 hover:bg-[#077a88] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
