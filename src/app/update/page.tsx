"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { formatDateTimeJakarta } from "@/lib/utils";
import type { Observation } from "@/components/flood-map";

const WARNING_LEVELS = [
  { value: "Normal", label: "Normal", color: "bg-green-500" },
  { value: "Advisory", label: "Advisory", color: "bg-green-700" },
  { value: "Watch", label: "Watch", color: "bg-yellow-500" },
  { value: "Warning", label: "Warning", color: "bg-red-500" },
];

export default function UpdatePage() {
  const router = useRouter();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedId, setSelectedId] = useState<string>("");
  const [warningLevel, setWarningLevel] = useState<string>("");
  const [waterLevel, setWaterLevel] = useState<string>("");

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await fetch("/api/observations");
        if (response.ok) {
          const data = await response.json();
          setObservations(data);
        }
      } catch (error) {
        console.error("Error fetching observations:", error);
        toast.error("Failed to load observations");
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedId || !warningLevel || !waterLevel) {
      toast.error("Please fill in all fields");
      return;
    }

    const waterLevelNum = parseFloat(waterLevel);
    if (isNaN(waterLevelNum) || waterLevelNum < 0) {
      toast.error("Please enter a valid water level (positive number)");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/observations/${selectedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warningLevel,
          waterLevel: waterLevelNum,
        }),
      });

      if (response.ok) {
        toast.success("Observation updated successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update observation");
      }
    } catch (error) {
      console.error("Error updating observation:", error);
      toast.error("An error occurred while updating");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedObservation = observations.find(
    (obs) => obs.id.toString() === selectedId
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Update Observation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Observation Selection */}
              <div className="space-y-2">
                <Label htmlFor="observation">Observation Station</Label>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger id="observation">
                    <SelectValue placeholder="Select an observation station" />
                  </SelectTrigger>
                  <SelectContent>
                    {observations.map((obs) => (
                      <SelectItem key={obs.id} value={obs.id.toString()}>
                        {obs.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Status Display */}
              {selectedObservation && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h3 className="font-semibold">Current Status</h3>
                  <p className="text-sm">
                    <strong>Warning Level:</strong>{" "}
                    {selectedObservation.warningLevel}
                  </p>
                  <p className="text-sm">
                    <strong>Water Level:</strong> {selectedObservation.waterLevel}m
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last updated:{" "}
                    {formatDateTimeJakarta(selectedObservation.lastUpdated)}
                  </p>
                </div>
              )}

              {/* Warning Level Selection */}
              <div className="space-y-2">
                <Label htmlFor="warning-level">New Warning Level</Label>
                <Select value={warningLevel} onValueChange={setWarningLevel}>
                  <SelectTrigger id="warning-level">
                    <SelectValue placeholder="Select warning level" />
                  </SelectTrigger>
                  <SelectContent>
                    {WARNING_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${level.color}`}
                          />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Water Level Input */}
              <div className="space-y-2">
                <Label htmlFor="water-level">New Water Level (meters)</Label>
                <Input
                  id="water-level"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter water level"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the current water level in meters (e.g., 5.2)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={submitting || !selectedId || !warningLevel || !waterLevel}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {submitting ? "Updating..." : "Update Status"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
