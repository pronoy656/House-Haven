const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}

export function getCurrentUserRole(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userRole");
}

export function setCurrentUserRole(role: string | null) {
  if (typeof window === "undefined") return;
  if (role) {
    localStorage.setItem("userRole", role);
  } else {
    localStorage.removeItem("userRole");
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers = {}, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  const token = getAuthToken();
  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  } else if (requiresAuth) {
    throw new Error("Authentication required. Please login.");
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    headers: finalHeaders,
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || (data && data.success === false)) {
    const errorMsg =
      data?.message ||
      data?.errorMessage ||
      (Array.isArray(data?.errorMessages) && data.errorMessages[0]?.message) ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

// ----------------- Auth API -----------------
export const authApi = {
  async signup(data: {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    role?: string;
  }) {
    const payload: Record<string, any> = {
      name: data.name,
      email: data.email,
      password: data.password || "Password123!",
      role: data.role,
    };
    if (data.phone && data.phone.trim()) {
      payload.phone = data.phone.trim();
    }
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async login(data: { email: string; password?: string }) {
    const res = await apiRequest("/auth/custom-login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password || "Password123!",
      }),
    });

    if (res?.data?.accessToken) {
      setAuthToken(res.data.accessToken);
    }
    if (res?.data?.role) {
      setCurrentUserRole(res.data.role);
    }
    if (typeof window !== "undefined" && data.email) {
      localStorage.setItem("userEmail", data.email);
    }
    return res;
  },

  async verifyAccount(data: { email: string; oneTimeCode: string }) {
    const res = await apiRequest("/auth/verify-account", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Per required flow: Account is verified, user must log in again with credentials
    setAuthToken(null);
    setCurrentUserRole(null);
    if (typeof window !== "undefined" && data.email) {
      localStorage.setItem("userEmail", data.email);
    }
    return res;
  },

  async resendOtp(email: string) {
    return apiRequest("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email, authType: "createAccount" }),
    });
  },

  async logout() {
    try {
      const token = getAuthToken();
      if (token) {
        await apiRequest("/auth/logout", {
          method: "POST",
          requiresAuth: true,
        });
      }
    } catch (err) {
      console.warn("Backend logout note:", err);
    } finally {
      setAuthToken(null);
      setCurrentUserRole(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        sessionStorage.clear();
      }
    }
  },
};

// ----------------- Service Request API -----------------
export interface CreateServiceRequestPayload {
  serviceCategory: string;
  issue: string;
  description: string;
  address: string;
  postcode?: string;
  photos?: string[];
  appointment?: {
    date: string;
    time: string;
  };
  quotation?: {
    requested: boolean;
    estimatedPrice?: string;
  };
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const serviceRequestApi = {
  // Public Catalog for Guest users
  async getPublicCatalog() {
    const res = await apiRequest("/service-request/public-catalog");
    return res?.data || [];
  },

  // Submit request (Guest or Logged in User)
  async submitRequest(payload: CreateServiceRequestPayload) {
    return apiRequest("/service-request/submit", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Get My Requests (Logged in Services/Tenant user)
  async getMyRequests(statusFilter?: string) {
    const query = statusFilter && statusFilter !== "All" ? `?status=${encodeURIComponent(statusFilter)}` : "";
    const res = await apiRequest(`/service-request/my-requests${query}`, {
      requiresAuth: true,
    });
    return res?.data || [];
  },

  // Single Request Details
  async getRequestDetails(id: string) {
    const res = await apiRequest(`/service-request/${id}`);
    return res?.data;
  },

  // Confirm / Update Appointment
  async updateAppointment(id: string, appointment: { date: string; time: string }) {
    return apiRequest(`/service-request/${id}/appointment`, {
      method: "PATCH",
      body: JSON.stringify(appointment),
    });
  },

  // Accept or Decline Quote
  async updateQuoteStatus(
    id: string,
    quoteData: {
      status: "accepted" | "declined" | "pending";
      quoteNotes?: string;
    }
  ) {
    return apiRequest(`/service-request/${id}/quote`, {
      method: "PATCH",
      body: JSON.stringify(quoteData),
    });
  },
};


// ----------------- Admin API -----------------
export const adminApi = {
  // 1. Get all service requests
  async getAllRequests(filters?: {
    status?: string;
    quoteStatus?: string;
    serviceCategory?: string;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== "All") params.append("status", filters.status);
    if (filters?.quoteStatus && filters.quoteStatus !== "All") params.append("quoteStatus", filters.quoteStatus);
    if (filters?.serviceCategory && filters.serviceCategory !== "All") params.append("serviceCategory", filters.serviceCategory);
    if (filters?.searchTerm) params.append("searchTerm", filters.searchTerm);
    if (filters?.page) params.append("page", String(filters.page));
    params.append("limit", String(filters?.limit || 10)); // Default 10 per page
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await apiRequest(`/service-request${queryString}`);
    return {
      data: res?.data || [],
      meta: res?.meta || {
        page: filters?.page || 1,
        limit: filters?.limit || 10,
        total: Array.isArray(res?.data) ? res.data.length : 0,
        totalPages: 1,
      },
    };
  },

  // 1b. Get single service request details
  async getRequestDetails(id: string) {
    const res = await apiRequest(`/service-request/${id}`);
    return res?.data;
  },

  // 1c. Admin Manage Request (Assign Contractor, Status, Price, Notes)
  async manageRequest(
    id: string,
    data: {
      status?: string;
      assignedContractor?: any;
      quotedAmount?: number;
      quoteNotes?: string;
      quotationStatus?: string;
    }
  ) {
    return apiRequest(`/service-request/${id}/manage`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // 2. Update service request status
  async updateRequestStatus(id: string, status: string) {
    return apiRequest(`/service-request/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // 3. Update quotation details
  async updateRequestQuote(
    id: string,
    data: { status: string; quotedAmount?: number; quoteNotes?: string }
  ) {
    return apiRequest(`/service-request/${id}/quote`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // 4. Get all users filtered by role
  async getUsers(role?: string, searchTerm?: string, page: number = 1, limit: number = 10) {
    const params = new URLSearchParams();
    if (role && role !== "All") {
      // Map UI role label to backend enum
      const roleKey = role === "Tenant" ? "tenant" : role === "Landlord" ? "landlord" : "services";
      params.append("role", roleKey);
    }
    if (searchTerm) {
      params.append("searchTerm", searchTerm);
    }
    params.append("page", String(page));
    params.append("limit", String(limit || 10)); // Default 10 per page
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await apiRequest(`/user${queryString}`);
    return {
      data: res?.data || [],
      meta: res?.meta || {
        page,
        limit,
        total: Array.isArray(res?.data) ? res.data.length : 0,
        totalPages: 1,
      },
    };
  },

  // 5. Update user status
  async updateUserStatus(userId: string, status: "active" | "inactive" | "deleted") {
    return apiRequest(`/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // 6. Get user overview statistics & analytics
  async getUserOverviewStats() {
    const res = await apiRequest("/user/overview-stats");
    return res?.data;
  },
};
