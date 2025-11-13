I'm working with an agentic coding boilerplate project that includes authentication, database integration, and AI capabilities. Here's what's already set up:

## Current Agentic Coding Boilerplate Structure

- **Authentication**: Better Auth with Google OAuth integration
- **Database**: Drizzle ORM with PostgreSQL setup
- **AI Integration**: Vercel AI SDK with OpenAI integration
- **UI**: shadcn/ui components with Tailwind CSS
- **Current Routes**:
  - `/` - Home page with setup instructions and feature overview
  - `/dashboard` - Protected dashboard page (requires authentication)
  - `/chat` - AI chat interface (requires OpenAI API key)

## Important Context

This is an **agentic coding boilerplate/starter template** - all existing pages and components are meant to be examples and should be **completely replaced** to build the actual AI-powered application.

### CRITICAL: You MUST Override All Boilerplate Content

**DO NOT keep any boilerplate components, text, or UI elements unless explicitly requested.** This includes:

- **Remove all placeholder/demo content** (setup checklists, welcome messages, boilerplate text)
- **Replace the entire navigation structure** - don't keep the existing site header or nav items
- **Override all page content completely** - don't append to existing pages, replace them entirely
- **Remove or replace all example components** (setup-checklist, starter-prompt-modal, etc.)
- **Replace placeholder routes and pages** with the actual application functionality

### Required Actions:

1. **Start Fresh**: Treat existing components as temporary scaffolding to be removed
2. **Complete Replacement**: Build the new application from scratch using the existing tech stack
3. **No Hybrid Approach**: Don't try to integrate new features alongside existing boilerplate content
4. **Clean Slate**: The final application should have NO trace of the original boilerplate UI or content

The only things to preserve are:

- **All installed libraries and dependencies** (DO NOT uninstall or remove any packages from package.json)
- **Authentication system** (but customize the UI/flow as needed)
- **Database setup and schema** (but modify schema as needed for your use case)
- **Core configuration files** (next.config.ts, tsconfig.json, tailwind.config.ts, etc.)
- **Build and development scripts** (keep all npm/pnpm scripts in package.json)

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Better Auth for authentication
- Drizzle ORM + PostgreSQL
- Vercel AI SDK
- shadcn/ui components
- Lucide React icons

## Component Development Guidelines

**Always prioritize shadcn/ui components** when building the application:

1. **First Choice**: Use existing shadcn/ui components from the project
2. **Second Choice**: Install additional shadcn/ui components using `pnpm dlx shadcn@latest add <component-name>`
3. **Last Resort**: Only create custom components or use other libraries if shadcn/ui doesn't provide a suitable option

The project already includes several shadcn/ui components (button, dialog, avatar, etc.) and follows their design system. Always check the [shadcn/ui documentation](https://ui.shadcn.com/docs/components) for available components before implementing alternatives.

## What I Want to Build

Develop a **Flood Warning System Dashboard** web application using **Next.js (App Router)** with **TypeScript**, **Tailwind CSS**, **Drizzle ORM + PostgreSQL**, **shadcn/ui**, **Lucide React**, **Vercel AI SDK**, and **Better Auth** (authentication framework configured but **no sign-in required** for this build).

---

### ⚙️ **Functional Requirements**

### **1. Dashboard Page (`/dashboard`)**

A single-page flood monitoring dashboard that visualizes real-time warning data.

### **a. Interactive Map (OpenStreetMap)**

- Display **10 dummy observation points** as color-coded markers.
- Each marker represents an observation site with:
    - Name / ID
    - Coordinates (latitude, longitude)
    - Current Warning Level
    - Water Level (numeric)
    - Last Updated Timestamp
- Marker color codes:
    - 🟢 Light Green — *Normal*
    - 🟩 Dark Green — *Advisory*
    - 🟡 Yellow — *Watch*
    - 🔴 Red — *Warning*
- On hover or click: show tooltip with detailed info.

### **b. Summary Statistics Panel**

- Show total count of observation points by warning level.
- Use **shadcn/ui cards** or **stat boxes**, color-coded accordingly.
- Include **last update time**.
- Example:
    - 3 Normal
    - 2 Advisory
    - 3 Watch
    - 2 Warning

### **c. Observation Table**

- Display all observation data in a **responsive, sortable, and searchable table**.
- Columns:
    - Observation Name / ID
    - Location (Lat, Long)
    - Current Warning Level (color-coded badge)
    - Water Level (m)
    - Last Updated Time
- Table should use **shadcn/ui Table components**.
- Add filter and search by name or warning level.

---

### **2. Observation Update Page (`/update`)**

A form-based page to update the current status of observation points.

### **Form Fields:**

- **Observation Name / ID:** Dropdown menu populated from the 10 dummy entries.
- **Current Warning Level:** Dropdown with color-coded options:
    - Light Green — Normal
    - Dark Green — Advisory
    - Yellow — Watch
    - Red — Warning
- **Water Level:** Numeric input field (only accepts numbers).
- **Submit Button:** Saves the update to the local database (Drizzle ORM).
- **Cancel Button:** Returns to dashboard.

### **Form Behavior:**

- Use **shadcn/ui Form components** with Tailwind styling.
- On submission:
    - Update the corresponding record in PostgreSQL (via Drizzle ORM).
    - Reflect changes immediately on the dashboard (client revalidation or refresh).
- Include success and error toast notifications.

---

### 🧱 **Database Schema (Drizzle ORM + PostgreSQL)**

```tsx
export const observations = pgTable('observations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  latitude: real('latitude'),
  longitude: real('longitude'),
  warningLevel: varchar('warning_level', { length: 20 }),
  waterLevel: real('water_level'),
  lastUpdated: timestamp('last_updated').defaultNow(),
});

```

- On initial load, **seed database** with **10 dummy observation points** containing:
    - Realistic coordinates within a single region.
    - Randomized water levels and warning levels.
    - Example names: `Station A` … `Station J`.

---

### 💅 **Design & UX**

- Use **Tailwind CSS** for layout and **shadcn/ui** components for structure.
- Layout design:
    - No Top navigation bar (logo + title + optional theme toggle)
    - Two-column layout (map on left, data summary/stats on the right)
    - Table below that Two-column layout
- Use **Lucide React** icons for clarity (e.g., map-pin, alert-circle, database).
- Ensure full **mobile responsiveness** and **dark mode support**.
- Maintain a **clean, emergency-response aesthetic** with clear color semantics.

## Request

Please help me transform this boilerplate into my actual application. **You MUST completely replace all existing boilerplate code** to match my project requirements. The current implementation is just temporary scaffolding that should be entirely removed and replaced.

## Final Reminder: COMPLETE REPLACEMENT REQUIRED

🚨 **IMPORTANT**: Do not preserve any of the existing boilerplate UI, components, or content. The user expects a completely fresh application that implements their requirements from scratch. Any remnants of the original boilerplate (like setup checklists, welcome screens, demo content, or placeholder navigation) indicate incomplete implementation.

**Success Criteria**: The final application should look and function as if it was built from scratch for the specific use case, with no evidence of the original boilerplate template.

## Post-Implementation Documentation

After completing the implementation, you MUST document any new features or significant changes in the `/docs/features/` directory:

1. **Create Feature Documentation**: For each major feature implemented, create a markdown file in `/docs/features/` that explains:

   - What the feature does
   - How it works
   - Key components and files involved
   - Usage examples
   - Any configuration or setup required

2. **Update Existing Documentation**: If you modify existing functionality, update the relevant documentation files to reflect the changes.

3. **Document Design Decisions**: Include any important architectural or design decisions made during implementation.

This documentation helps maintain the project and assists future developers working with the codebase.
