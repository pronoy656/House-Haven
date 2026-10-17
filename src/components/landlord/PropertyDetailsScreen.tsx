"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Car,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";
import { LandlordBottomNav } from "./LandlordBottomNav";

interface PropertyDetailsScreenProps {
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  showStatusBar?: boolean;
}

export function PropertyDetailsScreen({
  onBack,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToNotifications,
  showStatusBar = true,
}: PropertyDetailsScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const photos = [
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      label: "Living Room",
      alt: "Spacious luxury modern living room with natural lighting",
    },
    {
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      label: "Modern Kitchen",
      alt: "High-end designer kitchen with marble island and bar seating",
    },
    {
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      label: "Master Bedroom",
      alt: "Elegant master bedroom suite with king bed and wood finish",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      label: "Ensuite Bathroom",
      alt: "Luxury spa bathroom with marble tiling and glass rain shower",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      label: "Balcony & View",
      alt: "Private sunny terrace balcony overlooking scenic landscape",
    },
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextPhoto();
    } else if (diff < -45) {
      prevPhoto();
    }
    setTouchStartX(null);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white border-b border-slate-50">
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={onBack || onNavigateToProperties}
          aria-label="Back"
          prefetchHref="/landlord/properties"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-[17px] font-bold text-slate-900">
          Property Overview
        </h1>

        <Button
          variant="icon"
          size="icon-sm"
          onClick={onNavigateToNotifications}
          aria-label="Notifications"
          prefetchHref="/landlord/notifications"
          className="relative"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0891A2] rounded-full ring-2 ring-white" />
        </Button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-3.5 text-left">
        {/* Hero Image Animated Sliding Carousel */}
        <div
          className="relative w-full h-[215px] rounded-3xl overflow-hidden shadow-xs bg-slate-900 select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPhotoIndex * 100}%)` }}
          >
            {photos.map((photo, idx) => (
              <div key={idx} className="relative w-full h-full shrink-0 flex-none bg-slate-900">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  sizes="(max-width: 480px) 100vw, 420px"
                />
                {/* Subtle vignette/gradient overlay for badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Room Label Badge (Top-Left) */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[10.5px] font-medium tracking-wide z-10">
            {photos[currentPhotoIndex].label}
          </div>

          {/* Photo Counter Badge (Top-Right) */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[10.5px] font-semibold tabular-nums tracking-wide z-10">
            {currentPhotoIndex + 1} / {photos.length}
          </div>

          {/* Pagination Dots (Bottom-Center) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPhotoIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPhotoIndex === idx
                    ? "w-5 bg-white shadow-xs"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Property Header Info */}
        <div className="space-y-1">
          <h2 className="text-[19px] font-bold text-slate-900 leading-tight">
            Riverside Apartments
          </h2>
          <p className="text-[11.5px] text-slate-400">
            7 Great Georges St N, Warrenpoint.
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
              Available
            </span>
            <button
              type="button"
              onClick={nextPhoto}
              className="text-[11.5px] font-semibold text-[#0891A2] hover:underline cursor-pointer"
            >
              View gallery
            </button>
          </div>
        </div>

        {/* Edit Property Button */}
        <div>
          <Button
            variant="primary"
            className="w-full"
          >
            Edit Property
          </Button>
        </div>

        {/* Feature Highlights Pill Bar (2 Beds, 2 Baths, 1 Parking) */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3 flex items-center justify-around text-center">
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-[#0891A2]" />
            <span className="text-[11px] font-medium text-slate-700">
              2 Bedrooms
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200/60" />
          <div className="flex flex-col items-center gap-1">
            <Bath className="w-4 h-4 text-[#0891A2]" />
            <span className="text-[11px] font-medium text-slate-700">
              2 Bathrooms
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200/60" />
          <div className="flex flex-col items-center gap-1">
            <Car className="w-4 h-4 text-[#0891A2]" />
            <span className="text-[11px] font-medium text-slate-700">
              1 Parking
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-0.5">
          <h3 className="text-[13.5px] font-bold text-slate-900">
            Description
          </h3>
          <p className="text-[11.5px] text-slate-400">Not provided</p>
        </div>

        {/* Card 1: Property details & Features */}
        <div className="bg-[#F8FAFC] border border-slate-100/80 rounded-2xl p-4 text-[11.5px] space-y-2">
          <h3 className="text-[13px] font-bold text-slate-900 mb-2">
            Property details & Features
          </h3>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Property type</span>
              <span className="font-medium text-slate-800">Detached House</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bedrooms</span>
              <span className="font-medium text-slate-800">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bathrooms</span>
              <span className="font-medium text-slate-800">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Parking</span>
              <span className="font-medium text-slate-800">1 space</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Receptions</span>
              <span className="font-medium text-slate-800">Not provided</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Furnished</span>
              <span className="font-medium text-slate-800">Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Other amenities</span>
              <span className="font-medium text-slate-800">Not provided</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pricing & Availability */}
        <div className="bg-[#F8FAFC] border border-slate-100/80 rounded-2xl p-4 text-[11.5px] space-y-2">
          <h3 className="text-[13px] font-bold text-slate-900 mb-2">
            Pricing & Availability
          </h3>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly rent</span>
              <span className="font-medium text-slate-800">Not provided</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Deposit amount</span>
              <span className="font-medium text-slate-800">Not provided</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rates</span>
              <span className="font-medium text-slate-800">Not provided</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Available from</span>
              <span className="font-medium text-slate-800">Jan 1, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lease duration</span>
              <span className="font-medium text-slate-800">12 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pets allowed</span>
              <span className="font-medium text-slate-800">Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Allow subletting</span>
              <span className="font-medium text-slate-800">Yes</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <p className="text-[10.5px] text-slate-400 leading-relaxed pt-1">
          Rent, deposit and description have not been provided. Add them via Edit Property to complete your listing.
        </p>

        {/* Secondary Back Button */}
        <div className="pt-2 pb-1">
          <Button
            variant="outline"
            size="md"
            onClick={onBack || onNavigateToProperties}
            prefetchHref="/landlord/properties"
            className="w-full"
          >
            Back to My Properties
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <LandlordBottomNav
        activeTab="properties"
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToProperties={onNavigateToProperties}
        onNavigateToApplications={onNavigateToApplications}
        onNavigateToMessages={onNavigateToMessages}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  );
}
