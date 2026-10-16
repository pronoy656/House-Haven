"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  Pencil,
  Check,
  Home,
  ClipboardList,
  User,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileStatusBar } from "@/components/MobileStatusBar";

interface ProfileScreenProps {
  onNavigateToServices?: () => void;
  onNavigateToRequests?: () => void;
  onLogout?: () => void;
  showStatusBar?: boolean;
}

export function ProfileScreen({
  onNavigateToServices,
  onNavigateToRequests,
  onLogout,
  showStatusBar = true,
}: ProfileScreenProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("Andy Lexsian");
  const [dob, setDob] = useState("24 february 1996");
  const [phone, setPhone] = useState("01245698745");
  const [email, setEmail] = useState("Andylexian22@gmail.com");
  const [postcode, setPostcode] = useState("12236");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");

  const [isLoading, setIsLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 400);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userRole");
      }
      router.push("/login");
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden font-sans">
      {/* Header - Fixed/Sticky */}
      <div className="pt-3 pb-2 px-5 shrink-0 z-20 bg-white border-b border-slate-50 flex items-center justify-between">
        <div className="w-9" />
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
          Profile
        </h1>
        <button
          type="button"
          onClick={handleLogoutClick}
          className="w-9 h-9 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
          title="Log Out"
          aria-label="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 py-3 space-y-4 text-left">
        {/* Profile Avatar with Edit Pencil */}
        <div className="flex justify-center pt-1 pb-2">
          <div className="relative">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-100 shadow-sm flex items-center justify-center text-slate-400">
              {/* Graphic Avatar matching smiling person */}
              <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center text-white font-bold text-xl">
                AL
              </div>
            </div>

            {/* Pencil Edit Badge */}
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0891A2] text-white flex items-center justify-center shadow-xs hover:bg-[#0e7490] transition-colors cursor-pointer"
              aria-label="Edit Profile Photo"
            >
              <Pencil className="w-3 h-3" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Date of Birth
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full h-12 pl-4 pr-10 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium"
              />
              <Calendar className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium"
            />
          </div>

          {/* E-mail */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium"
            />
          </div>

          {/* Post code */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Post code
            </label>
            <div className="relative">
              <select
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full h-12 px-4 pr-10 border border-slate-200 rounded-2xl text-xs text-slate-900 appearance-none focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium cursor-pointer"
              >
                <option value="12236">12236</option>
                <option value="BT60 3AB">BT60 3AB</option>
                <option value="BT1 1AA">BT1 1AA</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Select your address */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Select your address
            </label>
            <div className="relative">
              <select
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-12 px-4 pr-10 border border-slate-200 rounded-2xl text-xs text-slate-900 appearance-none focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all font-medium cursor-pointer"
              >
                <option value="">Select address</option>
                <option value="Rock Rd, Armagh, UK, BT60 3AB">Rock Rd, Armagh, UK, BT60 3AB</option>
                <option value="14 Victoria Street, Apt 2B">14 Victoria Street, Apt 2B</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("Male")}
                className={`h-12 rounded-2xl border px-4 flex items-center gap-2.5 transition-all cursor-pointer ${
                  gender === "Male"
                    ? "border-slate-300 bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    gender === "Male"
                      ? "bg-[#0891A2] text-white"
                      : "border border-slate-300 bg-white"
                  }`}
                >
                  {gender === "Male" && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  Male
                </span>
              </button>

              <button
                type="button"
                onClick={() => setGender("Female")}
                className={`h-12 rounded-2xl border px-4 flex items-center gap-2.5 transition-all cursor-pointer ${
                  gender === "Female"
                    ? "border-slate-300 bg-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    gender === "Female"
                      ? "bg-[#0891A2] text-white"
                      : "border border-slate-300 bg-white"
                  }`}
                >
                  {gender === "Female" && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  Female
                </span>
              </button>
            </div>
          </div>

          {/* Action Buttons: Save Changes & Log Out */}
          <div className="pt-3 pb-2 space-y-2.5">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="h-12 font-semibold text-sm tracking-wide cursor-pointer"
            >
              Save Changes
            </Button>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="w-full h-12 rounded-2xl border border-red-200 bg-red-50/50 hover:bg-red-50 active:scale-[0.99] text-red-600 font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 stroke-[2.2]" />
              <span>Log Out</span>
            </button>
          </div>
        </form>

        {/* Feedback message */}
        {savedSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-center gap-1.5 font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile saved successfully!</span>
          </div>
        )}
      </div>

      {/* Bottom Tab Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium">
        {/* Services Tab */}
        <button
          type="button"
          onClick={onNavigateToServices}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span>Services</span>
        </button>

        {/* My Requests Tab */}
        <button
          type="button"
          onClick={onNavigateToRequests}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 stroke-[2]" />
          <span>My Requests</span>
        </button>

        {/* Profile Tab (Active) */}
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-[#0891A2] font-semibold cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
