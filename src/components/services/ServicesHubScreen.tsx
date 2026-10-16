"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MobileStatusBar } from "@/components/MobileStatusBar";
import {
  Bell,
  Search,
  Home,
  ClipboardList,
  User,
  Zap,
  Flame,
  Droplets,
  Bath,
  FileCheck2,
  Lightbulb,
  FileText,
  Maximize2,
  UtensilsCrossed,
  Paintbrush,
  Grid,
  ChefHat,
  CheckCircle2,
} from "lucide-react";

interface ServicesHubScreenProps {
  onSelectService?: (serviceTitle: string) => void;
  onNavigateToRequests?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
}

export function ServicesHubScreen({
  onSelectService,
  onNavigateToRequests,
  onNavigateToProfile,
  showStatusBar = true,
}: ServicesHubScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "requests" | "profile">("services");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const servicesList: ServiceItem[] = [
    {
      id: "damp-mould",
      title: "Damp and mould",
      iconBg: "bg-[#DCFCE7] text-[#16A34A]",
      icon: <Grid className="w-5 h-5 stroke-[2.5]" />,
    },
    {
      id: "electrical",
      title: "Electrical Report",
      iconBg: "bg-[#FEF9C3] text-[#CA8A04]",
      icon: <Zap className="w-5 h-5 fill-current" />,
    },
    {
      id: "kitchen",
      title: "Kitchen",
      iconBg: "bg-[#CCFBF1] text-[#0D9488]",
      icon: <ChefHat className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "heating-boiler",
      title: "Heating and Boiler",
      iconBg: "bg-[#FFEDD5] text-[#EA580C]",
      icon: <Flame className="w-5 h-5 fill-current" />,
    },
    {
      id: "water-leaks",
      title: "Water and Leaks",
      iconBg: "bg-[#D1FAE5] text-[#059669]",
      icon: <Droplets className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "bathroom-quote",
      title: "New Bathroom Quote",
      iconBg: "bg-[#E0F2FE] text-[#0284C7]",
      icon: <Bath className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "gas-certificate",
      title: "Gas Certificate",
      iconBg: "bg-[#FFEDD5] text-[#EA580C]",
      icon: <FileCheck2 className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "lighting",
      title: "Lighting",
      iconBg: "bg-[#DBEAFE] text-[#2563EB]",
      icon: <Lightbulb className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "home-survey",
      title: "Home Buyers Report and Survey",
      iconBg: "bg-[#DCFCE7] text-[#16A34A]",
      icon: <FileText className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "window",
      title: "Window",
      iconBg: "bg-[#F3E8FF] text-[#9333EA]",
      icon: <Maximize2 className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "kitchen-quote",
      title: "New Kitchen Quote",
      iconBg: "bg-[#FEF3C7] text-[#D97706]",
      icon: <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />,
    },
    {
      id: "exterior-garden",
      title: "Exterior and Garden",
      iconBg: "bg-[#FFE4E6] text-[#E11D48]",
      icon: <Paintbrush className="w-5 h-5 stroke-[2.2]" />,
    },
  ];

  const filteredServices = servicesList.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">
      {/* Top Header - Fixed/Sticky */}
      <div className="shrink-0 z-20 bg-white px-5 pt-3 pb-2 flex items-start justify-between border-b border-slate-50">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 tracking-tight leading-tight">
            Services Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Book help for your home, whenever you need it.
          </p>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer shadow-xs"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3 space-y-4 text-left">

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-12 pl-11 pr-4 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all"
          />
        </div>

        {/* Featured Banner: Trusted Property Services */}
        <div className="relative overflow-hidden rounded-[14px] bg-[#EFEBFD] p-4 flex items-center justify-between gap-2">
          <div className="flex-1 z-10 pl-1">
            <h3 className="text-[16px] font-bold text-slate-900 tracking-tight leading-snug">
              Trusted Property
              <br />
              Services
            </h3>
            <p className="text-[11.5px] text-slate-500 mt-1.5 leading-relaxed max-w-[155px]">
              Book, track &amp; manage services for your property.
            </p>
          </div>

          {/* Illustration Graphic using png-1.png */}
          <div className="relative w-32 h-24 shrink-0 -mr-1">
            <Image
              src="/png-1.png"
              alt="Trusted Property Services"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>

        {/* All Services Grid Header */}
        <div className="pt-2">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
            All Services
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-2.5 pb-2">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                if (onSelectService) {
                  onSelectService(service.title);
                } else {
                  setSelectedService(service.title);
                }
              }}
              type="button"
              className="h-16 px-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] active:scale-[0.98] border border-slate-100 rounded-2xl flex items-center gap-2.5 text-left transition-all duration-150 cursor-pointer group shadow-2xs"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${service.iconBg} group-hover:scale-105 transition-transform`}
              >
                {service.icon}
              </div>
              <span className="text-[12px] font-medium text-slate-800 leading-tight line-clamp-2">
                {service.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Service Toast */}
      {selectedService && (
        <div className="mx-5 mb-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Selected service: <strong>{selectedService}</strong></span>
          </div>
          <button
            onClick={() => setSelectedService(null)}
            className="text-emerald-700 font-semibold text-xs ml-2 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* Bottom Tab Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium">
        {/* Services Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activeTab === "services" ? "text-[#0891A2] font-semibold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span>Services</span>
        </button>

        {/* My Requests Tab */}
        <button
          type="button"
          onClick={() => {
            if (onNavigateToRequests) {
              onNavigateToRequests();
            } else {
              setActiveTab("requests");
            }
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activeTab === "requests" ? "text-[#0891A2] font-semibold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <ClipboardList className="w-5 h-5 stroke-[2]" />
          <span>My Requests</span>
        </button>

        {/* Profile Tab */}
        <button
          type="button"
          onClick={() => {
            if (onNavigateToProfile) {
              onNavigateToProfile();
            } else {
              setActiveTab("profile");
            }
          }}
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
            activeTab === "profile" ? "text-[#0891A2] font-semibold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
