"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  UploadCloud,
  X,
  Zap,
  Home,
  Calendar,
  FileText,
  Check,
} from "lucide-react";
import { MobileContainer } from "@/components/MobileContainer";
import { ChooseDateTimeScreen } from "@/components/services/ChooseDateTimeScreen";
import { Button } from "@/components/ui/Button";


function ServiceBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "Lighting";

  // Flow steps: 'form' -> 'datetime' -> 'review' -> 'success'
  const [step, setStep] = useState<"form" | "datetime" | "review" | "success">("form");

  // Form inputs - clean & empty by default as requested
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("Rock Rd, Armagh, UK, BT60 3AB");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [quoted, setQuoted] = useState("$75–$100");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Appointment states
  const [appointment, setAppointment] = useState({
    date: "March 15, 2025",
    time: "10:00 AM",
  });

  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("datetime");
  };

  // -------------------------------------------------------------
  // STEP 1: Combined Address & Problem Screen (Clean & Minimal)
  // -------------------------------------------------------------
  if (step === "form") {
    return (
      <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden font-sans">
        {/* Top Header */}
        <div className="pt-2 pb-3 shrink-0 z-20 bg-white">
          <div className="relative flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/services?role=service")}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Request Service
            </h1>

            <div className="w-9" />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 min-h-0 flex flex-col justify-between">
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 text-left pt-1 pb-4">
            {/* Post code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Post code
              </label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter post code (e.g. 12236)"
                className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
              />
            </div>

            {/* Select your address (Dropdown) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Select your address
              </label>
              <div className="relative">
                <select
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-12 px-4 pr-10 bg-white border border-slate-200 text-slate-900 text-sm rounded-2xl appearance-none focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all cursor-pointer"
                >
                  <option value="Rock Rd, Armagh, UK, BT60 3AB">Rock Rd, Armagh, UK, BT60 3AB</option>
                  <option value="14 Victoria Street, Apartment 2B">14 Victoria Street, Apartment 2B</option>
                  <option value="28 High Street, Flat 4">28 High Street, Flat 4</option>
                  <option value="122 Oxford Road, Manchester">122 Oxford Road, Manchester</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Issue Name (Empty by default) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Issue
              </label>
              <input
                type="text"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder={`e.g. ${service} problem in house`}
                className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
              />
            </div>

            {/* Issue Detailed Description (Empty by default) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Issue Detailed Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full p-4 border border-slate-200 rounded-2xl text-xs text-slate-700 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all leading-relaxed resize-none"
              />
            </div>

            {/* Issue Photo Upload (Upload option, empty by default) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Issue Photo
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors relative overflow-hidden group"
              >
                {photoPreview ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={photoPreview}
                      alt="Issue photo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to replace photo
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoPreview(null);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                      aria-label="Remove photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-7 h-7 text-slate-500 mb-1" />
                    <span className="text-xs font-medium text-slate-800">
                      Click to upload
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PNG, JPG up to 10MB
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quoted Price */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-500 pl-1">
                Quoted
              </label>
              <input
                type="text"
                value={quoted}
                onChange={(e) => setQuoted(e.target.value)}
                placeholder="$75–$100"
                className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
              />
            </div>
          </div>

          {/* Bottom Continue Button */}
          <div className="shrink-0 pt-3 border-t border-slate-50">
            <Button
              type="submit"
              variant="primary"
              className="h-12 font-semibold text-sm tracking-wide cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STEP 2: Choose Date & Time (Calendar with "Review" Button)
  // -------------------------------------------------------------
  if (step === "datetime") {
    return (
      <ChooseDateTimeScreen
        buttonText="Review"
        showSuccessModal={false}
        onBack={() => setStep("form")}
        onConfirmAppointment={(appt: { date: string; time: string }) => {
          setAppointment(appt);
          setStep("review");
        }}
        showStatusBar={true}
      />
    );
  }

  // -------------------------------------------------------------
  // STEP 3: Review and Confirm Screen
  // -------------------------------------------------------------
  if (step === "review") {
    const displayIssueTitle = issue.trim() || `${service} problem in house`;
    const displayDescription =
      description.trim() ||
      `Problem reported for ${service.toLowerCase()} at ${address}. Technician review requested.`;

    return (
      <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden font-sans">
        {/* Top Header */}
        <div className="pt-2 pb-3 shrink-0 z-20 bg-white">
          <div className="relative flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("datetime")}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Review and Confirm
            </h1>

            <div className="w-9" />
          </div>
        </div>

        {/* Review Content */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3.5 text-left pt-1 pb-4">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight pb-0.5">
            Review and Confirm
          </h2>

          {/* Card 1: Issue Summary Card */}
          <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3.5 shadow-2xs">
            {photoPreview ? (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                <Image
                  src={photoPreview}
                  alt="Issue"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 p-1 flex flex-col justify-between">
                <div className="flex gap-1">
                  <span className="w-1.5 h-6 bg-amber-400 rounded-xs"></span>
                  <span className="w-1.5 h-6 bg-red-400 rounded-xs"></span>
                  <span className="w-1.5 h-6 bg-blue-400 rounded-xs"></span>
                </div>
                <div className="flex justify-between items-center text-[7px] text-white/70 font-mono">
                  <span>240V</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">
                {displayIssueTitle}
              </h3>
              <p className="text-xs font-bold text-[#0891A2] mt-0.5">
                {quoted || "$75–$100"}
              </p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-600 font-medium">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                </span>
                <span>{service}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Address Card */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Address</h4>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                {address}
              </p>
              {postcode && (
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Post code: {postcode}
                </p>
              )}
            </div>
          </div>

          {/* Card 3: Date & Time Card */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Date &amp; Time</h4>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                {appointment.date} at {appointment.time}
              </p>
            </div>
          </div>

          {/* Card 4: Issue Details Card */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Issue Details</h4>
              <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                {displayDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action: Confirm Post */}
        <div className="pt-3 shrink-0 z-20 bg-white border-t border-slate-50">
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setIsPosting(true);
              setTimeout(() => {
                setIsPosting(false);
                setStep("success");
              }, 400);
            }}
            isLoading={isPosting}
            className="h-12 font-semibold text-sm tracking-wide cursor-pointer"
          >
            Confirm Post
          </Button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STEP 4: Celebration Success Screen with Confetti
  // -------------------------------------------------------------
  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden font-sans">
      {/* Top spacer */}
      <div className="pt-2 shrink-0" />

      {/* Main Celebratory Body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-center text-center z-20 py-2">
        {/* Crisp Circle with Tick, No Side Shadow / Glow */}
        <div className="w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center text-white mb-4 shadow-none">
          <Check className="w-10 h-10 stroke-[2.8]" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
          Service Request Confirmed!
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-[280px] leading-relaxed">
          Your request for <strong className="text-slate-800">{service}</strong> has been successfully booked and posted.
        </p>

        {/* Confirmed Details Card */}
        <div className="w-full mt-4 p-4 bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl shadow-xs text-left space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">Request Reference</span>
            <span className="text-xs font-mono font-bold text-slate-800">#SR-84920</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Appointment</span>
            <span className="font-semibold text-slate-800">{appointment.date}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Time Slot</span>
            <span className="font-semibold text-slate-800">{appointment.time}</span>
          </div>

          <div className="flex items-start justify-between text-xs pt-1">
            <span className="text-slate-400 text-[11px] shrink-0">Address</span>
            <span className="font-medium text-slate-700 text-right text-[11px] max-w-[190px] truncate">
              {address}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-3 space-y-2.5 bg-white/80 backdrop-blur-xs border-t border-slate-100 shrink-0 z-20">
        <Button
          type="button"
          variant="primary"
          onClick={() => router.push("/services/requests?role=service")}
          className="w-full h-12 font-semibold text-sm tracking-wide cursor-pointer shadow-sm"
        >
          View in My Requests
        </Button>

        <button
          type="button"
          onClick={() => router.push("/services?role=service")}
          className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Back to Services Hub
        </button>
      </div>
    </div>
  );
}

export default function ServiceBookingPage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Booking...</div>}>
        <ServiceBookingContent />
      </Suspense>
    </MobileContainer>
  );
}
