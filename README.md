Control Point Monitoring Web-app Serayu Bogowonto

**Objective:**

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
    - Top navigation bar (logo + title + optional theme toggle)
    - Two-column layout (map on left, data summary & table on right)
- Use **Lucide React** icons for clarity (e.g., map-pin, alert-circle, database).
- Ensure full **mobile responsiveness** and **dark mode support**.
- Maintain a **clean, emergency-response aesthetic** with clear color semantics.

---

### 🤖 **AI Integration**

- Integrate **Vercel AI SDK** to allow a simple natural-language query input:
    - Example: “Show all stations at warning level red or higher.”
- Output filtered results directly on the dashboard.

---

### 🚀 **Deployment**

- Deploy to **Vercel**.
- Include:
    - Environment variable setup for PostgreSQL connection.
    - Drizzle migrations for schema initialization and seeding.
    - Automatic data refresh using **Next.js revalidation**.

---

### 📋 **Summary of Pages**

| Page | Path | Purpose |
| --- | --- | --- |
| Dashboard | `/dashboard` | Show map, stats, and observation data |
| Update Form | `/update` | Update an observation record (ID, level, water level) |

---

**Objective:**

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
    - Top navigation bar (logo + title + optional theme toggle)
    - Two-column layout (map on left, data summary & table on right)
- Use **Lucide React** icons for clarity (e.g., map-pin, alert-circle, database).
- Ensure full **mobile responsiveness** and **dark mode support**.
- Maintain a **clean, emergency-response aesthetic** with clear color semantics.

---

### 🤖 **AI Integration**

- Integrate **Vercel AI SDK** to allow a simple natural-language query input:
    - Example: “Show all stations at warning level red or higher.”
- Output filtered results directly on the dashboard.

---

### 🚀 **Deployment**

- Deploy to **Vercel**.
- Include:
    - Environment variable setup for PostgreSQL connection.
    - Drizzle migrations for schema initialization and seeding.
    - Automatic data refresh using **Next.js revalidation**.
