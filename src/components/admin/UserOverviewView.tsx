"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Home,
  Building,
  Wrench,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  RefreshCw,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  UserCheck,
  ChevronRight,
  BarChart3,
  Layers,
  Sparkles,
  Activity,
  LogOut,
} from "lucide-react";
import { adminApi, authApi } from "@/lib/api";
import { useRouter } from "next/navigation";

interface MonthlyData {
  label: string;
  year: number;
  total: number;
  tenants: number;
  landlords: number;
  services: number;
}

interface WeeklyData {
  label: string;
  date: string;
  total: number;
  tenants: number;
  landlords: number;
  services: number;
}

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verified: boolean;
  phone?: string;
  createdAt: string;
  address?: {
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

interface OverviewStats {
  counts: {
    totalUsers: number;
    totalTenants: number;
    totalLandlords: number;
    totalServices: number;
    activeUsers: number;
    inactiveUsers: number;
    verifiedUsers: number;
    pendingVerification: number;
  };
  roleDistribution: {
    tenants: { count: number; percentage: number };
    landlords: { count: number; percentage: number };
    services: { count: number; percentage: number };
  };
  monthlyGrowth: MonthlyData[];
  weeklyGrowth: WeeklyData[];
  recentUsers: RecentUser[];
}

export function UserOverviewView() {
  const router = useRouter();
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chartMode, setChartMode] = useState<"monthly" | "weekly">("monthly");
  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchStats = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const data = await adminApi.getUserOverviewStats();
      if (data) {
        setStats(data);
        const now = new Date();
        setLastUpdated(
          now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        );
      }
    } catch (err) {
      console.error("Failed to load user overview stats:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = useMemo(() => {
    if (!stats) return [];
    return chartMode === "monthly" ? stats.monthlyGrowth : stats.weeklyGrowth;
  }, [stats, chartMode]);

  const maxChartValue = useMemo(() => {
    if (!chartData || chartData.length === 0) return 10;
    const maxVal = Math.max(...chartData.map((d) => d.total));
    return maxVal > 0 ? Math.ceil(maxVal * 1.25) : 10;
  }, [chartData]);

  const getRoleBadge = (role: string) => {
    const normalized = (role || "").toLowerCase();
    if (normalized === "tenant" || normalized === "user") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <Home className="w-3 h-3 text-sky-600" />
          Tenant
        </span>
      );
    }
    if (normalized === "landlord") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Building className="w-3 h-3 text-indigo-600" />
          Landlord
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Wrench className="w-3 h-3 text-amber-600" />
        Services
      </span>
    );
  };

  const getRoleLink = (role: string) => {
    const normalized = (role || "").toLowerCase();
    if (normalized === "tenant" || normalized === "user") return "/admin/users/tenants";
    if (normalized === "landlord") return "/admin/users/landlords";
    return "/admin/users/service-clients";
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header - Full Width */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 static md:sticky md:top-0 md:z-30 shadow-2xs w-full">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live DB
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time platform analytics, user growth charts, role distribution, and recent activity from MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {lastUpdated && (
            <span className="text-xs text-slate-400">
              Updated: {lastUpdated}
            </span>
          )}
          <button
            onClick={() => fetchStats(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={async () => {
              if (window.confirm("Are you sure you want to sign out from the Admin Portal?")) {
                await authApi.logout();
                router.push("/login");
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer shadow-2xs"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body - Full Width */}
      <main className="p-4 sm:p-6 md:p-8 space-y-6 flex-1 w-full max-w-full">
        {/* 5 Distinct-Colored Stat Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 animate-pulse space-y-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="w-16 h-6 bg-slate-100 rounded" />
              <div className="w-24 h-3 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Platform Users */}
          <div className="bg-white p-4 rounded-xl border-l-4 border-l-[#0891A2] border-y border-r border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Users
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0891A2] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {stats.counts.totalUsers}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-teal-600" />
              Across all 3 user roles
            </p>
          </div>

          {/* Card 2: Tenants */}
          <Link
            href="/admin/users/tenants"
            className="group bg-white p-4 rounded-xl border-l-4 border-l-sky-500 border-y border-r border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-sky-600 transition-colors">
                Tenants
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                <Home className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-slate-900">
                {stats.counts.totalTenants}
              </p>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {stats.roleDistribution.tenants.percentage}% of total users
            </p>
          </Link>

          {/* Card 3: Landlords */}
          <Link
            href="/admin/users/landlords"
            className="group bg-white p-4 rounded-xl border-l-4 border-l-indigo-500 border-y border-r border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                Landlords
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-slate-900">
                {stats.counts.totalLandlords}
              </p>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {stats.roleDistribution.landlords.percentage}% of total users
            </p>
          </Link>

          {/* Card 4: Services */}
          <Link
            href="/admin/users/service-clients"
            className="group bg-white p-4 rounded-xl border-l-4 border-l-amber-500 border-y border-r border-slate-200 shadow-xs hover:shadow-sm transition-all cursor-pointer block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-amber-600 transition-colors">
                Services
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-bold text-slate-900">
                {stats.counts.totalServices}
              </p>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {stats.roleDistribution.services.percentage}% of total users
            </p>
          </Link>

          {/* Card 5: Verified & Active Health */}
          <div className="bg-white p-4 rounded-xl border-l-4 border-l-emerald-500 border-y border-r border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active &amp; Verified
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {stats.counts.verifiedUsers}
              <span className="text-xs font-normal text-slate-400 ml-1.5">
                / {stats.counts.totalUsers}
              </span>
            </p>
            <p className="text-[11px] text-emerald-600 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {stats.counts.activeUsers} Active Accounts
            </p>
          </div>
        </div>
      ) : null}

      {/* Main Grid: Interactive Registration Growth Chart & Role Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Growth Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0891A2]" />
                  <h2 className="text-base font-bold text-slate-900">
                    User Registration Growth
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Breakdown of new accounts created across roles
                </p>
              </div>

              {/* Toggle: Monthly vs Weekly */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartMode("monthly")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    chartMode === "monthly"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly (6M)
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode("weekly")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    chartMode === "weekly"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Weekly (7D)
                </button>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 py-3 text-xs text-slate-600 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0891A2]" />
                <span className="font-medium text-slate-700">Tenants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-500" />
                <span className="font-medium text-slate-700">Landlords</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-500" />
                <span className="font-medium text-slate-700">Services</span>
              </div>
              <div className="ml-auto text-[11px] text-slate-400">
                Hover bar to view breakdown
              </div>
            </div>

            {/* Visual SVG / HTML Bar Chart */}
            <div className="relative pt-6 pb-2 h-64 flex items-end gap-3 sm:gap-6 border-b border-slate-100">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 animate-pulse">
                  Loading growth chart...
                </div>
              ) : chartData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                  No registration data available
                </div>
              ) : (
                chartData.map((item, index) => {
                  const barHeightPct = Math.max(
                    8,
                    Math.round((item.total / maxChartValue) * 100)
                  );
                  const isHovered = activeHoverBar === index;

                  return (
                    <div
                      key={index}
                      className="flex-1 h-full flex flex-col justify-end items-center relative group cursor-pointer"
                      onMouseEnter={() => setActiveHoverBar(index)}
                      onMouseLeave={() => setActiveHoverBar(null)}
                    >
                      {/* Floating Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-16 z-20 bg-slate-900 text-white text-[11px] p-2.5 rounded-xl shadow-lg border border-slate-700 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                          <p className="font-bold text-white border-b border-slate-700 pb-1 mb-1">
                            {item.label} {chartMode === "monthly" ? (item as MonthlyData).year : ""}: {item.total} New Users
                          </p>
                          <div className="space-y-0.5 text-[10px]">
                            <div className="flex items-center justify-between gap-3 text-teal-300">
                              <span>Tenants:</span>
                              <span className="font-semibold">{item.tenants}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-indigo-300">
                              <span>Landlords:</span>
                              <span className="font-semibold">{item.landlords}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-amber-300">
                              <span>Services:</span>
                              <span className="font-semibold">{item.services}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Total count badge above bar */}
                      <span
                        className={`text-[10px] font-bold mb-1.5 transition-colors ${
                          isHovered ? "text-[#0891A2]" : "text-slate-400"
                        }`}
                      >
                        {item.total}
                      </span>

                      {/* Stacked Bar Container */}
                      <div
                        style={{ height: `${barHeightPct}%` }}
                        className={`w-full max-w-[42px] rounded-t-lg overflow-hidden flex flex-col justify-end transition-all duration-300 ${
                          isHovered
                            ? "ring-2 ring-slate-400 ring-offset-2 scale-[1.03]"
                            : ""
                        }`}
                      >
                        {/* Segment 3: Services (Top) */}
                        {item.services > 0 && (
                          <div
                            style={{
                              flex: item.services,
                            }}
                            className="w-full bg-amber-500 hover:bg-amber-400 transition-colors"
                          />
                        )}
                        {/* Segment 2: Landlords (Middle) */}
                        {item.landlords > 0 && (
                          <div
                            style={{
                              flex: item.landlords,
                            }}
                            className="w-full bg-indigo-500 hover:bg-indigo-400 transition-colors"
                          />
                        )}
                        {/* Segment 1: Tenants (Bottom) */}
                        {item.tenants > 0 && (
                          <div
                            style={{
                              flex: item.tenants,
                            }}
                            className="w-full bg-[#0891A2] hover:bg-[#0e7490] transition-colors"
                          />
                        )}
                      </div>

                      {/* Label on X-axis */}
                      <span className="text-[11px] font-semibold text-slate-500 mt-2 truncate max-w-full">
                        {item.label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Bars represent registered accounts saved in MongoDB</span>
            <span className="font-medium text-slate-600">
              Total Recorded: {stats?.counts.totalUsers || 0}
            </span>
          </div>
        </div>

        {/* Role Distribution & Account Health (1 Col) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Activity className="w-4 h-4 text-[#0891A2]" />
              <h2 className="text-base font-bold text-slate-900">
                Role Breakdown &amp; Health
              </h2>
            </div>

            {/* Segmented Progress Bar */}
            {stats && (
              <div className="mt-4">
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    style={{ width: `${stats.roleDistribution.tenants.percentage}%` }}
                    className="bg-[#0891A2] transition-all duration-500"
                    title={`Tenants: ${stats.roleDistribution.tenants.percentage}%`}
                  />
                  <div
                    style={{ width: `${stats.roleDistribution.landlords.percentage}%` }}
                    className="bg-indigo-500 transition-all duration-500"
                    title={`Landlords: ${stats.roleDistribution.landlords.percentage}%`}
                  />
                  <div
                    style={{ width: `${stats.roleDistribution.services.percentage}%` }}
                    className="bg-amber-500 transition-all duration-500"
                    title={`Services: ${stats.roleDistribution.services.percentage}%`}
                  />
                </div>
              </div>
            )}

            {/* Detailed Role Metric Rows */}
            <div className="mt-4 space-y-3">
              {/* Tenants Row */}
              <Link
                href="/admin/users/tenants"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Home className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      Tenants
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Renting &amp; service consumers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">
                    {stats?.counts.totalTenants || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({stats?.roleDistribution.tenants.percentage || 0}%)
                  </span>
                </div>
              </Link>

              {/* Landlords Row */}
              <Link
                href="/admin/users/landlords"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Building className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Landlords
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Property owners &amp; managers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">
                    {stats?.counts.totalLandlords || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({stats?.roleDistribution.landlords.percentage || 0}%)
                  </span>
                </div>
              </Link>

              {/* Service Clients Row */}
              <Link
                href="/admin/users/service-clients"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      Services &amp; Trades
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Plumbing, electrical, heating
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">
                    {stats?.counts.totalServices || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({stats?.roleDistribution.services.percentage || 0}%)
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Account Verification Health Box */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verification Status
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {stats
                  ? Math.round((stats.counts.verifiedUsers / Math.max(1, stats.counts.totalUsers)) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="h-1.5 w-full bg-emerald-200/50 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${
                    stats
                      ? Math.round(
                          (stats.counts.verifiedUsers / Math.max(1, stats.counts.totalUsers)) * 100
                        )
                      : 0
                  }%`,
                }}
                className="h-full bg-emerald-600 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1">
              <span>{stats?.counts.verifiedUsers || 0} Verified</span>
              <span>{stats?.counts.pendingVerification || 0} Pending Code</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent User Registrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0891A2]" />
              <h2 className="text-base font-bold text-slate-900">
                Recent User Registrations
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest users signed up on House Haven, directly retrieved from MongoDB
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/users/tenants"
              className="text-xs font-semibold text-[#0891A2] hover:text-[#0e7490] flex items-center gap-1 cursor-pointer"
            >
              <span>Manage all accounts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-slate-400 animate-pulse space-y-3">
              <div className="h-6 bg-slate-100 rounded w-1/2 mx-auto" />
              <div className="h-6 bg-slate-100 rounded w-2/3 mx-auto" />
              <div className="h-6 bg-slate-100 rounded w-1/3 mx-auto" />
            </div>
          ) : !stats || stats.recentUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No users found</p>
              <p className="text-xs text-slate-400 mt-1">
                New user signups will appear here in real time.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 sm:px-6">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentUsers.map((user) => {
                  const regDate = new Date(user.createdAt);
                  const formattedDate = regDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const formattedTime = regDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  const initials = (user.name || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Name & Email with Avatar */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0891A2]/10 text-[#0891A2] font-bold text-xs flex items-center justify-center shrink-0 border border-[#0891A2]/20">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {user.name || "Unnamed User"}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {user.phone ? (
                          <span className="flex items-center gap-1 text-slate-700">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {user.phone}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Registered Date & Time */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <p className="font-medium text-slate-900">{formattedDate}</p>
                        <p className="text-[10px] text-slate-400">{formattedTime}</p>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {user.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Verification */}
                      <td className="py-3.5 px-4">
                        {user.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                            <ShieldAlert className="w-3 h-3 text-amber-600" />
                            Pending Code
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={getRoleLink(user.role)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-[#0891A2] hover:text-white text-slate-700 transition-colors cursor-pointer"
                        >
                          <span>View Role</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}

