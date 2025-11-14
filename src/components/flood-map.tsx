"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import { formatDateTimeJakarta } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Define custom marker icons for each warning level
// Using dynamic import to avoid SSR issues
const getMarkerIcon = async (warningLevel: string) => {
  const L = (await import("leaflet")).default;

  let color = "#22c55e"; // Normal - Light Green

  switch (warningLevel) {
    case "Advisory":
      color = "#16a34a"; // Dark Green
      break;
    case "Watch":
      color = "#eab308"; // Yellow
      break;
    case "Warning":
      color = "#ef4444"; // Red
      break;
    default:
      color = "#22c55e"; // Normal - Light Green
  }

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export interface Observation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  warningLevel: string;
  waterLevel: number;
  weather: string;
  lastUpdated: string | Date;
}

interface FloodMapProps {
  observations: Observation[];
}

// Type for Leaflet DivIcon
type LeafletDivIcon = Awaited<ReturnType<typeof getMarkerIcon>>;

// Component to fit map bounds to all observation points
function FitBounds({ observations }: { observations: Observation[] }) {
  const map = useMap();

  useEffect(() => {
    if (observations.length > 0 && map) {
      // Create bounds from all observation points
      const bounds: [number, number][] = observations.map((obs) => [
        obs.latitude,
        obs.longitude,
      ]);

      // Fit the map to these bounds with some padding
      map.fitBounds(bounds, {
        padding: [50, 50], // Add padding around the edges
        maxZoom: 15, // Don't zoom in too close if there's only one point
      });
    }
  }, [observations, map]);

  return null;
}

export function FloodMap({ observations }: FloodMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [markerIcons, setMarkerIcons] = useState<Record<string, LeafletDivIcon>>({});

  useEffect(() => {
    setIsMounted(true);

    // Pre-load all marker icons
    const loadIcons = async () => {
      const warningLevels = ["Normal", "Advisory", "Watch", "Warning"];
      const icons: Record<string, LeafletDivIcon> = {};

      for (const level of warningLevels) {
        icons[level] = await getMarkerIcon(level);
      }

      setMarkerIcons(icons);
    };

    loadIcons();
  }, []);

  if (!isMounted || observations.length === 0 || Object.keys(markerIcons).length === 0) {
    return (
      <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  // Calculate center based on observations (used as initial center before fitBounds)
  const centerLat =
    observations.reduce((sum, obs) => sum + obs.latitude, 0) /
    observations.length;
  const centerLng =
    observations.reduce((sum, obs) => sum + obs.longitude, 0) /
    observations.length;

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds observations={observations} />
        {observations.map((obs) => (
          <Marker
            key={obs.id}
            position={[obs.latitude, obs.longitude]}
            icon={markerIcons[obs.warningLevel] || markerIcons["Normal"]}
          >
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-sm mb-1">{obs.name}</h3>
                <p className="text-xs">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      obs.warningLevel === "Warning"
                        ? "text-red-600"
                        : obs.warningLevel === "Watch"
                          ? "text-yellow-600"
                          : obs.warningLevel === "Advisory"
                            ? "text-green-700"
                            : "text-green-500"
                    }`}
                  >
                    {obs.warningLevel}
                  </span>
                </p>
                <p className="text-xs">
                  <strong>Water Level:</strong> {obs.waterLevel}m
                </p>
                <p className="text-xs">
                  <strong>Location:</strong> {obs.latitude.toFixed(4)},{" "}
                  {obs.longitude.toFixed(4)}
                </p>
                <p className="text-xs text-gray-500">
                  Last updated:{" "}
                  {formatDateTimeJakarta(obs.lastUpdated)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
