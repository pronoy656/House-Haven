"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Users,
  UserCheck,
  PoundSterling,
  Settings,
  Wrench,
  Building,
  Home,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";

interface AdminSidebarProps {
  pendingCount?: number;
}

export function AdminSidebar({ pendingCount = 4 }: AdminSidebarProps) {
  const pathname = usePathname();

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isRequestsActive =
    pathname.startsWith("/admin/requests") || pathname === "/admin/dashboard" || pathname === "/admin";
  const isContractorsActive = pathname.startsWith("/admin/contractors");
  
  // Users sub-routes active checks
  const isTenantsActive = pathname.startsWith("/admin/users/tenants");
  const isLandlordsActive = pathname.startsWith("/admin/users/landlords");
  const isServiceClientsActive = pathname.startsWith("/admin/users/service-clients");
  const isUsersActive = isTenantsActive || isLandlordsActive || isServiceClientsActive || pathname.startsWith("/admin/users");

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

          {/* Collapsible Sub-routes: Tenants, Landlords, Service Clients */}
          {!isUsersCollapsed && (
            <div className="pl-4 pr-1 py-1 space-y-1 ml-2 border-l-2 border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
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

        <div className="pt-4 pb-1.5">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Quick Switch Portals
          </p>
        </div>

        <Link
          href="/services?role=service"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Wrench className="w-3.5 h-3.5 text-[#0891A2]" />
          <span>Services Client Hub</span>
          <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
        </Link>

        <Link
          href="/landlord/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Building className="w-3.5 h-3.5 text-[#2B7FFF]" />
          <span>Landlord Dashboard</span>
          <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
        </Link>

        <Link
          href="/tenant/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Tenant App</span>
          <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
        </Link>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/60 shrink-0">
        <div className="w-9 h-9 rounded-full bg-[#0891A2] text-white font-bold flex items-center justify-center text-xs shadow-2xs">
          AD
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-900 truncate">Operations Manager</p>
          <p className="text-[11px] text-slate-400 truncate">admin@househaven.com</p>
        </div>
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
    </>
  );
}
