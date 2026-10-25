"use client";

import React, { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { CategoryItem } from "./types";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CategoryItem | null;
  onSubmit: (title: string, description: string) => void;
}

export function ReportIssueModal({
  isOpen,
  onClose,
  selectedCategory,
  onSubmit,
}: ReportIssueModalProps) {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(issueTitle, issueDescription);
    setIssueTitle("");
    setIssueDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 animate-fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-[350px] w-full shadow-2xl border border-slate-100 space-y-4 animate-scale-up">

        {/* Modal Header */}
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug pr-2">
              Submit an issue for Rock Rd, Armagh, UK, BT60 3AB
            </h3>
            <Button
              variant="icon"
              size="icon-xs"
              onClick={onClose}
              className="bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Category Pill Tag */}
          {selectedCategory && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${selectedCategory.bgColor} ${selectedCategory.textColor}`}
              >
                {selectedCategory.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {selectedCategory.name}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-1" />

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {/* Field 1: Issue */}
          <InputField
            label="Issue"
            labelClassName="text-xs font-bold text-slate-800"
            type="text"
            required
            variant="outlined"
            inputSize="sm"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            placeholder="Heating not working"
            className="rounded-full"
          />

          {/* Field 2: Detailed Description */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              required
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="e.g., Heating in the living room is not working when we turn on the thermostat..."
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0891A2] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Field 3: Property Media Upload Box */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Property Media
            </label>
            <div className="border border-slate-200 rounded-2xl py-5 px-4 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#0891A2] hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-[#0891A2] transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Click to upload
              </span>
            </div>
          </div>

          {/* Modal Buttons (Cancel & Submit) */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1 rounded-full border-slate-200 text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1 rounded-full shadow-sm"
            >
              Submit
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
