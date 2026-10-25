"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export interface NotificationButtonProps {
  onClick?: () => void;
  hasUnread?: boolean;
  className?: string;
  prefetchHref?: string;
  ariaLabel?: string;
  role?: "tenant" | "landlord" | "service";
  size?: "sm" | "md";
  dotColor?: "red" | "primary";
}

/**
 * Reusable, perfectly circular Notification Bell button with an unread indicator dot.
 * Guaranteed 1:1 aspect ratio with shrink-0, aspect-square, and fixed min/max bounds
 * to prevent oval/squished shapes in flex containers.
 */
export function NotificationButton({
  onClick,
  hasUnread = true,
  className = "",
  prefetchHref,
  ariaLabel = "Notifications",
  role = "tenant",
  size = "md",
  dotColor = "red",
}: NotificationButtonProps) {
  const router = useRouter();

  const defaultHref =
    role === "landlord" ? "/landlord/notifications" : "/tenant/notifications";
  const targetHref = prefetchHref || defaultHref;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetHref) {
      router.push(targetHref);
    }
  };

  const handleMouseEnter = () => {
    if (targetHref) {
      router.prefetch(targetHref);
    }
  };

  const sizeClasses =
    size === "sm"
      ? "w-9 h-9 min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]"
      : "w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px]";

  const iconSizeClasses = size === "sm" ? "w-4.5 h-4.5" : "w-5 h-5";

  const dotColorClass =
    dotColor === "primary" ? "bg-[#0891A2]" : "bg-red-500";

  const dotPositionClasses =
    size === "sm"
      ? "top-1.5 right-1.5 w-2 h-2 min-w-[8px] min-h-[8px]"
      : "top-2 right-2 w-2.5 h-2.5 min-w-[10px] min-h-[10px]";

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`relative ${sizeClasses} aspect-square rounded-full shrink-0 inline-flex items-center justify-center bg-white shadow-sm border border-slate-100/90 text-slate-800 hover:bg-slate-50 active:scale-95 transition-all duration-150 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0891A2] ${className}`}
    >
      <Bell className={`${iconSizeClasses} stroke-[1.9] text-slate-800 shrink-0`} />
      {hasUnread && (
        <span
          aria-hidden="true"
          className={`absolute ${dotPositionClasses} ${dotColorClass} rounded-full ring-2 ring-white shrink-0 aspect-square pointer-events-none`}
        />
      )}
    </button>
  );
}
