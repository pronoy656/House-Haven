"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileScreen } from "@/components/services/ProfileScreen";
import { MobileContainer } from "@/components/MobileContainer";

function ServicesProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "service");
    }
    if (role !== "service" && role !== "services") {
      router.replace("/services/profile?role=service");
    }
  }, [role, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
    }
    router.push("/login");
  };

  return (
    <ProfileScreen
      onNavigateToServices={() => router.push("/services?role=service")}
      onNavigateToRequests={() => router.push("/services/requests?role=service")}
      onLogout={handleLogout}
      showStatusBar={true}
    />
  );
}

export default function ServicesProfilePage() {
  return (
    <MobileContainer>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Profile...</div>}>
        <ServicesProfileContent />
      </Suspense>
    </MobileContainer>
  );
}
