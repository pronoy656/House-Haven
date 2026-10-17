"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  Settings,
  Calendar,
  ChevronDown,
  ChevronRight,
  Pencil,
  Check,
  Star,
  User as UserIcon,
  CreditCard,
  Lock,
  Key,
  Shield,
  HelpCircle,
  Eye,
  EyeOff,
  Info,
  X,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";
import { LandlordBottomNav } from "./LandlordBottomNav";

export type ProfileFlowView =
  | "profile"
  | "reviews"
  | "setting"
  | "change_password"
  | "forgot_password"
  | "enter_otp"
  | "create_new_password";

interface LandlordProfileFlowScreenProps {
  initialView?: ProfileFlowView;
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToNotifications?: () => void;
  onLogout?: () => void;
  showStatusBar?: boolean;
}

export function LandlordProfileFlowScreen({
  initialView = "setting",
  onBack,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToNotifications,
  onLogout,
  showStatusBar = true,
}: LandlordProfileFlowScreenProps) {
  const [currentView, setCurrentView] = useState<ProfileFlowView>(initialView);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState("Andy Lexian");
  const [dob, setDob] = useState("24 February 1996");
  const [phone, setPhone] = useState("01245698746");
  const [email, setEmail] = useState("Andylexian22@gmail.com");
  const [postcode, setPostcode] = useState("12236");
  const [address, setAddress] = useState("Select address");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangedSuccess, setPasswordChangedSuccess] = useState(false);

  // Forgot Password / OTP States
  const [forgotEmail, setForgotEmail] = useState("Andylexian22@gmail.com");
  const [otpDigits, setOtpDigits] = useState(["4", "5", "1", ""]);

  // Reviews Data
  const reviewsList = [
    {
      id: 1,
      name: "Kim Boroly",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      comment:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
    {
      id: 2,
      name: "Misel Kamsurahi",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      comment: "The service was on point, and I really like the facilities. Good job!",
    },
    {
      id: 3,
      name: "Zanniton",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      comment: "The service was on point, and I really like the facilities. Good job!",
    },
    {
      id: 4,
      name: "Festian Ansy",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      comment: "The service was on point, and I really like the facilities. Good job!",
    },
    {
      id: 5,
      name: "Fadingkly",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      comment: "The service was on point, and I really like the facilities. Good job!",
    },
    {
      id: 6,
      name: "Andially",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
      comment: "The service was on point, and I really like the facilities. Good job!",
    },
  ];

  const handleBack = () => {
    if (currentView === "profile") {
      setCurrentView("setting");
    } else if (currentView === "reviews") {
      setCurrentView("profile");
    } else if (currentView === "setting") {
      onBack ? onBack() : onNavigateToDashboard?.();
    } else if (currentView === "change_password") {
      setCurrentView("setting");
    } else if (currentView === "forgot_password") {
      setCurrentView("setting");
    } else if (currentView === "enter_otp") {
      setCurrentView("forgot_password");
    } else if (currentView === "create_new_password") {
      setCurrentView("enter_otp");
    } else {
      onBack ? onBack() : onNavigateToDashboard?.();
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white border-b border-slate-50">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
          {currentView === "profile" && "Profile"}
          {currentView === "reviews" && "Reviews"}
          {currentView === "setting" && "Profile"}
          {currentView === "change_password" && "Change Password"}
          {currentView === "forgot_password" && "Forgot Password"}
          {currentView === "enter_otp" && "Forgot Password"}
          {currentView === "create_new_password" && "Create a New Password"}
        </h1>

        <button
          type="button"
          onClick={onNavigateToNotifications}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891A2] rounded-full ring-2 ring-white" />
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-4 text-left">
        {/* =========================================================================
            VIEW 1: PROFILE
            ========================================================================= */}
        {currentView === "profile" && (
          <div className="space-y-4 pb-2">
            {/* Avatar Row */}
            <div className="flex justify-center pt-1">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-100 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80"
                    alt="Andy Lexian"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0891A2] text-white flex items-center justify-center shadow-xs hover:bg-[#067482] transition-colors cursor-pointer"
                  title="Change avatar"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 3 Stat Cards: Properties, Tenants, Rating */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl text-center">
                <div className="text-lg font-bold text-slate-900 leading-tight">12</div>
                <span className="text-[11px] text-slate-500 font-medium">Properties</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl text-center">
                <div className="text-lg font-bold text-slate-900 leading-tight">12</div>
                <span className="text-[11px] text-slate-500 font-medium">Tenants</span>
              </div>

              <div
                onClick={() => setCurrentView("reviews")}
                className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl text-center cursor-pointer hover:border-[#0891A2]/40 transition-colors group"
                title="View Reviews"
              >
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-slate-900 leading-tight group-hover:text-[#0891A2]">
                  <span>4.9</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Rating</span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveProfile} className="space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Date of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <Calendar className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                />
              </div>

              {/* E-mail */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                />
              </div>

              {/* Post code */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Post code</label>
                <div className="relative">
                  <select
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  >
                    <option value="12236">12236</option>
                    <option value="12237">12237</option>
                    <option value="12238">12238</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Select your address */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Select your address</label>
                <div className="relative">
                  <select
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  >
                    <option value="Select address">Select address</option>
                    <option value="Maple Apartments, Unit 3B">Maple Apartments, Unit 3B</option>
                    <option value="Riverside Apartments, 12 Elm St">Riverside Apartments, 12 Elm St</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11.5px] font-medium text-slate-500">Gender</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                      className="w-4 h-4 text-[#0891A2] focus:ring-[#0891A2]"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                      className="w-4 h-4 text-[#0891A2] focus:ring-[#0891A2]"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full h-11 font-semibold text-xs rounded-2xl"
                >
                  {saveSuccess ? "Changes Saved!" : "Save Changes"}
                </Button>
              </div>
            </form>

            {/* Profile Completion Section */}
            <div className="pt-3 space-y-2.5">
              <h3 className="text-[13px] font-bold text-slate-900">Profile Completion</h3>

              {/* Item 1: Verify Email */}
              <div className="p-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs shrink-0">
                    M
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Verify Email</h4>
                    <span className="text-[10.5px] text-slate-400">Completed</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Item 2: Profile Photo */}
              <div className="p-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Profile Photo</h4>
                    <span className="text-[10.5px] text-slate-400">Completed</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Item 3: Upload ID */}
              <div className="p-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-[#0891A2] flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Upload ID</h4>
                    <span className="text-[10.5px] text-slate-400 truncate block">
                      Verify your identity with a passport or license
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 ml-2" />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: REVIEWS
            ========================================================================= */}
        {currentView === "reviews" && (
          <div className="space-y-4 pb-2">
            {/* Rating Summary Card */}
            <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
              {/* Left Column: 4.9 Big Number + Stars */}
              <div className="space-y-1">
                <div className="text-3xl font-extrabold text-slate-900 leading-none">4.9</div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= 4
                          ? "fill-amber-400 text-amber-400"
                          : "fill-amber-400/80 text-amber-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10.5px] text-slate-400 font-medium block">
                  Based on 32 review
                </span>
              </div>

              {/* Right Column: Rating Breakdown Progress Bars */}
              <div className="flex-1 space-y-1 text-[10px] text-slate-400 font-medium max-w-[140px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2">5</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-[#0891A2] rounded-full w-[90%]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2">4</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-[#0891A2] rounded-full w-[10%]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2">3</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-[#0891A2] rounded-full w-[0%]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2">2</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-[#0891A2] rounded-full w-[0%]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2">1</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-[#0891A2] rounded-full w-[0%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section Header */}
            <h3 className="text-[13px] font-bold text-slate-900 pt-1">Reviews (32)</h3>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0 relative">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{rev.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rev.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SETTING
            ========================================================================= */}
        {currentView === "setting" && (
          <div className="space-y-4 pb-2">
            {/* Group 1: Personal Info */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 pl-1">Personal Info</span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setCurrentView("profile")}
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Profile</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Payment Method</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Group 2: Security */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 pl-1">Security</span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setCurrentView("change_password")}
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Change Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView("forgot_password")}
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <Key className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Forgot Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Group 3: About */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 pl-1">About</span>
              <div className="space-y-1">
                <button
                  type="button"
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Help & Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Log Out Button (Red Outline) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="w-full h-11 rounded-2xl border border-rose-300 text-rose-500 font-semibold text-xs hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CHANGE PASSWORD
            ========================================================================= */}
        {currentView === "change_password" && (
          <div className="space-y-4 pt-1">
            <p className="text-[11.5px] text-slate-500 leading-relaxed">
              The new password must be different from the current password
            </p>

            <div className="space-y-3">
              {/* Current Password */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Requirement Checkpoints */}
              <div className="space-y-1 text-[11px] text-emerald-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>There must be at least 8 characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>There must be a unique code like @#!</span>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setPasswordChangedSuccess(true);
                    setTimeout(() => {
                      setPasswordChangedSuccess(false);
                      setCurrentView("setting");
                    }, 1200);
                  }}
                  className="w-full h-11 font-semibold text-xs rounded-2xl"
                >
                  {passwordChangedSuccess ? "Password Updated!" : "Change Password"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: FORGOT PASSWORD
            ========================================================================= */}
        {currentView === "forgot_password" && (
          <div className="space-y-4 pt-1">
            {/* Info Message Box */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                We will send the OTP code to your email for security in forgetting your password
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11.5px] font-medium text-slate-500">E-mail</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
              />
            </div>

            {/* Send Code Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => setCurrentView("enter_otp")}
                className="w-full h-11 font-semibold text-xs rounded-2xl"
              >
                Send Code
              </Button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 6: ENTER OTP
            ========================================================================= */}
        {currentView === "enter_otp" && (
          <div className="space-y-4 pt-1">
            {/* Info Message Box */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                We have just sent you 4 digit code via your email example@gmail.com
              </p>
            </div>

            {/* 4 Digit Boxes */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpDigits];
                    newOtp[idx] = e.target.value;
                    setOtpDigits(newOtp);
                  }}
                  className="w-13 h-13 text-center text-lg font-bold text-slate-900 rounded-2xl border border-slate-200 bg-[#F8FAFC] focus:outline-none focus:border-[#0891A2] focus:bg-white focus:ring-1 focus:ring-[#0891A2]"
                />
              ))}
            </div>

            {/* Continue Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => setCurrentView("create_new_password")}
                className="w-full h-11 font-semibold text-xs rounded-2xl"
              >
                Continue
              </Button>
            </div>

            {/* Resend Link */}
            <p className="text-center text-[11.5px] text-slate-500 pt-1">
              Didn&apos;t receive code?{" "}
              <button
                type="button"
                className="text-[#0891A2] font-semibold hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            </p>
          </div>
        )}

        {/* =========================================================================
            VIEW 7: CREATE NEW PASSWORD
            ========================================================================= */}
        {currentView === "create_new_password" && (
          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <h2 className="text-[17px] font-bold text-slate-900 leading-tight">
                Create a New Password
              </h2>
              <p className="text-[11.5px] text-slate-400">Enter your new password</p>
            </div>

            <div className="space-y-3 pt-1">
              {/* New Password */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-slate-500">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={() => setCurrentView("setting")}
                  className="w-full h-11 font-semibold text-xs rounded-2xl"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal Overlay */}
      {showLogoutModal && (
        <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-[3px] flex items-center justify-center p-5 transition-all animate-in fade-in duration-200">
          <div className="w-full max-w-[300px] bg-white rounded-3xl p-6 shadow-2xl relative text-center space-y-3.5">
            {/* Close X (cleanly positioned with good padding and subtle bg so it never overlays text) */}
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>

            {/* Logout Icon Badge (Provides clean vertical spacing from close button) */}
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto shadow-2xs">
              <LogOut className="w-5 h-5 stroke-[2] ml-0.5" />
            </div>

            {/* Modal Heading & Subtitle */}
            <div className="space-y-1 px-1">
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                Are you sure you want to logout?
              </h3>
              <p className="text-[11.5px] text-slate-400 font-normal">
                You will need to sign in again to access your account.
              </p>
            </div>

            {/* Modal Actions: Log Out ON TOP, Cancel ON BOTTOM */}
            <div className="space-y-2 pt-1">
              {/* TOP: Log Out Button */}
              <Button
                type="button"
                variant="danger"
                size="md"
                fullWidth
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout?.();
                }}
                className="h-10 rounded-2xl"
              >
                Log Out
              </Button>

              {/* BOTTOM: Cancel Button */}
              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowLogoutModal(false)}
                className="h-10 rounded-2xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab="profile"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToProperties={onNavigateToProperties}
        onNavigateToApplications={onNavigateToApplications}
        onNavigateToMessages={onNavigateToMessages}
        onNavigateToProfile={() => setCurrentView("setting")}
      />
    </div>
  );
}
