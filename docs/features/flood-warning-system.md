# Flood Warning System Dashboard

## Overview

The Flood Warning System is a real-time monitoring dashboard that tracks water levels and flood warnings across multiple observation stations in the Cape Town area. The system provides an interactive map interface, real-time statistics, and the ability to update observation data.

## Features

### 1. Interactive Map (`/dashboard`)

The dashboard displays an interactive OpenStreetMap with color-coded markers representing observation stations.

**Location**: `src/components/flood-map.tsx`

**Key Functionality**:
- Displays 10 observation stations across Cape Town
- Color-coded markers based on warning level:
  - 🟢 Light Green - Normal
  - 🟩 Dark Green - Advisory
  - 🟡 Yellow - Watch
  - 🔴 Red - Warning
- Interactive popups showing detailed station information
- Auto-centers map based on observation locations

**Technical Details**:
- Uses `react-leaflet` for map integration
- Dynamically imported to avoid SSR issues
- Custom marker icons with inline styles for color coding
- Responsive design with fixed height

### 2. Summary Statistics Panel

Displays real-time statistics of observation points grouped by warning level.

**Location**: `src/components/summary-stats.tsx`

**Key Functionality**:
- Count of observations per warning level
- Color-coded stat cards matching warning levels
- Last update timestamp
- Dark mode support

**Design**:
- Uses shadcn/ui Card components
- Lucide React icons for visual clarity
- Responsive grid layout
- Emergency-response aesthetic with clear color semantics

### 3. Observation Data Table

A sortable, searchable table displaying all observation data.

**Location**: `src/components/observations-table.tsx`

**Key Functionality**:
- Search by observation name or warning level
- Sortable columns (click column headers)
- Color-coded warning level badges
- Responsive design for mobile devices

**Technical Details**:
- Uses shadcn/ui Table components
- Client-side filtering and sorting with React state
- useMemo hook for performance optimization
- Real-time search updates

### 4. Update Form (`/update`)

A form interface for updating observation station data.

**Location**: `src/app/update/page.tsx`

**Key Functionality**:
- Select observation station from dropdown
- View current status before updating
- Update warning level (4 levels available)
- Update water level (numeric input)
- Form validation
- Success/error notifications

**Technical Details**:
- Uses shadcn/ui Form components (Select, Input, Label)
- Sonner toast notifications for feedback
- PATCH request to API endpoint
- Auto-redirect to dashboard after successful update

## Database Schema

**Table**: `observations`

**Location**: `src/lib/schema.ts`

```typescript
{
  id: serial (primary key)
  name: varchar(100) - Station name
  latitude: real - GPS latitude
  longitude: real - GPS longitude
  warningLevel: varchar(20) - Current warning level
  waterLevel: real - Water level in meters
  lastUpdated: timestamp - Last update time (auto-generated)
}
```

## API Endpoints

### GET `/api/observations`

Fetches all observation data ordered by last updated (most recent first).

**Location**: `src/app/api/observations/route.ts`

**Response**: Array of observation objects

### PATCH `/api/observations/[id]`

Updates a specific observation's warning level and water level.

**Location**: `src/app/api/observations/[id]/route.ts`

**Request Body**:
```json
{
  "warningLevel": "Warning",
  "waterLevel": 8.5
}
```

**Response**: Updated observation object

## Seeding the Database

**Script**: `scripts/seed.ts`

**Command**: `pnpm run db:seed`

**Functionality**:
- Clears existing observation data
- Inserts 10 dummy observation stations
- Uses realistic Cape Town coordinates
- Randomized warning levels and water levels

**Stations**:
- Station A - Berg River
- Station B - Liesbeek River
- Station C - Salt River
- Station D - Kuils River
- Station E - Eerste River
- Station F - Diep River
- Station G - Black River
- Station H - Silvermine River
- Station I - Sand River
- Station J - Lotus River

## Page Routes

### Landing Page (`/`)

**Location**: `src/app/page.tsx`

A clean landing page introducing the flood warning system with:
- Hero section with call-to-action buttons
- Feature cards explaining key functionality
- Warning level reference guide
- Fully responsive design
- Dark mode support

### Dashboard (`/dashboard`)

**Location**: `src/app/dashboard/page.tsx`

Main monitoring interface with:
- Interactive map (left/top on mobile)
- Statistics panel (right/bottom on mobile)
- Full observation table below
- Auto-refresh every 30 seconds
- Manual refresh button
- Link to update page

### Update Page (`/update`)

**Location**: `src/app/update/page.tsx`

Form interface for updating observation data:
- Station selection dropdown
- Current status display
- Warning level selection (color-coded)
- Water level input (numeric)
- Submit and cancel buttons
- Toast notifications

## Styling & Design

### Color Scheme

The system uses a color-coded warning system:

- **Normal**: Light Green (`#22c55e`, `bg-green-500`)
- **Advisory**: Dark Green (`#16a34a`, `bg-green-700`)
- **Watch**: Yellow (`#eab308`, `bg-yellow-500`)
- **Warning**: Red (`#ef4444`, `bg-red-500`)

### Design Principles

1. **Emergency Response Aesthetic**: Clear, bold colors and typography
2. **Accessibility**: High contrast, semantic color meanings
3. **Responsive**: Mobile-first design that scales to desktop
4. **Dark Mode**: Full support via next-themes
5. **shadcn/ui**: Consistent component design system

## Dependencies

### Core Dependencies

- `leaflet` - OpenStreetMap library
- `react-leaflet` - React wrapper for Leaflet
- `@types/leaflet` - TypeScript definitions
- `sonner` - Toast notifications
- `@radix-ui/react-select` - Dropdown components
- `@radix-ui/react-label` - Form labels

### shadcn/ui Components Used

- Button
- Card
- Table
- Input
- Select
- Label
- Badge
- Separator
- Sonner (Toast)

## Configuration

### Layout Changes

**File**: `src/app/layout.tsx`

Changes made:
- Removed `SiteHeader` (no top navigation as per requirements)
- Removed `SiteFooter`
- Added `Toaster` component for notifications
- Updated metadata for flood warning system

### Environment Variables Required

```env
POSTGRES_URL=postgresql://user:password@localhost:5432/database
```

No authentication variables required for this implementation.

## Getting Started

1. **Set up database**:
   ```bash
   pnpm run db:generate
   pnpm run db:migrate
   pnpm run db:seed
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Access the application**:
   - Landing page: `http://localhost:3000`
   - Dashboard: `http://localhost:3000/dashboard`
   - Update form: `http://localhost:3000/update`

## Future Enhancements

Potential improvements for the system:

1. **Real-time Updates**: WebSocket integration for live data updates
2. **Historical Data**: Charts showing water level trends over time
3. **Alert Notifications**: Email/SMS alerts for warning level changes
4. **User Authentication**: Role-based access for updating data
5. **Data Export**: CSV/PDF export functionality
6. **Mobile App**: Native mobile application
7. **Multiple Regions**: Support for observation stations in different areas
8. **Weather Integration**: Integrate weather data and forecasts
9. **Predictive Analytics**: ML models for flood prediction
10. **Public API**: REST API for third-party integrations

## Architecture Decisions

### Why React Leaflet?

- Open-source mapping solution (no API keys required)
- Highly customizable markers and popups
- Good performance with moderate number of markers
- Active community and documentation

### Why Client-Side Components?

- Interactive features require client-side state
- Real-time updates and auto-refresh
- Form handling and validation
- Better user experience with instant feedback

### Why No Authentication?

Per project requirements, this is a monitoring dashboard that doesn't require user authentication. In a production environment, authentication should be added for the update functionality.

### Database Design

The observations table is intentionally simple:
- Single table design for quick queries
- Real data type for coordinates (sufficient precision)
- Timestamp auto-updates for tracking changes
- Serial ID for simple primary key

## Troubleshooting

### Map Not Displaying

If the map doesn't load:
1. Check browser console for errors
2. Ensure `leaflet/dist/leaflet.css` is imported
3. Verify dynamic imports are working (Next.js SSR issue)

### Database Connection Issues

If database operations fail:
1. Verify `POSTGRES_URL` in `.env.local`
2. Ensure PostgreSQL is running
3. Check database permissions
4. Run migrations: `pnpm run db:migrate`

### Seed Script Fails

If seeding fails:
1. Ensure database is migrated
2. Check database connection
3. Verify no conflicts with existing data

## File Structure Summary

```
src/
├── app/
│   ├── api/
│   │   └── observations/
│   │       ├── route.ts (GET all observations)
│   │       └── [id]/route.ts (PATCH observation)
│   ├── dashboard/page.tsx (Main dashboard)
│   ├── update/page.tsx (Update form)
│   ├── page.tsx (Landing page)
│   └── layout.tsx (Root layout)
├── components/
│   ├── flood-map.tsx (Interactive map)
│   ├── summary-stats.tsx (Statistics panel)
│   ├── observations-table.tsx (Data table)
│   └── ui/ (shadcn/ui components)
├── lib/
│   ├── schema.ts (Database schema)
│   └── db.ts (Database connection)
└── scripts/
    └── seed.ts (Database seeding)
```

## Support

For issues or questions:
1. Check this documentation
2. Review component source code
3. Check browser console for errors
4. Verify database and environment variables
