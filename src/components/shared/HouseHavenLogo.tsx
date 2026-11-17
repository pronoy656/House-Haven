import React from "react";
import { Building2 } from "lucide-react";

interface HouseHavenLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
}

export function HouseHavenLogo({
  variant = "light",
  className = "",
  width = 36,
  height = 36,
}: HouseHavenLogoProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`flex items-center justify-center rounded-xl select-none ${
        isDark
          ? "bg-white/10 text-white border border-white/15"
          : "bg-teal-50 text-[#0891A2] border border-teal-100"
      } ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="Platform Icon"
    >
      <Building2 className="w-1/2 h-1/2 stroke-[2]" />
    </div>
  );
}
