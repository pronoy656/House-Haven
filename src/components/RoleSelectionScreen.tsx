"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";
import { Check, Home, User, Wrench } from "lucide-react";

interface RoleSelectionScreenProps {
  onNavigateToSignIn?: () => void;
  onContinue?: (role: string) => void;
  brandTitle?: string;
  showStatusBar?: boolean;
}

export type RoleId = "landlord" | "tenant" | "services";

interface RoleOption {
  id: RoleId;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLES: RoleOption[] = [
  {
    id: "landlord",
    title: "I'm a Landlord",
    description:
      "List and manage properties, review applications, manage tenants, maintenance and more.",
    bgColor: "bg-[#E6F0FA]",
    iconColor: "text-[#2B7FFF]",
    icon: Home,
  },
  {
    id: "tenant",
    title: "I'm a Tenant",
    description:
      "Find properties, apply, manage your tenancy and communicate with landlords.",
    bgColor: "bg-[#D6F5EC]",
    iconColor: "text-[#0D9488]",
    icon: User,
  },
  {
    id: "services",
    title: "I'm looking for Services",
    description:
      "Browse and request services without creating a landlord or tenant profile.",
    bgColor: "bg-[#FDF0DE]",
    iconColor: "text-[#D97706]",
    icon: Wrench,
  },
];

export function RoleSelectionScreen({
  onNavigateToSignIn,
  onContinue,
  brandTitle = "TenantFind",
  showStatusBar = true,
}: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState<RoleId>("tenant");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onContinue) {
        onContinue(selectedRole);
      }
    }, 400);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-5 pb-6 text-slate-900 overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col pt-1 pb-2">
        {/* Title & Subtitle */}
        <div className="text-left mb-5 shrink-0">
          <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-950 tracking-tight leading-snug">
            How would you like to use
            <br />
            {brandTitle}?
          </h1>
          <p className="text-[12px] sm:text-[13px] text-slate-500 mt-2 font-normal leading-relaxed">
            Choose the journey that fits you. You can explore services without creating a property profile.
          </p>
        </div>

        {/* Role Options */}
        <div className="space-y-3.5 my-auto px-1.5 py-1">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative flex items-center gap-3.5 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                  ? "border-[#0891A2] bg-[#0891A2]/[0.03] shadow-md shadow-[#0891A2]/10"
                  : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] shrink-0 flex items-center justify-center ${role.bgColor} transition-transform duration-200`}
                >
                  <Icon className={`w-8 h-8 sm:w-9 sm:h-9 ${role.iconColor} stroke-[2.2]`} />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-1 text-left">
                  <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug">
                    {role.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed font-normal">
                    {role.description}
                  </p>
                </div>

                {/* Selected Checkmark (Vertically centered on the right with proper margin) */}
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#0891A2] text-white flex items-center justify-center shrink-0 shadow-xs mr-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="shrink-0 z-20 pt-3 space-y-2">
        <Button
          variant="primary"
          onClick={handleContinue}
          isLoading={isSubmitting}
          className="h-12 font-semibold text-sm border-0 shadow-none outline-none w-full"
        >
          Continue
        </Button>

        {/* Footer Link to Sign In */}
        <div className="text-center text-xs text-slate-600 font-normal">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="font-semibold text-[#0891A2] hover:underline cursor-pointer transition-colors"
          >
            Sign in
          </button>
        </div>

        {/* Admin Portal Quick Link */}
        <div className="text-center pt-0.5">
          <Link
            href="/admin/requests"
            className="text-[11px] font-medium text-slate-400 hover:text-[#0891A2] transition-colors inline-flex items-center gap-1"
          >
            <span>Team member?</span>
            <span className="font-semibold underline">Go to Admin Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
