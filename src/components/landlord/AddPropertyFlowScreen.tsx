"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  Calendar,
  UploadCloud,
  X,
  Plus,
  Minus,
  CheckCircle2,
  Building,
  Bed,
  Bath,
  Car,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sofa,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "../ui/Button";

export type AddPropertyStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface AddPropertyFlowScreenProps {
  initialStep?: AddPropertyStep;
  onBack?: () => void;
  onFinish?: () => void;
  onViewProperty?: () => void;
  showStatusBar?: boolean;
}

export function AddPropertyFlowScreen({
  initialStep = 1,
  onBack,
  onFinish,
  onViewProperty,
  showStatusBar = true,
}: AddPropertyFlowScreenProps) {
  const [step, setStep] = useState<AddPropertyStep>(initialStep);

  // Step 1: Property Type
  const [propertyType, setPropertyType] = useState<string>("Detached House");

  // Step 2: Property Address
  const [postcode, setPostcode] = useState("12236");
  const [selectedAddress, setSelectedAddress] = useState("7 Great Georges St N, Warrenpoint.");

  // Step 3: Property Details & Amenities
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [receptionRooms, setReceptionRooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [heatingType, setHeatingType] = useState("Oil fired");
  const [furnishing, setFurnishing] = useState("Fully Furnished");

  // Amenities & Features (Merged directly into Step 3)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Wifi",
    "Parking",
    "Air Conditioning",
    "Washer",
    "Garden",
    "Dishwasher",
  ]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Step 4: Pricing & Availability
  const [monthlyRent, setMonthlyRent] = useState(1250);
  const [depositAmount, setDepositAmount] = useState("£1,250");
  const [leaseDuration, setLeaseDuration] = useState("12 months");
  const [availableFrom, setAvailableFrom] = useState("Jan 1, 2026");
  const [petPolicy, setPetPolicy] = useState("Pets Allowed");
  const [ratesOption, setRatesOption] = useState("Tenant pays rates");

  // Step 5: Photos (Interactive Gallery & Carousel)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [allPhotos, setAllPhotos] = useState<string[]>([
    "/property-interior.png",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  ]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setAllPhotos((prev) => [...prev, ...newUrls]);
      setActivePhotoIndex(allPhotos.length); // point to new photo
    }
  };

  const removePhoto = (indexToRemove: number) => {
    if (allPhotos.length <= 1) return; // Keep at least 1 photo
    setAllPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (activePhotoIndex >= allPhotos.length - 1) {
      setActivePhotoIndex(Math.max(0, allPhotos.length - 2));
    }
  };

  const nextActivePhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevActivePhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  // Step 6: Additional Tenant Preferences
  const [preferences, setPreferences] = useState<{ [key: string]: boolean }>({
    "Allow short-term rental (e.g. 3-6 months)": true,
    "Allow subletting": false,
    "Show exact address to all users": true,
    "Available on mark": false,
    "Smoking accepted": false,
    "Benefits accepted": true,
    "Criminal record accepted": false,
    "Students allowed": true,
    "References required": true,
    "Guarantor required": true,
  });

  const togglePreference = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Step 7: Review Carousel
  const [reviewPhotoIndex, setReviewPhotoIndex] = useState(0);

  const prevReviewPhoto = () => {
    setReviewPhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const nextReviewPhoto = () => {
    setReviewPhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as AddPropertyStep);
    } else {
      onBack?.();
    }
  };

  const handleNextStep = () => {
    if (step < 8) {
      setStep((prev) => (prev + 1) as AddPropertyStep);
    } else {
      onFinish?.();
    }
  };

  // 6 Property Type Cards
  const propertyTypes = [
    {
      id: "Detached House",
      name: "Detached House",
      image: "/add-pro-1.png",
    },
    {
      id: "Semi-Detached House",
      name: "Semi-Detached House",
      image: "/add-pro-2.png",
    },
    {
      id: "Detached Bungalow",
      name: "Detached Bungalow",
      image: "/add-pro-3.png",
    },
    {
      id: "Terraced House",
      name: "Terraced House",
      image: "/add-pro-4.png",
    },
    {
      id: "Apartment",
      name: "Apartment",
      image: "/add-pro-5.png",
    },
    {
      id: "Commercial",
      name: "Commercial",
      image: "/add-pro-6.png",
    },
  ];

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">
      {/* Hidden Gallery Input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={handleFilesUpload}
        className="hidden"
      />

      {/* Top Header & Progress Stepper (Steps 1 to 7) - Fixed/Sticky */}
      {step <= 7 && (
        <div className="px-5 pt-3.5 pb-2.5 shrink-0 z-20 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>

            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-xs sm:text-[13px] font-bold text-slate-700 mb-1.5 tracking-tight">
                Step {step} of 7
              </span>
              {/* 7-Segment Progress Bar */}
              <div className="w-full max-w-[180px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0891A2] rounded-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                />
              </div>
            </div>

            <div className="w-10" />
          </div>
        </div>
      )}

      {/* Main Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3 text-left">
        {/* =========================================================================
            STEP 1: PROPERTY TYPE
            ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Add Property
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Let&apos;s start with the type of property you want to list.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {propertyTypes.map((item) => {
                const isSelected = propertyType === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setPropertyType(item.id)}
                    className={`p-3.5 rounded-[24px] flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all border text-center ${
                      isSelected
                        ? "bg-[#D2FAFF] border-[#0891A2] shadow-xs ring-1 ring-[#0891A2]/25"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`text-xs sm:text-[13px] font-bold leading-tight ${
                        isSelected ? "text-slate-900" : "text-slate-800"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: PROPERTY ADDRESS
            ========================================================================= */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Property Address
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Let tenants know where your property is located.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Post code
                </label>
                <div className="relative">
                  <select
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
                  >
                    <option value="12236">12236 (Armagh)</option>
                    <option value="12237">12237 (Warrenpoint)</option>
                    <option value="12238">12238 (Newry)</option>
                    <option value="BT60 3AB">BT60 3AB</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Select your address
                </label>
                <div className="relative">
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
                  >
                    <option value="7 Great Georges St N, Warrenpoint.">
                      7 Great Georges St N, Warrenpoint.
                    </option>
                    <option value="Maple Apartments, Unit 3B">
                      Maple Apartments, Unit 3B
                    </option>
                    <option value="Riverside Apartments, 12 Elm St">
                      Riverside Apartments, 12 Elm St
                    </option>
                    <option value="1 Cavanacaw Grange, Armagh">
                      1 Cavanacaw Grange, Armagh
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: PROPERTY DETAILS & AMENITIES (MERGED)
            ========================================================================= */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-0.5">
              <h2 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight leading-tight">
                Property Details &amp; Amenities
              </h2>
              <p className="text-[11.5px] text-slate-400 font-normal">
                Set rooms, heating, furnishing, and popular amenities.
              </p>
            </div>

            {/* Room Counters (Sleek, Compact Buttons) */}
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

            {/* Popular Amenities & Features (Integrated into Step 3) */}
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
                {[
                  "Wifi",
                  "Parking",
                  "Air Conditioning",
                  "Washer",
                  "Dryer",
                  "Dishwasher",
                  "Pet Friendly",
                  "Gym",
                  "Pool",
                  "Garden",
                  "Security",
                  "Elevator",
                ].map((amenity) => {
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
        )}

        {/* =========================================================================
            STEP 4: PRICING & AVAILABILITY
            ========================================================================= */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Pricing &amp; Availability
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Set your rent, deposit, and availability dates.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                Monthly Rent
              </label>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  £{monthlyRent.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">
                  per month
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={monthlyRent}
                onChange={(e) => {
                  setMonthlyRent(Number(e.target.value));
                  setDepositAmount(`£${Number(e.target.value).toLocaleString()}`);
                }}
                className="w-full accent-[#0891A2] h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                Range: £100 – £5,000 per month
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                Deposit Amount
              </label>
              <input
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter deposit amount"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Lease Duration
                </label>
                <div className="relative">
                  <select
                    value={leaseDuration}
                    onChange={(e) => setLeaseDuration(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
                  >
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="24 months">24 months</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Available From
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2]"
                  />
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Pet Policy
                </label>
                <div className="relative">
                  <select
                    value={petPolicy}
                    onChange={(e) => setPetPolicy(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
                  >
                    <option value="Pets Allowed">Pets Allowed</option>
                    <option value="No Pets">No Pets</option>
                    <option value="Cats Only">Cats Only</option>
                    <option value="Dogs Only">Dogs Only</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Rates Dropdown (Clean, without hardcoded black tooltip) */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-semibold text-slate-700 block">
                  Rates
                </label>
                <div className="relative">
                  <select
                    value={ratesOption}
                    onChange={(e) => setRatesOption(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 appearance-none bg-white focus:outline-none focus:border-[#0891A2] focus:ring-1 focus:ring-[#0891A2] cursor-pointer"
                  >
                    <option value="Tenant pays rates">Tenant pays rates</option>
                    <option value="Landlord pays rates">Landlord pays rates</option>
                    <option value="Rates included in rent">Rates included in rent</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: ADD PHOTOS (INTERACTIVE SLIDER + GALLERY UPLOAD)
            ========================================================================= */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Add Photos
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Upload photos from your gallery or choose from the album.
              </p>
            </div>

            {/* Interactive Primary Photo Carousel */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-[13px] font-bold text-slate-800">
                  Photo Preview
                </label>
                <span className="text-[11px] font-semibold text-slate-400">
                  {activePhotoIndex + 1} of {allPhotos.length}
                </span>
              </div>

              <div className="relative w-full h-[200px] rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
                {/* Image */}
                <Image
                  src={allPhotos[activePhotoIndex]}
                  alt={`Property Photo ${activePhotoIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Left Carousel Arrow */}
                <button
                  type="button"
                  onClick={prevActivePhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Right Carousel Arrow */}
                <button
                  type="button"
                  onClick={nextActivePhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Remove Photo Button */}
                {allPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoto(activePhotoIndex)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                    aria-label="Delete this photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Bottom Carousel Indicator dots */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5">
                  {allPhotos.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === activePhotoIndex
                          ? "w-5 bg-white shadow-xs"
                          : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Action Button - Directly opens Gallery/File Picker */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 rounded-2xl border-2 border-dashed border-[#0891A2]/40 bg-[#F0FDFA] flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:text-[#0891A2] hover:border-[#0891A2] hover:bg-cyan-50/70 transition-all cursor-pointer group shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-slate-800">
                  Click to open gallery &amp; upload photos
                </span>
                <span className="text-[10px] text-slate-400">
                  Select multiple photos • JPG, PNG (Max 10 MB)
                </span>
              </button>
            </div>

            {/* Album Thumbnails Grid */}
            <div className="space-y-2 pt-1">
              <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                Album Photos ({allPhotos.length})
              </label>

              <div className="grid grid-cols-4 gap-2">
                {allPhotos.map((photo, idx) => {
                  const isActive = idx === activePhotoIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-full h-18 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                        isActive
                          ? "border-[#0891A2] ring-2 ring-[#0891A2]/30 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 6: ADDITIONAL TENANT PREFERENCES
            ========================================================================= */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Additional Tenant Preferences
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Set conditions and tenant screening preferences.
              </p>
            </div>

            {/* List of 10 Switches */}
            <div className="space-y-3 pt-2">
              {Object.entries(preferences).map(([key, enabled]) => (
                <div
                  key={key}
                  onClick={() => togglePreference(key)}
                  className="flex items-center justify-between gap-3 cursor-pointer py-1 group border-b border-slate-50 pb-2.5"
                >
                  <span className="text-xs sm:text-[13.5px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {key}
                  </span>

                  {/* Switch Pill */}
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out shrink-0 ${
                      enabled
                        ? "bg-[#0891A2]"
                        : "bg-slate-200 group-hover:bg-slate-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
                        enabled ? "translate-x-6.5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 7: REVIEW YOUR PROPERTY (INTERACTIVE DYNAMIC CAROUSEL)
            ========================================================================= */}
        {step === 7 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Review Your Property
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Check all your details before publishing.
              </p>
            </div>

            {/* Dynamic Image Carousel with Real Interactive Arrows */}
            <div className="relative w-full h-[190px] rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
              <Image
                src={allPhotos[reviewPhotoIndex % allPhotos.length]}
                alt="Review Property"
                fill
                className="object-cover"
                priority
              />

              {/* Prev Arrow */}
              <button
                type="button"
                onClick={prevReviewPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={nextReviewPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Image Counter Badge */}
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
        )}

        {/* =========================================================================
            STEP 8: PROPERTY PUBLISHED!
            ========================================================================= */}
        {step === 8 && (
          <div className="py-2 space-y-4 text-center">
            {/* House illustration */}
            <div className="relative w-full max-w-[280px] h-[175px] mx-auto flex items-center justify-center">
              <Image
                src="/landlord-house-illustration.png"
                alt="Property Published Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                Property Published!
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
                Your property is now live and visible to potential tenants.
              </p>
            </div>

            {/* 3 Features Card */}
            <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-xs text-left space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 text-[#0891A2] flex items-center justify-center shrink-0 text-base">
                  🏡
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                    Live on marketplace
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tenants can now view details and submit applications
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-base">
                  ✍️
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                    Instant Notifications
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    We&apos;ll notify you as soon as an inquiry or application arrives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-base">
                  📋
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                    Manage Anytime
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Update photos, adjust rent, or pause listing from your dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons - Fixed/Sticky */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 z-20">
        {step === 1 ? (
          <Button
            variant="primary"
            onClick={handleNextStep}
            className="w-full h-12 font-semibold text-sm rounded-full"
          >
            Continue
          </Button>
        ) : step === 8 ? (
          <div className="space-y-2">
            <Button
              variant="primary"
              onClick={onViewProperty || onFinish}
              className="w-full h-12 font-semibold text-sm rounded-full"
            >
              View Property
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full h-12 font-semibold text-xs rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Add Another Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="h-12 font-semibold text-xs sm:text-sm rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Back
            </button>
            <Button
              variant="primary"
              onClick={handleNextStep}
              className="h-12 font-semibold text-xs sm:text-sm rounded-full"
            >
              {step === 7 ? "Publish Property" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
