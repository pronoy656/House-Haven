"use client";

import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "info" | "neutral" | "danger";
  size?: "xs" | "sm" | "md";
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps["variant"]>, { badge: string; dot: string }> = {
  success: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  warning: {
    badge: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
  },
  info: {
    badge: "bg-cyan-50 text-[#0891A2] border-cyan-200/80",
    dot: "bg-[#0891A2]",
  },
  neutral: {
    badge: "bg-slate-100 text-slate-700 border-slate-200/80",
    dot: "bg-slate-400",
  },
  danger: {
    badge: "bg-rose-50 text-rose-700 border-rose-200/80",
    dot: "bg-rose-500",
  },
};

const SIZE_STYLES: Record<NonNullable<BadgeProps["size"]>, string> = {
  xs: "text-[9.5px] px-2 py-0.5",
  sm: "text-[11px] px-2.5 py-0.5",
  md: "text-xs px-3 py-1",
};

/**
 * Reusable Badge component for status indicators (Pending, Complete, Verified, etc.)
 */
export function Badge({
  children,
  variant = "info",
  size = "sm",
  dot = false,
  icon,
  className = "",
}: BadgeProps) {
  const styles = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border shadow-2xs leading-none select-none ${styles.badge} ${sizeStyle} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
