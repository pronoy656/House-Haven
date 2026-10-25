"use client";

import React, { useState } from "react";
import { TenantBottomNav } from "./TenantBottomNav";
import { AiSearchLandingView } from "./search/AiSearchLandingView";
import { SearchSwiperView } from "./search/SearchSwiperView";
import { WarningModal } from "./search/WarningModal";
import { PropertyDetailModal } from "./search/PropertyDetailModal";
import { SAMPLE_PROPERTIES } from "./search/mockData";
import { PropertyMatch } from "./search/types";

interface TenantSearchFlowScreenProps {
  onBackToDashboard?: () => void;
  onNavigateToPropertyDetails?: (propertyId?: string) => void;
  onNavigateToNotifications?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToProfile?: () => void;
}

export function TenantSearchFlowScreen({
  onBackToDashboard,
  onNavigateToNotifications,
  onNavigateToMatches,
  onNavigateToProfile,
}: TenantSearchFlowScreenProps) {
  // Step 1: AI Search Landing, Step 2: Search Result Swiper
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Modals
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedPropertyForDetails, setSelectedPropertyForDetails] =
    useState<PropertyMatch | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMatchSuccess = (property: PropertyMatch) => {
    showToast(`Mutual Match with ${property.name}! Added to your Matches.`);
    if (onNavigateToMatches) {
      setTimeout(() => onNavigateToMatches(), 1200);
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-xs animate-in fade-in slide-in-from-top duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Flow Content */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        {currentStep === 1 && (
          <AiSearchLandingView
            onStartAiSearch={() => setShowWarningModal(true)}
            onNavigateToNotifications={onNavigateToNotifications}
          />
        )}

        {currentStep === 2 && (
          <SearchSwiperView
            properties={SAMPLE_PROPERTIES}
            onBackToLanding={() => setCurrentStep(1)}
            onNavigateToNotifications={onNavigateToNotifications}
            onViewPropertyDetails={(prop) => setSelectedPropertyForDetails(prop)}
            onMatchSuccess={handleMatchSuccess}
          />
        )}
      </div>

      {/* Warning Modal */}
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onEditProfile={() => {
          setShowWarningModal(false);
          if (onNavigateToProfile) onNavigateToProfile();
        }}
        onContinue={() => {
          setShowWarningModal(false);
          setCurrentStep(2);
        }}
      />

      {/* Full Property Details Sheet */}
      <PropertyDetailModal
        property={selectedPropertyForDetails}
        isOpen={Boolean(selectedPropertyForDetails)}
        onClose={() => setSelectedPropertyForDetails(null)}
        onMatch={(prop) => {
          setSelectedPropertyForDetails(null);
          handleMatchSuccess(prop);
        }}
      />

      {/* Fixed Bottom Navigation */}
      <TenantBottomNav activeTab="search" />
    </div>
  );
}
