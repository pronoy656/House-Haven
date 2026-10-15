"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  Home,
  User as UserIcon,
  Calendar,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  X,
  LayoutGrid,
  Building,
  FileText,
  MessageSquareMore,
  User,
} from "lucide-react";
import { MobileStatusBar } from "../MobileStatusBar";
import { Button } from "../ui/Button";

export type IssueFlowView =
  | "details_open"
  | "update_status"
  | "quote_admin"
  | "schedule_appointment"
  | "details_in_progress"
  | "make_completed";

interface IssueDetailsFlowScreenProps {
  initialView?: IssueFlowView;
  onBack?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToProperties?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToProfile?: () => void;
  showStatusBar?: boolean;
}

export function IssueDetailsFlowScreen({
  initialView = "details_open",
  onBack,
  onNavigateToDashboard,
  onNavigateToProperties,
  onNavigateToApplications,
  onNavigateToMessages,
  onNavigateToProfile,
  showStatusBar = true,
}: IssueDetailsFlowScreenProps) {
  const [currentView, setCurrentView] = useState<IssueFlowView>(initialView);
  const [selectedStatus, setSelectedStatus] = useState<"Open" | "In Progress" | "Resolved">("Open");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [completionNotes, setCompletionNotes] = useState(
    "Replaced the faulty ceramic disc cartridge and silicone washers. Tested water pressure and verified zero leaks."
  );
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState("14:35");
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);

  // Photos for the issue
  const thumbnails = [
    "/property-interior.png",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1585909694668-0a6e0dd9ee40?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
  ];

  // Completion proof photos
  const [completionPhotos, setCompletionPhotos] = useState([
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1585909694668-0a6e0dd9ee40?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=200&q=80",
  ]);

  const removeCompletionPhoto = (index: number) => {
    setCompletionPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleBack = () => {
    if (currentView === "update_status" || currentView === "quote_admin") {
      setCurrentView("details_open");
    } else if (currentView === "schedule_appointment") {
      setCurrentView("details_open");
    } else if (currentView === "make_completed") {
      setCurrentView("details_in_progress");
    } else if (currentView === "details_in_progress") {
      setCurrentView("details_open");
    } else {
      onBack?.();
    }
  };

  return (
    <div className="relative w-full h-full max-h-[100dvh] bg-white flex flex-col justify-between text-slate-900 overflow-hidden">

      {/* Top Header - Fixed/Sticky */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between shrink-0 z-20 bg-white border-b border-slate-50">
        <button
          type="button"
          onClick={handleBack}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[17px] font-bold text-slate-900">
          {currentView === "schedule_appointment"
            ? "Schedule Appointment"
            : currentView === "make_completed"
            ? "Make as completed"
            : "Issue Details"}
        </h1>

        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-2 space-y-3.5 text-left">
        {/* =========================================================================
            VIEWS 1, 2, 3, 5: HERO IMAGE + THUMBNAILS + METADATA
            ========================================================================= */}
        {(currentView === "details_open" ||
          currentView === "update_status" ||
          currentView === "quote_admin" ||
          currentView === "details_in_progress") && (
          <>
            {/* Hero Photo with Badge */}
            <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
              <Image
                src={thumbnails[currentThumbIndex]}
                alt="Issue Living Room / Faucet"
                fill
                className="object-cover"
                priority
              />

              {/* Status Badge */}
              {currentView === "details_in_progress" ? (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10.5px] font-semibold shadow-xs">
                  In Progress
                </span>
              ) : (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-500 text-[10.5px] font-semibold shadow-xs">
                  Open
                </span>
              )}
            </div>

            {/* 5 Thumbnails Row */}
            <div className="grid grid-cols-5 gap-2">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentThumbIndex(idx)}
                  className={`relative h-12 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    currentThumbIndex === idx
                      ? "border-[#0891A2] ring-2 ring-[#0891A2]/30"
                      : "border-slate-100 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Title & Description */}
            <div className="space-y-1 pt-1">
              <h2 className="text-[17px] font-bold text-slate-900 leading-tight">
                Leaking Faucet
              </h2>
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                Kitchen faucet is leaking continuously. It started yesterday and the water is not stopping.
              </p>
            </div>

            {/* Metadata Rows Card */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-3.5 space-y-2.5 text-[11.5px]">
              {/* Property */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-400 w-16">Property</span>
                <span className="font-semibold text-slate-800 flex-1 truncate">
                  Maple Apartments - Unit 3B
                </span>
              </div>

              {/* Report by */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center shrink-0">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-400 w-16">Report by</span>
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Jerome Bell"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-semibold text-slate-800">
                    Jerome Bell
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-400 w-16">Date</span>
                <span className="font-medium text-slate-700">
                  Sep 17, 26, 10:45 AM
                </span>
              </div>

              {/* Extra rows when In Progress (View 5) */}
              {currentView === "details_in_progress" && (
                <>
                  {/* View on */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-400 w-16">View on</span>
                    <span className="font-medium text-slate-700">
                      Sep 18, 26, 11:50 AM
                    </span>
                  </div>

                  {/* Appointment */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#0891A2]/10 text-[#0891A2] flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-400 w-16">Appointment</span>
                    <span className="font-medium text-slate-700">
                      Sep 20, 26, 03:50 PM
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* =========================================================================
                VIEW 1: INITIAL OPEN STATE (3 Buttons)
                ========================================================================= */}
            {currentView === "details_open" && (
              <div className="space-y-2 pt-2 pb-1">
                <Button
                  variant="primary"
                  onClick={() => setCurrentView("schedule_appointment")}
                  className="h-11 font-semibold text-xs w-full rounded-2xl"
                >
                  Schedule Appointment
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentView("update_status")}
                  className="h-11 font-semibold text-xs w-full rounded-2xl"
                >
                  Update Status
                </Button>
                <button
                  type="button"
                  onClick={() => setCurrentView("quote_admin")}
                  className="h-11 font-semibold text-xs w-full rounded-2xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            )}

            {/* =========================================================================
                VIEW 2: UPDATE STATUS MODAL / CARD
                ========================================================================= */}
            {currentView === "update_status" && (
              <div className="p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC] space-y-3 mt-2">
                <h3 className="text-[13px] font-bold text-slate-900">
                  Leaking Faucet - Update Status
                </h3>
                <div className="space-y-2 text-xs">
                  {(["Open", "In Progress", "Resolved"] as const).map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2.5 cursor-pointer font-medium text-slate-700"
                    >
                      <input
                        type="radio"
                        name="status"
                        checked={selectedStatus === status}
                        onChange={() => setSelectedStatus(status)}
                        className="w-4 h-4 text-[#0891A2] focus:ring-[#0891A2]"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
                <div className="pt-1">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (selectedStatus === "In Progress") {
                        setCurrentView("details_in_progress");
                      } else if (selectedStatus === "Resolved") {
                        setCurrentView("make_completed");
                      } else {
                        setCurrentView("details_open");
                      }
                    }}
                    className="h-10 text-xs font-semibold w-full rounded-xl"
                  >
                    Save Status
                  </Button>
                </div>
              </div>
            )}

            {/* =========================================================================
                VIEW 3: QUOTE TO ADMIN
                ========================================================================= */}
            {currentView === "quote_admin" && (
              <div className="space-y-2 pt-1">
                <label className="text-[11.5px] font-medium text-slate-700 block">
                  Issue details with this quote request.
                </label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder="e.g., Heating in the living room is not working when we turn on the thermostat..."
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[12px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white transition-all resize-none"
                />
                <Button
                  variant="primary"
                  onClick={() => setCurrentView("details_in_progress")}
                  className="h-11 font-semibold text-xs w-full rounded-2xl mt-2"
                >
                  Send Quote Request
                </Button>
              </div>
            )}

            {/* =========================================================================
                VIEW 5: IN PROGRESS STATE (Reschedule & Update Status Buttons)
                ========================================================================= */}
            {currentView === "details_in_progress" && (
              <div className="grid grid-cols-2 gap-2 pt-2 pb-1">
                <button
                  type="button"
                  onClick={() => setCurrentView("schedule_appointment")}
                  className="h-11 font-semibold text-xs rounded-2xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] transition-colors cursor-pointer"
                >
                  Reschedule
                </button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentView("make_completed")}
                  className="h-11 font-semibold text-xs rounded-2xl"
                >
                  Update Status
                </Button>
              </div>
            )}
          </>
        )}

        {/* =========================================================================
            VIEW 4: SCHEDULE APPOINTMENT (Matching Column 4)
            ========================================================================= */}
        {currentView === "schedule_appointment" && (
          <div className="space-y-4 pt-1">
            {/* Top Issue Summary Card */}
            <div className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80"
                alt="Faucet"
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-bold text-slate-900 leading-tight">
                  Leaking Faucet
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Property Location...
                </p>
                <span className="text-[10.5px] text-slate-500 font-medium">
                  Sarah Johnson
                </span>
              </div>
            </div>

            {/* Select Date Section */}
            <div className="space-y-2">
              <h3 className="text-[14px] font-bold text-slate-900">
                Select Date
              </h3>

              {/* Month Navigator */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 px-2">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>March 2025</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-2.5 bg-[#F8FAFC] rounded-2xl border border-slate-100 text-center">
                <div className="grid grid-cols-7 text-[10.5px] text-slate-400 font-medium mb-2">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="grid grid-cols-7 gap-y-1.5 text-xs font-medium text-slate-700">
                  <span className="text-slate-300">27</span>
                  <span className="text-slate-300">28</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                  {/* Active Selected Day 15 */}
                  <span
                    onClick={() => setSelectedDate(15)}
                    className="w-7 h-7 mx-auto rounded-full bg-[#0891A2] text-white flex items-center justify-center font-bold shadow-xs cursor-pointer"
                  >
                    15
                  </span>
                  <span>16</span>
                  <span>17</span>
                  <span>18</span>
                  <span>19</span>
                  <span>20</span>
                  <span>21</span>
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  <span>25</span>
                  <span>26</span>
                  <span>27</span>
                  <span>28</span>
                  <span>29</span>
                  <span>30</span>
                  <span>31</span>
                  <span className="text-slate-300">1</span>
                  <span className="text-slate-300">2</span>
                </div>
              </div>
            </div>

            {/* Select Time Section */}
            <div className="space-y-1.5">
              <h3 className="text-[14px] font-bold text-slate-900">
                Select Time
              </h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white"
                />
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => setCurrentView("details_in_progress")}
                className="h-12 font-semibold text-sm w-full rounded-2xl"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 6: MAKE AS COMPLETED (Matching Column 6)
            ========================================================================= */}
        {currentView === "make_completed" && (
          <div className="space-y-4 pt-1">
            {/* Top Issue Summary Card */}
            <div className="p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80"
                alt="Faucet"
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-bold text-slate-900 leading-tight">
                  Leaking Faucet
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Property Location...
                </p>
                <span className="text-[10.5px] text-slate-500 font-medium">
                  Sarah Johnson
                </span>
              </div>
            </div>

            {/* Section 1: Completion Details (Textarea) */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-bold text-slate-900 block">
                Completion Details
              </label>
              <textarea
                rows={3}
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="Describe the work done, parts replaced, etc."
                className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-800 text-[12px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#0891A2] focus:bg-white resize-none"
              />
            </div>

            {/* Section 2: Completion Details (Photos Attachment) */}
            <div className="space-y-2">
              <label className="text-[12.5px] font-bold text-slate-900 block">
                Completion Details
              </label>

              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {/* Upload Trigger Box */}
                <button
                  type="button"
                  onClick={() =>
                    setCompletionPhotos((prev) => [
                      ...prev,
                      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80",
                    ])
                  }
                  className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col items-center justify-center text-slate-400 hover:text-[#0891A2] hover:bg-slate-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  <UploadCloud className="w-5 h-5" />
                </button>

                {/* Uploaded Photos with Red X Badges */}
                {completionPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo}
                      alt={`Completion proof ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Red X Badge */}
                    <button
                      type="button"
                      onClick={() => removeCompletionPhoto(idx)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-sm hover:scale-110 transition-transform"
                    >
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Make as Completed Button */}
            <div className="pt-3">
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedStatus("Resolved");
                  onNavigateToDashboard?.();
                }}
                className="h-12 font-semibold text-sm w-full rounded-2xl"
              >
                Make as Completed
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="h-16 bg-white border-t border-slate-100 px-3 flex items-center justify-around shrink-0 shadow-xs z-20">
        <button
          type="button"
          onClick={onNavigateToDashboard}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Dashboard</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProperties}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Building className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Properties</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToApplications}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <FileText className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Applications</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToMessages}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <MessageSquareMore className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Messages</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToProfile}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] leading-none">Profile</span>
        </button>
      </nav>
    </div>
  );
}
