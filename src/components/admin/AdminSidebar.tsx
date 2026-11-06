"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Layers,
  Users,
  UserCheck,
  PoundSterling,
  Settings,
  Wrench,
  Building,
  Home,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import { authApi, adminApi } from "@/lib/api";

interface AdminSidebarProps {
  pendingCount?: number;
}

export function AdminSidebar({ pendingCount: initialPendingCount }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Dynamic live count of pending service requests from backend
  const [pendingCount, setPendingCount] = useState<number>(initialPendingCount ?? 0);

  const fetchPendingCount = () => {
    adminApi
      .getAllRequests({ status: "Pending", limit: 1 })
      .then((res: any) => {
        const total = res?.meta?.total;
        if (typeof total === "number") {
          setPendingCount(total);
        } else if (Array.isArray(res?.data)) {
          setPendingCount(res.data.length);
        } else if (Array.isArray(res)) {
          setPendingCount(res.length);
        }
      })
      .catch(() => {
        // Silently retain current count on network issue
      });
  };

  useEffect(() => {
    if (typeof initialPendingCount === "number") {
      setPendingCount(initialPendingCount);
    }
  }, [initialPendingCount]);

  useEffect(() => {
    fetchPendingCount();

    const handleUpdate = () => fetchPendingCount();
    window.addEventListener("serviceRequestsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("serviceRequestsUpdated", handleUpdate);
    };
  }, [pathname]);

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
    } catch {
      // Continue client cleanup
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      setIsMobileMenuOpen(false);
      router.push("/login");
    }
  };

  const isDashboardActive = pathname === "/admin/dashboard" || pathname === "/admin";
  const isRequestsActive = pathname.startsWith("/admin/requests");
  const isContractorsActive = pathname.startsWith("/admin/contractors");
  
  // Users sub-routes active checks
  const isOverviewActive = pathname === "/admin/users/overview" || pathname === "/admin/users";
  const isTenantsActive = pathname.startsWith("/admin/users/tenants");
  const isLandlordsActive = pathname.startsWith("/admin/users/landlords");
  const isServiceClientsActive = pathname.startsWith("/admin/users/service-clients");
  const isUsersActive = isOverviewActive || isTenantsActive || isLandlordsActive || isServiceClientsActive || pathname.startsWith("/admin/users");

  // Collapse / Expand state for Users & Accounts dropdown
  const [isUsersCollapsed, setIsUsersCollapsed] = useState(!isUsersActive);

  // Auto-expand if user navigates to any user sub-route
  useEffect(() => {
    if (isUsersActive) {
      setIsUsersCollapsed(false);
    }
  }, [isUsersActive]);

  // Close mobile menu on route change & prevent background scroll when drawer is open
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isFinancesActive = pathname.startsWith("/admin/finances");
  const isSettingsActive = pathname.startsWith("/admin/settings");

  const navigationContent = (
    <>
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-2xs">
            <HouseHavenLogo width={28} height={36} variant="light" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base tracking-tight">HouseHaven</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#0891A2] text-white rounded-md uppercase tracking-wider">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Operations Control</p>
          </div>
        </div>

        {/* Close button for mobile drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto no-scrollbar">
        <div className="pb-1.5">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Operations
          </p>
        </div>

        <Link
          href="/admin/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
            isDashboardActive
              ? "bg-[#0891A2] text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </Link>

        <Link
          href="/admin/requests"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
            isRequestsActive
              ? "bg-[#0891A2] text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Service Requests</span>
          {pendingCount > 0 && (
            <span
              className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isRequestsActive ? "bg-white text-[#0891A2]" : "bg-amber-100 text-amber-800"
              }`}
            >
              {pendingCount}
            </span>
          )}
        </Link>

        <Link
          href="/admin/contractors"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
            isContractorsActive
              ? "bg-[#0891A2] text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Contractors &amp; Trades</span>
        </Link>

        {/* Users & Accounts Collapsible Dropdown */}
        <div className="space-y-1 pt-1">
          <button
            type="button"
            onClick={() => setIsUsersCollapsed((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
              isUsersActive
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-[#0891A2]" />
              <span>Users &amp; Accounts</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                !isUsersCollapsed ? "rotate-180 text-slate-700" : ""
              }`}
            />
          </button>

          {/* Collapsible Sub-routes: Overview, Tenants, Landlords, Service Clients */}
          {!isUsersCollapsed && (
            <div className="pl-4 pr-1 py-1 space-y-1 ml-2 border-l-2 border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
              <Link
                href="/admin/users/overview"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isOverviewActive
                    ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Overview &amp; Stats</span>
              </Link>

              <Link
                href="/admin/users/tenants"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isTenantsActive
                    ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Tenants</span>
              </Link>

              <Link
                href="/admin/users/landlords"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isLandlordsActive
                    ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Landlords</span>
              </Link>

              <Link
                href="/admin/users/service-clients"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isServiceClientsActive
                    ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Service Clients</span>
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/admin/finances"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
            isFinancesActive
              ? "bg-[#0891A2] text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <PoundSterling className="w-4 h-4" />
          <span>Finances &amp; Payouts</span>
        </Link>

        <Link
          href="/admin/settings"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
            isSettingsActive
              ? "bg-[#0891A2] text-white font-semibold shadow-xs"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Platform Settings</span>
        </Link>

        {/* Sign Out Nav Item */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sign Out</span>
        </button>
      </nav>

      {/* User Card with Quick Logout */}
      <div className="p-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0891A2] text-white font-bold flex items-center justify-center text-xs shadow-2xs shrink-0">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 truncate">Operations Admin</p>
            <p className="text-[11px] text-slate-400 truncate">admin@househaven.com</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      </>
  );

  return (
    <>
      {/* Mobile Top Navbar with Hamburger Toggle */}
      <header className="md:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1">
            <HouseHavenLogo width={22} height={28} variant="light" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 text-sm">HouseHaven</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#0891A2] text-white rounded uppercase tracking-wider">
              Admin
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Slide-Over Drawer from Left with Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel Sliding from Left */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-250 ease-out">
            {navigationContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex w-64 bg-white text-slate-700 flex-col shrink-0 h-screen sticky top-0 border-r border-slate-200 shadow-2xs">
        {navigationContent}
      </aside>

      {/* Logout Confirmation Modal Overlay */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[3px] flex items-center justify-center p-4 transition-all animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl relative text-center space-y-4">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto shadow-2xs">
              <LogOut className="w-6 h-6 stroke-[2] ml-0.5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sign out of Admin Portal?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You will be returned to the login screen and will need your credentials to sign back in.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
