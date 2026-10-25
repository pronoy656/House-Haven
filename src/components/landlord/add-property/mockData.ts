import { PropertyTypeOption } from "./types";

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  { id: "Detached House", name: "Detached House", image: "/add-pro-1.png" },
  { id: "Semi-Detached House", name: "Semi-Detached House", image: "/add-pro-2.png" },
  { id: "Detached Bungalow", name: "Detached Bungalow", image: "/add-pro-3.png" },
  { id: "Terraced House", name: "Terraced House", image: "/add-pro-4.png" },
  { id: "Apartment", name: "Apartment", image: "/add-pro-5.png" },
  { id: "Commercial", name: "Commercial", image: "/add-pro-6.png" },
];

export const ALL_AMENITIES = [
  "Wifi",
  "Parking",
  "Air Conditioning",
  "Washer",
  "Dryer",
  "Dishwasher",
  "Pet Friendly",
  "Gym",
  "Pool",
  "Garden",
  "Security",
  "Elevator",
];

export const INITIAL_PREFERENCES: Record<string, boolean> = {
  "Allow short-term rental (e.g. 3-6 months)": true,
  "Allow subletting": false,
  "Show exact address to all users": true,
  "Available on mark": false,
  "Smoking accepted": false,
  "Benefits accepted": true,
  "Criminal record accepted": false,
  "Students allowed": true,
  "References required": true,
  "Guarantor required": true,
};
