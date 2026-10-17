"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Building2,
  Calendar as CalendarIcon,
  Send,
  RotateCcw,
  FileText,
  Upload,
  Check,
  Star,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TenantBottomNav } from "./TenantBottomNav";

interface AgreementItem {
  id: string;
  title: string;
  address: string;
  date: string;
  status: "Pending Signature" | "Signed" | "Under Review" | "Signed End";
  image: string;
}

const INITIAL_AGREEMENTS: AgreementItem[] = [
  {
    id: "1",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Pending Signature",
    image: "/great-georges-home.jpg",
  },
  {
    id: "2",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Signed",
    image: "/great-georges-home.jpg",
  },
  {
    id: "3",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 26",
    status: "Under Review",
    image: "/great-georges-home.jpg",
  },
  {
    id: "4",
    title: "Riverside Apartments",
    address: "123 Rental Street",
    date: "Sent on Sep 12, 25",
    status: "Signed End",
    image: "/great-georges-home.jpg",
  },
];

interface ChatMessage {
  id: string;
  sender: "landlord" | "tenant";
  text: string;
  time: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function TenantAgreementsFlowScreen() {
  const router = useRouter();

  // Navigation flow step: "list" | "details" | "review" | "success"
  const [currentStep, setCurrentStep] = useState<"list" | "details" | "review" | "success">("list");
  
  // Tab filter in Agreements list: "all" | "pending" | "signed"
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "signed">("all");

  // Agreements state
  const [agreements, setAgreements] = useState<AgreementItem[]>(INITIAL_AGREEMENTS);
  
  // Selected agreement for details
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementItem>(INITIAL_AGREEMENTS[0]);

  // Review Modal state ("Give Review" screen)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("Heating not working");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // View Agreement Document Modal state
  const [isViewAgreementDocOpen, setIsViewAgreementDocOpen] = useState(false);

  // Chat messages in pending details screen
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "landlord",
      text: "Can you fix the problem in this time ? I need quick",
      time: "19:25",
    },
    {
      id: "m2",
      sender: "tenant",
      text: "Can you fix the problem in this time ? I need quick",
      time: "19:26",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Signature Screen state
  const [signMethod, setSignMethod] = useState<"draw" | "type" | "upload">("draw");
  const [typedSignature, setTypedSignature] = useState("Andy Lexsian");
  const [fullName, setFullName] = useState("Andy Lexsian");
  
  // Interactive Date Picker state
  const [signDate, setSignDate] = useState("24 february 1996");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(1); // 1 = February
  const [calYear, setCalYear] = useState(1996);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drawing canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ("touches" in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ("touches" in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0F172A";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Send message in details chat
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "tenant",
      text: chatInput.trim(),
      time: "Just now",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  // Handle Sign and Submit
  const handleSignSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAgreements((prev) =>
        prev.map((item) =>
          item.id === selectedAgreement.id
            ? { ...item, status: "Signed" }
            : item
        )
      );
      setSelectedAgreement((prev) => ({ ...prev, status: "Signed" }));
      setCurrentStep("success");
    }, 700);
  };

  // Handle Review Submit
  const handleReviewSubmit = () => {
    setIsSubmittingReview(true);
    setTimeout(() => {
      setIsSubmittingReview(false);
      setIsReviewModalOpen(false);
      showToast("Thank you! Your landlord review has been submitted.");
    }, 500);
  };

  // Date selection helper
  const handlePickDate = (day: number) => {
    const monthStr = MONTH_NAMES[calMonth].toLowerCase();
    const formatted = `${day} ${monthStr} ${calYear}`;
    setSignDate(formatted);
    setIsDatePickerOpen(false);
  };

  // Calendar days generation
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  // Filtered agreements based on filter tab
  const filteredAgreements = agreements.filter((item) => {
    if (filterTab === "pending") return item.status === "Pending Signature";
    if (filterTab === "signed") return item.status === "Signed" || item.status === "Signed End";
    return true;
  });

  const pendingCount = agreements.filter((i) => i.status === "Pending Signature").length;
  const signedCount = agreements.filter((i) => i.status === "Signed" || i.status === "Signed End").length;

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between text-slate-900 overflow-hidden select-none font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top duration-200">
          {toastMessage}
        </div>
      )}

      {/* MAIN STEP CONTAINER */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col relative pt-1">

        {/* ============================================================== */}
        {/* SCREEN 1: AGREEMENTS LIST                                     */}
        {/* ============================================================== */}
        {currentStep === "list" && (
          <div className="p-4 pb-6 flex flex-col flex-1 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => router.push("/tenant/dashboard")}
                prefetchHref="/tenant/dashboard"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </Button>

              <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
                Agreements
              </h1>

              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => router.push("/tenant/notifications")}
                prefetchHref="/tenant/notifications"
                className="relative"
              >
                <Bell className="w-4 h-4 stroke-[2]" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0891A2] rounded-full" />
              </Button>
            </div>

            {/* Filter Tabs: All, Pending, Signed */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                variant="pill"
                size="sm"
                isActive={filterTab === "all"}
                onClick={() => setFilterTab("all")}
              >
                All({agreements.length})
              </Button>
              <Button
                type="button"
                variant="pill"
                size="sm"
                isActive={filterTab === "pending"}
                onClick={() => setFilterTab("pending")}
              >
                Pending({pendingCount})
              </Button>
              <Button
                type="button"
                variant="pill"
                size="sm"
                isActive={filterTab === "signed"}
                onClick={() => setFilterTab("signed")}
              >
                Signed({signedCount})
              </Button>
            </div>

            {/* Agreements Cards List */}
            <div className="space-y-3">
              {filteredAgreements.map((agreement) => {
                const isPending = agreement.status === "Pending Signature";
                const isSigned = agreement.status === "Signed";
                const isUnderReview = agreement.status === "Under Review";
                const isSignedEnd = agreement.status === "Signed End";

                return (
                  <div
                    key={agreement.id}
                    onClick={() => {
                      setSelectedAgreement(agreement);
                      setCurrentStep("details");
                    }}
                    className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99] group"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-[62px] h-[62px] rounded-xl overflow-hidden relative shrink-0 bg-slate-100">
                      <Image
                        src={agreement.image}
                        alt={agreement.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13.5px] font-bold text-slate-900 truncate">
                        {agreement.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate">
                        {agreement.address}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {agreement.date}
                      </p>

                      {/* Status Badges */}
                      <div className="mt-1.5">
                        {isPending && (
                          <span className="inline-block text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
                            Pending Signature
                          </span>
                        )}
                        {isSigned && (
                          <span className="inline-block text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#D1FAE5]">
                            Signed
                          </span>
                        )}
                        {isUnderReview && (
                          <span className="inline-block text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#3B82F6] border border-[#DBEAFE]">
                            Under Review
                          </span>
                        )}
                        {isSignedEnd && (
                          <span className="inline-block text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2]">
                            Signed End
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 2: AGREEMENTS DETAILS                                  */}
        {/* High-Resolution Living Room Image & Removed Download Button    */}
        {/* ============================================================== */}
        {currentStep === "details" && (
          <div className="p-4 pb-6 flex flex-col flex-1 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">
              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => setCurrentStep("list")}
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </Button>

              <h1 className="text-[16.5px] font-bold text-slate-900 tracking-tight">
                Agreements Details
              </h1>

              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => router.push("/tenant/notifications")}
                prefetchHref="/tenant/notifications"
                className="relative"
              >
                <Bell className="w-4 h-4 stroke-[2]" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0891A2] rounded-full" />
              </Button>
            </div>

            {/* Ultra High Quality Hero Property Interior Image */}
            <div className="w-full h-48 rounded-2xl overflow-hidden relative mb-3 bg-slate-900 shadow-xs border border-slate-100">
              <Image
                src="/great-georges-interior.jpg"
                alt="Riverside Apartments Luxury Living Room"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Property Title & Address */}
            <div className="flex items-start gap-2.5 mb-3.5">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
                  Riverside Apartments
                </h2>
                <p className="text-[11.5px] text-slate-400 mt-0.5">
                  7 Great Georges St N, Warrenpoint.
                </p>
              </div>
            </div>

            {/* Landlord Profile Row */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0 border border-slate-200">
                <Image
                  src="/john-wick-avatar.jpg"
                  alt="John Wick"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wide">
                  Landlord
                </p>
                <h3 className="text-xs font-bold text-slate-800">
                  John Wick
                </h3>
              </div>
            </div>

            {/* CASE A: PENDING SIGNATURE (3 Items Grid + Chat + Review & Sign Button ONLY) */}
            {selectedAgreement.status === "Pending Signature" && (
              <>
                {/* 3 Lease Terms Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                      <p className="text-xs font-bold text-slate-800">12 Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                      <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 col-span-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                      <p className="text-xs font-bold text-slate-800">£1,850</p>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="text-xs font-bold text-slate-800">Status</span>
                  <span className="text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
                    Pending Signature
                  </span>
                </div>

                {/* Landlord Chat Box */}
                <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs mb-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-full overflow-hidden relative shrink-0">
                      <Image
                        src="/john-wick-avatar.jpg"
                        alt="Landlord Test"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11.5px] font-bold text-slate-800 leading-tight">
                        Landlord Test
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9.5px] text-emerald-600 font-medium">Online Now</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-2.5 space-y-2 max-h-36 overflow-y-auto no-scrollbar">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "tenant" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] text-[11px] p-2 rounded-xl leading-relaxed shadow-2xs ${
                            msg.sender === "tenant"
                              ? "bg-teal-50 text-slate-800 rounded-tr-xs border border-teal-100"
                              : "bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-100"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="icon-xs"
                      onClick={handleSendMessage}
                      className="w-7 h-7 shrink-0 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* ONLY Review & Sign Button (Download a Copy removed per request) */}
                <div className="mt-auto pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => setCurrentStep("review")}
                  >
                    Review & Sign
                  </Button>
                </div>
              </>
            )}

            {/* CASE B: SIGNED (2x2 Grid + Signed Badge + View Agreement ONLY) */}
            {selectedAgreement.status === "Signed" && (
              <>
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                      <p className="text-xs font-bold text-slate-800">12 Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                      <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                      <p className="text-xs font-bold text-slate-800">£1,850</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Year Built</p>
                      <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-bold text-slate-800">Status</span>
                  <span className="text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#D1FAE5]">
                    Signed
                  </span>
                </div>

                {/* ONLY View Agreement Button (Download a Copy removed) */}
                <div className="mt-auto pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => setIsViewAgreementDocOpen(true)}
                  >
                    View Agreement
                  </Button>
                </div>
              </>
            )}

            {/* CASE C: SIGNED END (2x2 Grid + Give Landlord Review ONLY) */}
            {(selectedAgreement.status === "Signed End" || selectedAgreement.status === "Under Review") && (
              <>
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Lease Term</p>
                      <p className="text-xs font-bold text-slate-800">12 Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Start Date</p>
                      <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Monthly Rent</p>
                      <p className="text-xs font-bold text-slate-800">£1,850</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0891A2] shrink-0">
                      <CalendarIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Year Built</p>
                      <p className="text-xs font-bold text-slate-800">Oct 1, 2026</p>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-bold text-slate-800">Status</span>
                  <span className="text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
                    Pending Signature
                  </span>
                </div>

                {/* ONLY Give Landlord Review Button (Download a Copy removed) */}
                <div className="mt-auto pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    Give Landlord Review
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 3: AGREEMENTS REVIEW AND SIGN                          */}
        {/* With Interactive Calendar Date Picker                          */}
        {/* ============================================================== */}
        {currentStep === "review" && (
          <div className="p-4 pb-6 flex flex-col flex-1 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => setCurrentStep("details")}
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </Button>

              <h1 className="text-[16.5px] font-bold text-slate-900 tracking-tight">
                Agreements Review
              </h1>

              <Button
                variant="icon"
                size="icon-sm"
                onClick={() => router.push("/tenant/notifications")}
                prefetchHref="/tenant/notifications"
                className="relative"
              >
                <Bell className="w-4 h-4 stroke-[2]" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#0891A2] rounded-full" />
              </Button>
            </div>

            {/* Document Card (Credit_Report.pdf) */}
            <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-3 mb-4">
              <div className="w-9 h-11 rounded-lg bg-red-500 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs relative">
                <div className="w-2.5 h-2 bg-red-600 absolute top-0 right-0 rounded-bl-sm" />
                <FileText className="w-4 h-4 text-white" />
                <span className="text-[7.5px] font-black tracking-tighter mt-0.5">PDF</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900 truncate">
                  Credit_Report.pdf
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  12 page . 2.4 MB
                </p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Button
                  type="button"
                  variant="pill"
                  size="sm"
                  isActive={signMethod === "draw"}
                  onClick={() => setSignMethod("draw")}
                  className="px-5 py-1.5"
                >
                  Draw
                </Button>
                <Button
                  type="button"
                  variant="pill"
                  size="sm"
                  isActive={signMethod === "type"}
                  onClick={() => setSignMethod("type")}
                  className="px-5 py-1.5"
                >
                  Type
                </Button>
                <Button
                  type="button"
                  variant="pill"
                  size="sm"
                  isActive={signMethod === "upload"}
                  onClick={() => setSignMethod("upload")}
                  className="px-5 py-1.5"
                >
                  Upload
                </Button>
              </div>

              {/* Signature Canvas Area */}
              <div className="w-full h-36 bg-white rounded-2xl border border-slate-200/90 relative overflow-hidden flex flex-col justify-between p-2 shadow-2xs">
                {signMethod === "draw" && (
                  <>
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full cursor-crosshair touch-none"
                    />
                    {!hasDrawn && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <span className="text-[11px] text-slate-400 italic">
                          Draw signature here
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-600 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md cursor-pointer border border-slate-100"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </>
                )}

                {signMethod === "type" && (
                  <div className="flex-1 flex flex-col items-center justify-center p-2">
                    <input
                      type="text"
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      placeholder="Type your signature..."
                      className="w-full text-center text-2xl font-serif italic text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#0891A2] py-2"
                      style={{ fontFamily: "Georgia, cursive" }}
                    />
                    <span className="text-[10px] text-slate-400 mt-2">
                      Electronic Signature Representation
                    </span>
                  </div>
                )}

                {signMethod === "upload" && (
                  <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl m-1 bg-slate-50/50">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700">
                      Upload Signature Image
                    </p>
                    <p className="text-[9.5px] text-slate-400">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields: Full Name & Interactive Date Picker */}
            <div className="space-y-3 mb-6 relative">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                />
              </div>

              {/* Date Input with Calendar Trigger */}
              <div className="relative">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Date
                </label>
                <div
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium flex items-center justify-between cursor-pointer hover:border-[#0891A2] transition-colors"
                >
                  <span>{signDate || "Select a date"}</span>
                  <CalendarIcon className="w-4 h-4 text-[#0891A2]" />
                </div>

                {/* Calendar Dropdown Modal / Popup */}
                {isDatePickerOpen && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 animate-in zoom-in-95 duration-150">
                    {/* Month & Year Navigation */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (calMonth === 0) {
                            setCalMonth(11);
                            setCalYear((y) => y - 1);
                          } else {
                            setCalMonth((m) => m - 1);
                          }
                        }}
                        className="p-1 hover:bg-slate-100 rounded-md text-slate-600 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-bold text-slate-800">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          if (calMonth === 11) {
                            setCalMonth(0);
                            setCalYear((y) => y + 1);
                          } else {
                            setCalMonth((m) => m + 1);
                          }
                        }}
                        className="p-1 hover:bg-slate-100 rounded-md text-slate-600 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day of Week Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const isToday = dayNum === 24 && calMonth === 1 && calYear === 1996;
                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handlePickDate(dayNum)}
                            className={`h-7 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center ${
                              isToday
                                ? "bg-[#0891A2] text-white font-bold"
                                : "hover:bg-teal-50 hover:text-[#0891A2] text-slate-700"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Close Date Picker Button */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsDatePickerOpen(false)}
                        className="text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-0.5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-auto">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                onClick={handleSignSubmit}
                className="flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span>Sign & Submit</span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 4: LEASE SIGNED SUCCESSFULLY!                          */}
        {/* Using Frame.png & STATIC FESTIVE CONFETTI (NO ANIMATION)       */}
        {/* ============================================================== */}
        {currentStep === "success" && (
          <div className="p-4 pb-6 flex flex-col flex-1 justify-between items-center text-center animate-in zoom-in-95 duration-200 relative overflow-hidden">
            
            {/* STATIC CONFETTI ON ALL SIDES AROUND THE IMAGE (NO CSS ANIMATION) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              {/* TOP LEFT */}
              <div className="absolute top-12 left-10 w-3 h-3 rounded-full bg-[#0891A2]" />
              <div className="absolute top-16 left-22 w-4.5 h-2 rounded-full bg-[#38BDF8] -rotate-45" />
              <div className="absolute top-28 left-8 w-3 h-4 rounded-xs bg-[#FDE047] rotate-12" />
              <div className="absolute top-38 left-14 text-[#EC4899] text-base font-bold">✦</div>
              <div className="absolute top-52 left-10 w-4.5 h-2 rounded-full bg-[#A855F7] -rotate-30" />
              <div className="absolute top-22 left-32 w-2 h-2 rounded-full bg-[#FB923C]" />

              {/* TOP RIGHT */}
              <div className="absolute top-12 right-14 text-[#F59E0B] text-lg font-bold">✦</div>
              <div className="absolute top-18 right-8 w-4.5 h-2 rounded-full bg-[#FB7185] rotate-45" />
              <div className="absolute top-30 right-10 w-3 h-3 rounded-full bg-[#10B981]" />
              <div className="absolute top-40 right-6 text-[#14B8A6] text-base font-bold">★</div>
              <div className="absolute top-52 right-12 w-3 h-3 rounded-full bg-[#FB923C]" />
              <div className="absolute top-24 right-28 w-2 h-2 rounded-full bg-[#6366F1]" />

              {/* SIDES & CORNERS */}
              <div className="absolute top-64 left-6 w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
              <div className="absolute top-64 right-6 text-[#FBBF24] text-xs font-bold">★</div>
              <div className="absolute top-72 left-16 w-3 h-2 rounded-full bg-[#EC4899] rotate-45" />
              <div className="absolute top-72 right-16 w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <div className="absolute top-8 left-36 text-[#A855F7] text-xs font-bold">✦</div>
              <div className="absolute top-8 right-36 w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
            </div>

            {/* Central Illustration using public/Frame.png */}
            <div className="pt-6 flex flex-col items-center relative z-10">
              <div className="relative w-52 h-52 sm:w-56 sm:h-56 drop-shadow-sm">
                <Image
                  src="/Frame.png"
                  alt="Lease Signed Successfully!"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Title & Description */}
              <h2 className="text-[17px] font-bold text-slate-900 mt-4 tracking-tight">
                Lease Signed Successfully!
              </h2>
              <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5 max-w-[270px] mx-auto">
                Your lease agreement has been signed and submitted. A copy has been sent to your email.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2 mt-auto pt-6 relative z-10">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setSelectedAgreement({
                    id: "1",
                    title: "Riverside Apartments",
                    address: "7 Great Georges St N, Warrenpoint.",
                    date: "Sent on Sep 12, 26",
                    status: "Signed",
                    image: "/great-georges-home.jpg",
                  });
                  setCurrentStep("details");
                }}
              >
                View Agreement
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => {
                  setFilterTab("all");
                  setCurrentStep("list");
                }}
              >
                Back to Agreements
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL 1: "GIVE REVIEW" MODAL                                   */}
        {/* ============================================================== */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 w-full max-w-[310px] shadow-2xl border border-slate-100 flex flex-col items-center animate-in zoom-in-95 duration-200 relative">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </Button>

              <h3 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
                Review
              </h3>

              <div className="flex items-center justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isFilled = (hoverRating || rating) >= starIndex;
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starIndex)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          isFilled
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="w-full mb-5">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-left">
                  Review
                </label>
                <input
                  type="text"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Heating not working"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0891A2]"
                />
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmittingReview}
                onClick={handleReviewSubmit}
              >
                {isSubmittingReview ? (
                  <span>Submitting...</span>
                ) : (
                  <span>Review</span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL 2: "VIEW AGREEMENT" DOCUMENT PREVIEW MODAL               */}
        {/* ============================================================== */}
        {isViewAgreementDocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-5 w-full max-w-[325px] shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Signed Lease Agreement</h3>
                    <p className="text-[10px] text-slate-400">Riverside Apartments #123</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setIsViewAgreementDocOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-10 rounded bg-red-500 text-white flex flex-col items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="text-[6.5px] font-black">PDF</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Lease_Agreement_Signed.pdf</p>
                    <p className="text-[10px] text-slate-400">12 pages • Verified Digital Signature</p>
                  </div>
                </div>

                <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100 text-[11px] text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Signer:</span>
                    <span className="font-semibold">{fullName || "Andy Lexsian"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-semibold">{signDate || "24 february 1996"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-600 font-semibold">Legally Binding & Signed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setIsViewAgreementDocOpen(false);
                    showToast("Downloading Lease_Agreement_Signed.pdf...");
                  }}
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                >
                  Download Signed PDF
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => setIsViewAgreementDocOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* 5. BOTTOM NAVIGATION BAR (Standardized reusable component)     */}
      {/* ============================================================== */}
      <TenantBottomNav activeTab="dashboard" />

    </div>
  );
}
