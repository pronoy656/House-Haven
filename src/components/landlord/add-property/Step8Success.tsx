"use client";

import React from "react";
import Image from "next/image";

export function Step8Success() {
  return (
    <div className="py-2 space-y-4 text-center">
      {/* House illustration */}
      <div className="relative w-full max-w-[280px] h-[175px] mx-auto flex items-center justify-center">
        <Image
          src="/landlord-house-illustration.png"
          alt="Property Published Illustration"
          fill
          sizes="280px"
          className="object-contain"
          priority
        />
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
          Property Published!
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Your property is now live and visible to potential tenants.
        </p>
      </div>

      {/* 3 Features Card */}
      <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-xs text-left space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 text-[#0891A2] flex items-center justify-center shrink-0 text-base">
            🏡
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
              Live on marketplace
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Tenants can now view details and submit applications
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-base">
            ✍️
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
              Instant Notifications
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              We&apos;ll notify you as soon as an inquiry or application arrives
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-base">
            📋
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
              Manage Anytime
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Update photos, adjust rent, or pause listing from your dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
