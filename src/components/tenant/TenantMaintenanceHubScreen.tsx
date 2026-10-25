"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Badge } from "@/components/shared/Badge";
import { TenantBottomNav } from "./TenantBottomNav";
import { MaintenanceIssue, CategoryItem } from "./maintenance/types";
import { MAINTENANCE_CATEGORIES } from "./maintenance/categoriesData";
import { ReportIssueModal } from "./maintenance/ReportIssueModal";

interface TenantMaintenanceHubScreenProps {
  onBackToDashboard?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  onViewIssueDetails?: (issueId?: string) => void;
}

const INITIAL_ISSUES: MaintenanceIssue[] = [
  {
    id: "issue-1",
    title: "Kitchen Sink Leak",
    description: "Water is leaking from the kitchen sink since yesterday.",
    date: "Reported Sep 12, 2026",
    status: "Pending",
    image: "/kitchen-sink-leak-real.png",
    actionNeeded: "Action needed · Select an appointment",
  },
  {
    id: "issue-2",
    title: "Bedroom Window Stuck",
    description: "The right window panel in the master bedroom will not open completely.",
    date: "Reported Aug 28, 2026",
    status: "Complete",
    image: "/great-georges-interior.jpg",
  },
  {
    id: "issue-3",
    title: "Heating Radiator Noise",
    description: "Radiator in the hallway making a loud banging noise when switched on.",
    date: "Reported Aug 15, 2026",
    status: "Pending",
    image: "/splash-livingroom-opt2.jpg",
    hasRequestUpdateButton: true,
  },
];

export function TenantMaintenanceHubScreen({
  onBackToDashboard,
  onNavigateToSearch,
  onNavigateToMatches,
  onNavigateToProfile,
  onNavigateToNotifications,
  onViewIssueDetails,
}: TenantMaintenanceHubScreenProps) {
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [issues, setIssues] = useState<MaintenanceIssue[]>(INITIAL_ISSUES);

  const categoriesRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setShowSubmitModal(true);
  };

  const handleCreateIssue = (title: string, description: string) => {
    const newIssue: MaintenanceIssue = {
      id: `issue-${Date.now()}`,
      title: title || (selectedCategory ? selectedCategory.name : "Reported Issue"),
      description: description || "Issue reported to the landlord.",
      date: "Reported Today",
      status: "Pending",
      image: "/kitchen-sink-leak-real.png",
    };
    setIssues((prev) => [newIssue, ...prev]);
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

          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
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
                sizes="110px"
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>

        {/* 3. Filter Tabs */}
        <div>
          <FilterTabs
            tabs={["All", "Pending", "Completed"] as const}
            activeTab={filter}
            onChange={setFilter}
            counts={{
              All: issues.length,
              Pending: issues.filter((i) => i.status === "Pending").length,
              Completed: issues.filter((i) => i.status === "Complete").length,
            }}
          />
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
                      sizes="64px"
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
                  <Badge
                    variant={issue.status === "Pending" ? "warning" : "success"}
                    size="xs"
                    dot
                  >
                    {issue.status}
                  </Badge>

                  <button
                    type="button"
                    onClick={() => onViewIssueDetails?.(issue.id)}
                    className="text-[11px] font-bold text-[#0891A2] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View Issue</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Action Needed Callout */}
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

                {/* Request an Update Button */}
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

        {/* 5. Select a Category to Report Section */}
        <div ref={categoriesRef} className="pt-4 space-y-3">
          <h2 className="text-[15px] font-bold text-slate-900">
            Select a Category to Report
          </h2>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {MAINTENANCE_CATEGORIES.map((cat) => (
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

      {/* Submit an Issue Modal */}
      <ReportIssueModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        selectedCategory={selectedCategory}
        onSubmit={handleCreateIssue}
      />

      {/* Bottom Navigation Bar */}
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
