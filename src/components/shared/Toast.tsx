"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description?: string;
  duration?: number;
}

const TOAST_EVENT = "hh-show-toast";
const FLASH_KEY = "hh_flash_toast";

export const toast = {
  show: (item: Omit<ToastItem, "id">) => {
    if (typeof window !== "undefined") {
      const id = Math.random().toString(36).substring(2, 9);
      window.dispatchEvent(
        new CustomEvent(TOAST_EVENT, {
          detail: { ...item, id },
        })
      );
    }
  },
  success: (title: string, options?: { description?: string; duration?: number }) => {
    toast.show({
      type: "success",
      title,
      description: options?.description,
      duration: options?.duration || 4000,
    });
  },
  error: (title: string, options?: { description?: string; duration?: number }) => {
    toast.show({
      type: "error",
      title,
      description: options?.description,
      duration: options?.duration || 4500,
    });
  },
  info: (title: string, options?: { description?: string; duration?: number }) => {
    toast.show({
      type: "info",
      title,
      description: options?.description,
      duration: options?.duration || 4000,
    });
  },
  /**
   * Flash toast survives page reloads or client-side redirects!
   * Stored in sessionStorage and popped on target route mount.
   */
  flash: (
    title: string,
    type: "success" | "error" | "info" = "success",
    options?: { description?: string }
  ) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          FLASH_KEY,
          JSON.stringify({
            title,
            type,
            description: options?.description,
          })
        );
      } catch (e) {
        console.warn("Could not save flash toast", e);
      }
      // Also trigger in-page toast immediately
      toast.show({
        type,
        title,
        description: options?.description,
        duration: 4000,
      });
    }
  },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const pathname = usePathname();

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Check flash toast on mount and route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(FLASH_KEY);
        if (stored) {
          sessionStorage.removeItem(FLASH_KEY);
          const parsed = JSON.parse(stored);
          const id = Math.random().toString(36).substring(2, 9);
          setToasts((prev) => {
            // Avoid duplicate with same title if already shown
            if (prev.some((t) => t.title === parsed.title)) return prev;
            return [
              ...prev,
              {
                id,
                type: parsed.type || "success",
                title: parsed.title,
                description: parsed.description,
                duration: 4000,
              },
            ];
          });
        }
      } catch (e) {
        console.warn("Flash toast parse error", e);
      }
    }
  }, [pathname]);

  // Listen for live toast events
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<ToastItem>;
      if (custom.detail) {
        setToasts((prev) => {
          // Keep maximum 4 toasts at a time
          const filtered = prev.filter((t) => t.id !== custom.detail.id);
          return [...filtered.slice(-3), custom.detail];
        });
      }
    };
    window.addEventListener(TOAST_EVENT, handleEvent);
    return () => window.removeEventListener(TOAST_EVENT, handleEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-[99999] pointer-events-none flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full px-4 sm:px-0"
    >
      {toasts.map((item) => (
        <ToastCard key={item.id} item={item} onDismiss={() => removeToast(item.id)} />
      ))}
    </div>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, item.duration || 4000);
    return () => clearTimeout(timer);
  }, [item, onDismiss]);

  return (
    <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-slate-900 animate-in fade-in slide-in-from-top-4 sm:slide-in-from-right-4 duration-200 transition-all select-none">
      {/* Icon */}
      {item.type === "success" && (
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
        </div>
      )}
      {item.type === "error" && (
        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0 shadow-2xs">
          <AlertCircle className="w-5 h-5 stroke-[2.2]" />
        </div>
      )}
      {item.type === "info" && (
        <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0891A2] border border-teal-100 flex items-center justify-center shrink-0 shadow-2xs">
          <Info className="w-5 h-5 stroke-[2.2]" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
          {item.title}
        </p>
        {item.description && (
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
