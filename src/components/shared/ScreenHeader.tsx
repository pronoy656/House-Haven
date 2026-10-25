"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface ScreenHeaderProps {
  title?: React.ReactNode;
  subtitle?: string;
  onBack?: () => void;
  backHref?: string;
  backAriaLabel?: string;
  rightAction?: React.ReactNode;
  borderBottom?: boolean;
  className?: string;
  titleClassName?: string;
  alignTitle?: "center" | "left";
}

/**
 * Reusable ScreenHeader component used across all app screens.
 * Provides a consistent circular back button, title, and optional right action.
 */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  backHref,
  backAriaLabel = "Go back",
  rightAction,
  borderBottom = false,
  className = "",
  titleClassName = "",
  alignTitle = "center",
}: ScreenHeaderProps) {
  const renderBackButton = () => {
    if (!onBack && !backHref) {
      return rightAction ? <div className="w-9 h-9" aria-hidden="true" /> : null;
    }

    const buttonClasses =
      "w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs active:scale-95 cursor-pointer shrink-0";

    if (backHref) {
      return (
        <Link href={backHref} className={buttonClasses} aria-label={backAriaLabel}>
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={onBack}
        className={buttonClasses}
        aria-label={backAriaLabel}
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
      </button>
    );
  };

  return (
    <div
      className={`px-5 py-3.5 flex items-center justify-between gap-3 shrink-0 ${
        borderBottom ? "border-b border-slate-100" : ""
      } ${className}`}
    >
      {/* Left Back Button / Spacer */}
      {renderBackButton()}

      {/* Title & Subtitle */}
      {title && (
        <div
          className={`flex-1 min-w-0 ${
            alignTitle === "center" ? "text-center" : "text-left"
          }`}
        >
          {typeof title === "string" ? (
            <h1
              className={`text-[16px] sm:text-[17px] font-bold text-slate-900 tracking-tight leading-tight truncate ${titleClassName}`}
            >
              {title}
            </h1>
          ) : (
            title
          )}
          {subtitle && (
            <p className="text-[11.5px] text-slate-500 font-normal leading-snug mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Right Action / Balance Spacer */}
      {rightAction ? (
        <div className="shrink-0 flex items-center justify-end">{rightAction}</div>
      ) : onBack || backHref ? (
        <div className="w-9 h-9 shrink-0" aria-hidden="true" />
      ) : null}
    </div>
  );
}
