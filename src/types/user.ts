export type UserRole = "tenant" | "landlord" | "service";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  avatarUrl?: string;
  dob?: string;
  postcode?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  isVerified?: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date?: string;
}
