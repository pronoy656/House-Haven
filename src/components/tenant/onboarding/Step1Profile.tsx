"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, ChevronDown } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

interface Step1ProfileProps {
  onContinue: () => void;
}

export function Step1Profile({ onContinue }: Step1ProfileProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dob, setDob] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("12236");
  const [address, setAddress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
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
              sizes="80px"
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
        <InputField
          label="Date of birth"
          type="date"
          variant="filled"
          inputSize="sm"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-[#F8FAFC] border-slate-100 rounded-xl"
        />

        {/* Phone number */}
        <InputField
          label="Phone number"
          type="tel"
          variant="filled"
          inputSize="sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="bg-[#F8FAFC] border-slate-100 rounded-xl"
        />

        {/* Post code */}
        <InputField
          label="Post code"
          type="text"
          variant="filled"
          inputSize="sm"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          rightIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}
          className="bg-[#F8FAFC] border-slate-100 rounded-xl font-medium"
        />

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
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
