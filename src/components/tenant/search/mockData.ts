import { PropertyMatch } from "./types";

export const SAMPLE_PROPERTIES: PropertyMatch[] = [
  {
    id: "prop-1",
    name: "7 Great Georges Street",
    address: "7 Great Georges St N, Warrenpoint, Newry BT34 3HS, UK",
    price: "£ 1200",
    period: "Monthly",
    matchPercentage: 69,
    description:
      "A bright and contemporary 2-bedroom home located in a quiet, well-connected residential pocket. Features an open-plan kitchen and living area, brand-new appliances, private garden access, and dedicated secure off-street parking.",
    landlord: {
      name: "Arthur Jenkins",
      responseTime: "Replies in ~15 mins",
    },
    images: [
      "/great-georges-home.jpg",
      "/great-georges-interior.jpg",
      "/splash-livingroom-hd.jpg",
      "/splash-livingroom-opt2.jpg",
    ],
    bedrooms: 2,
    bathrooms: 1,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
  {
    id: "prop-2",
    name: "14 Belgrave Luxury Suites",
    address: "14 Belgrave Square, Knightsbridge, London SW1X 8PS, UK",
    price: "£ 1850",
    period: "Monthly",
    matchPercentage: 92,
    description:
      "Prestigious Knightsbridge residence offering refined city living. Floor-to-ceiling windows flood the spacious living areas with light. High-end modern furnishings, marble bathroom fittings, and 24/7 concierge service.",
    landlord: {
      name: "Victoria Sterling",
      responseTime: "Replies in ~1 hour",
    },
    images: [
      "/splash-building.jpg",
      "/splash-livingroom-opt4.jpg",
      "/splash-livingroom-opt6.jpg",
      "/splash-interior-dark.jpg",
    ],
    bedrooms: 3,
    bathrooms: 2,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: false,
      parking: true,
    },
  },
  {
    id: "prop-3",
    name: "Ocean View Horizon Villa",
    address: "5 Marine Drive, Brighton Marina, BN2 5WA, UK",
    price: "£ 2400",
    period: "Monthly",
    matchPercentage: 96,
    description:
      "Panoramic coastal views meet architectural elegance in this exceptional 4-bedroom marina villa. Features an expansive landscaped garden, bespoke fitted kitchen, spacious master suite with ensuite spa bath, and private driveway.",
    landlord: {
      name: "David Harrison",
      responseTime: "Replies in ~30 mins",
    },
    images: [
      "/splash-villa-luxury.jpg",
      "/splash-livingroom-opt7.jpg",
      "/splash-livingroom-opt8.jpg",
      "/property-interior.png",
    ],
    bedrooms: 4,
    bathrooms: 3,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
  {
    id: "prop-4",
    name: "Canary Riverside Penthouse",
    address: "Westferry Circus, Canary Wharf, London E14 8RR, UK",
    price: "£ 3100",
    period: "Monthly",
    matchPercentage: 88,
    description:
      "Stunning top-floor penthouse offering panoramic skyline views over the Thames and Canary Wharf. Premium smart-home integration, designer furnishings, private wrap-around terrace, and secure underground parking.",
    landlord: {
      name: "Elena Rostova",
      responseTime: "Replies in ~2 hours",
    },
    images: [
      "/splash-livingroom-opt9.jpg",
      "/splash-livingroom-opt10.jpg",
      "/splash-livingroom-opt11.jpg",
      "/splash-livingroom-opt12.jpg",
    ],
    bedrooms: 3,
    bathrooms: 3,
    features: {
      disabledAccess: true,
      furnished: true,
      garden: true,
      parking: true,
    },
  },
];
