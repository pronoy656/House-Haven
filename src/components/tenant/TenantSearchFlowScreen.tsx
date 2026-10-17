"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  Search,
  Sparkles,
  Clock,
  UserCheck,
  ArrowRight,
  Bed,
  Bath,
  Accessibility,
  Armchair,
  Flower2,
  Car,
  Heart,
  LayoutGrid,
  Repeat2,
  FileText,
  User,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TenantBottomNav } from "./TenantBottomNav";

interface TenantSearchFlowScreenProps {
  onBackToDashboard?: () => void;
  onNavigateToPropertyDetails?: (propertyId?: string) => void;
  onNavigateToNotifications?: () => void;
  onNavigateToMatches?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToProfile?: () => void;
}

interface PropertyMatch {
  id: string;
  name: string;
  address: string;
  price: string;
  period: string;
  matchPercentage: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  description?: string;
  landlord?: {
    name: string;
    responseTime: string;
  };
  features: {
    disabledAccess: boolean;
    furnished: boolean;
    garden: boolean;
    parking: boolean;
  };
}

const SAMPLE_PROPERTIES: PropertyMatch[] = [
  {
    id: "prop-1",
    name: "7 Great Georges Street",
    address: "7 Great Georges St N, Warrenpoint, Newry BT34 3HS, UK",
    price: "£ 1200",
    period: "Monthly",
    matchPercentage: 69,
    description: "A bright and contemporary 2-bedroom home located in a quiet, well-connected residential pocket. Features an open-plan kitchen and living area, brand-new appliances, private garden access, and dedicated secure off-street parking.",
    landlord: {
      name: "Arthur Jenkins",
      responseTime: "Replies in ~15 mins",
    },
    images: [
      "/great-georges-home.jpg",
      "/great-georges-interior.jpg",
      "/splash-livingroom-hd.jpg",
      "/splash-livingroom-opt2.jpg",
    ],
    bedrooms: 2,
    bathrooms: 1,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
  {
    id: "prop-2",
    name: "14 Belgrave Luxury Suites",
    address: "14 Belgrave Square, Knightsbridge, London SW1X 8PS, UK",
    price: "£ 1850",
    period: "Monthly",
    matchPercentage: 92,
    description: "Prestigious Knightsbridge residence offering refined city living. Floor-to-ceiling windows flood the spacious living areas with light. High-end modern furnishings, marble bathroom fittings, and 24/7 concierge service.",
    landlord: {
      name: "Victoria Sterling",
      responseTime: "Replies in ~1 hour",
    },
    images: [
      "/splash-building.jpg",
      "/splash-livingroom-opt4.jpg",
      "/splash-livingroom-opt6.jpg",
      "/splash-interior-dark.jpg",
    ],
    bedrooms: 3,
    bathrooms: 2,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: false,
      parking: true,
    },
  },
  {
    id: "prop-3",
    name: "Ocean View Horizon Villa",
    address: "5 Marine Drive, Brighton Marina, BN2 5WA, UK",
    price: "£ 2400",
    period: "Monthly",
    matchPercentage: 96,
    description: "Panoramic coastal views meet architectural elegance in this exceptional 4-bedroom marina villa. Features an expansive landscaped garden, bespoke fitted kitchen, spacious master suite with ensuite spa bath, and private driveway.",
    landlord: {
      name: "David Harrison",
      responseTime: "Replies in ~30 mins",
    },
    images: [
      "/splash-villa-luxury.jpg",
      "/splash-livingroom-opt7.jpg",
      "/splash-livingroom-opt8.jpg",
      "/property-interior.png",
    ],
    bedrooms: 4,
    bathrooms: 3,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
  {
    id: "prop-4",
    name: "Canary Riverside Penthouse",
    address: "Westferry Circus, Canary Wharf, London E14 8RR, UK",
    price: "£ 3100",
    period: "Monthly",
    matchPercentage: 88,
    description: "Stunning top-floor penthouse offering panoramic skyline views over the Thames and Canary Wharf. Premium smart-home integration, designer furnishings, private wrap-around terrace, and secure underground parking.",
    landlord: {
      name: "Elena Rostova",
      responseTime: "Replies in ~2 hours",
    },
    images: [
      "/splash-livingroom-opt9.jpg",
      "/splash-livingroom-opt10.jpg",
      "/splash-livingroom-opt11.jpg",
      "/splash-livingroom-opt12.jpg",
    ],
    bedrooms: 3,
    bathrooms: 3,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
];

export function TenantSearchFlowScreen({
  onBackToDashboard,
  onNavigateToPropertyDetails,
  onNavigateToNotifications,
  onNavigateToMatches,
  onNavigateToApplications,
  onNavigateToProfile,
}: TenantSearchFlowScreenProps) {
  // Step: 1 = AI Search Landing, 2 = Results Swiper
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState<boolean>(false);
  const [isClosingSheet, setIsClosingSheet] = useState<boolean>(false);
  const [sheetDragY, setSheetDragY] = useState<number>(0);
  const [isDraggingSheet, setIsDraggingSheet] = useState<boolean>(false);
  const sheetPointerStartY = useRef<number | null>(null);
  const sheetTouchStartY = useRef<number | null>(null);

  const [activePropertyIndex, setActivePropertyIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "matches" | "application" | "profile">("search");

  // Card dragging & animation states
  const cardPointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRafId = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [cardAnimation, setCardAnimation] = useState<"none" | "exit-left" | "exit-right" | "exit-up">("none");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Image interaction tracking (swiping on image vs card)
  const imagePointerStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const isImageInteracting = useRef<boolean>(false);

  const currentProperty = SAMPLE_PROPERTIES[activePropertyIndex] || SAMPLE_PROPERTIES[0];
  const nextPropertyIndex = (activePropertyIndex + 1) % SAMPLE_PROPERTIES.length;
  const nextProperty = SAMPLE_PROPERTIES[nextPropertyIndex];

  const handleOpenDetailsSheet = () => {
    setIsClosingSheet(false);
    setSheetDragY(0);
    setShowDetailsSheet(true);
  };

  const handleCloseDetailsSheet = () => {
    setIsClosingSheet(true);
    setTimeout(() => {
      setShowDetailsSheet(false);
      setIsClosingSheet(false);
      setSheetDragY(0);
    }, 240);
  };

  const handleSheetPointerDown = (e: React.PointerEvent) => {
    sheetPointerStartY.current = e.clientY;
    setIsDraggingSheet(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handleSheetPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingSheet || sheetPointerStartY.current === null) return;
    const diffY = e.clientY - sheetPointerStartY.current;
    if (diffY > 0) {
      setSheetDragY(diffY);
    }
  };

  const handleSheetPointerUp = (e: React.PointerEvent) => {
    if (sheetPointerStartY.current === null) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    setIsDraggingSheet(false);
    sheetPointerStartY.current = null;
    if (sheetDragY > 60) {
      handleCloseDetailsSheet();
    } else {
      setSheetDragY(0);
    }
  };

  const handleSheetTouchStart = (e: React.TouchEvent) => {
    sheetTouchStartY.current = e.touches[0].clientY;
    setIsDraggingSheet(true);
  };

  const handleSheetTouchMove = (e: React.TouchEvent) => {
    if (sheetTouchStartY.current === null) return;
    const diffY = e.touches[0].clientY - sheetTouchStartY.current;
    if (diffY > 0) {
      setSheetDragY(diffY);
    }
  };

  const handleSheetTouchEnd = () => {
    if (sheetTouchStartY.current === null) return;
    setIsDraggingSheet(false);
    sheetTouchStartY.current = null;
    if (sheetDragY > 60) {
      handleCloseDetailsSheet();
    } else {
      setSheetDragY(0);
    }
  };

  const handleViewDetails = () => {
    handleOpenDetailsSheet();
  };

  // Card Pass action (smooth animated throw to left)
  const triggerPass = (fromY: number = 0) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCardAnimation("exit-left");
    setDragOffset({ x: -500, y: fromY });

    setTimeout(() => {
      setActivePropertyIndex((prev) => (prev + 1) % SAMPLE_PROPERTIES.length);
      setActiveImageIndex(0);
      setDragOffset({ x: 0, y: 0 });
      setCardAnimation("none");
      setIsAnimating(false);
    }, 320);
  };

  // Card Love action (smooth animated throw to right)
  const triggerLove = (fromY: number = 0) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCardAnimation("exit-right");
    setDragOffset({ x: 500, y: fromY });

    setTimeout(() => {
      setActivePropertyIndex((prev) => (prev + 1) % SAMPLE_PROPERTIES.length);
      setActiveImageIndex(0);
      setDragOffset({ x: 0, y: 0 });
      setCardAnimation("none");
      setIsAnimating(false);
    }, 320);
  };

  // -------------------------------------------------------------
  // Card Gesture Handlers (Desktop Mouse & Touch)
  // -------------------------------------------------------------
  const handleCardPointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    cardPointerStart.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleCardPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !cardPointerStart.current || isAnimating) return;
    const diffX = e.clientX - cardPointerStart.current.x;
    const diffY = e.clientY - cardPointerStart.current.y;
    dragOffsetRef.current = { x: diffX, y: diffY };

    if (!cardRafId.current) {
      cardRafId.current = requestAnimationFrame(() => {
        setDragOffset(dragOffsetRef.current);
        cardRafId.current = null;
      });
    }
  };

  const handleCardPointerUp = (e: React.PointerEvent) => {
    if (!cardPointerStart.current || isAnimating) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (cardRafId.current) {
      cancelAnimationFrame(cardRafId.current);
      cardRafId.current = null;
    }
    setIsDragging(false);

    const { x, y } = dragOffsetRef.current;

    // Swipe Up -> View details
    if (y < -50 && Math.abs(x) < 80) {
      handleViewDetails();
      setDragOffset({ x: 0, y: 0 });
    }
    // Swipe Left -> Pass
    else if (x < -60) {
      triggerPass(y);
    }
    // Swipe Right -> Love
    else if (x > 60) {
      triggerLove(y);
    }
    // Snap back if under threshold
    else {
      setDragOffset({ x: 0, y: 0 });
    }

    cardPointerStart.current = null;
  };

  // -------------------------------------------------------------
  // Image Carousel Gesture Handlers (Stop card drag propagation)
  // -------------------------------------------------------------
  const handleImagePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    imagePointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isImageInteracting.current = true;
  };

  const handleImagePointerMove = (e: React.PointerEvent) => {
    if (!isImageInteracting.current) return;
    e.stopPropagation();
  };

  const handleImagePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!isImageInteracting.current || !imagePointerStart.current) return;
    const diffX = e.clientX - imagePointerStart.current.x;
    const diffY = Math.abs(e.clientY - imagePointerStart.current.y);
    const elapsed = Date.now() - imagePointerStart.current.time;
    const imagesCount = currentProperty.images.length;

    isImageInteracting.current = false;
    imagePointerStart.current = null;

    // Swipe left/right on image
    if (Math.abs(diffX) > 25 && Math.abs(diffX) > diffY) {
      if (diffX < 0) {
        // Swiped left -> next image
        setActiveImageIndex((prev) => (prev + 1) % imagesCount);
      } else {
        // Swiped right -> prev image
        setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
      }
    } else if (elapsed < 350 && Math.abs(diffX) < 15 && diffY < 15) {
      // Tap navigation: Left 35% -> previous, Right 65% -> next
      const rect = e.currentTarget.getBoundingClientRect();
      const tapX = e.clientX - rect.left;
      if (tapX < rect.width * 0.35) {
        setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
      } else {
        setActiveImageIndex((prev) => (prev + 1) % imagesCount);
      }
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none">

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 1: AI Search Landing ("Fine Property" / "AI Search")
         ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto no-scrollbar">
          {/* Top App Bar */}
          <div className="shrink-0 px-5 pt-4 pb-2 flex items-center justify-between">
            <div className="w-10" />
            <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Search
            </h1>
            {/* Notification Bell */}
            <button
              type="button"
              onClick={onNavigateToNotifications}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.9]" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          </div>

          {/* Body Content */}
          <div className="px-5 pt-2 pb-6 space-y-4">
            <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Fine Property
            </h2>

            {/* AI Search Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1 pr-2">
                  {/* AI Badge Icon */}
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#0891A2] mb-3 shadow-2xs">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <h3 className="text-[22px] font-extrabold text-slate-900 leading-tight">
                    AI Search
                  </h3>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed mt-2 max-w-[200px]">
                    Let AI find the perfect properties for you based on your preferences, budget, and lifestyle.
                  </p>
                </div>

                {/* 3D House & Magnifier Graphic */}
                <div className="w-32 h-28 relative shrink-0 -mr-2">
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* 3D House Illustration */}
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/checklist-illustration-3d.png"
                        alt="AI House"
                        fill
                        className="object-contain opacity-20 blur-[1px]"
                      />
                      {/* Crisp house layer */}
                      <Image
                        src="/browse-step-icon.jpg"
                        alt="House"
                        fill
                        className="object-contain drop-shadow-md rounded-2xl"
                      />
                    </div>
                    {/* Floating 3D Magnifying Glass */}
                    <div className="absolute -bottom-1 -right-1 w-14 h-14 bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] rounded-full p-2.5 shadow-lg border-2 border-white flex items-center justify-center text-white transform -rotate-12 animate-pulse">
                      <Search className="w-7 h-7 stroke-[2.8]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Feature Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-[#059669] text-[11px] font-medium">
                  <Clock className="w-3 h-3 stroke-[2.2]" />
                  <span>Save time</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-[#4F46E5] text-[11px] font-medium">
                  <Sparkles className="w-3 h-3 stroke-[2.2]" />
                  <span>Better matches</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/80 border border-amber-100 text-[#D97706] text-[11px] font-medium">
                  <UserCheck className="w-3 h-3 stroke-[2.2]" />
                  <span>Personalized</span>
                </div>
              </div>

              {/* Start AI Search Button */}
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setShowWarningModal(true)}
                className="mt-5 font-semibold text-sm"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.2]" />}
              >
                Start AI Search
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 2: Warning! Modal Popup
         ───────────────────────────────────────────────────────────── */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <h3 className="text-[19px] font-bold text-slate-900 tracking-tight">
              Warning!
            </h3>

            <p className="text-[12px] text-slate-600 leading-relaxed font-normal px-1">
              Your profile is not yet complete. Please complete your profile to at least 100% in order to best utilise the AI Search feature. Incomplete profiles may lead to suboptimal property recommendations that do not fully align with your preferences and requirements.
            </p>

            {/* Modal Actions */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowWarningModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWarningModal(false);
                    if (onNavigateToProfile) onNavigateToProfile();
                  }}
                  className="flex-1 py-2.5 rounded-full border border-[#0891A2] text-[#0891A2] font-semibold text-xs hover:bg-[#0891A2]/5 transition-colors cursor-pointer"
                >
                  Edit Application
                </button>
              </div>

              {/* Continue to AI Search Button */}
              <button
                type="button"
                onClick={() => {
                  setShowWarningModal(false);
                  setCurrentStep(2);
                }}
                className="w-full py-3 rounded-full bg-[#0891A2] hover:bg-[#078090] text-white font-semibold text-xs sm:text-[13px] transition-colors shadow-sm cursor-pointer active:scale-[0.99]"
              >
                Continue to AI Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 3: Search Result Swiper ("Search Result")
         ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="flex-1 min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar">
          {/* Top Bar with Back Arrow */}
          <div className="shrink-0 px-5 pt-4 pb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Back to Search"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </button>
            <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
              Search Result
            </h1>
            <button
              type="button"
              onClick={onNavigateToNotifications}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.9]" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          </div>

          {/* Swipe Card Area with Card Deck Effect */}
          <div className="flex-1 px-5 pt-1 pb-4 flex flex-col justify-between relative min-h-0">
            <style>{`
              @keyframes slideUpSheet {
                0% {
                  transform: translateY(100%);
                  opacity: 0.5;
                }
                100% {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
            `}</style>

            {/* Relative Stack Container for Cards */}
            <div className="relative flex-1 w-full min-h-[460px] flex flex-col">
              {/* ─────────────────────────────────────────────────────────────
                  BACKGROUND CARD (Next in deck - gives physical depth)
                 ───────────────────────────────────────────────────────────── */}
              {nextProperty && (
                <div
                  aria-hidden="true"
                  style={{
                    transform: `scale(${0.95 + Math.min(1, Math.abs(dragOffset.x) / 120) * 0.05}) translateY(${
                      10 - Math.min(1, Math.abs(dragOffset.x) / 120) * 10
                    }px)`,
                    opacity: 0.72 + Math.min(1, Math.abs(dragOffset.x) / 120) * 0.28,
                    transition: isDragging ? "none" : "transform 0.35s ease-out, opacity 0.35s ease-out",
                  }}
                  className="absolute inset-0 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs pointer-events-none select-none z-10 flex flex-col justify-between overflow-hidden"
                >
                  {/* Property Image Preview */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={nextProperty.images[0]}
                      alt={nextProperty.name}
                      fill
                      priority={false}
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0891A2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {nextProperty.matchPercentage}% Match
                    </div>
                  </div>

                  {/* Property Info Preview */}
                  <div className="pt-3.5 pb-2 space-y-2 opacity-80">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-[16px] font-extrabold text-slate-900 leading-snug line-clamp-1">
                          {nextProperty.name}
                        </h2>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                          {nextProperty.address}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[16px] font-extrabold text-slate-900 leading-none">
                          {nextProperty.price}
                        </div>
                        <span className="text-[11px] text-slate-800 font-bold block mt-0.5">
                          {nextProperty.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  ACTIVE FOREGROUND CARD (Swipeable & Interactive)
                 ───────────────────────────────────────────────────────────── */}
              <div
                key={currentProperty.id}
                onPointerDown={handleCardPointerDown}
                onPointerMove={handleCardPointerMove}
                onPointerUp={handleCardPointerUp}
                onPointerCancel={handleCardPointerUp}
                style={{
                  zIndex: 20,
                  touchAction: "none",
                  ...(cardAnimation === "exit-left"
                    ? {
                        transform: `translate3d(-150%, ${dragOffset.y}px, 0) rotate(-26deg)`,
                        opacity: 0,
                        transition: "transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.28s ease-out",
                      }
                    : cardAnimation === "exit-right"
                    ? {
                        transform: `translate3d(150%, ${dragOffset.y}px, 0) rotate(26deg)`,
                        opacity: 0,
                        transition: "transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.28s ease-out",
                      }
                    : isDragging
                    ? {
                        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.35}px, 0) rotate(${
                          dragOffset.x * 0.08
                        }deg)`,
                        transition: "none",
                      }
                    : {
                        transform: "translate3d(0, 0, 0) rotate(0deg)",
                        transition: "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }),
                }}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-md relative overflow-hidden flex flex-col justify-between flex-1 cursor-grab active:cursor-grabbing select-none"
              >
                {/* Dynamic Drag Stamp: PASS (Tilted Red Stamp) */}
                <div
                  style={{
                    opacity: isDragging
                      ? Math.min(1, Math.max(0, -dragOffset.x / 65))
                      : cardAnimation === "exit-left"
                      ? 1
                      : 0,
                  }}
                  className="absolute top-6 right-6 z-30 pointer-events-none transition-opacity duration-150 rotate-12 border-2 border-red-500 bg-white/95 text-red-600 font-black text-sm tracking-widest px-3.5 py-1 rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  <X className="w-4 h-4 stroke-[2.8]" />
                  <span>PASS</span>
                </div>

                {/* Dynamic Drag Stamp: LOVE (Tilted Teal Stamp) */}
                <div
                  style={{
                    opacity: isDragging
                      ? Math.min(1, Math.max(0, dragOffset.x / 65))
                      : cardAnimation === "exit-right"
                      ? 1
                      : 0,
                  }}
                  className="absolute top-6 left-6 z-30 pointer-events-none transition-opacity duration-150 -rotate-12 border-2 border-[#0891A2] bg-white/95 text-[#0891A2] font-black text-sm tracking-widest px-3.5 py-1 rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-[#0891A2]" />
                  <span>LOVE</span>
                </div>

                {/* Dynamic Drag Stamp: VIEW DETAILS (Drag Up) */}
                <div
                  style={{
                    opacity: isDragging ? Math.min(1, Math.max(0, -dragOffset.y / 65)) : 0,
                  }}
                  className="absolute bottom-16 inset-x-0 mx-auto w-fit z-30 pointer-events-none transition-opacity duration-150 border-2 border-[#0891A2] bg-white/95 text-[#0891A2] font-black text-xs tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                >
                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                  <span>VIEW DETAILS</span>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    TOP PROPERTY IMAGE CAROUSEL (Independent Gesture Container)
                   ───────────────────────────────────────────────────────────── */}
                <div
                  onPointerDown={handleImagePointerDown}
                  onPointerMove={handleImagePointerMove}
                  onPointerUp={handleImagePointerUp}
                  onPointerCancel={handleImagePointerUp}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className="relative w-full h-[210px] sm:h-[230px] rounded-2xl overflow-hidden bg-slate-900 shrink-0 cursor-ew-resize select-none touch-pan-x group"
                >
                  {/* Sliding Reel for Images */}
                  <div
                    className="flex w-full h-full transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                  >
                    {currentProperty.images.map((img, idx) => (
                      <div key={idx} className="relative w-full h-full shrink-0">
                        <Image
                          src={img}
                          alt={`${currentProperty.name} photo ${idx + 1}`}
                          fill
                          sizes="(max-width: 480px) 100vw, 420px"
                          priority={idx === 0}
                          className="object-cover select-none pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Story-style Progress Bars at top */}
                  <div className="absolute top-2.5 inset-x-3 z-20 flex gap-1.5 pointer-events-none">
                    {currentProperty.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          idx === activeImageIndex
                            ? "bg-white shadow-sm"
                            : idx < activeImageIndex
                            ? "bg-white/80"
                            : "bg-white/35 backdrop-blur-xs"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Match Percentage Badge (Top-Right) */}
                  <div className="absolute top-5 right-3 z-20 bg-[#0891A2] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-xs pointer-events-none">
                    {currentProperty.matchPercentage}% Match
                  </div>

                  {/* Photo Counter (Top-Left) */}
                  <div className="absolute top-5 left-3 z-20 bg-black/45 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs pointer-events-none">
                    {activeImageIndex + 1} / {currentProperty.images.length}
                  </div>

                  {/* Interactive Left Chevron Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(
                        (prev) => (prev - 1 + currentProperty.images.length) % currentProperty.images.length
                      );
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm active:scale-90"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Interactive Right Chevron Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % currentProperty.images.length);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm active:scale-90"
                    title="Next image"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Pagination Dots at bottom */}
                  <div className="absolute bottom-2.5 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
                    {currentProperty.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`rounded-full transition-all duration-200 ${
                          idx === activeImageIndex
                            ? "w-2.5 h-2 bg-white shadow-xs"
                            : "w-1.5 h-1.5 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    PROPERTY DETAILS
                   ───────────────────────────────────────────────────────────── */}
                <div className="pt-3.5 pb-1 space-y-2">
                  {/* Title & Price Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-[16px] font-extrabold text-slate-900 leading-snug">
                        {currentProperty.name}
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {currentProperty.address}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[16px] font-extrabold text-slate-900 leading-none">
                        {currentProperty.price}
                      </div>
                      <span className="text-[11px] text-slate-800 font-bold block mt-0.5">
                        {currentProperty.period}
                      </span>
                    </div>
                  </div>

                  {/* 2-Column Amenities & Features */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-2.5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Bed className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">{currentProperty.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Bath className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">{currentProperty.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Accessibility className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">Disabled Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Armchair className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">Furnished</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Flower2 className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">Garden</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs">
                      <Car className="w-4 h-4 text-[#0891A2] stroke-[2]" />
                      <span className="text-[11px] font-medium">Parking Available</span>
                    </div>
                  </div>

                  {/* Swipe Up Hint */}
                  <div
                    onClick={handleViewDetails}
                    className="pt-2 text-center text-[10px] text-slate-400 font-medium hover:text-[#0891A2] transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
                    <span>Swipe up or click for full property details</span>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    BOTTOM ACTION BUTTONS: PASS & LOVE
                   ───────────────────────────────────────────────────────────── */}
                <div className="flex items-center gap-3 pt-2">
                  {/* Pass Button */}
                  <Button
                    variant="danger"
                    size="md"
                    disabled={isAnimating}
                    onClick={() => triggerPass()}
                    className="flex-1 font-bold text-xs"
                    leftIcon={<X className="w-4 h-4 stroke-[2.4]" />}
                  >
                    Pass
                  </Button>

                  {/* Love Button */}
                  <Button
                    variant="primary"
                    size="md"
                    disabled={isAnimating}
                    onClick={() => triggerLove()}
                    className="flex-1 font-bold text-xs shadow-sm hover:shadow-md"
                    leftIcon={<Heart className="w-4 h-4 stroke-[2.4] fill-white" />}
                  >
                    Love
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SLIDE-UP FULL PROPERTY DETAILS SHEET (Swipe Down to Dismiss)
         ───────────────────────────────────────────────────────────── */}
      {showDetailsSheet && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseDetailsSheet();
          }}
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end transition-opacity duration-200 ${
            isClosingSheet ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div
            style={{
              transform: isClosingSheet
                ? "translateY(100%)"
                : isDraggingSheet
                ? `translateY(${Math.max(0, sheetDragY)}px)`
                : "translateY(0)",
              transition: isDraggingSheet ? "none" : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="bg-white w-full rounded-t-3xl max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl animate-[slideUpSheet_0.32s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          >
            {/* Grab Handle Header for Swipe Down */}
            <div
              onPointerDown={handleSheetPointerDown}
              onPointerMove={handleSheetPointerMove}
              onPointerUp={handleSheetPointerUp}
              onPointerCancel={handleSheetPointerUp}
              onTouchStart={handleSheetTouchStart}
              onTouchMove={handleSheetTouchMove}
              onTouchEnd={handleSheetTouchEnd}
              className="shrink-0 pt-2.5 pb-2.5 px-5 border-b border-slate-100 bg-white cursor-grab active:cursor-grabbing touch-none select-none"
            >
              {/* Swipe Down Pill Bar */}
              <div className="w-12 h-1.5 bg-slate-300 hover:bg-slate-400 rounded-full mx-auto mb-2.5 transition-colors" />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCloseDetailsSheet}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  title="Close details (or swipe down)"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <div className="text-center">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    Property Details
                  </h2>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Swipe down or tap back to dismiss
                  </span>
                </div>
                <div className="bg-[#0891A2]/10 text-[#0891A2] text-xs font-bold px-2.5 py-1 rounded-full">
                  {currentProperty.matchPercentage}% Match
                </div>
              </div>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5">
              {/* Image Carousel */}
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-900">
                <div
                  className="flex w-full h-full transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                >
                  {currentProperty.images.map((img, i) => (
                    <div key={i} className="relative w-full h-full shrink-0">
                      <Image
                        src={img}
                        alt={`${currentProperty.name} photo ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                {/* Chevrons */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + currentProperty.images.length) % currentProperty.images.length
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % currentProperty.images.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5">
                  {currentProperty.images.map((_, i) => (
                    <span
                      key={i}
                      className={`rounded-full transition-all duration-200 ${
                        i === activeImageIndex ? "w-2.5 h-2 bg-white" : "w-1.5 h-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title, Address & Price */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {currentProperty.name}
                    </h1>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0891A2] shrink-0" />
                      <span>{currentProperty.address}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#0891A2] leading-none">
                      {currentProperty.price}
                    </div>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {currentProperty.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Highlights Grid */}
              <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Bed className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">{currentProperty.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Bath className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">{currentProperty.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Accessibility className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">Disabled Access: {currentProperty.features.disabledAccess ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Armchair className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">{currentProperty.features.furnished ? "Fully Furnished" : "Unfurnished"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Flower2 className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">{currentProperty.features.garden ? "Private Garden" : "No Garden"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Car className="w-4 h-4 text-[#0891A2]" />
                  <span className="font-semibold">{currentProperty.features.parking ? "Parking Space" : "Street Parking"}</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
                  About this property
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {currentProperty.description ||
                    "Experience contemporary living in this beautifully designed home. Featuring expansive floor-to-ceiling windows, modern fittings, high-spec energy efficiency, and immediate access to top transit links, cafes, and local amenities."}
                </p>
              </div>

              {/* Landlord Card */}
              <div className="bg-cyan-50/60 border border-cyan-100/80 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0891A2] text-white flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {currentProperty.landlord?.name || "Verified Landlord"}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {currentProperty.landlord?.responseTime || "Typically replies in 1 hour"}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#0891A2] bg-white px-2.5 py-1 rounded-full border border-cyan-200">
                  Verified
                </span>
              </div>

              {/* View separate full page link */}
              {onNavigateToPropertyDetails && (
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDetailsSheet(false);
                      onNavigateToPropertyDetails(currentProperty.id);
                    }}
                    className="text-xs text-[#0891A2] font-semibold hover:underline cursor-pointer"
                  >
                    Open full property page &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Details */}
            <div className="shrink-0 p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleCloseDetailsSheet();
                  triggerPass();
                }}
                className="flex-1 py-3.5 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4 stroke-[2.4]" />
                <span>Pass</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCloseDetailsSheet();
                  triggerLove();
                }}
                className="flex-1 py-3.5 rounded-full bg-[#0891A2] hover:bg-[#078090] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Heart className="w-4 h-4 stroke-[2.4] fill-white" />
                <span>Love & Apply</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION BAR (Matching screenshot exactly)
         ───────────────────────────────────────────────────────────── */}
      <TenantBottomNav
        activeTab={activeTab === "application" ? "maintenance" : activeTab}
        onNavigateToDashboard={() => {
          setActiveTab("dashboard");
          if (onBackToDashboard) onBackToDashboard();
        }}
        onNavigateToSearch={() => {
          setActiveTab("search");
          setCurrentStep(1);
        }}
        onNavigateToMatches={() => {
          setActiveTab("matches");
          if (onNavigateToMatches) onNavigateToMatches();
        }}
        onNavigateToMaintenance={() => {
          setActiveTab("application");
          if (onNavigateToApplications) onNavigateToApplications();
        }}
        onNavigateToProfile={() => {
          setActiveTab("profile");
          if (onNavigateToProfile) onNavigateToProfile();
        }}
      />

    </div>
  );
}
