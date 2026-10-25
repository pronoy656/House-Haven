"use client";

import React from "react";
import Image from "next/image";
import { PROPERTY_TYPES } from "./mockData";

interface Step1PropertyTypeProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export function Step1PropertyType({
  selectedType,
  onSelectType,
}: Step1PropertyTypeProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Add Property
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Let&apos;s start with the type of property you want to list.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        {PROPERTY_TYPES.map((item) => {
          const isSelected = selectedType === item.id;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectType(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectType(item.id);
                }
              }}
              className={`p-3.5 rounded-[24px] flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all border text-center ${
                isSelected
                  ? "bg-[#D2FAFF] border-[#0891A2] shadow-xs ring-1 ring-[#0891A2]/25"
                  : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
              }`}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <span
                className={`text-xs sm:text-[13px] font-bold leading-tight ${
                  isSelected ? "text-slate-900" : "text-slate-800"
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
