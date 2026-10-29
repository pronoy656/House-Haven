import React from "react";

export default function AdminLoading() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50 animate-pulse">
      {/* Top Header Skeleton */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs w-full">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          <div className="h-3.5 w-72 bg-slate-100 rounded-md" />
        </div>
        <div className="h-10 w-full sm:w-80 bg-slate-100 rounded-xl" />
      </header>

      {/* Main Body */}
      <main className="p-6 md:p-8 space-y-6 flex-1 w-full max-w-full">
        {/* 4 Stat Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
                <div className="w-8 h-8 rounded-lg bg-slate-100" />
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Content Table / Card Skeleton */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden w-full">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((tab) => (
                <div key={tab} className="h-8 w-16 bg-slate-100 rounded-xl" />
              ))}
            </div>
            <div className="h-8 w-32 bg-slate-100 rounded-xl" />
          </div>

          {/* Table Header Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
            <div className="h-4 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-200 rounded hidden md:block" />
            <div className="h-4 w-24 bg-slate-200 rounded hidden lg:block" />
            <div className="h-4 w-24 bg-slate-200 rounded hidden sm:block" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-200 rounded" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                {/* Ref & Title */}
                <div className="space-y-2 flex-1 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                    <div className="h-3.5 w-12 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 w-48 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>

                {/* Customer */}
                <div className="space-y-1.5 hidden md:block w-36">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>

                {/* Location */}
                <div className="space-y-1.5 hidden lg:block w-40">
                  <div className="h-3.5 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                </div>

                {/* Appointment */}
                <div className="space-y-1.5 hidden sm:block w-28">
                  <div className="h-3.5 w-20 bg-slate-200 rounded" />
                  <div className="h-3 w-14 bg-slate-100 rounded" />
                </div>

                {/* Status */}
                <div className="w-24">
                  <div className="h-6 w-20 bg-slate-100 rounded-full" />
                </div>

                {/* Action button */}
                <div className="w-20 flex justify-end">
                  <div className="h-8 w-16 bg-slate-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-slate-200 rounded-xl" />
              <div className="h-8 w-20 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

