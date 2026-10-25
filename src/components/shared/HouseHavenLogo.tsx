import React from "react";
import Image from "next/image";

interface HouseHavenLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
}

export function HouseHavenLogo({
  variant = "light",
  className = "",
  width = 72,
  height = 92,
}: HouseHavenLogoProps) {
  // In splash screens with dark backgrounds, use logo-2.png
  // Across the overall website (light backgrounds), use logo.png
  const src = variant === "dark" ? "/logo-2.png" : "/logo.png";
  const alt = "House Haven Logo";

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="object-contain h-auto"
      />
    </div>
  );
}
