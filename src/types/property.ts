export interface PropertyItem {
  id: string;
  title: string;
  address: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  images: string[];
  features?: string[];
  description?: string;
  landlord?: {
    name: string;
    avatar: string;
    verified?: boolean;
    rating?: number;
  };
}

export interface PropertyMatch {
  property: PropertyItem;
  matchScore: number;
  decisionStatus: "pending" | "proceeded" | "declined" | "awaiting_approval";
}
