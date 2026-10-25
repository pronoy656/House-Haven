export type AddPropertyStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface PropertyTypeOption {
  id: string;
  name: string;
  image: string;
}

export interface AddPropertyState {
  propertyType: string;
  postcode: string;
  selectedAddress: string;
  bedrooms: number;
  bathrooms: number;
  receptionRooms: number;
  parkingSpaces: number;
  heatingType: string;
  furnishing: string;
  selectedAmenities: string[];
  monthlyRent: number;
  depositAmount: string;
  leaseDuration: string;
  availableFrom: string;
  petPolicy: string;
  ratesOption: string;
  allPhotos: string[];
  activePhotoIndex: number;
  preferences: Record<string, boolean>;
}
