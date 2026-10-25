"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/SplashScreen";
import { MobileContainer } from "@/components/shared/MobileContainer";

export default function HomePage() {
  const router = useRouter();
  const [slide, setSlide] = useState<1 | 2>(1);

  return (
    <MobileContainer>
      <SplashScreen
        initialSlide={slide}
        onSlideChange={(newSlide) => setSlide(newSlide)}
        onSignUp={() => router.push("/choose-role")}
        onSignIn={() => router.push("/login")}
        showStatusBar={true}
      />
    </MobileContainer>
  );
}
