"use client";

import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "pill"
  | "icon"
  | "nav";

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon-md"
  | "icon-lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  isActive?: boolean;
  prefetchHref?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth,
      isActive = false,
      prefetchHref,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      type = "button",
      children,
      onMouseEnter,
      onTouchStart,
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    const handlePointerHover = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefetchHref) {
        router.prefetch(prefetchHref);
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleTouch = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (prefetchHref) {
        router.prefetch(prefetchHref);
      }
      if (onTouchStart) onTouchStart(e);
    };

    // Base styling: fast touch action, GPU layer, instant active scale
    const baseStyles =
      "inline-flex items-center justify-center font-medium select-none cursor-pointer outline-none focus:outline-none transition-transform duration-150 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 touch-manipulation";

    const isIconButton = variant === "icon" || size?.startsWith("icon");
    const isNav = variant === "nav";
    const isCompactVariant =
      isIconButton || variant === "pill" || isNav;

    const hasExplicitWidth =
      /\b(w-\S+|flex-1|flex-auto|flex-initial|flex-none)\b/.test(className);

    // Standard action buttons default to full-width (w-full) like the original Button design.
    // Compact variants (icon, pill, nav) default to auto-width (w-auto).
    const isFullWidth =
      fullWidth !== undefined ? fullWidth : !isCompactVariant;

    const widthStyle = hasExplicitWidth
      ? ""
      : isNav
      ? "flex-1 min-w-0"
      : isFullWidth && !isIconButton
      ? "w-full"
      : "w-auto";

    const sizeStyles = isNav
      ? "h-auto p-0 rounded-xl"
      : {
          xs: "h-7 px-3 text-[11px] rounded-full",
          sm: "h-9 px-4 text-xs rounded-full",
          md: "h-12 px-6 text-sm rounded-full",
          lg: "h-14 px-8 text-base rounded-full",
          "icon-xs": "w-7 h-7 p-0 rounded-full",
          "icon-sm": "w-8 h-8 p-0 rounded-full",
          "icon-md": "w-10 h-10 p-0 rounded-full",
          "icon-lg": "w-12 h-12 p-0 rounded-full",
        }[size] || "h-12 px-6 text-sm rounded-full";

    const variantStyles = {
      // Primary #0891A2 solid
      primary:
        "bg-[#0891A2] hover:bg-[#078090] text-white shadow-xs hover:shadow-md border-0",
      // Outline #0891A2
      secondary:
        "bg-transparent hover:bg-[#0891A2]/10 text-[#0891A2] border border-[#0891A2]",
      // Subtle white/slate outline
      outline:
        "bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs",
      // Ghost transparent
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 border-0",
      // Danger / Pass / Red button
      danger:
        "bg-transparent hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 shadow-2xs",
      // Pill filter button (Active vs Inactive)
      pill: isActive
        ? "bg-[#0891A2] text-white font-bold shadow-xs border border-transparent"
        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50",
      // Icon button
      icon: "bg-transparent hover:bg-slate-100 text-slate-700 border-0",
      // Bottom nav button
      nav: isActive
        ? "text-[#0891A2] font-semibold flex flex-col items-center justify-center gap-1 py-1 px-0.5 border-0 bg-transparent active:scale-95"
        : "text-slate-400 hover:text-slate-600 font-medium flex flex-col items-center justify-center gap-1 py-1 px-0.5 border-0 bg-transparent active:scale-95",
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onMouseEnter={handlePointerHover}
        onTouchStart={handleTouch}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            <span>Please wait...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 mr-1.5">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0 ml-1.5">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
