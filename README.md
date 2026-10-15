# 🏡 House Haven

A modern, mobile-first property and tenancy management web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. House Haven connects **Landlords**, **Tenants**, and **Service Seekers** in a seamless, unified real estate ecosystem.

---

## ✨ Features Overview

### 👥 1. Role-Based Experience
- **Landlords**: List and manage properties, review tenant applications, track rent payments, schedule maintenance, and manage property issues.
- **Tenants**: Discover rental listings, apply with digital credentials, track lease status, and communicate directly with landlords.
- **Service Seekers**: Access handyman, electrical, plumbing, boiler repair, and damp/mould inspection services without a full profile.

---

### 🚀 2. Authentication & Onboarding
- **Branded Splash & Welcome**: High-impact splash screen featuring House Haven branding.
- **Role Selection**: Interactive role cards with custom iconography and distinct visual states.
- **Sign Up / Sign In**: Clean credential forms with password visibility toggles and validation.
- **OTP Verification**: 4-digit verification screen with automatic focus switching and resend countdown.
- **Landlord Onboarding Wizard**:
  - Personal Information & Contact Details.
  - Address Lookup & Selection.
  - Government ID / Passport Identity Verification with photo upload.
  - Proof of Address document verification.
  - "All Set" confirmation & transition to the dashboard.

---

### 📊 3. Landlord Dashboard & Properties
- **Dashboard Hub**:
  - Live summary stat cards (Active properties, Rent collected, Pending applications, Issues).
  - Activity feed with real-time maintenance requests and application alerts.
  - Quick access to the Service Hub.
- **Properties Overview**:
  - Donut chart visualization for property statuses (*Available*, *Off Market*, *Rented*).
  - Horizontal filter tabs with hidden scrollbars for clean mobile presentation.
- **Add Property Flow (6-Step Wizard)**:
  1. **Property Type**: Detached, Semi-Detached, Terraced, Flat/Apartment.
  2. **Location & Address**: Smart address picker and postcode lookup.
  3. **Property Details & Amenities**: Compact room counters (Bedrooms, Bathrooms, Reception Rooms, Parking), Heating Type, Furnishing, and Amenity pills.
  4. **Pricing & Availability**: Rent amount, deposit, lease duration, available date, pet and subletting permissions.
  5. **Media Uploads**: Multi-photo upload manager with preview badges.
  6. **Review & Publish**: Final overview before listing.
- **Property Details**:
  - **Animated Sliding Carousel**: Smooth photo slider featuring high-resolution architectural interior shots (Living Room, Modern Kitchen, Master Bedroom, Ensuite Bathroom, Balcony/Terrace).
  - Mobile touch swipe support, room labels, photo counter badge, and pagination dots.
  - Detailed feature breakdown, pricing terms, and disclaimer notices.

---

### 📝 4. Applications & Tenant Screening
- **Applications Overview**:
  - Filter applicants by *All*, *Pending*, *Approved*, and *Rejected*.
  - Favorite toggle for bookmarking promising applicants.
- **Application Details Screen**:
  - Tenant profile summary (*Verified*, *Pending Review* badges).
  - Associated rental property card with monthly rent.
  - **Interactive Match Analysis**:
    - 50% circular progress indicator.
    - **Expandable Match Breakdown**: Tap to toggle detailed requirement checks:
      - **Matches**: Lease duration, references.
      - **Does not match**: Income requirements, move-in dates.
  - Key tenant metrics (Age, Profession, Salary, Lease Duration, References).
  - **Tenant Document Hub**: Verified PDF preview/download cards for Credit Reports, Tax Returns, and Pay Slips.
  - **Action Controls**: Instant *Pass* or *Love* decision actions with confirmation feedback.

---

### 🔔 5. Notifications & Maintenance
- **Notification Feed**:
  - Chronological groups (*Today*, *Yesterday*).
  - Tenant application alerts with interactive **Accept** and **Reject** buttons.
  - Milestone celebration cards with celebratory party popper badges 🎉.
  - In-app Calendar date filtering and unread filter tabs.
- **Maintenance & Issue Tracker**:
  - Issue report details (e.g., leaking faucet, plumbing repairs).
  - Contractor assignment and scheduled maintenance calendar.

---

### ⚙️ 6. Profile & Settings
- **Settings / Profile Hub**:
  - Direct menu list (Personal Info, Payment Method, Change Password, Forgot Password, Privacy Policy, Help & Support, Log Out).
  - Dedicated Personal Information edit screen with back navigation.
  - **Redesigned Log Out Modal**:
    - Top red **Log Out** button and bottom **Cancel** button.
    - Centered icon badge and dedicated cross button to prevent text overlap.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (Turbopack, App Router, React 19) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Utilities |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Geist](https://vercel.com/font) via `next/font/google` |
| **Responsive Design** | Custom `MobileContainer` (100% on mobile, 440px centered frame on desktop) |

---

## 📂 Project Structure

```
House-Heaven/
├── public/                     # Static assets, branding logos, icons & photos
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── applications/       # Applications overview & details
│   │   │   └── details/        # Single application screening page
│   │   ├── choose-role/        # Role selection screen
│   │   ├── dashboard/          # Landlord central dashboard
│   │   ├── login/              # Sign in page
│   │   ├── maintenance/        # Maintenance issues & scheduling
│   │   ├── notification(s)/    # Landlord notifications feed
│   │   ├── onboarding/         # Multi-step landlord registration
│   │   ├── otp/                # OTP verification
│   │   ├── profile/            # Profile settings & edit forms
│   │   ├── properties/         # Properties overview, details & add property
│   │   │   ├── add/            # 6-step add property wizard
│   │   │   └── details/        # Property photo carousel & overview
│   │   ├── services/           # Services hub directory
│   │   ├── settings/           # Password management & settings
│   │   ├── signup/             # User registration
│   │   ├── globals.css         # Tailwind v4 imports & custom scrollbar styles
│   │   └── layout.tsx          # Root layout with font & hydration configuration
│   └── components/             # Reusable UI components
│       ├── landlord/           # Landlord-specific screens & workflows
│       │   ├── AddPropertyFlowScreen.tsx
│       │   ├── ApplicationDetailsScreen.tsx
│       │   ├── ApplicationOverviewScreen.tsx
│       │   ├── IssueDetailsFlowScreen.tsx
│       │   ├── LandlordDashboardScreen.tsx
│       │   ├── LandlordNotificationScreen.tsx
│       │   ├── LandlordProfileFlowScreen.tsx
│       │   ├── PropertiesOverviewScreen.tsx
│       │   └── PropertyDetailsScreen.tsx
│       ├── ui/                 # Reusable atomic UI buttons & controls
│       ├── MobileContainer.tsx # Mobile-first responsive wrapper
│       ├── MobileStatusBar.tsx # Simulated mobile status bar (time, signal, battery)
│       └── RoleSelectionScreen.tsx
├── next.config.ts              # Next.js config & remote image patterns
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17+` or `v20+` recommended
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 2. Clone Repository
```bash
git clone https://github.com/pronoy656/House-Haven.git
cd House-Heaven
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📱 Mobile-First Design Philosophy

House Haven was created mobile-first:
- **Mobile Devices**: Renders edge-to-edge at full viewport height (`100dvh`) with native touch gestures and sticky navigation.
- **Desktop Screens**: Renders inside an elegant, centered **440px smartphone frame** with a subtle drop shadow to provide an authentic mobile app experience on any display.

---

## 📄 License
This project is proprietary and built for internal use.
