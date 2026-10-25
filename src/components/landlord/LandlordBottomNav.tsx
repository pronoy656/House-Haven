"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Building, FileText, MessageSquareMore, User } from "lucide-react";
import { Button } from "@/components/shared/Button";

export type LandlordNavTab = "dashboard" | "properties" | "applications" | "messages" | "profile";

interface LandlordBottomNavProps {
  activeTab?: LandlordNavTab;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
}

export function LandlordBottomNav({
  activeTab,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
}: LandlordBottomNavProps) {
  const router = useRouter();

  const handleDashboard = () => {
    if (onNavigateToDashboard) onNavigateToDashboard();
    else router.push("/landlord/dashboard");
  };

  const handleProperties = () => {
    if (onNavigateToProperties) onNavigateToProperties();
    else router.push("/landlord/properties");
  };

  const handleApplications = () => {
    if (onNavigateToApplications) onNavigateToApplications();
    else router.push("/landlord/applications");
  };

  const handleMessages = () => {
    if (onNavigateToMessages) onNavigateToMessages();
    else router.push("/landlord/notifications");
  };

  const handleProfile = () => {
    if (onNavigateToProfile) onNavigateToProfile();
    else router.push("/landlord/profile");
  };

  return (
    <nav
      aria-label="Landlord Navigation"
      className="shrink-0 z-30 bg-white border-t border-slate-100 px-1 py-1.5 flex items-center justify-between shadow-sm w-full"
    >
      <Button
        variant="nav"
        isActive={activeTab === "dashboard"}
        prefetchHref="/landlord/dashboard"
        onClick={handleDashboard}
        aria-label="Dashboard"
      >
        <LayoutGrid className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px]">Dashboard</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "properties"}
        prefetchHref="/landlord/properties"
        onClick={handleProperties}
        aria-label="Properties"
      >
        <Building className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px]">Properties</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "applications"}
        prefetchHref="/landlord/applications"
        onClick={handleApplications}
        aria-label="Applications"
      >
        <FileText className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px]">Applications</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "messages"}
        prefetchHref="/landlord/notifications"
        onClick={handleMessages}
        aria-label="Messages"
      >
        <MessageSquareMore className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px]">Messages</span>
      </Button>

      <Button
        variant="nav"
        isActive={activeTab === "profile"}
        prefetchHref="/landlord/profile"
        onClick={handleProfile}
        aria-label="Profile"
      >
        <User className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px]">Profile</span>
      </Button>
    </nav>
  );
}
