"use client";

import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Check,
  X,
  UploadCloud,
  FileText,
  Building2,
  FileCheck2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "../ui/Button";

interface ProofOfAddressScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
  showStatusBar?: boolean;
}

export function ProofOfAddressScreen({
  onBack,
  onContinue,
  showStatusBar = true,
}: ProofOfAddressScreenProps) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("Utility bill.pdf");
  const [fileSize, setFileSize] = useState("789 KB");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeKb = Math.round(file.size / 1024);
      setFileSize(sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);
      setFileUploaded(true);
    }
  };

  const handleSelectSample = (name: string, size: string) => {
    setFileName(name);
    setFileSize(size);
    setFileUploaded(true);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Top Header */}
      <div className="shrink-0 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-medium text-slate-400 mb-1">
            Step 3 of 3 • Address Proof
          </span>
          <h1 className="text-[16px] font-bold text-slate-900 leading-none">
            Proof of Address
          </h1>
        </div>

        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col justify-between">
        {!fileUploaded ? (
          /* STATE 1: Upload Prompt & Guidelines */
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-between py-2">
            <div>
              {/* Title & Guidance */}
              <div className="text-center mb-4">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                  Upload your Address Proof
                </h2>
                <p className="text-[12px] text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                  Provide a recent document with your full name and current residential address.
                </p>
              </div>

              {/* Upload Dropzone / Button Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-2xl border-2 border-dashed border-[#0891A2]/40 bg-[#F0FDFA] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0891A2] hover:bg-cyan-50/70 transition-all shadow-xs group"
              >
                {/* Cloud with green circle & arrow */}
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-20 h-14 bg-[#BAE6FD]/40 rounded-full flex items-center justify-center relative">
                    <div className="w-12 h-12 bg-[#38BDF8]/20 rounded-full -top-3 -left-1 absolute" />
                    <div className="w-14 h-14 bg-[#38BDF8]/25 rounded-full -top-4 right-1 absolute" />
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center relative z-10 shadow-md group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                  Choose a file or drag &amp; drop
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Supported formats: PDF, JPG, PNG (Max size 10 MB)
                </p>

                <div className="mt-4">
                  <span className="px-4 py-2 rounded-xl bg-[#0891A2] text-white text-xs font-semibold shadow-xs hover:bg-[#0e7490] transition-colors inline-block">
                    Select Document
                  </span>
                </div>
              </div>

              {/* Accepted Documents List */}
              <div className="mt-5 space-y-2 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                  Accepted Documents (Last 3 Months)
                </span>

                <div
                  onClick={() => handleSelectSample("Utility_Bill_Armagh.pdf", "789 KB")}
                  className="p-3 rounded-xl border border-slate-100 bg-white hover:border-[#0891A2]/40 hover:bg-cyan-50/20 transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#0891A2] flex items-center justify-center shrink-0">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-800 group-hover:text-[#0891A2] transition-colors">
                        Utility Bill
                      </h4>
                      <p className="text-[10.5px] text-slate-400">
                        Electricity, gas, water, or broadband bill
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0891A2] opacity-0 group-hover:opacity-100 transition-opacity">
                    Use sample →
                  </span>
                </div>

                <div
                  onClick={() => handleSelectSample("Bank_Statement_Barclays.pdf", "1.2 MB")}
                  className="p-3 rounded-xl border border-slate-100 bg-white hover:border-[#0891A2]/40 hover:bg-cyan-50/20 transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      🏦
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-800 group-hover:text-[#0891A2] transition-colors">
                        Bank Statement
                      </h4>
                      <p className="text-[10.5px] text-slate-400">
                        Official monthly account statement
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0891A2] opacity-0 group-hover:opacity-100 transition-opacity">
                    Use sample →
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                onClick={() => handleSelectSample("Utility_Bill_Armagh.pdf", "789 KB")}
                className="h-12 font-semibold text-sm w-full"
              >
                Upload File
              </Button>
            </div>
          </div>
        ) : (
          /* STATE 2: File Uploaded & Ready ("File ready to upload") */
          <div className="flex-1 min-h-0 flex flex-col justify-between">
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-2 pb-4">
              <div className="text-center mb-5">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                  Document Selected
                </h2>
                <p className="text-[12px] text-slate-400 mt-1">
                  Your document has been scanned and is ready for submission.
                </p>
              </div>

              {/* Uploaded File Card */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-xs flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                  {/* Red PDF Icon */}
                  <div className="w-11 h-12 rounded-xl bg-rose-500 text-white flex flex-col items-center justify-center font-bold text-[9.5px] shadow-xs relative">
                    <div className="absolute top-0 right-0 w-3 h-3 bg-rose-600 rounded-bl-sm" />
                    <span>PDF</span>
                  </div>

                  <div className="text-left">
                    <h4 className="text-[13.5px] font-bold text-slate-900 leading-snug">
                      {fileName}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {fileSize} • Uploaded today
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => setFileUploaded(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Remove document"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document Summary Info */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 mt-4 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Recipient Name:</span>
                  <span className="font-bold text-slate-800">James Ray</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Address Matched:</span>
                  <span className="font-semibold text-slate-800">1 Cavanacaw Grange, Armagh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Validity Period:</span>
                  <span className="font-semibold text-emerald-600">Within last 90 days ✓</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: Success Box + Continue Button */}
            <div className="shrink-0 space-y-3.5 pt-3 border-t border-slate-50">
              {/* File Ready to upload Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100/90 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-slate-900 leading-tight">
                    File ready to upload
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Click continue to save this document and complete verification
                  </p>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                variant="primary"
                onClick={onContinue}
                className="h-12 font-semibold text-sm w-full"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
