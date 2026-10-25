"use client";

import React from "react";
import Image from "next/image";

export interface HeroBannerProps {
  imageSrc: string;
  imageAlt?: string;
  heightClass?: string;
  gradientOverlay?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable HeroBanner component for top landscape image headers with subtle gradient overlay.
 */
export function HeroBanner({
  imageSrc,
  imageAlt = "Hero Banner",
  heightClass = "h-[142px]",
  gradientOverlay = "from-sky-50/95 via-sky-50/70 to-transparent",
  children,
  className = "",
}: HeroBannerProps) {
  return (
    <div
      className={`relative w-full ${heightClass} shrink-0 overflow-hidden ${className}`}
    >
      {/* Background Banner Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 480px) 100vw, 440px"
        className="object-cover object-right-bottom select-none pointer-events-none"
      />

      {/* Gradient Overlay for Text Readability */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientOverlay} pointer-events-none`}
      />

      {/* Overlay Content */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}
