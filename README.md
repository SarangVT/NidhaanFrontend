# Nidhaan Frontend

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Apollo Client](https://img.shields.io/badge/Apollo-Client-311c87)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

The Nidhaan frontend is a Next.js App Router application for a healthcare platform. It includes patient authentication, pharmacy browsing and cart flows, doctor consultation pages, doctor onboarding/dashboard screens, seller onboarding/dashboard screens, diagnostics and mental-health pages, and a floating chatbot UI.

## Features

- Next.js App Router route tree under `src/app`.
- Global application shell with fixed top navigation, services navigation, FAQ, and footer.
- Apollo Client integration for the backend GraphQL API.
- Patient signup/login, address management, and cart pages.
- Pharmacy storefront pages for search, categories, brands, product listings, product details, checkout, and delivery.
- Product pagination, product search, add-to-cart, and remove-from-cart GraphQL flows.
- Doctor landing, registration, login, onboarding, dashboard, appointments, earnings, settings, and schedule-management pages.
- Public doctor consultation pages, speciality filtering, doctor cards, doctor detail pages, and date-based slot display.
- Seller landing, login, registration/onboarding, dashboard, and product-management pages.
- Seller GST document upload flow using a presigned upload URL.
- Mental-health landing, questions, preferences, and therapist-card UI.
- Diagnostics landing page with recommended tests, booked tests, booking cards, and supporting UI.
- Floating chatbot component that sends text and file uploads to a local chatbot API.
- React Context-based user, doctor, and seller state helpers.
- Google OAuth provider setup for doctor-related routes.
- Tailwind CSS global styling and small custom animation/editor styles.

## Tech Stack

### Framework

- Next.js `15.3.2`
- React `19.1.0`
- TypeScript
- App Router

### Data and API

- Apollo Client
- GraphQL
- Axios
- Fetch API
- Meilisearch client and upload script

### State Management

- React Context
- Apollo Client cache
- Browser `localStorage`

### Authentication

- JWT decoding with `jwt-decode`
- Google OAuth provider from `@react-oauth/google`
- Client-side token storage for user, seller, and doctor helper contexts
- Cookie-backed doctor requests supported through Apollo `credentials: "include"`

### UI Libraries

- Tailwind CSS 4
- React Icons
- Headless UI
- React CountUp
- React Quill
- Downshift
- Fuse.js
- Day.js
- lodash/debounce

### Build Tools

- Next.js Turbopack development server
- TypeScript
- `tsx` for the Meilisearch upload script
- PostCSS with `@tailwindcss/postcss`

## Project Structure

```text
frontend/
├── assets/                         # Imported image/icon metadata and static image groups
├── public/                         # Public assets served by Next.js
│   ├── ConsultDoctor/              # Doctor speciality images
│   └── MentalHealth/               # Mental-health assets
├── src/app/
│   ├── a/                          # Patient account subroutes: addresses and cart
│   ├── auth/                       # Patient login and signup
│   ├── chatbot/                    # Floating chatbot component
│   ├── components/                 # Shared homepage/global components
│   ├── consult-doctor/             # Public doctor consultation and booking views
│   ├── diagnostics/                # Diagnostics landing and test-card UI
│   ├── doctors/                    # Doctor public, auth, onboarding, and dashboard routes
│   ├── lib/                        # Apollo, contexts, bucket/search helpers, utilities
│   ├── mental-health/              # Mental-health pages and components
│   ├── pharmacy/                   # Pharmacy storefront and seller routes
│   ├── simple/                     # Standalone simple page
│   ├── globals.css                 # Tailwind import and global custom styles
│   ├── layout.tsx                  # Root layout and providers
│   ├── page.tsx                    # Home page
│   ├── servicesNavbar.tsx          # Services navigation
│   └── topNavbar.tsx               # Top navigation/auth bar
├── middleware.ts                   # Basic middleware for /dashboard and /profile
├── next.config.ts                  # Next.js headers config
├── postcss.config.mjs              # Tailwind PostCSS plugin config
├── tsconfig.json                   # TypeScript and path alias config
└── package.json                    # Scripts and dependencies
```

## Routing

This application uses filesystem routing from the Next.js App Router.

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home page. |
| `/auth/login` | `src/app/auth/login/page.tsx` | Patient login. |
| `/auth/signup` | `src/app/auth/signup/page.tsx` | Patient signup. |
| `/a/addresses` | `src/app/a/addresses/page.tsx` | Saved patient addresses. |
| `/a/addresses/add` | `src/app/a/addresses/add/page.tsx` | Add patient address. |
| `/a/cart` | `src/app/a/cart/page.tsx` | Patient cart. |
| `/pharmacy` | `src/app/pharmacy/page.tsx` | Pharmacy storefront. |
| `/pharmacy/categories` | `src/app/pharmacy/categories/page.tsx` | Pharmacy categories. |
| `/pharmacy/brands` | `src/app/pharmacy/brands/page.tsx` | Pharmacy brands. |
| `/pharmacy/item/[id]` | `src/app/pharmacy/item/[id]/page.tsx` | Product detail page. |
| `/pharmacy/checkout` | `src/app/pharmacy/checkout/page.tsx` | Checkout UI. |
| `/pharmacy/delivery` | `src/app/pharmacy/delivery/page.tsx` | Delivery UI. |
| `/pharmacy/seller` | `src/app/pharmacy/seller/page.tsx` | Seller landing page. |
| `/pharmacy/seller/login` | `src/app/pharmacy/seller/login/page.tsx` | Seller login UI. |
| `/pharmacy/seller/register` | `src/app/pharmacy/seller/register/page.tsx` | Seller onboarding flow. |
| `/pharmacy/seller/dashboard` | `src/app/pharmacy/seller/dashboard/page.tsx` | Seller dashboard. |
| `/pharmacy/seller/products` | `src/app/pharmacy/seller/products/page.tsx` | Seller products page. |
| `/consult-doctor` | `src/app/consult-doctor/page.tsx` | Doctor consultation landing page. |
| `/consult-doctor/book-appointment` | `src/app/consult-doctor/book-appointment/page.tsx` | Appointment discovery page. |
| `/consult-doctor/speciality` | `src/app/consult-doctor/speciality/page.tsx` | Doctors filtered by selected specialities. |
| `/consult-doctor/doctorinfo/[id]` | `src/app/consult-doctor/doctorinfo/[id]/page.tsx` | Public doctor detail and slot page. |
| `/doctors` | `src/app/doctors/page.tsx` | Doctor landing page. |
| `/doctors/register` | `src/app/doctors/register/page.tsx` | Doctor registration. |
| `/doctors/login` | `src/app/doctors/login/page.tsx` | Doctor login. |
| `/doctors/onboarding` | `src/app/doctors/onboarding/page.tsx` | Doctor onboarding flow. |
| `/doctors/dashboard` | `src/app/doctors/dashboard/page.tsx` | Doctor dashboard overview. |
| `/doctors/dashboard/appointments` | `src/app/doctors/dashboard/appointments/page.tsx` | Doctor appointments. |
| `/doctors/dashboard/earnings` | `src/app/doctors/dashboard/earnings/page.tsx` | Doctor earnings UI. |
| `/doctors/dashboard/settings` | `src/app/doctors/dashboard/settings/page.tsx` | Doctor settings UI. |
| `/doctors/dashboard/slots` | `src/app/doctors/dashboard/slots/page.tsx` | Doctor schedule management. |
| `/diagnostics` | `src/app/diagnostics/page.tsx` | Diagnostics landing page. |
| `/mental-health` | `src/app/mental-health/page.tsx` | Mental-health landing page. |
| `/mental-health/questions` | `src/app/mental-health/questions/page.tsx` | Mental-health questionnaire UI. |
| `/mental-health/preferences` | `src/app/mental-health/preferences/page.tsx` | Therapist preference UI. |
| `/simple` | `src/app/simple/page.tsx` | Simple standalone page. |

## Architecture

### Application Shell

`src/app/layout.tsx` defines the root document, imports global CSS, injects the Google Identity Services script, and wraps all pages with:

- `ApolloWrapper`
- `UserContextProvider`
- fixed `topNavbar`
- fixed `servicesNavbar`
- `FAQ`
- `Footer`

Feature-specific layouts add context or navigation where needed:

- `src/app/doctors/layout.tsx` wraps doctor routes with `GoogleOAuthProvider` and `DoctorContextProvider`.
- `src/app/pharmacy/seller/layout.tsx` wraps seller routes with `SellerContextProvider`.
- `src/app/doctors/dashboard/layout.tsx` renders a collapsible sidebar for doctor dashboard pages.
- `src/app/pharmacy/layout.tsx` and `src/app/auth/layout.tsx` are pass-through layouts.

### Component Organization

Shared components live in `src/app/components`. Domain-specific components are kept near their routes:

- `pharmacy/ShopByCategory.tsx`, `SearchBar.tsx`, seller onboarding components, and seller dashboard UI.
- `doctors/onboarding/components/*`, doctor dashboard components, and doctor landing components.
- `consult-doctor/*` for doctor discovery, public doctor cards, doctor info, and slots.
- `diagnostics/*` for test cards, sliders, recommended tests, and testimonials.
- `mental-health/*` for trust highlights, questionnaire, preference, and therapist-card UI.

Most interactive feature components are client components and use hooks such as `useQuery`, `useMutation`, `useLazyQuery`, `useState`, `useEffect`, and context hooks.

### State Management

State is intentionally lightweight and client-side:

- `UserContext` stores decoded user identity, cart count, addresses, selected address, and selected doctor specialities.
- `DoctorContext` stores a decoded doctor ID from `DoctorAuthToken` when available.
- `SellerContext` stores a decoded seller ID from `sellerAuthToken`.
- Apollo Client provides normalized request caching through `InMemoryCache`.
- Auth and user payloads are stored in `localStorage` by login/signup flows.

### Authentication

Patient authentication uses GraphQL mutations in `auth/login/LoginForm.tsx` and `auth/signup/SignUpForm.tsx`. Successful responses store:

- `authToken`
- serialized `user`

Apollo reads `authToken` from `localStorage` and sends it as a Bearer token.

Doctor routes are wrapped in `GoogleOAuthProvider`. Doctor registration/login components call GraphQL mutations and also support Google login by posting to the backend REST endpoint. Apollo requests include `credentials: "include"` so cookie-backed doctor sessions can be used for doctor dashboard queries and mutations.

Seller registration stores `sellerAuthToken`, and seller onboarding components decode it to determine the seller ID for onboarding calls.

The middleware file checks for an `authToken` cookie on `/dashboard` and `/profile`, but current application routes use paths such as `/doctors/dashboard` and token storage is primarily localStorage/cookie based in the feature code.

### API Communication

`src/app/lib/ApolloWrapper.tsx` creates a single Apollo Client:

```ts
uri: "http://localhost:8000/v1/graphql"
credentials: "include"
```

The Apollo link attaches `Authorization: Bearer <authToken>` when `authToken` exists in localStorage.

GraphQL operations are colocated in route components and feature components. Major operations include:

| Area | Operations |
| --- | --- |
| Patient auth | `createUser`, `verifyUser` |
| Addresses | `getUserAddresses`, `createUserAddress`, `setDefaultAddress` |
| Cart | `getUserCartItems`, `getUserCartCount`, `addCartItem`, `removeCartItem` |
| Pharmacy | `getProductsPaginated`, `searchProducts`, `getProductDetails` |
| Doctor auth/onboarding | `createDoctor`, `verifyDoctor`, `createBasicDetails`, `getDoctorDocUrl`, `uploadDoctorDocument`, `updateDoctorBankDetails` |
| Doctor dashboard | `getDoctorDetails`, `upcomingAppointments`, `doctorAppointments`, `getDoctorSchedule`, `saveDoctorSchedule` |
| Doctor discovery | `fetchDoctorsBySpeciality`, `getDoctorInfo`, `getDoctorSlotsForDate` |
| Seller onboarding | `createSeller`, `currentStep`, `getUploadUrl`, `updateGST`, `createSellerStore` |

Direct HTTP calls are used for:

- Doctor Google OAuth login through Axios against `http://localhost:8000/google/login/doctor`.
- Seller GST upload URL lookup through `fetch` to the GraphQL endpoint.
- File upload to presigned storage URLs.
- Chatbot text/file requests to `http://localhost:3001`.

### Styling

The project uses Tailwind CSS 4 with:

```css
@import "tailwindcss";
```

Global styles in `src/app/globals.css` define:

- typing animation utility
- fade-in-up animation utility
- hidden-scrollbar utility
- React Quill border/editor overrides

Most UI styling is applied through Tailwind utility classes directly in components.

### Assets

- `assets/` contains imported image groups and JS/TS asset maps for the homepage, footer icons, and health concern icons.
- `public/` contains assets served directly by Next.js, including the logo, auth image, search background, consult-doctor speciality images, and mental-health images.

## Environment Variables

| Variable | Required for | Used in |
| --- | --- | --- |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth provider and Google login redirects | `src/app/doctors/layout.tsx`, patient/seller login forms |
| `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` | Google login redirect URL construction | patient/seller login forms |
| `JWT_SECRET` | Present in `.env.local` | Not referenced by current frontend source |

The frontend currently also contains hardcoded local service URLs:

| URL | Used by |
| --- | --- |
| `http://localhost:8000/v1/graphql` | Apollo Client and seller GST upload flow |
| `http://localhost:8000` | `src/app/lib/utils.ts` as `BACKEND_URL` |
| `http://localhost:3001` | Chatbot component |
| `http://localhost:7700` | Meilisearch helpers/scripts |

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 15
- npm
- A running backend GraphQL API at `http://localhost:8000/v1/graphql`
- A running chatbot API at `http://localhost:3001` if chatbot functionality is needed
- A local Meilisearch instance at `http://localhost:7700` if product search/index upload is needed
- Google OAuth client variables when using Google login flows

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server listens on all interfaces because the script passes `-H 0.0.0.0`. Next.js defaults to port `3000`.

### Build

```bash
npm run build
```

### Production Start

```bash
npm run start
```

### Meilisearch Upload

```bash
npm run upMeili
```

This runs `src/app/lib/uploadMeilisearch.ts`, which reads `src/app/lib/products.csv` and uploads documents to a local Meilisearch `products` index.

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev --turbopack -H 0.0.0.0` | Starts the development server with Turbopack. |
| `build` | `next build` | Builds the production app. |
| `start` | `next start` | Starts the production build. |
| `upMeili` | `npx tsx src/app/lib/uploadMeilisearch.ts` | Uploads product CSV data to Meilisearch. |

## Build Process

The frontend build is handled by Next.js. TypeScript is configured with strict mode, `moduleResolution: "bundler"`, JSX preservation, incremental compilation, JSON module support, and the `@/*` alias pointing to `./src/*`.

`next.config.ts` adds the following headers to all routes:

- `Cross-Origin-Opener-Policy: unsafe-none`
- `Cross-Origin-Embedder-Policy: unsafe-none`

Tailwind CSS is configured through PostCSS using `@tailwindcss/postcss`.

## API Dependencies

For the full frontend experience, run these services alongside the Next.js app:

| Service | Default URL | Purpose |
| --- | --- | --- |
| Backend GraphQL API | `http://localhost:8000/v1/graphql` | Auth, users, addresses, cart, products, doctors, sellers |
| Backend REST API | `http://localhost:8000/google/login/doctor` | Doctor Google OAuth |
| Chatbot API | `http://localhost:3001` | Chat text and document upload responses |
| Meilisearch | `http://localhost:7700` | Product search and index upload |

## Notes

- This README describes only the frontend application in `frontend/`.
- Several route pages are presentation-heavy, while pharmacy, auth, cart, doctor, and seller onboarding/dashboard flows are wired to GraphQL.
- Backend URLs and Meilisearch keys are currently hardcoded in a few frontend files. For production, move them into environment variables.
- `frontend/README.md` is intended to document the current codebase, not planned backend behavior.
