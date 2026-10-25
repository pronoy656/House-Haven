export interface PropertyFeatures {
  disabledAccess: boolean;
  furnished: boolean;
  garden: boolean;
  parking: boolean;
}

export interface PropertyMatch {
  id: string;
  name: string;
  address: string;
  price: string;
  period: string;
  matchPercentage: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  description?: string;
  landlord?: {
    name: string;
    responseTime: string;
  };
  features: PropertyFeatures;
}
