"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Search, Repeat2, Wrench, User } from "lucide-react";
import { Button } from "@/components/shared/Button";

export type TenantNavTab = "dashboard" | "search" | "matches" | "maintenance" | "profile";

interface TenantBottomNavProps {
  activeTab: TenantNavTab;
  onNavigateToDashboard?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToMaintenance?: () => void;
  onNavigateToProfile?: () => void;
}

export function TenantBottomNav({
  activeTab,
  onNavigateToDashboard,
  onNavigateToSearch,
  onNavigateToMatches,
  onNavigateToMaintenance,
  onNavigateToProfile,
}: TenantBottomNavProps) {
  const router = useRouter();

  const handleDashboard = () => {
    if (onNavigateToDashboard) onNavigateToDashboard();
    else router.push("/tenant/dashboard");
  };

  const handleSearch = () => {
    if (onNavigateToSearch) onNavigateToSearch();
    else router.push("/tenant/search");
  };

  const handleMatches = () => {
    if (onNavigateToMatches) onNavigateToMatches();
    else router.push("/tenant/matches");
  };

  const handleMaintenance = () => {
    if (onNavigateToMaintenance) onNavigateToMaintenance();
    else router.push("/tenant/maintenance");
  };

  const handleProfile = () => {
    if (onNavigateToProfile) onNavigateToProfile();
    else router.push("/tenant/profile");
  };

  return (
    <nav
      aria-label="Tenant Navigation"
      className="shrink-0 z-30 bg-white border-t border-slate-100 px-1 py-1.5 flex items-center justify-between shadow-sm w-full"
    >
      <Button
        variant="nav"
        isActive={activeTab === "dashboard"}
        prefetchHref="/tenant/dashboard"
        onClick={handleDashboard}
        aria-label="Dashboard"
      >
        <LayoutGrid className="w-5 h-5 stroke-[2]" />
        <span className="text-[10.5px]">Dashboard</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "search"}
        prefetchHref="/tenant/search"
        onClick={handleSearch}
        aria-label="Search"
      >
        <Search className="w-5 h-5 stroke-[2]" />
        <span className="text-[10.5px]">Search</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "matches"}
        prefetchHref="/tenant/matches"
        onClick={handleMatches}
        aria-label="Matches"
      >
        <Repeat2 className="w-5 h-5 stroke-[2]" />
        <span className="text-[10.5px]">Matches</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "maintenance"}
        prefetchHref="/tenant/maintenance"
        onClick={handleMaintenance}
        aria-label="Maintenance"
      >
        <Wrench className="w-5 h-5 stroke-[2]" />
        <span className="text-[10.5px]">Maintenance</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "profile"}
        prefetchHref="/tenant/profile"
        onClick={handleProfile}
        aria-label="Profile"
      >
        <User className="w-5 h-5 stroke-[2]" />
        <span className="text-[10.5px]">Profile</span>
      </Button>
    </nav>
  );
}
