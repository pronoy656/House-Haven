"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const COMMON_TENANT_ROUTES = [
  "/tenant/dashboard",
  "/tenant/search",
  "/tenant/matches",
  "/tenant/maintenance",
  "/tenant/profile",
  "/tenant/notifications",
  "/tenant/agreements",
];

const COMMON_LANDLORD_ROUTES = [
  "/landlord/dashboard",
  "/landlord/properties",
  "/landlord/applications",
  "/landlord/maintenance",
  "/landlord/profile",
  "/landlord/notifications",
];

const COMMON_AUTH_ROUTES = [
  "/choose-role",
  "/login",
  "/signup",
  "/otp",
];

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, navigation has completed!
  useEffect(() => {
    if (isNavigating) {
      const finishTimer = setTimeout(() => {
        setProgress(100);
      }, 10);
      const resetTimer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 220);
      return () => {
        clearTimeout(finishTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [pathname, searchParams]);

  // Global click listener to start progress bar whenever user clicks a navigation element
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [role='button'], [data-nav]");
      if (!target) return;

      // If it's a link or button that triggers navigation
      const href = target.getAttribute("href") || target.getAttribute("data-href");
      if (href && href.startsWith("/") && !href.startsWith("#") && href !== pathname) {
        setIsNavigating(true);
        setProgress(25);
      }
    };

    // Pre-fetch on touchstart or mouseenter for instant response
    const handlePointerHover = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [data-href]");
      if (!target) return;
      const href = target.getAttribute("href") || target.getAttribute("data-href");
      if (href && href.startsWith("/") && !href.startsWith("#")) {
        router.prefetch(href);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true, passive: true });
    document.addEventListener("mouseover", handlePointerHover, { capture: true, passive: true });
    document.addEventListener("touchstart", handlePointerHover, { capture: true, passive: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      document.removeEventListener("mouseover", handlePointerHover, { capture: true });
      document.removeEventListener("touchstart", handlePointerHover, { capture: true });
    };
  }, [pathname, router]);

  // Smoothly increment progress while navigating
  useEffect(() => {
    if (!isNavigating) return;

    const timer1 = setTimeout(() => setProgress((p) => (p < 60 ? 60 : p)), 100);
    const timer2 = setTimeout(() => setProgress((p) => (p < 85 ? 85 : p)), 250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isNavigating]);

  // Background intelligent route prefetching during idle time
  useEffect(() => {
    const prefetchRoutes = () => {
      let targets: string[] = [];
      if (pathname.startsWith("/tenant")) {
        targets = COMMON_TENANT_ROUTES;
      } else if (pathname.startsWith("/landlord")) {
        targets = COMMON_LANDLORD_ROUTES;
      } else {
        targets = COMMON_AUTH_ROUTES;
      }

      targets.forEach((route) => {
        if (route !== pathname) {
          router.prefetch(route);
        }
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as Window).requestIdleCallback(prefetchRoutes, { timeout: 1500 });
      return () => (window as Window).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(prefetchRoutes, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0891A2] via-[#06B6D4] to-[#38BDF8] transition-all ease-out duration-200 shadow-[0_0_8px_rgba(8,145,162,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
