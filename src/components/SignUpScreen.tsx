"use client";

import React, { useState } from "react";
import { HouseHavenLogo } from "./HouseHavenLogo";
import { MobileStatusBar } from "./MobileStatusBar";
import { Button } from "./ui/Button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface SignUpScreenProps {
  selectedRole?: string;
  onBack?: () => void;
  onSignUpSuccess?: (userData: { name: string; email: string }) => void;
  onNavigateToSignIn?: () => void;
  showStatusBar?: boolean;
}

export function SignUpScreen({
  selectedRole = "tenant",
  onBack,
  onSignUpSuccess,
  onNavigateToSignIn,
  showStatusBar = true,
}: SignUpScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignUpSuccess) {
        onSignUpSuccess({ name: name || "Alex Morgan", email: email || "alex@example.com" });
      }
    }, 500);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-4 pb-6 text-slate-900 overflow-hidden">
      {/* Top Navigation */}
      <div className="shrink-0 flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9"></div>
        )}
        <div className="w-9"></div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center items-center px-1 py-2">
        {/* Logo (logo.png) */}
        <div className="mb-4 shrink-0">
          <HouseHavenLogo variant="light" width={64} height={82} />
        </div>

        {/* Title */}
        <div className="text-center mb-6 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-normal">
            Sign up to find your perfect place with House Haven.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-12 px-5 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm outline-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full h-12 px-5 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm outline-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full h-12 pl-5 pr-12 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm outline-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border-0 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-slate-500" />
                ) : (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="h-12 text-sm font-semibold tracking-wide border-0 shadow-none outline-none"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>

      {/* Footer link to sign in */}
      <div className="text-center text-xs text-slate-600 font-normal pt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onNavigateToSignIn}
          className="font-semibold text-[#0891A2] hover:underline cursor-pointer transition-colors"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
