"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallbackText?: string;
  isOnline?: boolean;
  priority?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  xs: { container: "w-5 h-5", px: "20px", icon: "w-3 h-3", text: "text-[9px]" },
  sm: { container: "w-8 h-8", px: "32px", icon: "w-4 h-4", text: "text-xs" },
  md: { container: "w-10 h-10", px: "40px", icon: "w-5 h-5", text: "text-sm" },
  lg: { container: "w-14 h-14", px: "56px", icon: "w-7 h-7", text: "text-base" },
  xl: { container: "w-20 h-20", px: "80px", icon: "w-9 h-9", text: "text-lg" },
};

/**
 * Reusable Avatar component with built-in Next.js sizes optimization,
 * fallback initial/icon, and online status badge.
 */
export function Avatar({
  src,
  alt = "User avatar",
  size = "md",
  fallbackText,
  isOnline,
  priority = false,
  className = "",
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const cfg = SIZE_CONFIG[size];

  const getInitials = (text?: string) => {
    if (!text) return "";
    return text
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const showImage = Boolean(src) && !hasError;

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`${cfg.container} rounded-full overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xs relative flex items-center justify-center select-none`}
      >
        {showImage && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={cfg.px}
            priority={priority}
            onError={() => setHasError(true)}
            className="object-cover"
          />
        ) : fallbackText ? (
          <span className={`font-bold text-slate-600 ${cfg.text}`}>
            {getInitials(fallbackText)}
          </span>
        ) : (
          <User className={`${cfg.icon} text-slate-400`} />
        )}
      </div>

      {isOnline && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/20"
          title="Online"
        />
      )}
    </div>
  );
}
