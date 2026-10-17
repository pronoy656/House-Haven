"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Bell,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  X,
  Droplets,
  Bath,
  Utensils,
  Flame,
  Pipette,
  DoorClosed,
  Layers,
  Lightbulb,
  SquareDashedBottom,
  Trees,
  Shirt,
  Armchair,
  Zap,
  Waves,
  BellRing,
  Bug,
  Home,
  Building2,
  Volume2,
  Gauge,
  Globe,
  Footprints,
  Warehouse,
  Fuel,
  Snowflake,
  ShieldAlert,
  Boxes,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TenantBottomNav } from "./TenantBottomNav";

interface TenantMaintenanceHubScreenProps {
  onBackToDashboard?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  onViewIssueDetails?: (issueId?: string) => void;
}

interface MaintenanceIssue {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "Pending" | "Complete";
  image: string;
  actionNeeded?: string;
  hasRequestUpdateButton?: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

export function TenantMaintenanceHubScreen({
  onBackToDashboard,
  onNavigateToSearch,
  onNavigateToMatches,
  onNavigateToProfile,
  onNavigateToNotifications,
  onViewIssueDetails,
}: TenantMaintenanceHubScreenProps) {
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  // Category Selection & Modal State
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [issueTitle, setIssueTitle] = useState<string>("");
  const [issueDescription, setIssueDescription] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const categoriesRef = useRef<HTMLDivElement>(null);

  // Initial Issues List matching screenshot
  const [issues, setIssues] = useState<MaintenanceIssue[]>([
    {
      id: "issue-1",
      title: "Kitchen Sink Leak",
      description: "Water is leaking from the kitchen sink since yesterday.",
      date: "Reported Sep 12, 2026",
      status: "Pending",
      image: "/kitchen-sink-leak-real.png",
      actionNeeded: "Action needed · Select an appointment\n3 times proposed on Sep 18, 2026",
    },
    {
      id: "issue-2",
      title: "AC Not Working",
      description: "The AC is not cooling. It turns on but no cold air.",
      date: "Reported Sep 12, 2026",
      status: "Pending",
      image: "/issue-ac.jpg",
    },
    {
      id: "issue-3",
      title: "AC Not Working",
      description: "The AC is not cooling. It turns on but no cold air.",
      date: "Reported Sep 10, 2026",
      status: "Pending",
      image: "/issue-ac.jpg",
      hasRequestUpdateButton: true,
    },
    {
      id: "issue-4",
      title: "Living Room Light",
      description: "The ceiling light in the living room is flickering.",
      date: "Reported Sep 01, 2026",
      status: "Complete",
      image: "/issue-light.jpg",
    },
  ]);

  // Categories list matching screenshot 2
  const categories: CategoryItem[] = [
    { id: "damp", name: "Damp and mould", icon: <Droplets className="w-4 h-4" />, bgColor: "bg-rose-50", textColor: "text-rose-500" },
    { id: "bath", name: "Bathroom and Toilet", icon: <Bath className="w-4 h-4" />, bgColor: "bg-purple-50", textColor: "text-purple-500" },
    { id: "kitchen", name: "Kitchen", icon: <Utensils className="w-4 h-4" />, bgColor: "bg-emerald-50", textColor: "text-emerald-500" },
    { id: "boiler", name: "Heating and Boiler", icon: <Flame className="w-4 h-4" />, bgColor: "bg-orange-50", textColor: "text-orange-500" },
    { id: "water", name: "Water and Leaks", icon: <Pipette className="w-4 h-4" />, bgColor: "bg-blue-50", textColor: "text-blue-500" },
    { id: "doors", name: "Doors, Garages and Locks", icon: <DoorClosed className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { id: "floors", name: "Internal floors, walls and ceilings", icon: <Layers className="w-4 h-4" />, bgColor: "bg-slate-100", textColor: "text-slate-600" },
    { id: "lighting", name: "Lighting", icon: <Lightbulb className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-500" },
    { id: "window", name: "Window", icon: <SquareDashedBottom className="w-4 h-4" />, bgColor: "bg-blue-50", textColor: "text-blue-500" },
    { id: "exterior", name: "Exterior and Garden", icon: <Trees className="w-4 h-4" />, bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { id: "laundry", name: "Laundry", icon: <Shirt className="w-4 h-4" />, bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { id: "furniture", name: "Furniture", icon: <Armchair className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-700" },
    { id: "electricity", name: "Electricity", icon: <Zap className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-500" },
    { id: "hot_water", name: "Hot Water", icon: <Waves className="w-4 h-4" />, bgColor: "bg-sky-50", textColor: "text-sky-500" },
    { id: "alarms", name: "Alarms and Smoke Detection", icon: <BellRing className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-500" },
    { id: "pests", name: "Pests and Vermin", icon: <Bug className="w-4 h-4" />, bgColor: "bg-indigo-50", textColor: "text-indigo-500" },
    { id: "roof", name: "Roof", icon: <Home className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-700" },
    { id: "community", name: "Community/ Shared Facilities", icon: <Building2 className="w-4 h-4" />, bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { id: "audiovisual", name: "Audiovisual", icon: <Volume2 className="w-4 h-4" />, bgColor: "bg-sky-50", textColor: "text-sky-600" },
    { id: "utility", name: "Utility Meters", icon: <Gauge className="w-4 h-4" />, bgColor: "bg-orange-50", textColor: "text-orange-600" },
    { id: "internet", name: "Internet", icon: <Globe className="w-4 h-4" />, bgColor: "bg-indigo-50", textColor: "text-indigo-600" },
    { id: "stairs", name: "Stairs", icon: <Footprints className="w-4 h-4" />, bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { id: "prop_exterior", name: "Property Exterior", icon: <Warehouse className="w-4 h-4" />, bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { id: "smell_gas", name: "Smell Gas?", icon: <Fuel className="w-4 h-4" />, bgColor: "bg-red-50", textColor: "text-red-500" },
    { id: "ac", name: "Air Conditioning", icon: <Snowflake className="w-4 h-4" />, bgColor: "bg-sky-50", textColor: "text-sky-500" },
    { id: "smell_oil", name: "smell Oil?", icon: <ShieldAlert className="w-4 h-4" />, bgColor: "bg-slate-100", textColor: "text-slate-600" },
    { id: "fire", name: "Fire", icon: <Flame className="w-4 h-4" />, bgColor: "bg-red-50", textColor: "text-red-500" },
    { id: "capex", name: "Capex", icon: <Boxes className="w-4 h-4" />, bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { id: "inspection", name: "Property Inspection", icon: <ClipboardList className="w-4 h-4" />, bgColor: "bg-sky-50", textColor: "text-sky-600" },
    { id: "other", name: "Other", icon: <MoreHorizontal className="w-4 h-4" />, bgColor: "bg-pink-50", textColor: "text-pink-600" },
  ];

  const handleCategoryClick = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setShowSubmitModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue: MaintenanceIssue = {
      id: `issue-${Date.now()}`,
      title: issueTitle || (selectedCategory ? selectedCategory.name : "Reported Issue"),
      description: issueDescription || "Issue reported to the landlord.",
      date: "Reported Today",
      status: "Pending",
      image: "/issue-sink.jpg",
    };

    setIssues([newIssue, ...issues]);
    setShowSubmitModal(false);
    setIssueTitle("");
    setIssueDescription("");
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const filteredIssues = issues.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Pending") return item.status === "Pending";
    if (filter === "Completed") return item.status === "Complete";
    return true;
  });

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none">

      {/* Main Scrollable Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-4 pb-8 space-y-4">

        {/* 1. Header with Title & Notification Bell */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[20px] font-extrabold text-slate-900 leading-tight">
              Maintenance Hub
            </h1>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Report issues and keep track of your requests
            </p>
          </div>

          <Button
            variant="icon"
            size="icon-md"
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
            className="relative shrink-0"
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.9]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </Button>
        </div>

        {/* 2. Top "Report a Maintenance Issue" Banner */}
        <div className="bg-[#E6F8FA] rounded-3xl p-5 border border-[#BCEBF2]/60 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="max-w-[190px]">
              <h2 className="text-[17px] font-extrabold text-slate-900 leading-tight">
                Report a<br />Maintenance Issue
              </h2>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                Let us know about any issues in your property and we&apos;ll take care of it.
              </p>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3.5 font-semibold text-xs"
              >
                Report an Issue
              </Button>
            </div>

            {/* 3D House Illustration */}
            <div className="w-[110px] h-[100px] relative shrink-0 -mr-2">
              <Image
                src="/tenant-matches-banner.png"
                alt="Maintenance House"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>

        {/* Success Alert Toast */}
        {submitSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-3 flex items-center gap-2 text-xs font-semibold animate-fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Issue reported successfully! Landlord has been notified.</span>
          </div>
        )}

        {/* 3. Filter Tabs (All, Pending, Completed) */}
        <div className="flex items-center gap-2 pt-1">
          {(["All", "Pending", "Completed"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <Button
                key={tab}
                type="button"
                variant="pill"
                size="sm"
                isActive={isActive}
                onClick={() => setFilter(tab)}
                className="px-6 py-2"
              >
                {tab}
              </Button>
            );
          })}
        </div>

        {/* 4. My Maintenance Issues Section */}
        <div className="space-y-3 pt-1">
          <h2 className="text-[15px] font-bold text-slate-900">
            My Maintenance Issues
          </h2>

          <div className="space-y-3">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs space-y-3"
              >
                <div 
                  onClick={() => onViewIssueDetails?.(issue.id)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                    <Image
                      src={issue.image}
                      alt={issue.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="text-[14px] font-bold text-slate-900 leading-tight">
                      {issue.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                      {issue.description}
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {issue.date}
                    </span>
                  </div>
                </div>

                {/* Status Badge & View Issue Link */}
                <div className="flex items-center justify-between pt-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                      issue.status === "Pending"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : "bg-[#D1FAE5] text-[#059669]"
                    }`}
                  >
                    {issue.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => onViewIssueDetails?.(issue.id)}
                    className="text-[11px] font-bold text-[#0891A2] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View Issue</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Action Needed Callout (e.g., Kitchen sink) */}
                {issue.actionNeeded && (
                  <div className="bg-[#E0F2FE]/60 rounded-xl p-2.5 border border-[#BAE6FD]/80">
                    <div className="text-[11.5px] font-bold text-[#0284C7] leading-tight">
                      Action needed · Select an appointment
                    </div>
                    <div className="text-[10.5px] text-slate-500 mt-0.5">
                      3 times proposed on Sep 18, 2026
                    </div>
                  </div>
                )}

                {/* Request an Update Button (e.g., for issue 3) */}
                {issue.hasRequestUpdateButton && (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => alert("Update request sent to landlord!")}
                    className="py-2.5 rounded-full"
                  >
                    Request an Update
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Select a Category to Report Section (Image 2) */}
        <div ref={categoriesRef} className="pt-4 space-y-3">
          <h2 className="text-[15px] font-bold text-slate-900">
            Select a Category to Report
          </h2>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-2.5 hover:border-slate-200 hover:shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cat.bgColor} ${cat.textColor}`}
                >
                  {cat.icon}
                </div>
                <span className="text-[11.5px] font-bold text-slate-800 leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 3: Submit an issue Pop-up Modal (Image 3)
         ───────────────────────────────────────────────────────────── */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-[350px] w-full shadow-2xl border border-slate-100 space-y-4 animate-scale-up">

            {/* Modal Header */}
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug pr-2">
                  Submit an issuefor Rock Rd, Armagh, UK, BT60 3AB
                </h3>
                <Button
                  variant="icon"
                  size="icon-xs"
                  onClick={() => setShowSubmitModal(false)}
                  className="bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Category Pill Tag */}
              {selectedCategory && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${selectedCategory.bgColor} ${selectedCategory.textColor}`}
                  >
                    {selectedCategory.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {selectedCategory.name}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-1" />

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left">
              {/* Field 1: Issue */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Issue
                </label>
                <input
                  type="text"
                  required
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="Heating not working"
                  className="w-full px-3.5 py-2.5 rounded-full border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0891A2] transition-colors"
                />
              </div>

              {/* Field 2: Detailed Description */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="e.g., Heating in the living room is not working when we turn on the thermostat..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0891A2] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Field 3: Property Media Upload Box */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Property Media
                </label>
                <div className="border border-slate-200 rounded-2xl py-5 px-4 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#0891A2] hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-[#0891A2] transition-colors">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    Click to upload
                  </span>
                </div>
              </div>

              {/* Modal Buttons (Cancel & Submit) */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 rounded-full border-slate-200 text-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1 rounded-full shadow-sm"
                >
                  Submit
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION BAR (Standardized reusable component)
         ───────────────────────────────────────────────────────────── */}
      <TenantBottomNav
        activeTab="maintenance"
        onNavigateToDashboard={onBackToDashboard}
        onNavigateToSearch={onNavigateToSearch}
        onNavigateToMatches={onNavigateToMatches}
        onNavigateToMaintenance={() => {}}
        onNavigateToProfile={onNavigateToProfile}
      />

    </div>
  );
}
