"use client";

import React from "react";
import { Button } from "./Button";

export interface FilterTabsProps<T extends string> {
  tabs: readonly T[] | T[];
  activeTab: T;
  onChange: (tab: T) => void;
  counts?: Partial<Record<T, number>>;
  className?: string;
}

/**
 * Reusable FilterTabs component for tab pills ("All", "Pending", "Completed", etc.)
 */
export function FilterTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  counts,
  className = "",
}: FilterTabsProps<T>) {
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const count = counts?.[tab];

        return (
          <Button
            key={tab}
            type="button"
            variant="pill"
            size="sm"
            isActive={isActive}
            onClick={() => onChange(tab)}
            className="px-5 py-1.5 text-xs font-semibold shrink-0 cursor-pointer"
          >
            <span>{tab}</span>
            {count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-[#0891A2] text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
