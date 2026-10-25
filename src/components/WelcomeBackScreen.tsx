"use client";

import React, { useState } from "react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";

interface WelcomeBackScreenProps {
  onNavigateToSignUp?: () => void;
  onLoginSuccess?: () => void;
  showStatusBar?: boolean;
}

export function WelcomeBackScreen({
  onNavigateToSignUp,
  onLoginSuccess,
}: WelcomeBackScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col justify-center items-center px-1 py-2">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-200">
          <HouseHavenLogo variant="light" width={72} height={92} />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            Log in to continue to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            placeholder="Enter password"
            required
          />

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              className="h-12 font-semibold text-sm tracking-wide"
            >
              Sign in
            </Button>
          </div>
        </form>

        {toastMessage && (
          <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-800 text-xs rounded-full border border-emerald-200 animate-fade-in font-medium">
            {toastMessage}
          </div>
        )}
      </div>

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
