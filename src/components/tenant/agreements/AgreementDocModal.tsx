"use client";

import React from "react";
import { Check, CheckCircle2, FileText, X } from "lucide-react";
import { Button } from "@/components/shared/Button";

export interface AgreementDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  signerName?: string;
  signDate?: string;
}

export function AgreementDocModal({
  isOpen,
  onClose,
  onDownload,
  signerName = "Andy Lexsian",
  signDate = "24 february 1996",
}: AgreementDocModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 w-full max-w-[325px] shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Signed Lease Agreement</h3>
              <p className="text-[10px] text-slate-400">Riverside Apartments #123</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="py-4 space-y-3">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-10 rounded bg-red-500 text-white flex flex-col items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[6.5px] font-black">PDF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Lease_Agreement_Signed.pdf</p>
              <p className="text-[10px] text-slate-400">12 pages • Verified Digital Signature</p>
            </div>
          </div>

          <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100 text-[11px] text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Signer:</span>
              <span className="font-semibold">{signerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date:</span>
              <span className="font-semibold">{signDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="text-emerald-600 font-semibold">Legally Binding & Signed</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={onDownload}
            leftIcon={<Check className="w-3.5 h-3.5" />}
          >
            Download Signed PDF
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
