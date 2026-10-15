"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { HouseHavenLogo } from "./HouseHavenLogo";
import { MobileStatusBar } from "./MobileStatusBar";
import { Button } from "./ui/Button";

interface WelcomeBackScreenProps {
  onNavigateToSignUp?: () => void;
  onLoginSuccess?: () => void;
  showStatusBar?: boolean;
}

export function WelcomeBackScreen({
  onNavigateToSignUp,
  onLoginSuccess,
  showStatusBar = true,
}: WelcomeBackScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Signed in successfully to House Haven!");
      setTimeout(() => {
        setToastMessage(null);
        onLoginSuccess?.();
      }, 500);
    }, 600);
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between p-6 pt-5 pb-6 text-slate-900 overflow-hidden">

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center items-center px-1 py-2">
        {/* Brand Logo - Uses logo.png */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
          <HouseHavenLogo variant="light" width={72} height={92} />
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            Log in to continue to your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full h-12 px-5 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-slate-500 pl-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-12 pl-5 pr-12 bg-[#F4F6F9] text-slate-900 placeholder:text-slate-400 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0891A2] border border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none p-1 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-slate-500" />
                ) : (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Sign In Reusable Button */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="h-12 font-semibold text-sm tracking-wide"
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-800 text-xs rounded-full border border-emerald-200 animate-fade-in font-medium">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Footer link to sign up */}
      <div className="text-center text-xs text-slate-600 font-normal pt-2">
        Didn&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onNavigateToSignUp}
          className="font-semibold text-[#0891A2] hover:underline cursor-pointer transition-colors"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
