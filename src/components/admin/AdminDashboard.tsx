"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Building,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  PoundSterling,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Users,
  Home,
  Check,
} from "lucide-react";
import { HouseHavenLogo } from "@/components/shared/HouseHavenLogo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceRequest, Contractor, RequestStatus } from "./types";
import { INITIAL_SERVICE_REQUESTS, CONTRACTORS_LIST } from "./adminMockData";

export function AdminDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [contractors] = useState<Contractor[]>(CONTRACTORS_LIST);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  // Filter states
  const [activeTab, setActiveTab] = useState<"requests" | "contractors" | "escalations">("requests");
  const [statusFilter, setStatusFilter] = useState<"All" | RequestStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Modal editing states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState("");
  const [editContractor, setEditContractor] = useState("");
  const [editStatus, setEditStatus] = useState<RequestStatus>("Pending");
  const [adminNote, setAdminNote] = useState("");
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const quoted = requests.filter((r) => r.status === "Quoted").length;
    const inProgress = requests.filter((r) => r.status === "In Progress").length;
    const completed = requests.filter((r) => r.status === "Completed").length;
    const revenue = requests
      .filter((r) => r.quotedPrice)
      .reduce((acc, r) => {
        const val = parseInt(r.quotedPrice?.replace(/[^0-9]/g, "") || "0", 10);
        return acc + (isNaN(val) ? 0 : val);
      }, 0);

    return { total, pending, quoted, inProgress, completed, revenue };
  }, [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (activeTab === "escalations" && req.source !== "Landlord Escalation") {
        return false;
      }
      if (statusFilter !== "All" && req.status !== statusFilter) {
        return false;
      }
      if (categoryFilter !== "All" && req.category !== categoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRef = req.referenceNo.toLowerCase().includes(q);
        const matchesTitle = req.title.toLowerCase().includes(q);
        const matchesUser = req.user.name.toLowerCase().includes(q);
        const matchesAddr = req.address.toLowerCase().includes(q);
        if (!matchesRef && !matchesTitle && !matchesUser && !matchesAddr) {
          return false;
        }
      }
      return true;
    });
  }, [requests, activeTab, statusFilter, categoryFilter, searchQuery]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, categoryFilter, searchQuery, pageSize]);

  const totalItems = filteredRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRequests.slice(start, start + pageSize);
  }, [filteredRequests, currentPage, pageSize]);

  const handleOpenModal = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setEditPrice(req.quotedPrice || "");
    setEditContractor(req.assignedContractor || "");
    setEditStatus(req.status);
    setAdminNote("");
    setIsSavedSuccess(false);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              quotedPrice: editPrice.trim() ? (editPrice.startsWith("£") ? editPrice : `£${editPrice}`) : r.quotedPrice,
              assignedContractor: editContractor,
              status: editStatus,
            }
          : r
      )
    );

    setIsSavedSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSavedSuccess(false);
    }, 900);
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Quoted":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col md:flex-row text-slate-800 antialiased selection:bg-[#0891A2]/20 selection:text-[#0891A2]">
      {/* ------------------------------------------------------------- */}
      {/* SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-full md:w-64 bg-white text-slate-700 flex flex-col shrink-0 md:h-screen md:sticky md:top-0 border-r border-slate-200 shadow-2xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-2xs">
              <HouseHavenLogo width={28} height={36} variant="light" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-base tracking-tight">HouseHaven</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#0891A2] text-white rounded-md uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Operations Control</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => {
              setActiveTab("requests");
              setStatusFilter("All");
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
              activeTab === "requests"
                ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Service Requests</span>
            {metrics.pending > 0 && (
              <span
                className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeTab === "requests"
                    ? "bg-white text-[#0891A2]"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {metrics.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("contractors")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
              activeTab === "contractors"
                ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Contractors &amp; Trades</span>
            <span
              className={`ml-auto text-xs ${
                activeTab === "contractors" ? "text-white/80" : "text-slate-400"
              }`}
            >
              {contractors.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("escalations")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
              activeTab === "escalations"
                ? "bg-[#0891A2] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Landlord Escalations</span>
            <span
              className={`ml-auto text-xs ${
                activeTab === "escalations" ? "text-white/80" : "text-slate-400"
              }`}
            >
              {requests.filter((r) => r.source === "Landlord Escalation").length}
            </span>
          </button>

          <div className="pt-4 pb-2">
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Switch Portals
            </p>
          </div>

          <Link
            href="/services?role=service"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-[#0891A2]" />
            <span>Services Client Hub</span>
            <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
          </Link>

          <Link
            href="/landlord/dashboard"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-[#2B7FFF]" />
            <span>Landlord Dashboard</span>
            <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
          </Link>

          <Link
            href="/tenant/dashboard"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Tenant App</span>
            <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
          </Link>
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/60">
          <div className="w-9 h-9 rounded-full bg-[#0891A2] text-white font-bold flex items-center justify-center text-xs shadow-2xs">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 truncate">Operations Manager</p>
            <p className="text-[11px] text-slate-400 truncate">admin@househaven.com</p>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs w-full">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {activeTab === "requests" && "Service Requests"}
              {activeTab === "contractors" && "Contractors & Trades"}
              {activeTab === "escalations" && "Landlord Escalations"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === "requests" && "Manage customer requests, send quotes, and assign technicians."}
              {activeTab === "contractors" && "View registered technicians and check their availability."}
              {activeTab === "escalations" && "Review maintenance issues sent by landlords for quotes."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference, address, user..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0891A2] focus:bg-white transition-all"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Body - Full Width */}
        <div className="p-6 md:p-8 space-y-6 w-full">
          {/* KPI Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {/* Metric 1 */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Requests</span>
                <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.total}</p>
            </div>

            {/* Metric 2 */}
            <div className="p-4 bg-white border border-amber-200 bg-amber-50/20 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-700 uppercase">Needs Quote</span>
                <span className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                  <Clock className="w-4 h-4" />
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-900 mt-2">{metrics.pending}</p>
            </div>

            {/* Metric 3 */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-sky-700 uppercase">Quoted & Active</span>
                <span className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                  <Zap className="w-4 h-4" />
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.quoted + metrics.inProgress}</p>
            </div>

            {/* Metric 4 */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase">Resolved</span>
                <span className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.completed}</p>
            </div>

            {/* Metric 5 */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs col-span-2 md:col-span-1 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#0891A2] uppercase">Quoted Volume</span>
                <span className="w-7 h-7 rounded-lg bg-[#0891A2]/10 flex items-center justify-center text-[#0891A2]">
                  <PoundSterling className="w-4 h-4" />
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">£{metrics.revenue.toLocaleString()}</p>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* TAB 1: SERVICE REQUESTS TABLE VIEW */}
          {/* ----------------------------------------------------------- */}
          {(activeTab === "requests" || activeTab === "escalations") && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden w-full">
              {/* Table Filter Toolbar */}
              <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {(["All", "Pending", "Quoted", "In Progress", "Completed"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === tab
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Category Dropdown (shadcn Select) */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val)}>
                    <SelectTrigger className="w-[170px] bg-slate-50 border-slate-200 h-9 font-medium">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Heating & Boiler">Heating &amp; Boiler</SelectItem>
                      <SelectItem value="Damp & Mould">Damp &amp; Mould</SelectItem>
                      <SelectItem value="Gas Certificate">Gas Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200/70">
                      <th className="py-3 px-4">Ref &amp; Issue</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Appointment</th>
                      <th className="py-3 px-4">Contractor</th>
                      <th className="py-3 px-4">Quote Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedRequests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No service requests found matching the selected filter.
                        </td>
                      </tr>
                    ) : (
                      paginatedRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                {req.referenceNo}
                              </span>
                              {req.source === "Landlord Escalation" && (
                                <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.2 rounded-md font-medium">
                                  Landlord
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-slate-900 mt-1 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg truncate">{req.title}</p>
                            <span className="text-[11px] text-slate-400">{req.category}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">{req.user.name}</p>
                            <span className="text-[11px] text-slate-400">{req.user.phone}</span>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs md:max-w-sm">
                            <p className="text-slate-700 truncate">{req.address}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{req.postcode}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="text-slate-800 font-medium">{req.requestedDate}</p>
                            <span className="text-[11px] text-slate-500">{req.requestedTime}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            {req.assignedContractor ? (
                              <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate max-w-[160px] lg:max-w-[200px]">{req.assignedContractor}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">Unassigned</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            {req.quotedPrice ? (
                              <span className="font-bold text-[#0891A2] text-sm">{req.quotedPrice}</span>
                            ) : (
                              <span className="text-amber-600 text-[11px] font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                Pending Quote
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                                req.status
                              )}`}
                            >
                              {req.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleOpenModal(req)}
                              className="px-3 py-1.5 bg-[#0891A2] hover:bg-[#067a88] text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>Manage</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              {totalItems > 0 && (
                <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-white">
                  {/* Results Count & Rows Per Page */}
                  <div className="flex items-center gap-3">
                    <span>
                      Showing <strong className="text-slate-800 font-semibold">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                      <strong className="text-slate-800 font-semibold">{Math.min(currentPage * pageSize, totalItems)}</strong> of{" "}
                      <strong className="text-slate-800 font-semibold">{totalItems}</strong> entries
                    </span>
                    <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                      <span className="text-[11px] text-slate-400">Rows:</span>
                      <Select
                        value={String(pageSize)}
                        onValueChange={(val) => {
                          setPageSize(Number(val));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="h-7 w-[68px] text-[11px] rounded-lg bg-slate-50 border-slate-200">
                          <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Page Navigation Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-medium"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#0891A2] text-white shadow-2xs"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-medium"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------- */}
          {/* TAB 2: CONTRACTORS LIST VIEW */}
          {/* ----------------------------------------------------------- */}
          {activeTab === "contractors" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Service Partners</h2>
                  <p className="text-xs text-slate-500">
                    List of all verified technicians and contractors.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                {contractors.map((c) => (
                  <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                          <p className="text-xs text-[#0891A2] font-semibold">{c.trade}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : c.status === "Busy"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1 font-bold text-amber-600">
                        <span>★ {c.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">Rating</span>
                      </div>
                      <span className="font-semibold text-slate-700">{c.completedJobs} Jobs Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MANAGE & QUOTE MODAL (Clean, Crafted Design) */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200/90 animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between bg-white">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {selectedRequest.referenceNo}
                  </span>
                  <span className="text-[11px] font-medium text-[#0891A2] bg-[#0891A2]/10 px-2 py-0.5 rounded-md">
                    {selectedRequest.category}
                  </span>
                  {selectedRequest.source === "Landlord Escalation" && (
                    <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      Landlord Request
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-2 tracking-tight">
                  {selectedRequest.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0 mt-0.5"
                aria-label="Close modal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
              {/* Customer and Location Info Card */}
              <div className="p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl text-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Customer</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{selectedRequest.user.name}</p>
                    <p className="text-slate-500 text-[11px]">{selectedRequest.user.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-medium text-slate-400 block">Appointment</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{selectedRequest.requestedDate}</p>
                    <p className="text-slate-500 text-[11px]">{selectedRequest.requestedTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 pt-2 border-t border-slate-200/50 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate">{selectedRequest.address}</span>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Reported Problem
                </label>
                <p className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                  {selectedRequest.description}
                </p>
              </div>

              {/* Form Input 1: Assign Contractor */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Assign Contractor
                </label>
                <Select
                  value={editContractor || "none"}
                  onValueChange={(val) => setEditContractor(val === "none" ? "" : val)}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl bg-white border-slate-200">
                    <SelectValue placeholder="Select Verified Contractor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-- Unassigned (None) --</SelectItem>
                    {contractors.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name} ({c.trade}) · ★ {c.rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Form Input 2: Quoted Price & Status */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Quoted Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">
                      £
                    </span>
                    <input
                      type="text"
                      value={editPrice.replace(/^£/, "")}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-9 pl-7 pr-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0891A2] font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Job Status
                  </label>
                  <Select
                    value={editStatus}
                    onValueChange={(val) => setEditStatus(val as RequestStatus)}
                  >
                    <SelectTrigger className="h-9 text-xs rounded-xl bg-white border-slate-200">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending Review</SelectItem>
                      <SelectItem value="Quoted">Quoted (Sent to Client)</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Admin Note / Scope to Customer */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Scope of Work / Quote Note
                </label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="e.g. Diagnosed circuit breaker failure, replaced main fuse, and tested live load."
                  className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0891A2] text-slate-800 resize-none transition-colors"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0891A2] hover:bg-[#067a88] text-white text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {isSavedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Updated!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Update &amp; Dispatch Quote</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

