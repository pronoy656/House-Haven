"use client";

import React, { forwardRef, useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  labelClassName?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  containerClassName?: string;
  showPasswordToggle?: boolean;
}

/**
 * Reusable, accessible InputField component supporting filled/outlined styles,
 * multiple sizes, icons, password visibility toggle, label association, and error states.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      labelClassName = "",
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = "text",
      variant = "filled",
      inputSize = "md",
      className = "",
      containerClassName = "",
      showPasswordToggle = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const effectiveType = isPassword ? (showPassword ? "text" : "password") : type;

    // Sizing variants
    const sizeStyles = {
      sm: "h-10 text-xs rounded-xl",
      md: "h-12 text-sm rounded-2xl",
      lg: "h-14 text-base rounded-2xl",
    }[inputSize];

    // Styling variants
    const variantStyles =
      variant === "filled"
        ? "bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 border border-transparent focus:bg-white focus:ring-2 focus:ring-[#0891A2]"
        : "bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]";

    const errorStyles = error
      ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/20"
      : "";

    const hasRightElement = (isPassword && showPasswordToggle) || !!rightIcon;
    const hasCustomPx = className.includes("px-") || className.includes("p-0");
    const paddingLeft = className.includes("pl-") || hasCustomPx ? "" : (leftIcon ? "pl-11" : "px-4 sm:px-5");
    const paddingRight = className.includes("pr-") || hasCustomPx ? "" : (hasRightElement ? "pr-11" : "px-4 sm:px-5");

    return (
      <div className={`space-y-1 text-left w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-xs font-medium text-slate-500 pl-1 select-none ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          {/* Core Input */}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            disabled={disabled}
            className={`w-full transition-all outline-none focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${paddingLeft} ${paddingRight} ${errorStyles} ${className}`}
            {...props}
          />

          {/* Password Visibility Toggle */}
          {isPassword && showPasswordToggle && !rightIcon && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none p-1 transition-colors cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-slate-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-slate-400" />
              )}
            </button>
          )}

          {/* Custom Right Icon */}
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error or Helper Message */}
        {error ? (
          <p className="text-[11px] text-rose-500 pl-1 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400 pl-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
