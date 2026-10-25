"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Bed,
  Bath,
  Accessibility,
  Armchair,
  Flower2,
  Car,
  Heart,
  X,
  Repeat2,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { NotificationButton } from "@/components/shared/NotificationButton";
import { PropertyMatch } from "./types";

export interface SearchSwiperViewProps {
  properties: PropertyMatch[];
  onBackToLanding: () => void;
  onNavigateToNotifications?: () => void;
  onViewPropertyDetails: (property: PropertyMatch) => void;
  onMatchSuccess: (property: PropertyMatch) => void;
}

export function SearchSwiperView({
  properties,
  onBackToLanding,
  onNavigateToNotifications,
  onViewPropertyDetails,
  onMatchSuccess,
}: SearchSwiperViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProperty = properties[currentIndex % properties.length];
  const nextProperty = properties[(currentIndex + 1) % properties.length];

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const SWIPE_THRESHOLD = 90;
    if (dragOffset.x > SWIPE_THRESHOLD) {
      triggerLove();
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      triggerPass();
    } else if (dragOffset.y < -SWIPE_THRESHOLD) {
      onViewPropertyDetails(currentProperty);
      setDragOffset({ x: 0, y: 0 });
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerLove = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection("right");
    setTimeout(() => {
      onMatchSuccess(currentProperty);
      setCurrentIndex((prev) => prev + 1);
      setActiveImageIndex(0);
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 280);
  };

  const triggerPass = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipeDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setActiveImageIndex(0);
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 280);
  };

  const rotation = dragOffset.x * 0.08;

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar">
      {/* Reusable Header */}
      <ScreenHeader
        title="Search Result"
        onBack={onBackToLanding}
        rightAction={
          <NotificationButton
            onClick={onNavigateToNotifications}
            prefetchHref="/tenant/notifications"
          />
        }
        className="px-5 pt-3 pb-2"
      />

      {/* Swipe Card Deck Container */}
      <div className="flex-1 px-5 pt-1 pb-4 flex flex-col justify-between relative min-h-0">
        <div className="relative flex-1 w-full min-h-[460px] flex flex-col">
          {/* Background Card */}
          {nextProperty && (
            <div
              aria-hidden="true"
              style={{
                transform: `scale(${
                  0.95 + Math.min(1, Math.abs(dragOffset.x) / 120) * 0.05
                }) translateY(${
                  10 - Math.min(1, Math.abs(dragOffset.x) / 120) * 10
                }px)`,
                opacity: 0.72 + Math.min(1, Math.abs(dragOffset.x) / 120) * 0.28,
              }}
              className="absolute inset-0 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs pointer-events-none select-none z-10 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative w-full h-[210px] sm:h-[230px] rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={nextProperty.images[0]}
                  alt={nextProperty.name}
                  fill
                  sizes="(max-width: 480px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#0891A2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {nextProperty.matchPercentage}% Match
                </div>
              </div>

              <div className="pt-3.5 pb-2 space-y-2 opacity-80">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-[16px] font-extrabold text-slate-900 leading-snug line-clamp-1">
                      {nextProperty.name}
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                      {nextProperty.address}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[16px] font-extrabold text-slate-900 leading-none">
                      {nextProperty.price}
                    </div>
                    <span className="text-[11px] text-slate-800 font-bold block mt-0.5">
                      {nextProperty.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Swipe Card */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform:
                swipeDirection === "left"
                  ? "translateX(-150%) rotate(-25deg)"
                  : swipeDirection === "right"
                  ? "translateX(150%) rotate(25deg)"
                  : `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.28s ease-out",
            }}
            className="relative flex-1 bg-white rounded-3xl p-4 border border-slate-200 shadow-lg cursor-grab active:cursor-grabbing select-none z-20 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Image Carousel */}
            <div className="relative w-full h-[210px] sm:h-[230px] rounded-2xl overflow-hidden bg-slate-900 shrink-0 group">
              <div
                className="flex w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {currentProperty.images.map((img, idx) => (
                  <div key={idx} className="relative w-full h-full shrink-0">
                    <Image
                      src={img}
                      alt={`${currentProperty.name} photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 480px) 100vw, 420px"
                      priority={idx === 0}
                      className="object-cover select-none pointer-events-none"
                    />
                  </div>
                ))}
              </div>

              {/* Match Badge */}
              <div className="absolute top-3 right-3 z-20 bg-[#0891A2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {currentProperty.matchPercentage}% Match
              </div>

              {/* Chevrons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(
                    (prev) => (prev - 1 + currentProperty.images.length) % currentProperty.images.length
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev + 1) % currentProperty.images.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Property Details */}
            <div className="pt-3.5 pb-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-[16px] font-extrabold text-slate-900 leading-snug">
                    {currentProperty.name}
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {currentProperty.address}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[16px] font-extrabold text-slate-900 leading-none">
                    {currentProperty.price}
                  </div>
                  <span className="text-[11px] text-slate-800 font-bold block mt-0.5">
                    {currentProperty.period}
                  </span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-2.5 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Bed className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">{currentProperty.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Bath className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">{currentProperty.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Accessibility className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">Disabled Access</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Armchair className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">Furnished</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Flower2 className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">Garden</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Car className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                  <span className="text-[11px] font-medium">Parking Available</span>
                </div>
              </div>

              {/* Swipe Up Hint */}
              <div
                onClick={() => onViewPropertyDetails(currentProperty)}
                className="pt-2 text-center text-[10px] text-slate-400 font-medium hover:text-[#0891A2] transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
                <span>Swipe up or click for full property details</span>
              </div>
            </div>

            {/* Bottom Action Buttons: Pass & Love */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="danger"
                size="md"
                disabled={isAnimating}
                onClick={triggerPass}
                className="flex-1 font-bold text-xs"
                leftIcon={<X className="w-4 h-4 stroke-[2.4]" />}
              >
                Pass
              </Button>

              <Button
                variant="primary"
                size="md"
                disabled={isAnimating}
                onClick={triggerLove}
                className="flex-1 font-bold text-xs shadow-sm hover:shadow-md"
                leftIcon={<Heart className="w-4 h-4 stroke-[2.4] fill-white" />}
              >
                Love
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
