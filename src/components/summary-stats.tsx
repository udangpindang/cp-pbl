import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { formatDateJakarta } from "@/lib/utils";
import type { Observation } from "./flood-map";

interface SummaryStatsProps {
  observations: Observation[];
}

export function SummaryStats({ observations }: SummaryStatsProps) {
  const stats = observations.reduce(
    (acc, obs) => {
      acc[obs.warningLevel] = (acc[obs.warningLevel] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const normal = stats["Normal"] || 0;
  const advisory = stats["Advisory"] || 0;
  const watch = stats["Watch"] || 0;
  const warning = stats["Warning"] || 0;

  const lastUpdate = observations.length > 0
    ? new Date(
        Math.max(...observations.map((o) => new Date(o.lastUpdated).getTime()))
      )
    : new Date();

  const statCards = [
    {
      title: "Normal",
      count: normal,
      icon: Info,
      bgColor: "bg-green-50 dark:bg-green-950/30",
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Advisory",
      count: advisory,
      icon: AlertCircle,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-300",
      borderColor: "border-green-300 dark:border-green-700",
    },
    {
      title: "Watch",
      count: watch,
      icon: AlertTriangle,
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      textColor: "text-yellow-600 dark:text-yellow-400",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      title: "Warning",
      count: warning,
      icon: XCircle,
      bgColor: "bg-red-50 dark:bg-red-950/30",
      textColor: "text-red-600 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-800",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Last updated: {formatDateJakarta(lastUpdate, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`${stat.bgColor} ${stat.borderColor} border-2`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${stat.textColor}`}>
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.textColor}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.count}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.count === 1 ? "observation" : "observations"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
