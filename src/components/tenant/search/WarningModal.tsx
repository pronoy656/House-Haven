"use client";

import React from "react";
import { Button } from "@/components/shared/Button";

export interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProfile: () => void;
  onContinue: () => void;
}

export function WarningModal({
  isOpen,
  onClose,
  onEditProfile,
  onContinue,
}: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
        <h3 className="text-[19px] font-bold text-slate-900 tracking-tight">
          Warning!
        </h3>

        <p className="text-[12px] text-slate-600 leading-relaxed font-normal px-1">
          Your profile is not yet complete. Please complete your profile to at least 100% in order to best utilise the AI Search feature. Incomplete profiles may lead to suboptimal property recommendations that do not fully align with your preferences and requirements.
        </p>

        {/* Modal Actions */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              fullWidth
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={onEditProfile}
              className="text-xs"
            >
              Edit Application
            </Button>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={onContinue}
            className="text-xs font-semibold"
          >
            Continue to AI Search
          </Button>
        </div>
      </div>
    </div>
  );
}
