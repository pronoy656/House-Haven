"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Calendar,
  ChevronDown,
  Check,
  Mail,
  User,
  ShieldCheck,
  FileText,
  FileCheck2,
  TrendingUp,
  Edit3,
  Camera,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { Avatar } from "@/components/shared/Avatar";
import { TenantBottomNav } from "./TenantBottomNav";
import { TenantBoostScreen } from "./TenantBoostScreen";
import { TenantPaymentScreen } from "./TenantPaymentScreen";

interface CompletionItem {
  key: string;
  label: string;
  subtitlePending: string;
  subtitleCompleted: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const COMPLETION_CARDS: CompletionItem[] = [
  {
    key: "verifyEmail",
    label: "Verify Email",
    subtitlePending: "Action required",
    subtitleCompleted: "Completed",
    icon: <Mail className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-red-50 border-red-100",
    iconColor: "text-red-500",
  },
  {
    key: "profilePhoto",
    label: "Profile Photo",
    subtitlePending: "Upload avatar",
    subtitleCompleted: "Completed",
    icon: <User className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-[#0284C7]",
  },
  {
    key: "uploadId",
    label: "Upload ID",
    subtitlePending: "Verify your identity with a passport or license",
    subtitleCompleted: "Completed",
    icon: <ShieldCheck className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-[#0284C7]",
  },
  {
    key: "paySlips",
    label: "Pay slips",
    subtitlePending: "Pay slips if employed",
    subtitleCompleted: "Completed",
    icon: <FileText className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
  },
  {
    key: "taxReturns",
    label: "Tax Returns",
    subtitlePending: "Proof of income if self-employed",
    subtitleCompleted: "Completed",
    icon: <FileCheck2 className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    key: "creditReport",
    label: "Credit Report",
    subtitlePending: "View or manage your credit report.",
    subtitleCompleted: "Completed",
    icon: <TrendingUp className="w-5 h-5 stroke-[2]" />,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-[#0891A2]",
  },
];

export function TenantProfileScreen() {
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
  const [completionStates, setCompletionStates] = useState<Record<string, boolean>>({
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

  const handleToggleCompletion = (key: string, label: string) => {
    setCompletionStates((prev) => {
      const next = !prev[key];
      showToast(`${label} marked as ${next ? "completed" : "pending"}`);
      return { ...prev, [key]: next };
    });
  };

  if (viewMode === "boost") {
    return (
      <TenantBoostScreen
        onBack={() => setViewMode("profile")}
        onSelectBoost={(plan) => {
          setSelectedPlan(plan);
          setViewMode("payment");
        }}
      />
    );
  }

  if (viewMode === "payment") {
    return (
      <TenantPaymentScreen
        onBack={() => setViewMode("boost")}
        onSuccess={() => {
          setViewMode("profile");
          showToast("🎉 Profile Boost Activated! Your ranking is now elevated.");
        }}
        planTitle={selectedPlan === "agent" ? "We're Your Agent" : "Boost Profile"}
        planPrice={selectedPlan === "agent" ? "£20.00 / week" : "£9.99 (7 days)"}
      />
    );
  }

  const completedCount = Object.values(completionStates).filter(Boolean).length;

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top duration-200 flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-1">
        <ScreenHeader
          title="Profile"
          onBack={() => router.push("/tenant/dashboard")}
          rightAction={
            <Button
              variant="icon"
              size="icon-sm"
              onClick={() => showToast("Settings opened")}
              aria-label="Settings"
              className="text-slate-700 hover:bg-slate-100"
            >
              <Settings className="w-5 h-5 stroke-[2]" />
            </Button>
          }
        />
      </div>

      {/* Scrollable Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-1 pb-6 space-y-4">
        
        {/* Profile Avatar Card */}
        <div className="flex flex-col items-center justify-center pt-1 pb-1">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-100">
            <Avatar
              src="/john-wick-avatar.jpg"
              alt="Andy Lexsian Portrait"
              size="xl"
              className="w-20 h-20"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => showToast("Select image to update avatar")}
                className="absolute inset-0 bg-black/35 hover:bg-black/50 transition-colors flex items-center justify-center text-white cursor-pointer"
                title="Change avatar"
              >
                <Camera className="w-5 h-5 text-white/90" />
              </button>
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

        {/* Profile Form */}
        <form onSubmit={handleSaveChanges} className="space-y-3 pt-1">
          {/* Full Name */}
          <InputField
            label="Full Name"
            type="text"
            variant="outlined"
            disabled={!isEditing}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="h-11 shadow-2xs disabled:bg-slate-50 disabled:text-slate-600"
          />

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            type="text"
            variant="outlined"
            disabled={!isEditing}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="24 february 1996"
            rightIcon={<Calendar className="w-4 h-4 text-slate-400 stroke-[1.8]" />}
            className="h-11 shadow-2xs disabled:bg-slate-50 disabled:text-slate-600"
          />

          {/* Phone Number */}
          <InputField
            label="Phone Number"
            type="tel"
            variant="outlined"
            disabled={!isEditing}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="01245698745"
            className="h-11 shadow-2xs disabled:bg-slate-50 disabled:text-slate-600"
          />

          {/* E-mail */}
          <InputField
            label="E-mail"
            type="email"
            variant="outlined"
            disabled={!isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Andylexian22@gmail.com"
            className="h-11 shadow-2xs disabled:bg-slate-50 disabled:text-slate-600"
          />

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

        {/* Profile Completion Section */}
        <div className="pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Profile Completion
            </h2>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0891A2]">
              {completedCount} of 6 Completed
            </span>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5">
            {COMPLETION_CARDS.map((card) => {
              const isCompleted = completionStates[card.key];
              return (
                <div
                  key={card.key}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggleCompletion(card.key, card.label)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleToggleCompletion(card.key, card.label);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                    isCompleted
                      ? "border-emerald-200/90 bg-[#F0FDF4]/70 hover:bg-[#F0FDF4]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {card.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isCompleted ? card.subtitleCompleted : card.subtitlePending}
                      </p>
                    </div>
                  </div>

                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Boost Profile Action Button */}
          <div className="flex justify-end pt-1 pb-3">
            <Button
              variant="primary"
              onClick={() => setViewMode("boost")}
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
  );
}
