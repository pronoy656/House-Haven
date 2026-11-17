"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken, getCurrentUserRole } from "@/lib/api";
import { ShieldCheck } from "lucide-react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    const role = getCurrentUserRole();

    // Check if user has an active token and admin privileges
    if (!token || (role !== "admin" && role !== "super_admin")) {
      setIsAuthorized(false);
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname || "/admin/dashboard")}`;
      router.replace(redirectUrl);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-[#0891A2] border-t-transparent rounded-full animate-spin mb-3"></div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#0891A2]" />
          <span>Verifying admin authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Redirecting to Login...</span>
        </div>
        <p className="text-xs text-slate-400">Admin credentials required to view this area.</p>
      </div>
    );
  }

  return <>{children}</>;
}
