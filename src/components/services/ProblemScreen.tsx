"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, UploadCloud, Zap, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileStatusBar } from "@/components/MobileStatusBar";
import Image from "next/image";

interface ProblemScreenProps {
  address?: string;
  serviceCategory?: string;
  onBack?: () => void;
  onSubmitProblem?: (problemData: {
    issue: string;
    description: string;
    quoted: string;
    photoUrl?: string;
    category: string;
    address: string;
  }) => void;
  showStatusBar?: boolean;
}

export function ProblemScreen({
  address = "Rock Rd, Armagh, UK, BT60 3AB",
  serviceCategory = "Electricity",
  onBack,
  onSubmitProblem,
  showStatusBar = true,
}: ProblemScreenProps) {
  const [issue, setIssue] = useState("Electricity problem in house");
  const [description, setDescription] = useState(
    "We are currently experiencing an electricity outage affecting several areas. Our team is working to resolve the problem as quickly as possible. We appreciate your patience and will provide updates soon."
  );
  const [quoted, setQuoted] = useState("$75–$100");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmitProblem) {
        onSubmitProblem({
          issue: issue || "Electricity problem in house",
          description:
            description ||
            "We are currently experiencing an electricity outage affecting several areas. Our team is working to resolve the problem as quickly as possible.",
          quoted: quoted || "$75–$100",
          photoUrl: photoPreview || "/services-house.jpg",
          category: serviceCategory || "Electricity",
          address: address || "Rock Rd, Armagh, UK, BT60 3AB",
        });
      }
    }, 300);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header */}
      <div className="pt-2 pb-3 shrink-0 z-20 bg-white">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Problem
          </h1>

          <div className="w-9"></div>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 text-left pt-1 pb-4">
        {/* Title Headline & Category Badge */}
        <div className="space-y-3">
          <h2 className="text-[17px] font-bold text-slate-900 leading-snug">
            Submit an issue for {address}
          </h2>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F9FD] border border-sky-100/60 text-xs font-semibold text-slate-800">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </span>
            <span>{serviceCategory}</span>
          </div>
        </div>

        {/* Issue Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-500 pl-1">
            Issue
          </label>
          <input
            type="text"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="e.g. Electricity problem in house"
            className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
          />
        </div>

        {/* Detailed Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-500 pl-1">
            Issue Detailed Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full p-4 border border-slate-200 rounded-2xl text-xs text-slate-700 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all leading-relaxed resize-none"
          />
        </div>

        {/* Issue Photo Upload */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-500 pl-1">
            Issue Photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors relative overflow-hidden"
          >
            {photoPreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={photoPreview}
                  alt="Issue photo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center font-medium">
                  Click to replace photo
                </div>
              </div>
            ) : (
              <>
                <UploadCloud className="w-7 h-7 text-slate-500 mb-1" />
                <span className="text-xs font-medium text-slate-800">
                  Click to upload
                </span>
              </>
            )}
          </div>
        </div>

        {/* Quoted Price */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-500 pl-1">
            Quoted
          </label>
          <input
            type="text"
            value={quoted}
            onChange={(e) => setQuoted(e.target.value)}
            placeholder="$75–$100"
            className="w-full h-12 px-4 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] transition-all"
          />
        </div>
      </div>

        {/* Action Buttons Row */}
        <div className="shrink-0 pt-3 border-t border-slate-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 rounded-full border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Back
          </button>
          <div className="flex-1">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="h-12 font-semibold text-sm tracking-wide"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
