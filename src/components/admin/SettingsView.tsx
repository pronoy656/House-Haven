"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Bell,
  Sliders,
  Mail,
  Phone,
  CheckCircle2,
  Percent,
  Clock,
} from "lucide-react";

export function SettingsView() {
  const [quoteFeePercent, setQuoteFeePercent] = useState("10");
  const [minQuoteFee, setMinQuoteFee] = useState("15");
  const [slaHours, setSlaHours] = useState("24");
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [supportEmail, setSupportEmail] = useState("operations@househaven.com");
  const [supportPhone, setSupportPhone] = useState("+44 28 9012 3456");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs w-full">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure platform fees, dispatch rules, and operational contact information.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Settings saved successfully!
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="p-6 md:p-8 space-y-6 flex-1 w-full max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Fee Structure */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-[#0891A2] flex items-center justify-center font-bold">
                <Percent className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Commission &amp; Fee Structure</h2>
                <p className="text-xs text-slate-500">
                  Platform percentage applied to completed quotes and contractor payouts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Platform Service Fee (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={quoteFeePercent}
                    onChange={(e) => setQuoteFeePercent(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Minimum Service Dispatch Fee (£)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={minQuoteFee}
                    onChange={(e) => setMinQuoteFee(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    £
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Automation & Dispatch */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Automation &amp; SLA Rules</h2>
                <p className="text-xs text-slate-500">
                  Control dispatch logic and contractor response expectations.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Auto-recommend nearby verified contractors
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Automatically suggests top-rated technicians based on request category and postcode.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoDispatch}
                  onChange={(e) => setAutoDispatch(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0891A2] focus:ring-[#0891A2] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Quote Response SLA (Hours)
                </label>
                <div className="relative max-w-xs">
                  <input
                    type="number"
                    value={slaHours}
                    onChange={(e) => setSlaHours(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Operational Contacts */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Support &amp; Escalation Contacts</h2>
                <p className="text-xs text-slate-500">
                  Public contact details shown to clients and landlords on quote sheets.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Operations Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Helpline Phone
                </label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Notifications */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Notification Preferences</h2>
                <p className="text-xs text-slate-500">
                  Manage automatic SMS and email broadcasts to platform users.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Instant SMS dispatch alerts to contractors
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Sends job details directly to contractor phone upon quote acceptance.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0891A2] focus:ring-[#0891A2] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Daily transaction digest to administrators
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Sends daily breakdown of rent receipts and completed maintenance quotes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0891A2] focus:ring-[#0891A2] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0891A2] text-white hover:bg-[#0e7490] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

