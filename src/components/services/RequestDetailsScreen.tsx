"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Home,
  Calendar,
  FileText,
  Zap,
  MessageSquare,
  ClipboardList,
  User,
  Clock,
  CheckCircle2,
  X,
  ShieldCheck,
  Phone,
  Check,
} from "lucide-react";
import { serviceRequestApi } from "@/lib/api";

interface RequestDetailsScreenProps {
  requestId?: string;
  onBack?: () => void;
  onNavigateToQuote?: () => void;
  onNavigateToDateTime?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToRequests?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

export function RequestDetailsScreen({
  requestId,
  onBack,
  onNavigateToQuote,
  onNavigateToDateTime,
  onNavigateToServices,
  onNavigateToRequests,
  onNavigateToProfile,
}: RequestDetailsScreenProps) {
  const [request, setRequest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.warn("Could not load request from backend:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestId]);

  const displayIssue = request?.issue || "Service Request";
  const displayService = request?.serviceCategory || "General";
  const displayAddress = request?.address || "Address not provided";
  const displayPostcode = request?.postcode || "";
  const displayDate = request?.appointment?.date || "To be scheduled";
  const displayTime = request?.appointment?.time || "";
  const displayDesc = request?.description || "No additional description provided.";
  const displayPrice = request?.quotation?.quotedAmount
    ? `£${request.quotation.quotedAmount}`
    : request?.quotation?.estimatedPrice
    ? `Est. £${request.quotation.estimatedPrice}`
    : "Pending Quote";
  const displayStatus = request?.status || "Pending";
  const quoteStatus = request?.quotation?.status || "pending";
  const photo =
    request?.photos && request.photos.length > 0 ? request.photos[0] : null;

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
      : `${displayService} Specialist`;

  const contractorRating =
    typeof request?.assignedContractor === "object" && request?.assignedContractor?.rating
      ? request.assignedContractor.rating
      : 4.9;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "In Progress":
        return "bg-sky-50 text-sky-700 border-sky-200/80";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="pt-4 pb-3 px-6 shrink-0 z-20 bg-white border-b border-slate-50">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-base font-bold text-slate-900 tracking-tight">
            Request Details
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3.5 text-left px-6 pt-3 pb-4">
        {isLoading ? (
          <div className="py-20 text-center space-y-2">
            <div className="w-8 h-8 mx-auto border-2 border-[#0891A2] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Loading request details from server...</p>
          </div>
        ) : !request ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Request Not Found
            </h3>
            <p className="text-xs text-slate-400 max-w-[220px] mx-auto">
              This request could not be loaded or has been updated.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-2 text-xs font-semibold text-[#0891A2] hover:underline cursor-pointer"
            >
              &larr; Back to My Requests
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-0.5">
              <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
                Service Overview
              </h2>
              {request._id && (
                <span className="text-[11px] font-mono text-slate-400 font-medium">
                  #SR-{String(request._id).slice(-5).toUpperCase()}
                </span>
              )}
            </div>

            {/* Card 1: Issue Summary Card */}
            <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3.5 shadow-2xs">
              {photo ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  <Image
                    src={photo}
                    alt="Uploaded issue"
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[#0891A2]/10 border border-[#0891A2]/20 flex items-center justify-center text-[#0891A2] shrink-0">
                  <Zap className="w-7 h-7 stroke-[2]" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {displayIssue}
                  </h3>
                </div>
                <p className="text-xs font-bold text-[#0891A2] mt-0.5">
                  {displayPrice}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium truncate max-w-[140px]">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Zap className="w-2 h-2 fill-current" />
                    </span>
                    <span className="truncate">{displayService}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                      displayStatus
                    )}`}
                  >
                    {displayStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Address Card */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Service Address</h4>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  {displayAddress}
                </p>
                {displayPostcode && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Postal Code: {displayPostcode}
                  </p>
                )}
              </div>
            </div>

            {/* Card 3: Date & Time Card */}
            <div
              onClick={onNavigateToDateTime}
              className="p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl flex items-start gap-3 shadow-2xs transition-colors cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#0891A2]/10 group-hover:text-[#0891A2] flex items-center justify-center text-slate-600 shrink-0 mt-0.5 transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Appointment Schedule</h4>
                  <span className="text-[10px] text-[#0891A2] font-semibold group-hover:underline">
                    Reschedule
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  {displayDate} {displayTime ? `at ${displayTime}` : ""}
                </p>
              </div>
            </div>

            {/* Card 4: Issue Details Card */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Problem Description</h4>
                <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                  {displayDesc}
                </p>
              </div>
            </div>

            {/* Card 5: Quotation Status Section */}
            {quoteStatus === "received" ? (
              <div
                onClick={onNavigateToQuote}
                className="p-3.5 bg-gradient-to-r from-teal-50/80 to-cyan-50 border border-[#0891A2] rounded-2xl flex items-start justify-between shadow-2xs relative transition-all cursor-pointer group animate-fade-in"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#0891A2] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0891A2] transition-colors">
                        Contractor Quote Ready
                      </h4>
                    </div>
                    <p className="text-[12px] font-bold text-[#0891A2] mt-0.5">
                      Quoted Amount: £{request.quotation?.quotedAmount}
                    </p>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">
                      Tap to review details, accept or decline.
                    </p>
                  </div>
                </div>

                <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                  1
                </span>
              </div>
            ) : quoteStatus === "accepted" ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Quote Accepted</h4>
                  <p className="text-[11.5px] text-emerald-700 mt-0.5">
                    Agreed: £{request.quotation?.quotedAmount}. {contractorName ? "Contractor assigned and dispatched." : "Operations desk is assigning your contractor."}
                  </p>
                </div>
              </div>
            ) : quoteStatus === "declined" ? (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-900">Quote Declined</h4>
                  <p className="text-[11.5px] text-rose-700 mt-0.5">
                    You have declined the quotation for this service.
                  </p>
                </div>
              </div>
            ) : (
              <div
                onClick={onNavigateToQuote}
                className="p-3.5 bg-amber-50/70 border border-amber-200 hover:border-amber-300 rounded-2xl flex items-start justify-between shadow-2xs cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Quotation Pending</h4>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Request submitted. Awaiting admin and contractor quotation.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-[#0891A2] font-semibold mt-1">
                  View Status &rarr;
                </span>
              </div>
            )}

            {/* Card 6: Assigned Contractor Profile Card (Visible when assigned or In Progress) */}
            {contractorName && (
              <div className="p-3.5 bg-gradient-to-br from-blue-50/90 to-sky-50/70 border border-blue-200 rounded-2xl shadow-2xs space-y-2.5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Assigned Contractor
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                    ★ {contractorRating}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-0.5">
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
                      className="px-2.5 py-1.5 bg-[#0891A2] hover:bg-[#067a88] text-white text-[11px] font-semibold rounded-xl flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                </div>

                <div className="pt-2 border-t border-blue-100/80 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Scheduled Arrival:</span>
                  <strong className="text-slate-900 font-semibold">{displayDate} {displayTime ? `· ${displayTime}` : ""}</strong>
                </div>
              </div>
            )}

            {/* Card 7: 4-Step Live Visual Job Stepper */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider">
                  Live Job Status
                </span>
                <span className="text-[10px] font-bold text-[#0891A2]">
                  {displayStatus === "Completed"
                    ? "Completed"
                    : displayStatus === "In Progress"
                    ? "In Progress"
                    : quoteStatus === "accepted"
                    ? "Quote Accepted"
                    : quoteStatus === "received"
                    ? "Quote Ready"
                    : "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
                {/* Step 1: Request */}
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-500 w-full"></div>
                  <span className="text-[9.5px] font-semibold text-slate-700 block">Requested</span>
                </div>
                {/* Step 2: Quoted */}
                <div className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full w-full ${
                      quoteStatus === "received" ||
                      quoteStatus === "accepted" ||
                      displayStatus === "In Progress" ||
                      displayStatus === "Completed"
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  ></div>
                  <span className="text-[9.5px] font-semibold text-slate-700 block">Quoted</span>
                </div>
                {/* Step 3: Assigned / In Progress */}
                <div className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full w-full ${
                      displayStatus === "In Progress" || displayStatus === "Completed"
                        ? "bg-emerald-500"
                        : contractorName
                        ? "bg-amber-400 animate-pulse"
                        : "bg-slate-200"
                    }`}
                  ></div>
                  <span className="text-[9.5px] font-semibold text-slate-700 block">Assigned</span>
                </div>
                {/* Step 4: Completed */}
                <div className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full w-full ${
                      displayStatus === "Completed" ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  ></div>
                  <span className="text-[9.5px] font-semibold text-slate-700 block">Done</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Tab Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium z-20">
        <button
          type="button"
          onClick={onNavigateToServices}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span>Services</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToRequests}
          className="flex flex-col items-center gap-1 text-[#0891A2] font-semibold transition-colors cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 stroke-[2.2]" />
          <span>My Requests</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProfile}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
