export type RequestStatus = "Pending" | "Quoted" | "In Progress" | "Completed" | "Cancelled";
export type RequestPriority = "Low" | "Medium" | "High" | "Urgent";

export interface ServiceRequest {
  id: string;
  referenceNo: string;
  title: string;
  category: string;
  user: {
    name: string;
    role: "Tenant" | "Landlord" | "Service Client";
    phone: string;
    email: string;
    avatar?: string;
  };
  address: string;
  postcode?: string;
  requestedDate: string;
  requestedTime: string;
  status: RequestStatus;
  priority: RequestPriority;
  description: string;
  quotedPrice?: string;
  assignedContractor?: string;
  createdAt: string;
  source: "Services Hub" | "Landlord Escalation";
}

export interface Contractor {
  id: string;
  name: string;
  trade: string;
  phone: string;
  email: string;
  rating: number;
  completedJobs: number;
  status: "Available" | "Busy" | "Offline";
  company: string;
}

export interface AdminProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  postcode: string;
  propertyType: "Apartment" | "House" | "Studio" | "Townhouse";
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
  tenant?: {
    name: string;
    phone: string;
  };
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  status: "Occupied" | "Vacant" | "Under Maintenance";
  imagesCount: number;
  listedDate: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Tenant" | "Landlord" | "Service Client";
  verificationStatus: "Verified" | "Pending ID" | "Unverified";
  joinedDate: string;
  activeLeasesOrJobs: number;
  status: "Active" | "Suspended";
}

export interface AdminTransaction {
  id: string;
  referenceNo: string;
  type: "Rent Payment" | "Service Quote" | "Security Deposit" | "Contractor Payout";
  fromUser: string;
  toUser: string;
  amount: number;
  platformFee: number;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  date: string;
  paymentMethod: "Bank Transfer" | "Card" | "Direct Debit";
}

export interface DashboardMetrics {
  totalRequests: number;
  pendingQuotes: number;
  inProgress: number;
  completed: number;
  totalQuotedRevenue: number;
  activeContractors: number;
}

