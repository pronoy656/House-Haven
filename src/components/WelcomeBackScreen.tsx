"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { authApi } from "@/lib/api";

interface WelcomeBackScreenProps {
  initialEmail?: string;
  isVerified?: boolean;
  onNavigateToSignUp?: () => void;
  onLoginSuccess?: () => void;
  showStatusBar?: boolean;
}

export function WelcomeBackScreen({
  initialEmail = "",
  isVerified = false,
  onNavigateToSignUp,
  onLoginSuccess,
}: WelcomeBackScreenProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authApi.login({ email, password });
      setToastMessage("Signed in successfully to House Haven!");
      setTimeout(() => {
        setToastMessage(null);
        onLoginSuccess?.();
      }, 500);
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMessage(err.message || "Failed to sign in. Please check credentials.");
    } finally {
      setIsLoading(false);
    }
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

        {isVerified && (
          <div className="w-full mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">
              Account verified successfully! Please sign in with your password to continue.
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="w-full mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
            {errorMessage}
          </div>
        )}

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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 font-normal">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onNavigateToSignUp}
            className="text-slate-900 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-4 rounded-full shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
