"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Accessibility,
  Armchair,
  Flower2,
  Car,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Avatar } from "@/components/shared/Avatar";
import { PropertyMatch } from "./types";

export interface PropertyDetailModalProps {
  property: PropertyMatch | null;
  isOpen: boolean;
  onClose: () => void;
  onMatch: (property: PropertyMatch) => void;
}

export function PropertyDetailModal({
  property,
  isOpen,
  onClose,
  onMatch,
}: PropertyDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Grab Handle Header */}
        <div className="shrink-0 pt-2.5 pb-2.5 px-5 border-b border-slate-100 bg-white select-none">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2.5" />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              title="Close details"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <div className="text-center">
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Property Details
              </h2>
            </div>
            <div className="bg-[#0891A2]/10 text-[#0891A2] text-xs font-bold px-2.5 py-1 rounded-full">
              {property.matchPercentage}% Match
            </div>
          </div>
        </div>

        {/* Scrollable details content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5">
          {/* Image Carousel */}
          <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-900">
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {property.images.map((img, i) => (
                <div key={i} className="relative w-full h-full shrink-0">
                  <Image
                    src={img}
                    alt={`${property.name} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 480px) 100vw, 440px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Chevrons */}
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex(
                  (prev) => (prev - 1 + property.images.length) % property.images.length
                )
              }
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev + 1) % property.images.length)
              }
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5">
              {property.images.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-200 ${
                    i === activeImageIndex ? "w-2.5 h-2 bg-white" : "w-1.5 h-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Title, Address & Price */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {property.name}
                </h1>
                <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0891A2] shrink-0" />
                  <span>{property.address}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-extrabold text-[#0891A2] leading-none">
                  {property.price}
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {property.period}
                </span>
              </div>
            </div>
          </div>

          {/* Key specs pill row */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0891A2] flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 font-medium block">Bedrooms</span>
                <span className="text-xs font-bold text-slate-800">
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0891A2] flex items-center justify-center shrink-0">
                <Bath className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 font-medium block">Bathrooms</span>
                <span className="text-xs font-bold text-slate-800">
                  {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
            </div>
          </div>

          {/* About This Home */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              About This Home
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Landlord information card */}
          {property.landlord && (
            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src="/john-wick-avatar.jpg"
                  alt={property.landlord.name}
                  size="md"
                  isOnline
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      {property.landlord.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal block">
                    Verified Landlord • {property.landlord.responseTime}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom floating Action */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onMatch(property)}
            leftIcon={<Heart className="w-4 h-4 stroke-[2.4] fill-white" />}
            className="font-bold text-sm shadow-md"
          >
            Match with Landlord
          </Button>
        </div>
      </div>
    </div>
  );
}
