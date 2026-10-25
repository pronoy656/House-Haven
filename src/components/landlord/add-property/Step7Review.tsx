"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Building,
  Bed,
  Bath,
  Car,
} from "lucide-react";

interface Step7ReviewProps {
  allPhotos: string[];
  propertyType: string;
  selectedAddress: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  heatingType: string;
  furnishing: string;
  availableFrom: string;
  depositAmount: string;
  ratesOption: string;
  leaseDuration: string;
  selectedAmenities: string[];
}

export function Step7Review({
  allPhotos,
  propertyType,
  selectedAddress,
  monthlyRent,
  bedrooms,
  bathrooms,
  parkingSpaces,
  heatingType,
  furnishing,
  availableFrom,
  depositAmount,
  ratesOption,
  leaseDuration,
  selectedAmenities,
}: Step7ReviewProps) {
  const [reviewPhotoIndex, setReviewPhotoIndex] = useState(0);

  const prevReviewPhoto = () => {
    setReviewPhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const nextReviewPhoto = () => {
    setReviewPhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Review Your Property
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Check all your details before publishing.
        </p>
      </div>

      {/* Dynamic Image Carousel with Arrows */}
      <div className="relative w-full h-[190px] rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
        <Image
          src={allPhotos[reviewPhotoIndex % allPhotos.length]}
          alt="Review Property"
          fill
          sizes="(max-width: 480px) 100vw, 440px"
          className="object-cover"
          priority
        />

        <button
          type="button"
          onClick={prevReviewPhoto}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={nextReviewPhoto}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
          {(reviewPhotoIndex % allPhotos.length) + 1} / {allPhotos.length}
        </div>
      </div>

      {/* Title, Address & Price */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0891A2] flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
              {propertyType}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {selectedAddress}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-base sm:text-lg font-bold text-[#0891A2] block">
            £{monthlyRent.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">/ month</span>
        </div>
      </div>

      {/* Quick Specs Pill Bar */}
      <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl py-3 px-3 flex items-center justify-around text-slate-700 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <Bed className="w-4 h-4 text-slate-400" />
          <span>{bedrooms} Beds</span>
        </div>
        <div className="w-px h-3.5 bg-slate-200" />
        <div className="flex items-center gap-1.5">
          <Bath className="w-4 h-4 text-slate-400" />
          <span>{bathrooms} Baths</span>
        </div>
        <div className="w-px h-3.5 bg-slate-200" />
        <div className="flex items-center gap-1.5">
          <Car className="w-4 h-4 text-slate-400" />
          <span>{parkingSpaces} Parking</span>
        </div>
      </div>

      {/* Dynamic Key Details Table */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-1 text-xs">
        <div>
          <span className="text-[11px] text-slate-400 block">Heating</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {heatingType}
          </strong>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Furnished</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {furnishing}
          </strong>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Available From</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {availableFrom}
          </strong>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Deposit</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {depositAmount}
          </strong>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Rates</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {ratesOption}
          </strong>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Lease Duration</span>
          <strong className="text-slate-900 font-semibold block mt-0.5">
            {leaseDuration}
          </strong>
        </div>
      </div>

      {/* Selected Amenities Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-bold text-slate-800 block">
          Amenities ({selectedAmenities.length})
        </span>
        <div className="flex flex-wrap gap-1.5">
          {selectedAmenities.map((amenity) => (
            <span
              key={amenity}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium"
            >
              ✓ {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
