"use client";

import React, { useState, useMemo } from "react";
import {
  PoundSterling,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  CreditCard,
  Building,
  Wrench,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminTransaction } from "./types";
import { ADMIN_TRANSACTIONS } from "./adminMockData";

export function FinancesView() {
  const [transactions] = useState<AdminTransaction[]>(ADMIN_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // 4 Metrics
  const metrics = useMemo(() => {
    const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
    const rentCollected = transactions
      .filter((t) => t.type === "Rent Payment" && t.status === "Completed")
      .reduce((acc, t) => acc + t.amount, 0);
    const platformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
    const pendingCount = transactions.filter((t) => t.status === "Pending").length;

    return { totalVolume, rentCollected, platformFees, pendingCount };
  }, [transactions]);

  // Filtered
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "All" && t.type !== typeFilter) return false;
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRef = t.referenceNo.toLowerCase().includes(q);
        const matchesFrom = t.fromUser.toLowerCase().includes(q);
        const matchesTo = t.toUser.toLowerCase().includes(q);
        if (!matchesRef && !matchesFrom && !matchesTo) return false;
      }
      return true;
    });
  }, [transactions, typeFilter, statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const getStatusBadge = (status: AdminTransaction["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Refunded":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 static md:sticky md:top-0 md:z-30 shadow-2xs w-full">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Finances &amp; Transactions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor rent payments, service quote dispatches, and contractor payouts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ref or customer..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2] text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 flex-1 w-full max-w-full">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Transaction Volume
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <PoundSterling className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              £{metrics.totalVolume.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-white border border-emerald-200 bg-emerald-50/20 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Rent Collected
              </span>
              <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Building className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">
              £{metrics.rentCollected.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-white border border-teal-200 bg-teal-50/20 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Platform Fees
              </span>
              <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-teal-900 mt-2">
              £{metrics.platformFees.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-white border border-amber-200 bg-amber-50/20 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Pending Transactions
              </span>
              <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{metrics.pendingCount}</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden w-full">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(
                [
                  "All",
                  "Rent Payment",
                  "Service Quote",
                  "Security Deposit",
                  "Contractor Payout",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setTypeFilter(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    typeFilter === tab
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[140px] h-8 text-xs font-medium bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 shadow-md">
                  <SelectItem value="All" className="text-xs">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="Completed" className="text-xs">
                    Completed
                  </SelectItem>
                  <SelectItem value="Pending" className="text-xs">
                    Pending
                  </SelectItem>
                  <SelectItem value="Failed" className="text-xs">
                    Failed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between sm:hidden text-[11px] text-slate-500 font-medium">
            <span>← Swipe table horizontally to see all columns →</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-5">Ref &amp; Type</th>
                  <th className="py-4 px-5">Payer (From)</th>
                  <th className="py-4 px-5">Recipient (To)</th>
                  <th className="py-4 px-5">Gross Amount</th>
                  <th className="py-4 px-5">Platform Fee</th>
                  <th className="py-4 px-5">Payment Method</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-sm text-slate-400">
                      No transactions found matching your filter.
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Ref & Type */}
                      <td className="py-4 px-5">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {tx.referenceNo}
                        </span>
                        <p className="font-semibold text-slate-900 text-sm mt-1">{tx.type}</p>
                      </td>

                      {/* From */}
                      <td className="py-4 px-5">
                        <p className="font-semibold text-slate-900 text-xs">{tx.fromUser}</p>
                      </td>

                      {/* To */}
                      <td className="py-4 px-5">
                        <p className="font-semibold text-slate-900 text-xs">{tx.toUser}</p>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-5">
                        <span className="font-bold text-slate-900 text-sm">
                          £{tx.amount.toLocaleString()}
                        </span>
                      </td>

                      {/* Fee */}
                      <td className="py-4 px-5">
                        <span className="font-semibold text-[#0891A2] text-xs">
                          {tx.platformFee > 0 ? `£${tx.platformFee.toFixed(2)}` : "Free"}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="py-4 px-5">
                        <span className="text-slate-600 text-xs font-medium">
                          {tx.paymentMethod}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5">
                        <span className="text-slate-600 text-xs font-medium">{tx.date}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            tx.status
                          )}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Showing <strong className="text-slate-800">{paginated.length}</strong> of{" "}
              <strong className="text-slate-800">{filtered.length}</strong> transactions
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-xs font-medium text-slate-600 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

