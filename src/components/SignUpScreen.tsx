"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import { MobileStatusBar } from "@/components/shared/MobileStatusBar";
import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { authApi } from "@/lib/api";

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
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authApi.signup({
        name,
        email,
        password,
        phone: phone || undefined,
        role: selectedRole,
      });

      if (onSignUpSuccess) {
        onSignUpSuccess({ name: name || "User", email });
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setErrorMessage(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

        {errorMessage && (
          <div className="w-full mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          <InputField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />

          <InputField
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 7911 123456"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 font-normal">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="text-slate-900 font-semibold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
