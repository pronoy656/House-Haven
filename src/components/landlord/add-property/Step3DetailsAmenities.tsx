"use client";

import React from "react";
import {
  Bed,
  Bath,
  Car,
  Minus,
  Plus,
  Flame,
  Sofa,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { ALL_AMENITIES } from "./mockData";

interface Step3DetailsAmenitiesProps {
  bedrooms: number;
  setBedrooms: React.Dispatch<React.SetStateAction<number>>;
  bathrooms: number;
  setBathrooms: React.Dispatch<React.SetStateAction<number>>;
  receptionRooms: number;
  setReceptionRooms: React.Dispatch<React.SetStateAction<number>>;
  parkingSpaces: number;
  setParkingSpaces: React.Dispatch<React.SetStateAction<number>>;
  heatingType: string;
  setHeatingType: (val: string) => void;
  furnishing: string;
  setFurnishing: (val: string) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
}

export function Step3DetailsAmenities({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  receptionRooms,
  setReceptionRooms,
  parkingSpaces,
  setParkingSpaces,
  heatingType,
  setHeatingType,
  furnishing,
  setFurnishing,
  selectedAmenities,
  toggleAmenity,
}: Step3DetailsAmenitiesProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-0.5">
        <h2 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight leading-tight">
          Property Details &amp; Amenities
        </h2>
        <p className="text-[11.5px] text-slate-400 font-normal">
          Set rooms, heating, furnishing, and popular amenities.
        </p>
      </div>

      {/* Room Counters */}
      <div className="space-y-2 pt-0.5">
        {/* Bedrooms */}
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bed className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700">
              Number of Bedrooms
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setBedrooms((prev) => Math.max(0, prev - 1))}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Decrease bedrooms"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <span className="text-sm font-bold text-slate-800 w-5 text-center tabular-nums">
              {bedrooms}
            </span>
            <button
              type="button"
              onClick={() => setBedrooms((prev) => prev + 1)}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Increase bedrooms"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bath className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700">
              Number of Bathrooms
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setBathrooms((prev) => Math.max(0, prev - 1))}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Decrease bathrooms"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <span className="text-sm font-bold text-slate-800 w-5 text-center tabular-nums">
              {bathrooms}
            </span>
            <button
              type="button"
              onClick={() => setBathrooms((prev) => prev + 1)}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Increase bathrooms"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Reception Rooms */}
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sofa className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700">
              Number of Reception Rooms
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setReceptionRooms((prev) => Math.max(0, prev - 1))}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Decrease reception rooms"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <span className="text-sm font-bold text-slate-800 w-5 text-center tabular-nums">
              {receptionRooms}
            </span>
            <button
              type="button"
              onClick={() => setReceptionRooms((prev) => prev + 1)}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Increase reception rooms"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Parking Spaces */}
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Car className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700">
              Parking Spaces
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setParkingSpaces((prev) => Math.max(0, prev - 1))}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Decrease parking spaces"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <span className="text-sm font-bold text-slate-800 w-5 text-center tabular-nums">
              {parkingSpaces}
            </span>
            <button
              type="button"
              onClick={() => setParkingSpaces((prev) => prev + 1)}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Increase parking spaces"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Heating Type & Furnishing Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
        <div className="space-y-1">
          <label className="text-[11.5px] font-medium text-slate-600 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#0891A2]" />
            <span>Heating Type</span>
          </label>
          <div className="relative">
            <select
              value={heatingType}
              onChange={(e) => setHeatingType(e.target.value)}
              className="w-full h-10 pl-3.5 pr-8 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="Oil fired">Oil fired</option>
              <option value="Gas">Gas</option>
              <option value="Electric">Electric</option>
              <option value="Heat Pump">Heat Pump</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11.5px] font-medium text-slate-600 flex items-center gap-1.5">
            <Sofa className="w-3.5 h-3.5 text-[#0891A2]" />
            <span>Furnishing</span>
          </label>
          <div className="relative">
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full h-10 pl-3.5 pr-8 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
            >
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Partly Furnished">Partly Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Popular Amenities & Features */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0891A2]" />
            <span>Popular Amenities &amp; Features</span>
          </h3>
          <span className="text-[10.5px] text-slate-400 font-medium">
            {selectedAmenities.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {ALL_AMENITIES.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0891A2] text-white shadow-2xs"
                    : "bg-[#F1F5F9] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
