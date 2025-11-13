"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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

import L from "leaflet";

// Define custom marker icons for each warning level
const getMarkerIcon = (warningLevel: string) => {
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
  lastUpdated: string | Date;
}

interface FloodMapProps {
  observations: Observation[];
}

export function FloodMap({ observations }: FloodMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || observations.length === 0) {
    return (
      <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  // Calculate center based on observations
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
        {observations.map((obs) => (
          <Marker
            key={obs.id}
            position={[obs.latitude, obs.longitude]}
            icon={getMarkerIcon(obs.warningLevel)}
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
                  {new Date(obs.lastUpdated).toLocaleString("en-ZA", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
