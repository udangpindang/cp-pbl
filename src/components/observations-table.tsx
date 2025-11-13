"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { formatDateTimeJakarta } from "@/lib/utils";
import type { Observation } from "./flood-map";

interface ObservationsTableProps {
  observations: Observation[];
}

export function ObservationsTable({ observations }: ObservationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Observation | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredAndSorted = useMemo(() => {
    const result = observations.filter(
      (obs) =>
        obs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obs.warningLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [observations, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: keyof Observation) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getWarningBadgeVariant = (level: string) => {
    switch (level) {
      case "Warning":
        return "destructive";
      case "Watch":
        return "default";
      case "Advisory":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getWarningBadgeClass = (level: string) => {
    switch (level) {
      case "Warning":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "Watch":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "Advisory":
        return "bg-green-700 hover:bg-green-800 text-white";
      default:
        return "bg-green-500 hover:bg-green-600 text-white";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or warning level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("name")}
              >
                Observation Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("warningLevel")}
              >
                Warning Level{" "}
                {sortColumn === "warningLevel" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("waterLevel")}
              >
                Water Level (m){" "}
                {sortColumn === "waterLevel" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("lastUpdated")}
              >
                Last Updated{" "}
                {sortColumn === "lastUpdated" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No observations found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSorted.map((obs) => (
                <TableRow key={obs.id}>
                  <TableCell className="font-medium">{obs.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {obs.latitude.toFixed(4)}, {obs.longitude.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getWarningBadgeVariant(obs.warningLevel)}
                      className={getWarningBadgeClass(obs.warningLevel)}
                    >
                      {obs.warningLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{obs.waterLevel.toFixed(1)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTimeJakarta(obs.lastUpdated)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
