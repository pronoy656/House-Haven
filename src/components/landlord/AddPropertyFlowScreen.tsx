"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { AddPropertyStep } from "./add-property/types";
import { INITIAL_PREFERENCES } from "./add-property/mockData";
import { Step1PropertyType } from "./add-property/Step1PropertyType";
import { Step2Address } from "./add-property/Step2Address";
import { Step3DetailsAmenities } from "./add-property/Step3DetailsAmenities";
import { Step4Pricing } from "./add-property/Step4Pricing";
import { Step5Photos } from "./add-property/Step5Photos";
import { Step6Preferences } from "./add-property/Step6Preferences";
import { Step7Review } from "./add-property/Step7Review";
import { Step8Success } from "./add-property/Step8Success";

export type { AddPropertyStep };

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
}: AddPropertyFlowScreenProps) {
  const [step, setStep] = useState<AddPropertyStep>(initialStep);

  // Form State
  const [propertyType, setPropertyType] = useState<string>("Detached House");
  const [postcode, setPostcode] = useState("12236");
  const [selectedAddress, setSelectedAddress] = useState("7 Great Georges St N, Warrenpoint.");

  // Details
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [receptionRooms, setReceptionRooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [heatingType, setHeatingType] = useState("Oil fired");
  const [furnishing, setFurnishing] = useState("Fully Furnished");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Wifi",
    "Parking",
    "Air Conditioning",
    "Washer",
    "Garden",
    "Dishwasher",
  ]);

  // Pricing
  const [monthlyRent, setMonthlyRent] = useState(1250);
  const [depositAmount, setDepositAmount] = useState("£1,250");
  const [leaseDuration, setLeaseDuration] = useState("12 months");
  const [availableFrom, setAvailableFrom] = useState("Jan 1, 2026");
  const [petPolicy, setPetPolicy] = useState("Pets Allowed");
  const [ratesOption, setRatesOption] = useState("Tenant pays rates");

  // Photos
  const [allPhotos, setAllPhotos] = useState<string[]>([
    "/property-interior.png",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  ]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Preferences
  const [preferences, setPreferences] = useState<Record<string, boolean>>(INITIAL_PREFERENCES);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const togglePreference = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">
      {/* Top Header & Progress Stepper (Steps 1 to 7) */}
      {step <= 7 && (
        <div className="px-5 pt-3.5 pb-2.5 shrink-0 z-20 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <Button
              variant="icon"
              size="icon-sm"
              onClick={handlePrevStep}
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </Button>

            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-xs sm:text-[13px] font-bold text-slate-700 mb-1.5 tracking-tight">
                Step {step} of 7
              </span>
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
        {step === 1 && (
          <Step1PropertyType
            selectedType={propertyType}
            onSelectType={setPropertyType}
          />
        )}

        {step === 2 && (
          <Step2Address
            postcode={postcode}
            setPostcode={setPostcode}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}

        {step === 3 && (
          <Step3DetailsAmenities
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            receptionRooms={receptionRooms}
            setReceptionRooms={setReceptionRooms}
            parkingSpaces={parkingSpaces}
            setParkingSpaces={setParkingSpaces}
            heatingType={heatingType}
            setHeatingType={setHeatingType}
            furnishing={furnishing}
            setFurnishing={setFurnishing}
            selectedAmenities={selectedAmenities}
            toggleAmenity={toggleAmenity}
          />
        )}

        {step === 4 && (
          <Step4Pricing
            monthlyRent={monthlyRent}
            setMonthlyRent={setMonthlyRent}
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            leaseDuration={leaseDuration}
            setLeaseDuration={setLeaseDuration}
            availableFrom={availableFrom}
            setAvailableFrom={setAvailableFrom}
            petPolicy={petPolicy}
            setPetPolicy={setPetPolicy}
            ratesOption={ratesOption}
            setRatesOption={setRatesOption}
          />
        )}

        {step === 5 && (
          <Step5Photos
            allPhotos={allPhotos}
            setAllPhotos={setAllPhotos}
            activePhotoIndex={activePhotoIndex}
            setActivePhotoIndex={setActivePhotoIndex}
          />
        )}

        {step === 6 && (
          <Step6Preferences
            preferences={preferences}
            togglePreference={togglePreference}
          />
        )}

        {step === 7 && (
          <Step7Review
            allPhotos={allPhotos}
            propertyType={propertyType}
            selectedAddress={selectedAddress}
            monthlyRent={monthlyRent}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            parkingSpaces={parkingSpaces}
            heatingType={heatingType}
            furnishing={furnishing}
            availableFrom={availableFrom}
            depositAmount={depositAmount}
            ratesOption={ratesOption}
            leaseDuration={leaseDuration}
            selectedAmenities={selectedAmenities}
          />
        )}

        {step === 8 && <Step8Success />}
      </div>

      {/* Bottom Action Buttons */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0 z-20">
        {step === 1 ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNextStep}
          >
            Continue
          </Button>
        ) : step === 8 ? (
          <div className="space-y-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onViewProperty || onFinish}
            >
              View Property
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setStep(1)}
            >
              Add Another Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevStep}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleNextStep}
            >
              {step === 7 ? "Publish Property" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
