"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  MessageSquare,
  Plus,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

interface Step2ApplicationInfoProps {
  onFinish: () => void;
  onSkip: () => void;
}

export function Step2ApplicationInfo({ onFinish, onSkip }: Step2ApplicationInfoProps) {
  const [step2Mode, setStep2Mode] = useState<"manual" | "chat">("manual");

  // Step 2 State: Move-in Preferences
  const [preferredLocation, setPreferredLocation] = useState<string>("City or town (e.g. Belfast)");
  const [moveInDate, setMoveInDate] = useState<string>("09/3/2025");
  const [leaseTerm, setLeaseTerm] = useState<string>("6 Monthly");

  // Budget & Rent
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [pets, setPets] = useState<string>("");

  // Employment & Income
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [annualSalary, setAnnualSalary] = useState<string>("");

  // Residential History
  const [recentAddress, setRecentAddress] = useState<string>("");
  const [lengthAtAddress, setLengthAtAddress] = useState<string>("");
  const [landlordName, setLandlordName] = useState<string>("");
  const [landlordContact, setLandlordContact] = useState<string>("");
  const [previousRent, setPreviousRent] = useState<string>("");

  // Verification
  const [niNumber, setNiNumber] = useState<string>("");

  // Property Preferences
  const [bedrooms, setBedrooms] = useState<string>("01");
  const [bathrooms, setBathrooms] = useState<string>("01");
  const [receptions, setReceptions] = useState<string>("01");
  const [houseStyle, setHouseStyle] = useState<string>("Any");

  // Toggles
  const [garden, setGarden] = useState<boolean>(true);
  const [garage, setGarage] = useState<boolean>(true);
  const [parking, setParking] = useState<boolean>(true);
  const [hmo, setHmo] = useState<boolean>(true);

  // References list
  const [references, setReferences] = useState<string[]>([]);
  const [isAddingRef, setIsAddingRef] = useState<boolean>(false);
  const [newRefName, setNewRefName] = useState<string>("");

  // Chat Mode Messages
  const [chatMessages, setChatMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    {
      sender: "ai",
      text: "Hi! I can help you complete your application quickly. Where would you like to live?",
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");

  const handleAddReference = () => {
    if (newRefName.trim()) {
      setReferences((prev) => [...prev, newRefName.trim()]);
      setNewRefName("");
      setIsAddingRef(false);
    }
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Got it! I've noted that down. What is your estimated monthly budget?`,
        },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-200">
      {/* Header Titles */}
      <div className="text-center pt-1 mb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Application Information
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Information used for property compatibility.
        </p>
      </div>

      {/* Mode Switcher: Manual vs Chat */}
      <div className="bg-[#F1F5F9] p-1 rounded-full flex items-center mb-4 gap-1">
        <Button
          type="button"
          variant="pill"
          size="sm"
          isActive={step2Mode === "manual"}
          onClick={() => setStep2Mode("manual")}
          className="flex-1 py-1.5"
        >
          Manual
        </Button>
        <Button
          type="button"
          variant="pill"
          size="sm"
          isActive={step2Mode === "chat"}
          onClick={() => setStep2Mode("chat")}
          leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
          className="flex-1 py-1.5"
        >
          Chat
        </Button>
      </div>

      {/* CHAT MODE */}
      {step2Mode === "chat" && (
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-100 p-4 space-y-3 min-h-[340px] flex flex-col justify-between">
          <div className="space-y-2.5 overflow-y-auto max-h-[260px] no-scrollbar">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] text-xs p-2.5 rounded-2xl leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-[#0891A2] text-white rounded-tr-xs"
                      : "bg-white text-slate-800 rounded-tl-xs border border-slate-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
            <InputField
              type="text"
              variant="outlined"
              inputSize="sm"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
              placeholder="Type an answer..."
              containerClassName="flex-1"
              className="rounded-full bg-white border-slate-200"
            />
            <Button
              type="button"
              variant="primary"
              size="icon-xs"
              onClick={handleSendChatMessage}
              className="w-8 h-8 shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* MANUAL FORM MODE */}
      {step2Mode === "manual" && (
        <div className="space-y-5">
          {/* 1. Move-in Preferences */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Move-in Preferences
            </h3>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Preferred location or area
              </label>
              <div className="relative">
                <select
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="City or town (e.g. Belfast)">City or town (e.g. Belfast)</option>
                  <option value="Belfast">Belfast</option>
                  <option value="Warrenpoint">Warrenpoint</option>
                  <option value="Armagh">Armagh</option>
                  <option value="Derry">Derry</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <InputField
              label="Desired Move-in Date"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Lease Term (month)
              </label>
              <div className="relative">
                <select
                  value={leaseTerm}
                  onChange={(e) => setLeaseTerm(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="6 Monthly">6 Monthly</option>
                  <option value="12 Monthly">12 Monthly</option>
                  <option value="24 Monthly">24 Monthly</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 2. Budget & Rent */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Budget & Rent
            </h3>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Monthly Rent Amount (£)
              </label>
              <div className="relative">
                <select
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="">Select rent budget</option>
                  <option value="£800 - £1,200">£800 - £1,200</option>
                  <option value="£1,200 - £1,800">£1,200 - £1,800</option>
                  <option value="£1,800+">£1,800+</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Pets
              </label>
              <div className="relative">
                <select
                  value={pets}
                  onChange={(e) => setPets(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="">Select pet option</option>
                  <option value="No Pets">No Pets</option>
                  <option value="Dogs">Dogs</option>
                  <option value="Cats">Cats</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3. Employment & Income */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Employment & Income
            </h3>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Employment Status
              </label>
              <div className="relative">
                <select
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="">Select employment status</option>
                  <option value="Employed Full-time">Employed Full-time</option>
                  <option value="Employed Part-time">Employed Part-time</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <InputField
              label="Employer"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              placeholder="Enter employer name"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <InputField
              label="Position"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter job title / position"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <InputField
              label="Annual Salary (£)"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="number"
              variant="filled"
              inputSize="sm"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              placeholder="e.g. 45000"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />
          </div>

          {/* 4. Residential History */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Residential History
            </h3>

            <InputField
              label="Most Recent Address"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={recentAddress}
              onChange={(e) => setRecentAddress(e.target.value)}
              placeholder="Enter previous address"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Length at Address (months)
              </label>
              <div className="relative">
                <select
                  value={lengthAtAddress}
                  onChange={(e) => setLengthAtAddress(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="">Select duration</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12-24 months">12-24 months</option>
                  <option value="24+ months">24+ months</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <InputField
              label="Landlord Name"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={landlordName}
              onChange={(e) => setLandlordName(e.target.value)}
              placeholder="Previous landlord's name"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <InputField
              label="Landlord Contact"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={landlordContact}
              onChange={(e) => setLandlordContact(e.target.value)}
              placeholder="Email or phone"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Previous Rent (£)
              </label>
              <div className="relative">
                <select
                  value={previousRent}
                  onChange={(e) => setPreviousRent(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-9"
                >
                  <option value="">Select previous rent</option>
                  <option value="Under £800">Under £800</option>
                  <option value="£800 - £1,200">£800 - £1,200</option>
                  <option value="£1,200 - £1,800">£1,200 - £1,800</option>
                  <option value="£1,800+">£1,800+</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 5. Verification */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Verification
            </h3>

            <InputField
              label="National Insurance Number"
              labelClassName="text-[11px] font-medium text-slate-500"
              type="text"
              variant="filled"
              inputSize="sm"
              value={niNumber}
              onChange={(e) => setNiNumber(e.target.value)}
              placeholder="e.g. QQ 12 34 56 A"
              className="bg-[#F8FAFC] border-slate-100 rounded-xl"
            />
          </div>

          {/* 6. Property Preferences */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
              Property Preferences
            </h3>

            {/* 2-col row: Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Number of Bedrooms
                </label>
                <div className="relative">
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-8"
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04+">04+</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Number of Bathrooms
                </label>
                <div className="relative">
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-8"
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03+">03+</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 2-col row: Receptions & House Style */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Number of Receptions
                </label>
                <div className="relative">
                  <select
                    value={receptions}
                    onChange={(e) => setReceptions(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-8"
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03+">03+</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  House Style
                </label>
                <div className="relative">
                  <select
                    value={houseStyle}
                    onChange={(e) => setHouseStyle(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] pr-8"
                  >
                    <option value="Any">Any</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Detached">Detached</option>
                    <option value="Semi-Detached">Semi-Detached</option>
                    <option value="Terraced">Terraced</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-3 pt-2">
              {/* Garden */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Garden</span>
                <button
                  type="button"
                  onClick={() => setGarden(!garden)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    garden ? "bg-[#0891A2]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      garden ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Garage */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Garage</span>
                <button
                  type="button"
                  onClick={() => setGarage(!garage)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    garage ? "bg-[#0891A2]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      garage ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Parking Available */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Parking Available</span>
                <button
                  type="button"
                  onClick={() => setParking(!parking)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    parking ? "bg-[#0891A2]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      parking ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* HMO */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">HMO</span>
                <button
                  type="button"
                  onClick={() => setHmo(!hmo)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    hmo ? "bg-[#0891A2]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      hmo ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 7. References */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-slate-600">Provide details of references</span>
              <button
                type="button"
                onClick={() => setIsAddingRef(!isAddingRef)}
                className="w-7 h-7 rounded-full bg-teal-50 text-[#0891A2] hover:bg-[#0891A2] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {isAddingRef && (
              <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <InputField
                  type="text"
                  variant="outlined"
                  inputSize="sm"
                  value={newRefName}
                  onChange={(e) => setNewRefName(e.target.value)}
                  placeholder="Reference Name & Contact"
                  containerClassName="flex-1"
                  className="rounded-lg bg-white"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleAddReference}
                  className="px-3 py-1.5 h-10 text-xs font-semibold shrink-0"
                >
                  Add
                </Button>
              </div>
            )}

            {references.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-teal-50/50 border border-teal-100 rounded-xl px-3 py-2 text-xs text-slate-700"
                  >
                    <span>{ref}</span>
                    <button
                      type="button"
                      onClick={() => setReferences(references.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: Continue & Skip */}
          <div className="pt-4 space-y-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={onFinish}
            >
              Continue
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="md"
              fullWidth
              onClick={onSkip}
              className="text-slate-500 hover:text-slate-800"
            >
              Skip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
