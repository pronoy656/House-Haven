"use client";

import React from "react";
import { Star } from "lucide-react";

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  totalReviews?: number;
  interactive?: boolean;
  onChange?: (newRating: number) => void;
  className?: string;
}

const STAR_SIZES = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

/**
 * Reusable StarRating component for ratings, reviews, and interactive star pickers.
 */
export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showScore = false,
  totalReviews,
  interactive = false,
  onChange,
  className = "",
}: StarRatingProps) {
  const starClass = STAR_SIZES[size];

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, idx) => {
          const starValue = idx + 1;
          const isFilled = starValue <= Math.round(rating);

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              className={`${
                interactive
                  ? "cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                  : "cursor-default"
              } p-0 bg-transparent border-0 inline-flex items-center justify-center`}
              aria-label={interactive ? `Rate ${starValue} stars` : undefined}
            >
              <Star
                className={`${starClass} ${
                  isFilled
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-bold text-slate-800 ml-1">
          {rating.toFixed(1)}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-[11px] text-slate-400 font-normal">
          ({totalReviews})
        </span>
      )}
    </div>
  );
}
