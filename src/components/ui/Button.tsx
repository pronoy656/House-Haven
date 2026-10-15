"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = true,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  // Base styling: pill-shaped, smooth transitions, font-medium, clean tap with no outline border
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none cursor-pointer outline-none focus:outline-none active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";

  const sizeStyles = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  }[size];

  const variantStyles = {
    // Primary #0891A2 - strictly border-free
    primary:
      "bg-[#0891A2] hover:bg-[#0e7490] text-white shadow-xs hover:shadow-md border-0",
    // Outline #0891A2 border
    secondary:
      "bg-transparent hover:bg-[#0891A2]/10 text-[#0891A2] border border-[#0891A2]",
    // Subtle outline on dark or light backgrounds
    outline:
      "bg-transparent hover:bg-white/10 text-white border border-white/20",
    // Ghost
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-700 border-0",
  }[variant];

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          <span>Please wait...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
