"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Filter,
  UserCheck,
  Building,
  Home,
  Wrench,
  MoreVertical,
  Eye,
  Mail,
  UserX,
  X,
  Phone,
  Calendar,
  Layers,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminUser } from "./types";
import { ADMIN_USERS } from "./adminMockData";
import { adminApi } from "@/lib/api";

interface UsersViewProps {
  forcedRole: "Tenant" | "Landlord" | "Service Client";
  title: string;
  subtitle: string;
}

export function UsersView({
  forcedRole,
  title,
  subtitle,
}: UsersViewProps) {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  // Portal mount check
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch live users from backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    adminApi
      .getUsers(forcedRole, searchQuery)
      .then((res: any) => {
        if (!isMounted) return;
        const rawData = Array.isArray(res) ? res : res?.data || [];
        if (Array.isArray(rawData) && rawData.length > 0) {
          const mapped: AdminUser[] = rawData.map((u: any) => ({
            id: u._id,
            name: u.name || "Unnamed User",
            email: u.email || "no-email@househeaven.com",
            phone: u.phone || "Not provided",
            role: forcedRole,
            verificationStatus: u.verified ? "Verified" : "Pending ID",
            joinedDate: u.createdAt
              ? new Date(u.createdAt).toISOString().split("T")[0]
              : "2026-01-01",
            activeLeasesOrJobs: u.activeLeasesOrJobs || 0,
            status: u.status === "active" ? "Active" : "Suspended",
          }));
          setUsers(mapped);
        } else if (Array.isArray(rawData) && rawData.length === 0) {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.warn("Using fallback users data:", err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [forcedRole, searchQuery]);

  // Three-dot Action Menu State with Fixed Coordinates (Portal)
  const [activeMenuUser, setActiveMenuUser] = useState<AdminUser | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; right: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Selected User Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [verificationFilter, searchQuery, pageSize, forcedRole]);

  // Toggle Dropdown with Smart Position
  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>, user: AdminUser) => {
    e.stopPropagation();
    if (activeMenuUser?.id === user.id) {
      setActiveMenuUser(null);
      setMenuCoords(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const menuHeight = 165;
      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < menuHeight && rect.top > menuHeight;

      setMenuCoords({
        top: showAbove ? rect.top - menuHeight - 4 : rect.bottom + 4,
        right: Math.max(12, window.innerWidth - rect.right),
      });
      setActiveMenuUser(user);
    }
  };

  // Click outside and scroll/resize listener to close menu
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuUser(null);
        setMenuCoords(null);
      }
    };

    const handleScrollOrResize = () => {
      setActiveMenuUser(null);
      setMenuCoords(null);
    };

    document.addEventListener("mousedown", handleClose);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  // Filter users by forced role
  const roleUsers = useMemo(() => {
    return users.filter((u) => u.role === forcedRole);
  }, [users, forcedRole]);

  // Sub-route Specific Metrics directly backed by Database
  const metrics = useMemo(() => {
    const totalInRole = roleUsers.length;
    const verified = roleUsers.filter((u) => u.verificationStatus === "Verified").length;
    const pendingVerification = roleUsers.filter(
      (u) => u.verificationStatus === "Pending ID"
    ).length;
    const activeAccounts = roleUsers.filter((u) => u.status === "Active").length;

    return { totalInRole, verified, pendingVerification, activeAccounts };
  }, [roleUsers]);

  // Filtered users for table
  const filtered = useMemo(() => {
    return roleUsers.filter((u) => {
      if (verificationFilter !== "All" && u.verificationStatus !== verificationFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesPhone = u.phone.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone) return false;
      }
      return true;
    });
  }, [roleUsers, verificationFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const handleVerify = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, verificationStatus: "Verified" as const } : u
      )
    );
    setActiveMenuUser(null);
    setMenuCoords(null);
  };

  const handleToggleStatus = async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = user.status === "Active" ? ("Suspended" as const) : ("Active" as const);

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: newStatus,
            }
          : u
      )
    );
    setActiveMenuUser(null);
    setMenuCoords(null);

    try {
      await adminApi.updateUserStatus(id, newStatus === "Active" ? "active" : "inactive");
    } catch (err) {
      console.warn("Backend user status update note:", err);
    }
  };

  const handleOpenDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setActiveMenuUser(null);
    setMenuCoords(null);
  };

  const getRoleBadge = (role: AdminUser["role"]) => {
    switch (role) {
      case "Tenant":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Landlord":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Service Client":
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 static md:sticky md:top-0 md:z-30 shadow-2xs w-full">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${forcedRole.toLowerCase()} name, email or phone...`}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0891A2]/30 focus:border-[#0891A2] text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 flex-1 w-full max-w-full">
        {/* 4 Stat Cards - Uniform Clean Slate Borders with Skeleton Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total {forcedRole}s
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Users className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.totalInRole}</p>
            )}
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Accounts
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.activeAccounts}</p>
            )}
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Verified (ID Passed)
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.verified}</p>
            )}
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Verification
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <ShieldAlert className="w-4 h-4" />
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 w-14 bg-slate-200 rounded-md animate-pulse mt-2"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.pendingVerification}</p>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden w-full">
          {/* Clean Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Registered {forcedRole}s ({filtered.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <Select
                value={verificationFilter}
                onValueChange={(val) => {
                  setVerificationFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[160px] h-8 text-xs font-medium bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Verification Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 shadow-md">
                  <SelectItem value="All" className="text-xs">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="Verified" className="text-xs">
                    Verified Only
                  </SelectItem>
                  <SelectItem value="Pending ID" className="text-xs">
                    Pending ID Review
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between sm:hidden text-[11px] text-slate-500 font-medium">
            <span>← Swipe table horizontally to see all columns →</span>
          </div>

          {/* Table with Horizontal Scroll */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-5">User &amp; Contact</th>
                  <th className="py-4 px-5">Platform Role</th>
                  <th className="py-4 px-5">Phone Number</th>
                  <th className="py-4 px-5">Identity Status</th>
                  <th className="py-4 px-5">Joined Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse border-b border-slate-100">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                          <div>
                            <div className="h-4 w-28 bg-slate-200 rounded-md mb-1"></div>
                            <div className="h-3 w-36 bg-slate-100 rounded-md"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-6 w-20 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="h-8 w-8 bg-slate-200 rounded-lg ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                      No {forcedRole.toLowerCase()}s found matching your search or filter.
                    </td>
                  </tr>
                ) : (
                  paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* User & Email */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-5">
                        <span className="text-slate-800 text-xs font-medium font-mono">
                          {user.phone}
                        </span>
                      </td>

                      {/* Identity Verification */}
                      <td className="py-4 px-5">
                        {user.verificationStatus === "Verified" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            Pending ID
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-5">
                        <span className="text-slate-600 text-xs font-medium">
                          {user.joinedDate}
                        </span>
                      </td>

                      {/* Account Status */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${user.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Action Column with Three-Dot Icon (Opens unclipped Portal Menu) */}
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleToggleMenu(e, user)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ml-auto ${activeMenuUser?.id === user.id
                              ? "bg-slate-200 text-slate-900"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filtered.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                  <strong className="text-slate-900 font-bold">{Math.min(currentPage * pageSize, filtered.length)}</strong> of{" "}
                  <strong className="text-slate-900 font-bold">{filtered.length}</strong> {forcedRole.toLowerCase()}s
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
                    <SelectTrigger className="h-7 w-[68px] text-xs rounded-lg bg-white border-slate-200 font-medium">
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

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-semibold text-xs"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#0891A2] text-white shadow-2xs"
                        : "hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1 font-semibold text-xs"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Dropdown Menu Mounted via React Portal (Never clipped by table overflow) */}
      {mounted && activeMenuUser && menuCoords && createPortal(
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: `${menuCoords.top}px`,
            right: `${menuCoords.right}px`,
            zIndex: 99999,
          }}
          className="bg-white border border-slate-200 rounded-xl shadow-2xl py-1.5 min-w-[175px] text-left animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => handleOpenDetails(activeMenuUser)}
            className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Profile</span>
          </button>

          {activeMenuUser.verificationStatus === "Pending ID" && (
            <button
              type="button"
              onClick={() => handleVerify(activeMenuUser.id)}
              className="w-full px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Approve ID</span>
            </button>
          )}

          <a
            href={`mailto:${activeMenuUser.email}`}
            onClick={() => {
              setActiveMenuUser(null);
              setMenuCoords(null);
            }}
            className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Send Email</span>
          </a>

          <div className="border-t border-slate-100 my-1" />

          <button
            type="button"
            onClick={() => handleToggleStatus(activeMenuUser.id)}
            className={`w-full px-3.5 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${activeMenuUser.status === "Active"
                ? "text-rose-600 hover:bg-rose-50"
                : "text-emerald-600 hover:bg-emerald-50"
              }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>
              {activeMenuUser.status === "Active" ? "Suspend User" : "Activate User"}
            </span>
          </button>
        </div>,
        document.body
      )}

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0891A2] text-white flex items-center justify-center font-bold text-sm">
                  {selectedUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedUser.name}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border mt-0.5 ${getRoleBadge(
                      selectedUser.role
                    )}`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium mb-1">Email Address</span>
                  <span className="font-semibold text-slate-900 break-all">{selectedUser.email}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium mb-1">Phone Number</span>
                  <span className="font-semibold text-slate-900">{selectedUser.phone}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium mb-1">Identity Verification</span>
                  <span
                    className={`font-semibold inline-flex items-center gap-1 ${selectedUser.verificationStatus === "Verified"
                        ? "text-emerald-700"
                        : "text-amber-700"
                      }`}
                  >
                    {selectedUser.verificationStatus === "Verified" ? (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {selectedUser.verificationStatus}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium mb-1">Account Status</span>
                  <span
                    className={`font-semibold ${selectedUser.status === "Active" ? "text-emerald-700" : "text-rose-700"
                      }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Registration Date</span>
                  <span className="font-semibold text-slate-900">{selectedUser.joinedDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block font-medium mb-0.5">
                    {selectedUser.role === "Tenant"
                      ? "Active Leases"
                      : selectedUser.role === "Landlord"
                        ? "Properties Owned"
                        : "Completed Jobs"}
                  </span>
                  <span className="font-bold text-[#0891A2] text-sm">
                    {selectedUser.activeLeasesOrJobs}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              {selectedUser.verificationStatus === "Pending ID" ? (
                <button
                  onClick={() => {
                    handleVerify(selectedUser.id);
                    setIsModalOpen(false);
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Approve Verification
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">Account verified</span>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl font-semibold text-slate-700 text-xs transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
