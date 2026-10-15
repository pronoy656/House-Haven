import React from "react";

interface MobileStatusBarProps {
  time?: string;
  theme?: "light" | "dark";
}

/**
 * MobileStatusBar is intentionally rendered as null because real mobile devices
 * provide their own native OS status bar (WiFi, battery, time, signal).
 */
export function MobileStatusBar(_props: MobileStatusBarProps) {
  return null;
}
