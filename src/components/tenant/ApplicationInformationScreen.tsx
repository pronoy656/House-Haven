"use client";

import React, { useState } from "react";
import { ArrowLeft, Calendar, ChevronDown, MessageSquare, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileStatusBar } from "@/components/MobileStatusBar";

interface ApplicationInformationScreenProps {
  onBack?: () => void;
  onFinish?: () => void;
  showStatusBar?: boolean;
}

export function ApplicationInformationScreen({
  onBack,
  onFinish,
  showStatusBar = true,
}: ApplicationInformationScreenProps) {
  const [mode, setMode] = useState<"manual" | "chat">("manual");

  // Move-in Preferences
  const [location, setLocation] = useState("City or town (e.g. Belfast)");
  const [moveInDate, setMoveInDate] = useState("09/3/2025");
  const [leaseTerm, setLeaseTerm] = useState("6 Monthly");

  // Budget & Rent
  const [rentAmount, setRentAmount] = useState("£1,200 - £1,500");
  const [pets, setPets] = useState("No pets");

  // Employment
  const [employmentStatus, setEmploymentStatus] = useState("Employed Full-time");
  const [employer, setEmployer] = useState("TechCorp UK Ltd");
  const [position, setPosition] = useState("Software Engineer");
  const [salary, setSalary] = useState("£48,000");

  // Residential History
  const [recentAddress, setRecentAddress] = useState("45 Park Avenue, Belfast");
  const [lengthAtAddress, setLengthAtAddress] = useState("24 months");
  const [landlordName, setLandlordName] = useState("John Stewart");
  const [landlordContact, setLandlordContact] = useState("+44 7911 123456");
  const [prevRent, setPrevRent] = useState("£1,100");

  // Verification
  const [niNumber, setNiNumber] = useState("QQ 12 34 56 A");

  // Property Preferences
  const [bedrooms, setBedrooms] = useState("01");
  const [bathrooms, setBathrooms] = useState("01");
  const [receptions, setReceptions] = useState("01");
  const [houseStyle, setHouseStyle] = useState("Any");

  // Feature Toggles
  const [garden, setGarden] = useState(true);
  const [garage, setGarage] = useState(true);
  const [parking, setParking] = useState(true);
  const [hmo, setHmo] = useState(true);

  // References list
  const [references, setReferences] = useState<string[]>([
    "Primary Reference: Sarah Jenkins (Previous Landlord)",
  ]);
  const [showAddRefModal, setShowAddRefModal] = useState(false);
  const [newRefName, setNewRefName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddReference = () => {
    if (newRefName.trim()) {
      setReferences([...references, newRefName.trim()]);
      setNewRefName("");
      setShowAddRefModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      if (onFinish) {
        setTimeout(onFinish, 1500);
      }
    }, 600);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Header */}
      <div className="pt-2 pb-2 shrink-0">
        <div className="relative flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Step 2 of 2 indicator with progress bar */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-slate-400 mb-1.5">
              Step 2 of 2
            </span>
            <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden flex">
              <div className="w-full h-full bg-[#0891A2] rounded-full"></div>
            </div>
          </div>

          <div className="w-9"></div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mt-3">
          <h1 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
            Application Information
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Information used for property compatibility.
          </p>
        </div>

        {/* Pill Mode Switcher: Manual vs Chat */}
        <div className="flex items-center justify-center mt-4">
          <div className="inline-flex bg-[#F4F6F9] p-1 rounded-full border border-slate-100">
            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mode === "manual"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Manual
            </button>
            <button
              type="button"
              onClick={() => setMode("chat")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                mode === "chat"
                  ? "bg-[#0891A2] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1 my-2 space-y-6 text-left">
        {mode === "chat" ? (
          /* Interactive Chat Assistant Mode */
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#0891A2]/10 text-[#0891A2] mx-auto flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-900">AI Compatibility Assistant</h4>
            <p className="text-xs text-slate-500">
              You can converse with our assistant or switch back to Manual entry at any time.
            </p>
            <Button
              variant="secondary"
              onClick={() => setMode("manual")}
              className="h-10 text-xs"
            >
              Switch back to Manual Form
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Move-in Preferences */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Move-in Preferences
              </h3>

              {/* Preferred location */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Preferred location or area
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="City or town (e.g. Belfast)">City or town (e.g. Belfast)</option>
                    <option value="Belfast City Centre">Belfast City Centre</option>
                    <option value="South Belfast">South Belfast</option>
                    <option value="East Belfast">East Belfast</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Desired Move-in Date */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Desired Move-in Date
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3.5 w-4 h-4 text-slate-900 pointer-events-none" />
                  <input
                    type="text"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    placeholder="09/3/2025"
                    className="w-full h-11 pl-10 pr-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  />
                </div>
              </div>

              {/* Lease Term */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Lease Term (month)
                </label>
                <div className="relative">
                  <select
                    value={leaseTerm}
                    onChange={(e) => setLeaseTerm(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="6 Monthly">6 Monthly</option>
                    <option value="12 Monthly">12 Monthly</option>
                    <option value="24 Monthly">24 Monthly</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section 2: Budget & Rent */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Budget &amp; Rent
              </h3>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Monthly Rent Amount (£ )
                </label>
                <div className="relative">
                  <select
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="£800 - £1,000">£800 - £1,000</option>
                    <option value="£1,000 - £1,200">£1,000 - £1,200</option>
                    <option value="£1,200 - £1,500">£1,200 - £1,500</option>
                    <option value="£1,500+">£1,500+</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Pets
                </label>
                <div className="relative">
                  <select
                    value={pets}
                    onChange={(e) => setPets(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="No pets">No pets</option>
                    <option value="1 Dog">1 Dog</option>
                    <option value="1 Cat">1 Cat</option>
                    <option value="Multiple pets">Multiple pets</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section 3: Employment & Income */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Employment &amp; Income
              </h3>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Employment Status
                </label>
                <div className="relative">
                  <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="Employed Full-time">Employed Full-time</option>
                    <option value="Employed Part-time">Employed Part-time</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Student">Student</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Employer
                </label>
                <input
                  type="text"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                  placeholder="Company name"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Position
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Job title"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Annual Salary (£ )
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 45000"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>
            </div>

            {/* Section 4: Residential History */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Residential History
              </h3>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Most Recent Address
                </label>
                <input
                  type="text"
                  value={recentAddress}
                  onChange={(e) => setRecentAddress(e.target.value)}
                  placeholder="Full previous address"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Length at Address (months)
                </label>
                <div className="relative">
                  <select
                    value={lengthAtAddress}
                    onChange={(e) => setLengthAtAddress(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="24 months">24 months</option>
                    <option value="36+ months">36+ months</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Landlord Name
                </label>
                <input
                  type="text"
                  value={landlordName}
                  onChange={(e) => setLandlordName(e.target.value)}
                  placeholder="Previous landlord's name"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Landlord Contact
                </label>
                <input
                  type="text"
                  value={landlordContact}
                  onChange={(e) => setLandlordContact(e.target.value)}
                  placeholder="Email or phone"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  Previous Rent (£ )
                </label>
                <div className="relative">
                  <select
                    value={prevRent}
                    onChange={(e) => setPrevRent(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                  >
                    <option value="£900">£900</option>
                    <option value="£1,100">£1,100</option>
                    <option value="£1,300">£1,300</option>
                    <option value="£1,500+">£1,500+</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section 5: Verification */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Verification
              </h3>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">
                  National Insurance Number
                </label>
                <input
                  type="text"
                  value={niNumber}
                  onChange={(e) => setNiNumber(e.target.value)}
                  placeholder="e.g. QQ 12 34 56 A"
                  className="w-full h-11 px-4 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                />
              </div>
            </div>

            {/* Section 6: Property Preferences */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                Property Preferences
              </h3>

              {/* 2-col selects */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-500 truncate">
                    Number of Bedrooms
                  </label>
                  <div className="relative">
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full h-11 px-4 pr-8 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04+">04+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-500 truncate">
                    Number of Bathrooms
                  </label>
                  <div className="relative">
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full h-11 px-4 pr-8 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-500 truncate">
                    Number of Receptions
                  </label>
                  <div className="relative">
                    <select
                      value={receptions}
                      onChange={(e) => setReceptions(e.target.value)}
                      className="w-full h-11 px-4 pr-8 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03+">03+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-500 truncate">
                    House Style
                  </label>
                  <div className="relative">
                    <select
                      value={houseStyle}
                      onChange={(e) => setHouseStyle(e.target.value)}
                      className="w-full h-11 px-4 pr-8 bg-[#F4F6F9] text-slate-800 text-xs rounded-2xl appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent"
                    >
                      <option value="Any">Any</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Detached">Detached</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* iOS style Switches in #0891A2 */}
              <div className="space-y-2.5 pt-2">
                {[
                  { label: "Garden", state: garden, setter: setGarden },
                  { label: "Garage", state: garage, setter: setGarage },
                  { label: "Parking Available", state: parking, setter: setParking },
                  { label: "HMO", state: hmo, setter: setHmo },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-xs font-normal text-slate-700">{item.label}</span>
                    <button
                      type="button"
                      onClick={() => item.setter(!item.state)}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                        item.state ? "bg-[#0891A2]" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm ${
                          item.state ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7: References */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm font-semibold text-[#0891A2]">
                References
              </h3>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-slate-700 font-normal">
                  Provide details of references
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddRefModal(true)}
                  className="w-7 h-7 rounded-full bg-[#0891A2] text-white flex items-center justify-center hover:bg-[#0e7490] transition-colors cursor-pointer"
                  aria-label="Add reference"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Display existing references */}
              <div className="space-y-1.5">
                {references.map((ref, idx) => (
                  <div key={idx} className="text-[11px] p-2 bg-[#F4F6F9] rounded-xl text-slate-600 flex items-center justify-between">
                    <span className="truncate">{ref}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal for adding reference */}
            {showAddRefModal && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <input
                  type="text"
                  placeholder="Reference name & contact info"
                  value={newRefName}
                  onChange={(e) => setNewRefName(e.target.value)}
                  className="w-full h-9 px-3 bg-white text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddRefModal(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddReference}
                    className="px-3 py-1 text-xs bg-[#0891A2] text-white rounded-md font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons inside form */}
            <div className="pt-4 space-y-2 pb-2">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="h-12 text-sm font-semibold tracking-wide"
              >
                Continue
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onFinish}
                  className="text-xs text-slate-500 hover:text-slate-900 transition-colors py-1 cursor-pointer"
                >
                  Skip
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Completion Toast */}
      {isCompleted && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Application Submitted!</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-[260px]">
            Your compatibility profile is now active on House Haven. Landlords will be able to review your application.
          </p>
        </div>
      )}
    </div>
  );
}
