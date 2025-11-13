"use client";

import { useEffect, useState } from "react";
import { FloodMap, type Observation } from "@/components/flood-map";
import { SummaryStats } from "@/components/summary-stats";
import { ObservationsTable } from "@/components/observations-table";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchObservations = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("/api/observations");
      if (response.ok) {
        const data = await response.json();
        setObservations(data);
      }
    } catch (error) {
      console.error("Error fetching observations:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchObservations();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchObservations, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading flood data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Flood Warning System
              </h1>
            </div>
            <p className="text-muted-foreground">
              Real-time monitoring of water levels and flood warnings
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchObservations}
              disabled={refreshing}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button asChild size="sm">
              <Link href="/update">Update Status</Link>
            </Button>
          </div>
        </div>

        {/* Two-column layout: Map on left, Stats on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FloodMap observations={observations} />
          </div>
          <div>
            <SummaryStats observations={observations} />
          </div>
        </div>

        {/* Table below */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Observations</h2>
          <ObservationsTable observations={observations} />
        </div>
      </div>
    </div>
  );
}
