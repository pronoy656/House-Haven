"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  LayoutGrid,
  Search,
  Repeat2,
  Wrench,
  User,
  Shield,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit3,
} from "lucide-react";
import { MobileContainer } from "@/components/MobileContainer";

export default function TenantProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "matches" | "maintenance" | "profile">("profile");

  return (
    <MobileContainer>
      <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
        
        {/* Status Bar */}
        <div className="shrink-0 pt-2.5 px-6 flex items-center justify-between text-slate-800 text-[13px] font-semibold tracking-tight z-20">
          <span>19:27</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
            </svg>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            <div className="w-5 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 pb-6 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/tenant/dashboard")}
              className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
              My Profile
            </h1>
            <button
              type="button"
              onClick={() => router.push("/tenant/notifications")}
              className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs relative active:scale-95 cursor-pointer"
            >
              <Bell className="w-4 h-4 stroke-[2]" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0891A2] rounded-full" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-[#0891A2] shadow-sm mb-3">
              <Image
                src="/john-wick-avatar.jpg"
                alt="Tenant Portrait"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Andy Lexsian
            </h2>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0891A2] text-[10.5px] font-semibold mt-1">
              <CheckCircle2 className="w-3 h-3 text-[#0891A2]" />
              <span>Verified Tenant</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-left text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate text-[11px]">andy@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-[11px]">+44 7911 123456</span>
              </div>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-2xs space-y-1">
            <button
              type="button"
              onClick={() => router.push("/tenant/agreements")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">My Agreements</h4>
                  <p className="text-[10px] text-slate-400">View and review signed leases</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/tenant/maintenance")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Maintenance Requests</h4>
                  <p className="text-[10px] text-slate-400">Track repairs and schedules</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/tenant/onboarding")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Edit Application Info</h4>
                  <p className="text-[10px] text-slate-400">Update preferences and details</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-2xs space-y-1">
            <button
              type="button"
              onClick={() => router.push("/choose-role")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Switch Role</h4>
                  <p className="text-[10px] text-slate-400">Switch to Landlord or Services</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-600">Sign Out</h4>
                  <p className="text-[10px] text-slate-400">Log out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Bottom Navigation Bar */}
        <div className="shrink-0 z-30 bg-white border-t border-slate-100 px-3 py-2 flex items-center justify-around shadow-sm">
          <button
            type="button"
            onClick={() => router.push("/tenant/dashboard")}
            className="flex flex-col items-center gap-1 py-1 px-2 cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <LayoutGrid className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/tenant/search")}
            className="flex flex-col items-center gap-1 py-1 px-2 cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <Search className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-medium">Search</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/tenant/matches")}
            className="flex flex-col items-center gap-1 py-1 px-2 cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <Repeat2 className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-medium">Matches</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/tenant/maintenance")}
            className="flex flex-col items-center gap-1 py-1 px-2 cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <Wrench className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-medium">Maintenance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center gap-1 py-1 px-2 cursor-pointer text-[#0891A2]"
          >
            <User className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </div>

      </div>
    </MobileContainer>
  );
}
