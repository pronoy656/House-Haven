"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TenantBottomNav } from "./TenantBottomNav";
import { AgreementsListView } from "./agreements/AgreementsListView";
import { AgreementDetailsView } from "./agreements/AgreementDetailsView";
import { AgreementSignView } from "./agreements/AgreementSignView";
import { LeaseSuccessView } from "./agreements/LeaseSuccessView";
import { ReviewModal } from "./agreements/ReviewModal";
import { AgreementDocModal } from "./agreements/AgreementDocModal";
import { INITIAL_AGREEMENTS, INITIAL_CHAT_MESSAGES } from "./agreements/mockData";
import { AgreementItem, ChatMessage } from "./agreements/types";

export function TenantAgreementsFlowScreen() {
  const router = useRouter();

  // Navigation flow step: "list" | "details" | "review" | "success"
  const [currentStep, setCurrentStep] = useState<
    "list" | "details" | "review" | "success"
  >("list");

  // Agreements state
  const [agreements, setAgreements] = useState<AgreementItem[]>(INITIAL_AGREEMENTS);
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "signed">("all");
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementItem>(
    INITIAL_AGREEMENTS[0]
  );

  // Modals state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isViewAgreementDocOpen, setIsViewAgreementDocOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    INITIAL_CHAT_MESSAGES
  );
  const [chatInput, setChatInput] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "tenant",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const handleSignSuccess = () => {
    setAgreements((prev) =>
      prev.map((item) =>
        item.id === selectedAgreement.id
          ? { ...item, status: "Signed" as const }
          : item
      )
    );
    setSelectedAgreement((prev) => ({ ...prev, status: "Signed" as const }));
    setCurrentStep("success");
    showToast("Lease agreement signed and submitted successfully!");
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
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col relative pt-1">
        {currentStep === "list" && (
          <AgreementsListView
            agreements={agreements}
            filterTab={filterTab}
            onFilterChange={setFilterTab}
            onSelectAgreement={(item) => {
              setSelectedAgreement(item);
              setCurrentStep("details");
            }}
            onBackToDashboard={() => router.push("/tenant/dashboard")}
            onNavigateToNotifications={() => router.push("/tenant/notifications")}
          />
        )}

        {currentStep === "details" && (
          <AgreementDetailsView
            agreement={selectedAgreement}
            chatMessages={chatMessages}
            chatInput={chatInput}
            onChatInputChange={setChatInput}
            onSendMessage={handleSendMessage}
            onBack={() => setCurrentStep("list")}
            onNavigateToNotifications={() => router.push("/tenant/notifications")}
            onReviewAndSign={() => setCurrentStep("review")}
            onViewAgreementDoc={() => setIsViewAgreementDocOpen(true)}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {currentStep === "review" && (
          <AgreementSignView
            onBack={() => setCurrentStep("details")}
            onNavigateToNotifications={() => router.push("/tenant/notifications")}
            onSignSuccess={handleSignSuccess}
          />
        )}

        {currentStep === "success" && (
          <LeaseSuccessView
            onViewAgreement={() => {
              setSelectedAgreement((prev) => ({
                ...prev,
                status: "Signed",
              }));
              setCurrentStep("details");
            }}
            onBackToAgreements={() => {
              setFilterTab("all");
              setCurrentStep("list");
            }}
          />
        )}
      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={(rating) => {
          showToast(`Thank you! Submitted ${rating}-star review.`);
        }}
      />

      <AgreementDocModal
        isOpen={isViewAgreementDocOpen}
        onClose={() => setIsViewAgreementDocOpen(false)}
        onDownload={() => {
          setIsViewAgreementDocOpen(false);
          showToast("Downloading Lease_Agreement_Signed.pdf...");
        }}
      />

      {/* Reusable Bottom Navigation */}
      <TenantBottomNav activeTab="dashboard" />
    </div>
  );
}
