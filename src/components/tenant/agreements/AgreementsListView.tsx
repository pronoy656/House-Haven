"use client";

import React from "react";
import Image from "next/image";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Badge } from "@/components/shared/Badge";
import { AgreementItem } from "./types";

export interface AgreementsListViewProps {
  agreements: AgreementItem[];
  filterTab: "all" | "pending" | "signed";
  onFilterChange: (tab: "all" | "pending" | "signed") => void;
  onSelectAgreement: (item: AgreementItem) => void;
  onBackToDashboard: () => void;
  onNavigateToNotifications: () => void;
}

export function AgreementsListView({
  agreements,
  filterTab,
  onFilterChange,
  onSelectAgreement,
  onBackToDashboard,
  onNavigateToNotifications,
}: AgreementsListViewProps) {
  const pendingCount = agreements.filter(
    (a) => a.status === "Pending Signature"
  ).length;
  const signedCount = agreements.filter(
    (a) => a.status === "Signed" || a.status === "Signed End"
  ).length;

  const filteredAgreements = agreements.filter((item) => {
    if (filterTab === "all") return true;
    if (filterTab === "pending")
      return item.status === "Pending Signature" || item.status === "Under Review";
    if (filterTab === "signed")
      return item.status === "Signed" || item.status === "Signed End";
    return true;
  });

  const getStatusBadgeVariant = (status: AgreementItem["status"]) => {
    switch (status) {
      case "Pending Signature":
        return "warning";
      case "Signed":
        return "success";
      case "Under Review":
        return "info";
      case "Signed End":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-200">
      {/* Reusable Header */}
      <ScreenHeader
        title="Agreements"
        onBack={onBackToDashboard}
        rightAction={
          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
        }
        className="px-4 pt-3 pb-2"
      />

      <div className="px-4 pb-6 flex-1 flex flex-col space-y-3.5">
        {/* Reusable Filter Tabs */}
        <FilterTabs
          tabs={["all", "pending", "signed"] as const}
          activeTab={filterTab}
          onChange={onFilterChange}
          counts={{
            all: agreements.length,
            pending: pendingCount,
            signed: signedCount,
          }}
        />

        {/* Agreements Cards List */}
        <div className="space-y-3">
          {filteredAgreements.map((agreement) => (
            <div
              key={agreement.id}
              onClick={() => onSelectAgreement(agreement)}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99] group"
            >
              {/* Thumbnail Image */}
              <div className="w-[62px] h-[62px] rounded-xl overflow-hidden relative shrink-0 bg-slate-100">
                <Image
                  src={agreement.image}
                  alt={agreement.title}
                  fill
                  sizes="62px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[13.5px] font-bold text-slate-900 truncate">
                  {agreement.title}
                </h3>
                <p className="text-[11px] text-slate-400 truncate">
                  {agreement.address}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {agreement.date}
                </p>

                {/* Status Badge */}
                <div className="mt-1.5">
                  <Badge
                    variant={getStatusBadgeVariant(agreement.status)}
                    size="xs"
                  >
                    {agreement.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
