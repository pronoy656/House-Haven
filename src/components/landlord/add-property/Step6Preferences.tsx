"use client";

import React from "react";

interface Step6PreferencesProps {
  preferences: Record<string, boolean>;
  togglePreference: (key: string) => void;
}

export function Step6Preferences({
  preferences,
  togglePreference,
}: Step6PreferencesProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Additional Tenant Preferences
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Set conditions and tenant screening preferences.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {Object.entries(preferences).map(([key, enabled]) => (
          <div
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => togglePreference(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePreference(key);
              }
            }}
            className="flex items-center justify-between gap-3 cursor-pointer py-1 group border-b border-slate-50 pb-2.5"
          >
            <span className="text-xs sm:text-[13.5px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              {key}
            </span>

            <div
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out shrink-0 ${
                enabled
                  ? "bg-[#0891A2]"
                  : "bg-slate-200 group-hover:bg-slate-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
                  enabled ? "translate-x-6.5" : "translate-x-0.5"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
