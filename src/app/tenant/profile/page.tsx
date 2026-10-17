"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Settings,
  Calendar,
  ChevronDown,
  Check,
  CheckCircle2,
  Mail,
  User,
  ShieldCheck,
  FileText,
  FileCheck2,
  TrendingUp,
  Edit3,
  Camera,
  X,
} from "lucide-react";
import { MobileContainer } from "@/components/MobileContainer";
import { TenantBottomNav } from "@/components/tenant/TenantBottomNav";
import { TenantBoostScreen } from "@/components/tenant/TenantBoostScreen";
import { TenantPaymentScreen } from "@/components/tenant/TenantPaymentScreen";
import { Button } from "@/components/ui/Button";

export default function TenantProfilePage() {
  const router = useRouter();

  // Navigation Sub-view State: "profile" | "boost" | "payment"
  const [viewMode, setViewMode] = useState<"profile" | "boost" | "payment">("profile");
  const [selectedPlan, setSelectedPlan] = useState<"boost" | "agent">("boost");

  // Profile Form States
  const [fullName, setFullName] = useState("Andy Lexsian");
  const [dob, setDob] = useState("24 february 1996");
  const [phoneNumber, setPhoneNumber] = useState("01245698745");
  const [email, setEmail] = useState("Andylexian22@gmail.com");
  const [postcode, setPostcode] = useState("12236");
  const [address, setAddress] = useState("Select address");
  const [gender, setGender] = useState<"male" | "female">("male");

  // Edit Mode & Feedback States
  const [isEditing, setIsEditing] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Profile completion interactive states
  const [completionStates, setCompletionStates] = useState({
    verifyEmail: true,
    profilePhoto: true,
    uploadId: false,
    paySlips: false,
    taxReturns: false,
    creditReport: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveChanges = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Profile changes saved successfully!");
    }, 400);
  };

  const handleToggleCompletion = (key: keyof typeof completionStates, label: string) => {
    setCompletionStates((prev) => {
      const next = !prev[key];
      showToast(`${label} marked as ${next ? "completed" : "pending"}`);
      return { ...prev, [key]: next };
    });
  };

  const handleBoostProfile = () => {
    setViewMode("boost");
  };

  if (viewMode === "boost") {
    return (
      <MobileContainer>
        <TenantBoostScreen
          onBack={() => setViewMode("profile")}
          onSelectBoost={(plan) => {
            setSelectedPlan(plan);
            setViewMode("payment");
          }}
        />
      </MobileContainer>
    );
  }

  if (viewMode === "payment") {
    return (
      <MobileContainer>
        <TenantPaymentScreen
          onBack={() => setViewMode("boost")}
          onSuccess={() => {
            setViewMode("profile");
            showToast("🎉 Profile Boost Activated! Your ranking is now elevated.");
          }}
          planTitle={selectedPlan === "agent" ? "We're Your Agent" : "Boost Profile"}
          planPrice={selectedPlan === "agent" ? "£20.00 / week" : "£9.99 (7 days)"}
        />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top duration-200 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Scrollable Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-3.5 pb-6 space-y-4">
          
          {/* Top Header */}
          <div className="flex items-center justify-between pb-1">
            <Button
              variant="icon"
              size="icon-sm"
              onClick={() => router.push("/tenant/dashboard")}
              aria-label="Back"
              className="text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </Button>

            <h1 className="text-[18px] font-bold text-slate-900 tracking-tight">
              Profile
            </h1>

            <Button
              variant="icon"
              size="icon-sm"
              onClick={() => showToast("Settings opened")}
              aria-label="Settings"
              className="text-slate-700 hover:bg-slate-100"
            >
              <Settings className="w-5 h-5 stroke-[2]" />
            </Button>
          </div>

          {/* Profile Avatar Card */}
          <div className="flex flex-col items-center justify-center pt-1 pb-1">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-100">
              <Image
                src="/john-wick-avatar.jpg"
                alt="Andy Lexsian Portrait"
                fill
                priority
                className="object-cover"
              />
              {isEditing && (
                <div
                  onClick={() => showToast("Select image to update avatar")}
                  className="absolute inset-0 bg-black/35 hover:bg-black/50 transition-colors flex items-center justify-center text-white cursor-pointer"
                  title="Change avatar"
                >
                  <Camera className="w-5 h-5 text-white/90" />
                </div>
              )}
            </div>

            {/* Edit Profile Action Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => {
                  setIsEditing((prev) => !prev);
                  showToast(isEditing ? "Profile edit mode locked" : "Profile editing enabled");
                }}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                className="text-[#0891A2] border-[#0891A2]/30 hover:bg-teal-50/50 font-semibold px-3.5 py-1"
              >
                {isEditing ? "Editing Mode Active" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {/* Profile Form (From 1st Image) */}
          <form onSubmit={handleSaveChanges} className="space-y-3 pt-1">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full h-11 px-4 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 transition-all shadow-2xs"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Date of Birth
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="24 february 1996"
                  className="w-full h-11 px-4 pr-11 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 transition-all shadow-2xs"
                />
                <Calendar className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none stroke-[1.8]" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Phone Number
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01245698745"
                className="w-full h-11 px-4 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 transition-all shadow-2xs"
              />
            </div>

            {/* E-mail */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                E-mail
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Andylexian22@gmail.com"
                className="w-full h-11 px-4 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 transition-all shadow-2xs"
              />
            </div>

            {/* Post code */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Post code
              </label>
              <div className="relative flex items-center">
                <select
                  disabled={!isEditing}
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full h-11 px-4 pr-11 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 appearance-none cursor-pointer transition-all shadow-2xs"
                >
                  <option value="12236">12236</option>
                  <option value="BT1 1AA">BT1 1AA</option>
                  <option value="BT7 1NN">BT7 1NN</option>
                  <option value="SW1A 1AA">SW1A 1AA</option>
                </select>
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none stroke-[2]" />
              </div>
            </div>

            {/* Select your address */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Select your address
              </label>
              <div className="relative flex items-center">
                <select
                  disabled={!isEditing}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-11 px-4 pr-11 bg-white text-slate-900 font-medium rounded-2xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] disabled:bg-slate-50 disabled:text-slate-600 appearance-none cursor-pointer transition-all shadow-2xs truncate"
                >
                  <option value="Select address">Select address</option>
                  <option value="7 Great Georges St N, Warrenpoint">7 Great Georges St N, Warrenpoint</option>
                  <option value="12 High Street, Belfast">12 High Street, Belfast</option>
                  <option value="Unit 4B, Riverside Apartments">Unit 4B, Riverside Apartments</option>
                </select>
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none stroke-[2]" />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-1 pt-0.5">
              <label className="block text-xs font-medium text-slate-500 pl-0.5">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setGender("male")}
                  className={`h-11 rounded-2xl border px-4 flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs ${
                    gender === "male"
                      ? "border-slate-300 bg-white"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      gender === "male"
                        ? "bg-[#0891A2] text-white shadow-2xs"
                        : "border border-slate-300 bg-white"
                    }`}
                  >
                    {gender === "male" && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-800">Male</span>
                </button>

                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setGender("female")}
                  className={`h-11 rounded-2xl border px-4 flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs ${
                    gender === "female"
                      ? "border-slate-300 bg-white"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      gender === "female"
                        ? "bg-[#0891A2] text-white shadow-2xs"
                        : "border border-slate-300 bg-white"
                    }`}
                  >
                    {gender === "female" && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-800">Female</span>
                </button>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSaving}
                className="h-11 text-xs sm:text-sm font-semibold rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white shadow-xs"
              >
                Save Changes
              </Button>
            </div>
          </form>

          {/* Profile Completion Section (Exact Replica of 2nd Image) */}
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
                Profile Completion
              </h2>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0891A2]">
                {Object.values(completionStates).filter(Boolean).length} of 6 Completed
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-2.5">
              
              {/* 1. Verify Email (Completed) */}
              <div
                onClick={() => handleToggleCompletion("verifyEmail", "Verify Email")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.verifyEmail
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Verify Email
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {completionStates.verifyEmail ? "Completed" : "Action required"}
                    </p>
                  </div>
                </div>

                {completionStates.verifyEmail ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>

              {/* 2. Profile Photo (Completed) */}
              <div
                onClick={() => handleToggleCompletion("profilePhoto", "Profile Photo")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.profilePhoto
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] shrink-0">
                    <User className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Profile Photo
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {completionStates.profilePhoto ? "Completed" : "Upload avatar"}
                    </p>
                  </div>
                </div>

                {completionStates.profilePhoto ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>

              {/* 3. Upload ID (Pending) */}
              <div
                onClick={() => handleToggleCompletion("uploadId", "Upload ID")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.uploadId
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] shrink-0">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="pr-1">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Upload ID
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {completionStates.uploadId
                        ? "Completed"
                        : "Verify your identity with a passport or license"}
                    </p>
                  </div>
                </div>

                {completionStates.uploadId ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>

              {/* 4. Pay slips (Pending) */}
              <div
                onClick={() => handleToggleCompletion("paySlips", "Pay slips")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.paySlips
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Pay slips
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {completionStates.paySlips ? "Completed" : "Pay slips if employed"}
                    </p>
                  </div>
                </div>

                {completionStates.paySlips ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>

              {/* 5. Tax Returns (Pending) */}
              <div
                onClick={() => handleToggleCompletion("taxReturns", "Tax Returns")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.taxReturns
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <FileCheck2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Tax Returns
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {completionStates.taxReturns
                        ? "Completed"
                        : "Proof of income if self-employed"}
                    </p>
                  </div>
                </div>

                {completionStates.taxReturns ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>

              {/* 6. Credit Report (Pending) */}
              <div
                onClick={() => handleToggleCompletion("creditReport", "Credit Report")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                  completionStates.creditReport
                    ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0891A2] shrink-0">
                    <TrendingUp className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Credit Report
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {completionStates.creditReport
                        ? "Completed"
                        : "View or manage your credit report."}
                    </p>
                  </div>
                </div>

                {completionStates.creditReport ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
              </div>
            </div>

            {/* Boost Profile Action Button (Aligned on Right) */}
            <div className="flex justify-end pt-1 pb-3">
              <Button
                variant="primary"
                onClick={handleBoostProfile}
                className="h-10 px-6 rounded-2xl bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-xs shadow-xs"
              >
                Boost Profile
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Navigation Bar */}
        <TenantBottomNav activeTab="profile" />

      </div>
    </MobileContainer>
  );
}
