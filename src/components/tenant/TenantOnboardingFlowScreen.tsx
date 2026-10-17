"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  UploadCloud,
  Calendar,
  ChevronDown,
  MessageSquare,
  FileText,
  Plus,
  Check,
  Send,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TenantOnboardingFlowScreenProps {
  onComplete?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export function TenantOnboardingFlowScreen({
  onComplete,
  onSkip,
  onBack,
}: TenantOnboardingFlowScreenProps) {
  const router = useRouter();

  // Current Step: 1 = Tenant Profile, 2 = Application Information
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Mode in Step 2: "manual" | "chat"
  const [step2Mode, setStep2Mode] = useState<"manual" | "chat">("manual");

  // Step 1 State: Tenant Profile
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dob, setDob] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("12236");
  const [address, setAddress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tenantProfileCompleted", "true");
    }
    if (onComplete) {
      onComplete();
    } else {
      router.push("/tenant/dashboard");
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      router.push("/tenant/dashboard");
    }
  };

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
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      {/* NAVIGATION BAR & STEP INDICATOR */}
      <div className="shrink-0 px-4 pt-3.5 pb-2 flex items-center relative">
        <Button
          variant="icon"
          size="icon-sm"
          onClick={() => {
            if (currentStep === 2) {
              setCurrentStep(1);
            } else if (onBack) {
              onBack();
            } else {
              router.push("/otp");
            }
          }}
          className="z-10"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </Button>

        {/* Center Progress Bar & Step Text */}
        <div className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10.5px] font-medium text-slate-400 mb-1">
            Step {currentStep} of 2
          </span>
          <div className="w-28 h-1 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#0891A2] transition-all duration-300"
              style={{ width: currentStep === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>
      </div>

      {/* 3. SCROLLABLE FORM BODY */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-3">

        {/* ============================================================== */}
        {/* STEP 1: TENANT PROFILE                                         */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="space-y-4 pb-6 animate-in fade-in duration-200">
            {/* Header Titles */}
            <div className="text-center pt-1 mb-4">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Tenant Profile
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Complete your personal information.
              </p>
            </div>

            {/* Photo Upload Card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100 flex flex-col items-center justify-center shadow-2xs">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] flex flex-col items-center justify-center cursor-pointer transition-all border border-blue-100 shadow-2xs overflow-hidden relative group"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Tenant Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-[#0284C7] stroke-[2.2] mb-0.5" />
                    <span className="text-[10px] font-bold text-[#0284C7]">
                      Add photo
                    </span>
                  </>
                )}
              </div>

              <p className="text-[10.5px] text-slate-400 mt-3 text-center">
                Required · One clear profile portrait.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 pt-1">
              {/* Date of birth */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Date of birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-colors"
                    placeholder="Select date"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-colors"
                />
              </div>

              {/* Post code */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Post code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-colors pr-9"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Select your address */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Select your address
                </label>
                <div className="relative">
                  <select
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-3 text-xs text-slate-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-colors pr-9"
                  >
                    <option value="">Select address</option>
                    <option value="Flat 4, 12236 Park Avenue">Flat 4, 12236 Park Avenue</option>
                    <option value="12236 Elm Street, Apt 2B">12236 Elm Street, Apt 2B</option>
                    <option value="7 Great Georges St N">7 Great Georges St N</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setCurrentStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: APPLICATION INFORMATION                                */}
        {/* ============================================================== */}
        {currentStep === 2 && (
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
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder="Type an answer..."
                    className="flex-1 bg-white border border-slate-200 rounded-full px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
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

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Desired Move-in Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2] pl-9"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

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

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Employer
                    </label>
                    <input
                      type="text"
                      value={employer}
                      onChange={(e) => setEmployer(e.target.value)}
                      placeholder="Enter employer name"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Enter job title / position"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Annual Salary (£)
                    </label>
                    <input
                      type="number"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(e.target.value)}
                      placeholder="e.g. 45000"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>
                </div>

                {/* 4. Residential History */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
                    Residential History
                  </h3>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Most Recent Address
                    </label>
                    <input
                      type="text"
                      value={recentAddress}
                      onChange={(e) => setRecentAddress(e.target.value)}
                      placeholder="Enter previous address"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>

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

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Landlord Name
                    </label>
                    <input
                      type="text"
                      value={landlordName}
                      onChange={(e) => setLandlordName(e.target.value)}
                      placeholder="Previous landlord's name"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Landlord Contact
                    </label>
                    <input
                      type="text"
                      value={landlordContact}
                      onChange={(e) => setLandlordContact(e.target.value)}
                      placeholder="Email or phone"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>

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

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      National Insurance Number
                    </label>
                    <input
                      type="text"
                      value={niNumber}
                      onChange={(e) => setNiNumber(e.target.value)}
                      placeholder="e.g. QQ 12 34 56 A"
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                  </div>
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
                  <h3 className="text-xs font-bold text-[#0891A2] tracking-tight">
                    References
                  </h3>

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
                      <input
                        type="text"
                        value={newRefName}
                        onChange={(e) => setNewRefName(e.target.value)}
                        placeholder="Reference Name & Contact"
                        className="flex-1 text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                      />
                      <button
                        type="button"
                        onClick={handleAddReference}
                        className="px-3 py-1.5 bg-[#0891A2] text-white rounded-lg text-xs font-semibold"
                      >
                        Add
                      </button>
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
                    onClick={handleFinish}
                  >
                    Continue
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    fullWidth
                    onClick={handleSkip}
                    className="text-slate-500 hover:text-slate-800"
                  >
                    Skip
                  </Button>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
