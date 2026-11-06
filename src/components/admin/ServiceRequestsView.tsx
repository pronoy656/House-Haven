"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceRequest, Contractor, RequestStatus, QuoteStatus } from "./types";
import { INITIAL_SERVICE_REQUESTS, CONTRACTORS_LIST } from "./adminMockData";
import { adminApi } from "@/lib/api";

export function ServiceRequestsView() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [contractors] = useState<Contractor[]>(CONTRACTORS_LIST);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states (supports "All", specific RequestStatus, or "Quotes Accepted")
  const [statusFilter, setStatusFilter] = useState<"All" | RequestStatus | "Quotes Accepted">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Fetch live requests from backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    adminApi
      .getAllRequests({
        status: statusFilter !== "All" && statusFilter !== "Quotes Accepted" ? statusFilter : undefined,
        quoteStatus: statusFilter === "Quotes Accepted" ? "accepted" : undefined,
        serviceCategory: categoryFilter !== "All" ? categoryFilter : undefined,
      })
      .then((res: any) => {
        if (!isMounted) return;
        const rawData = Array.isArray(res) ? res : res?.data || [];
        if (Array.isArray(rawData) && rawData.length > 0) {
          const mapped: ServiceRequest[] = rawData.map((item: any) => ({
            id: item._id,
            referenceNo: `#SR-${String(item._id).slice(-5).toUpperCase()}`,
            title: item.issue || `${item.serviceCategory} issue`,
            category: item.serviceCategory || "General",
            user: {
              name: item.userId?.name || item.contactName || "Guest User",
              role:
                item.userId?.role === "tenant"
                  ? "Tenant"
                  : item.userId?.role === "landlord"
                  ? "Landlord"
                  : "Service Client",
              phone: item.userId?.phone || item.contactPhone || "Not provided",
              email: item.userId?.email || item.contactEmail || "guest@househeaven.com",
              avatar: item.userId?.profile,
            },
            address: item.address || "Armagh, UK",
            postcode: item.postcode || "",
            requestedDate:
              item.appointment?.date ||
              new Date(item.createdAt || Date.now()).toLocaleDateString(),
            requestedTime: item.appointment?.time || "10:00 AM",
            status: (item.status as RequestStatus) || "Pending",
            quoteStatus: (item.quotation?.status as QuoteStatus) || "pending",
            priority: "Medium",
            description: item.description || "",
            quotedPrice: item.quotation?.quotedAmount
              ? `£${item.quotation.quotedAmount}`
              : item.quotation?.estimatedPrice || "£75–£100",
            quoteNotes: item.quotation?.quoteNotes || "",
            assignedContractor:
              typeof item.assignedContractor === "object" && item.assignedContractor?.name
                ? item.assignedContractor.name
                : typeof item.assignedContractor === "string"
                ? item.assignedContractor
                : undefined,
            contractorDetails:
              typeof item.assignedContractor === "object" && item.assignedContractor
                ? item.assignedContractor
                : undefined,
            photos: item.photos || [],
            createdAt: new Date(item.createdAt || Date.now())
              .toISOString()
              .split("T")[0],
            source: "Services Hub",
          }));
          setRequests(mapped);
        } else if (Array.isArray(rawData) && rawData.length === 0) {
          // Keep empty if explicitly empty on backend
          setRequests([]);
        }
      })
      .catch((err) => {
        console.warn("Using fallback service requests:", err.message);
        setRequests(INITIAL_SERVICE_REQUESTS);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [statusFilter, categoryFilter]);

  // Modal editing states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState("");
  const [editContractor, setEditContractor] = useState("");
  const [editStatus, setEditStatus] = useState<RequestStatus>("Pending");
  const [adminNote, setAdminNote] = useState("");
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // 4 Metrics Calculation with Quotes Accepted highlight
  const metrics = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const quotesAccepted = requests.filter(
      (r) => r.quoteStatus === "accepted" && r.status !== "Completed" && r.status !== "Cancelled"
    ).length;
    const inProgress = requests.filter((r) => r.status === "In Progress").length;
    const completed = requests.filter((r) => r.status === "Completed").length;
    return { total, pending, quotesAccepted, inProgress, completed };
  }, [requests]);

  // Available categories list dynamically combining defaults and active request categories
  const availableCategories = useMemo(() => {
    const defaultCats = [
      "New Bathroom Quote",
      "New Kitchen Quote",
      "Electrical",
      "Plumbing",
      "Heating & Boiler",
      "Damp & Mould",
      "Water and Leaks",
      "Exterior and Garden",
      "Window",
      "Lighting",
      "Gas Certificate",
      "Appliances",
      "Roofing & Guttering",
      "Painting & Decorating",
      "Home Buyers Report",
    ];
    const fromReqs = requests.map((r) => r.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...fromReqs]));
  }, [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (statusFilter === "Quotes Accepted") {
        if (
          req.quoteStatus !== "accepted" ||
          req.status === "Completed" ||
          req.status === "Cancelled"
        ) {
          return false;
        }
      } else if (
        statusFilter !== "All" &&
        req.status.toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }
      if (
        categoryFilter !== "All" &&
        req.category.toLowerCase() !== categoryFilter.toLowerCase()
      ) {
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
  }, [requests, statusFilter, categoryFilter, searchQuery]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, categoryFilter, searchQuery, pageSize]);

  const totalItems = filteredRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRequests.slice(start, start + pageSize);
  }, [filteredRequests, currentPage, pageSize]);

  const handleOpenModal = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setEditPrice(req.quotedPrice ? req.quotedPrice.replace(/^£/, "") : "");
    setEditContractor(req.assignedContractor || "");

    // If client accepted quote and job is still in Pending or Quoted, default to "In Progress"
    if (
      req.quoteStatus === "accepted" &&
      (req.status === "Pending" || req.status === "Quoted")
    ) {
      setEditStatus("In Progress");
    } else {
      setEditStatus(req.status);
    }

    setAdminNote(req.quoteNotes || "");
    setIsSavedSuccess(false);
    setIsModalOpen(true);

    // If photos are omitted from the list view for high performance, fetch single request details
    if (!req.photos || req.photos.length === 0) {
      adminApi
        .getRequestDetails(req.id)
        .then((fullData: any) => {
          if (fullData && fullData.photos && fullData.photos.length > 0) {
            setSelectedRequest((prev) =>
              prev && prev.id === req.id
                ? { ...prev, photos: fullData.photos }
                : prev
            );
          }
        })
        .catch(() => {});
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    const newQuotedPrice = editPrice.trim()
      ? editPrice.startsWith("£")
        ? editPrice
        : `£${editPrice}`
      : selectedRequest.quotedPrice;

    // Resolve contractor full details if matched
    const matched = contractors.find((c) => c.name === editContractor);
    const contractorPayload = matched
      ? {
          id: matched.id,
          name: matched.name,
          trade: matched.trade,
          phone: matched.phone,
          email: matched.email,
          rating: matched.rating,
          company: matched.company,
        }
      : editContractor.trim()
      ? { name: editContractor.trim() }
      : null;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              quotedPrice: newQuotedPrice,
              assignedContractor: editContractor,
              contractorDetails: matched || undefined,
              status: editStatus,
              quoteNotes: adminNote,
            }
          : r
      )
    );

    try {
      const numeric = parseFloat(editPrice.replace(/[^0-9.]/g, ""));
      await adminApi.manageRequest(selectedRequest.id, {
        status: editStatus,
        assignedContractor: contractorPayload,
        quotedAmount: isNaN(numeric) ? undefined : numeric,
        quoteNotes: adminNote || undefined,
        quotationStatus:
          selectedRequest.quoteStatus === "accepted"
            ? "accepted"
            : editStatus === "Quoted" || (numeric && numeric > 0)
            ? "received"
            : undefined,
      });

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("serviceRequestsUpdated"));
      }
    } catch (err) {
      console.warn("Backend manage update error:", err);
    }

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
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 static md:sticky md:top-0 md:z-30 shadow-2xs w-full">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Service Requests
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage customer requests, send quotes, and assign technicians.
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
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0891A2] focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 w-full max-w-none flex-1">
        {/* KPI Metrics Strip - Uniform Clean Slate Borders with Skeleton Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {/* Metric 1 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Requests
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Layers className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.total}</p>
            )}
          </div>

          {/* Metric 2 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Needs Quote
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.pending}</p>
            )}
          </div>

          {/* Metric 3: Quotes Accepted */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <span>Quotes Accepted</span>
                {metrics.quotesAccepted > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                )}
              </span>
              <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <div className="flex items-baseline justify-between mt-2">
                <p className="text-2xl font-bold text-slate-900">{metrics.quotesAccepted}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Ready to Assign</span>
              </div>
            )}
          </div>

          {/* Metric 4 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                In Progress &amp; Done
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Zap className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <div className="flex items-baseline justify-between mt-2">
                <p className="text-2xl font-bold text-slate-900">{metrics.inProgress + metrics.completed}</p>
                <span className="text-[11px] text-slate-500">{metrics.completed} completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Service Requests Table View */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden w-full">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(["All", "Quotes Accepted", "Pending", "In Progress", "Completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    statusFilter === tab
                      ? tab === "Quotes Accepted"
                        ? "bg-emerald-700 text-white shadow-2xs"
                        : "bg-slate-900 text-white shadow-2xs"
                      : tab === "Quotes Accepted"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{tab}</span>
                  {tab === "Quotes Accepted" && metrics.quotesAccepted > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {metrics.quotesAccepted}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Category Filter (shadcn Select) */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val)}>
                <SelectTrigger className="w-[170px] bg-slate-50 border-slate-200 h-9 font-medium text-xs">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="All">All Categories</SelectItem>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between sm:hidden text-[11px] text-slate-500 font-medium">
            <span>← Swipe table horizontally to see all columns →</span>
          </div>

          {/* Data Table with Visible, Clear Text & Horizontal Scrolling */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[960px]">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-5">Ref &amp; Issue</th>
                  <th className="py-4 px-5">Customer</th>
                  <th className="py-4 px-5">Location</th>
                  <th className="py-4 px-5">Appointment</th>
                  <th className="py-4 px-5">Contractor</th>
                  <th className="py-4 px-5">Quote Price</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse border-b border-slate-100">
                      <td className="py-4 px-5">
                        <div className="h-4 w-20 bg-slate-200 rounded-md mb-2"></div>
                        <div className="h-4 w-44 bg-slate-200 rounded-md mb-1"></div>
                        <div className="h-3 w-24 bg-slate-100 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-28 bg-slate-200 rounded-md mb-1"></div>
                        <div className="h-3 w-20 bg-slate-100 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-36 bg-slate-200 rounded-md mb-1"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-24 bg-slate-200 rounded-md mb-1"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-20 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="h-8 w-18 bg-slate-200 rounded-xl ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : paginatedRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-sm text-slate-400">
                      No service requests found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Ref & Title */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                            {req.referenceNo}
                          </span>
                          {req.source === "Landlord Escalation" && (
                            <span className="text-[11px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-md font-semibold">
                              Landlord
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-slate-900 text-sm mt-1 max-w-xs md:max-w-md lg:max-w-lg truncate">
                          {req.title}
                        </p>
                        <span className="text-xs font-medium text-slate-500">{req.category}</span>
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-5">
                        <p className="font-semibold text-slate-900 text-sm">{req.user.name}</p>
                        <span className="text-xs text-slate-500 font-medium">{req.user.phone}</span>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-5 max-w-xs md:max-w-sm">
                        <p className="text-slate-800 text-xs font-medium truncate">{req.address}</p>
                        <span className="text-xs text-slate-400 font-mono">{req.postcode}</span>
                      </td>

                      {/* Appointment */}
                      <td className="py-4 px-5">
                        <p className="text-slate-900 text-xs font-semibold">{req.requestedDate}</p>
                        <span className="text-xs text-slate-500">{req.requestedTime}</span>
                      </td>

                      {/* Contractor */}
                      <td className="py-4 px-5">
                        {req.assignedContractor ? (
                          <div className="flex items-center gap-1.5 text-slate-900 text-xs font-semibold">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate max-w-[170px] lg:max-w-[210px]">
                              {req.assignedContractor}
                            </span>
                          </div>
                        ) : req.quoteStatus === "accepted" ? (
                          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px] font-semibold animate-pulse">
                            Assign Tech &rarr;
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Unassigned</span>
                        )}
                      </td>

                      {/* Quote Price */}
                      <td className="py-4 px-5">
                        {req.quotedPrice ? (
                          <div>
                            <span className="font-bold text-[#0891A2] text-sm block">
                              {req.quotedPrice}
                            </span>
                            {req.quoteStatus === "accepted" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5">
                                <Check className="w-2.5 h-2.5" />
                                Client Accepted
                              </span>
                            ) : req.quoteStatus === "declined" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 mt-0.5">
                                Declined
                              </span>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-amber-700 text-xs font-semibold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
                            Pending Quote
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {req.quoteStatus === "accepted" && req.status !== "In Progress" && req.status !== "Completed" ? (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              Quote Accepted
                            </span>
                            <span className="text-[10px] text-amber-600 font-semibold pl-1">
                              Needs Contractor
                            </span>
                          </div>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                              req.status
                            )}`}
                          >
                            {req.status}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        {req.quoteStatus === "accepted" && !req.assignedContractor ? (
                          <button
                            onClick={() => handleOpenModal(req)}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>Assign</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenModal(req)}
                            className="px-3.5 py-1.5 bg-[#0891A2] hover:bg-[#067a88] text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>Manage</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          {totalItems > 0 && (
            <div className="px-5 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-white">
              {/* Results Count & Rows Per Page */}
              <div className="flex items-center gap-3">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                  <strong className="text-slate-900 font-bold">{Math.min(currentPage * pageSize, totalItems)}</strong> of{" "}
                  <strong className="text-slate-900 font-bold">{totalItems}</strong> entries
                </span>
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                  <span className="text-xs text-slate-400">Rows:</span>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(val) => {
                      setPageSize(Number(val));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="h-7 w-[68px] text-xs rounded-lg bg-slate-50 border-slate-200 font-medium">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
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
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-semibold text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
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
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-semibold text-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clean, Crafted Modal */}
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
              {/* Highlight if client accepted quote */}
              {selectedRequest.quoteStatus === "accepted" && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-950">
                      Client Accepted Quote ({selectedRequest.quotedPrice})
                    </p>
                    <p className="text-emerald-700 text-[11px] mt-0.5">
                      The client accepted this quotation. Assign a verified contractor below and set job status to &quot;In Progress&quot;.
                    </p>
                  </div>
                </div>
              )}

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

              {/* Uploaded Issue Photo by Customer */}
              {selectedRequest.photos && selectedRequest.photos.length > 0 && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Uploaded Issue Photo
                  </label>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center">
                    <img
                      src={selectedRequest.photos[0]}
                      alt="Uploaded problem issue"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Form Input 1: Assign Contractor */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Assign Contractor
                </label>
                <Select
                  value={editContractor || "none"}
                  onValueChange={(val) => {
                    const contractorName = val === "none" ? "" : val;
                    setEditContractor(contractorName);
                    // If assigning contractor and quote was accepted, auto-switch status to In Progress
                    if (contractorName && selectedRequest.quoteStatus === "accepted" && editStatus === "Pending") {
                      setEditStatus("In Progress");
                    }
                  }}
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
                      <SelectItem value="In Progress">In Progress (Active Job)</SelectItem>
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
                  className={`px-5 py-2 rounded-xl text-white text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                    editStatus === "In Progress" && editContractor
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-[#0891A2] hover:bg-[#067a88]"
                  }`}
                >
                  {isSavedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Updated &amp; Dispatched!</span>
                    </>
                  ) : editStatus === "In Progress" && editContractor ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Assign &amp; Start Job</span>
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

