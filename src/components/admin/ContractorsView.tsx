"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Briefcase,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contractor } from "./types";
import { CONTRACTORS_LIST } from "./adminMockData";

export function ContractorsView() {
  const [contractors] = useState<Contractor[]>(CONTRACTORS_LIST);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [tradeFilter, setTradeFilter] = useState<string>("All");

  // Metrics specifically tailored for Contractors & Trades
  const metrics = useMemo(() => {
    const total = contractors.length;
    const available = contractors.filter((c) => c.status === "Available").length;
    const busy = contractors.filter((c) => c.status === "Busy").length;
    const avgRating = (
      contractors.reduce((acc, c) => acc + c.rating, 0) / (total || 1)
    ).toFixed(1);

    return { total, available, busy, avgRating };
  }, [contractors]);

  // Filtered contractors
  const filteredContractors = useMemo(() => {
    return contractors.filter((c) => {
      if (statusFilter !== "All" && c.status !== statusFilter) {
        return false;
      }
      if (tradeFilter !== "All" && !c.trade.toLowerCase().includes(tradeFilter.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesTrade = c.trade.toLowerCase().includes(q);
        const matchesCompany = c.company.toLowerCase().includes(q);
        const matchesEmail = c.email.toLowerCase().includes(q);
        if (!matchesName && !matchesTrade && !matchesCompany && !matchesEmail) {
          return false;
        }
      }
      return true;
    });
  }, [contractors, statusFilter, tradeFilter, searchQuery]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 static md:sticky md:top-0 md:z-30 shadow-2xs w-full">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Contractors &amp; Trades
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage verified trade partners, ratings, and job availability.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partner, trade, phone..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0891A2] focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 w-full max-w-none flex-1">
        {/* Contractor-Specific KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {/* Metric 1 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Partners
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.total}</p>
          </div>

          {/* Metric 2 */}
          <div className="p-4 bg-white border border-emerald-200 bg-emerald-50/20 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Available Now
              </span>
              <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">{metrics.available}</p>
          </div>

          {/* Metric 3 */}
          <div className="p-4 bg-white border border-amber-200 bg-amber-50/20 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                On Active Jobs
              </span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{metrics.busy}</p>
          </div>

          {/* Metric 4 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0891A2] uppercase tracking-wider">
                Average Rating
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#0891A2]/10 flex items-center justify-center text-[#0891A2]">
                <Star className="w-4 h-4 fill-current text-amber-500" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.avgRating} ★</p>
          </div>
        </div>

        {/* Directory Card List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs p-5 space-y-5">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(["All", "Available", "Busy", "Offline"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === tab
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Trade Specialty Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Trade:</span>
              <Select value={tradeFilter} onValueChange={(val) => setTradeFilter(val)}>
                <SelectTrigger className="w-[180px] bg-slate-50 border-slate-200 h-9 font-medium text-xs">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Specialties</SelectItem>
                  <SelectItem value="Electrical">Electrical &amp; Lighting</SelectItem>
                  <SelectItem value="Plumbing">Plumbing &amp; Drainage</SelectItem>
                  <SelectItem value="Gas">Gas &amp; Heating</SelectItem>
                  <SelectItem value="Mould">Damp &amp; Mould</SelectItem>
                  <SelectItem value="Joinery">Joinery &amp; Kitchen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clean Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredContractors.length === 0 ? (
              <div className="col-span-full py-16 text-center text-sm text-slate-400">
                No contractors found matching the filter criteria.
              </div>
            ) : (
              filteredContractors.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
                >
                  {/* Partner Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {/* Soft Brand-Tinted Initial Box */}
                        <div className="w-11 h-11 rounded-xl bg-[#0891A2]/10 text-[#0891A2] font-bold flex items-center justify-center text-sm shadow-2xs border border-[#0891A2]/20">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">
                            {c.name}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">{c.company}</p>
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          c.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : c.status === "Busy"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    {/* Trade Badge */}
                    <div className="mt-3.5 flex items-center gap-2">
                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {c.trade}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Contact Info & Stats */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="space-y-1.5 text-slate-600">
                      <a
                        href={`tel:${c.phone}`}
                        className="flex items-center gap-2 hover:text-[#0891A2] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.phone}</span>
                      </a>
                      <a
                        href={`mailto:${c.email}`}
                        className="flex items-center gap-2 hover:text-[#0891A2] transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </a>
                    </div>

                    {/* Rating & Jobs Completed Bar */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100/80 bg-slate-50/60 p-2.5 rounded-xl">
                      <div className="flex items-center gap-1 font-bold text-amber-600 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{c.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">Rating</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700 font-semibold text-xs">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.completedJobs} Jobs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

