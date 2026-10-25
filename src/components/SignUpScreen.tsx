"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

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
      <div className="shrink-0 flex items-center justify-between">
        {onBack ? (
          <Button
            variant="icon"
            size="icon-sm"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <div className="w-9 h-9" />
        )}
        {showStatusBar && <MobileStatusBar />}
        <div className="w-9 h-9" />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center items-center px-1 py-2">
        <div className="mb-4 shrink-0">
          <HouseHavenLogo variant="light" width={64} height={82} />
        </div>

        <div className="text-center mb-6 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-normal">
            Sign up to find your perfect place with House Haven.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          <InputField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            required
          />

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              className="h-12 text-sm font-semibold tracking-wide border-0 shadow-none outline-none"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>

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
