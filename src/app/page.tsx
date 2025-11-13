import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Droplets, ArrowRight, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10">
                <Droplets className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Flood Warning System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and tracking of water levels across Cape Town observation stations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/update">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Update Status
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Interactive Map</h3>
                  <p className="text-sm text-muted-foreground">
                    View all observation stations on an interactive OpenStreetMap with color-coded warning levels
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/10">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Real-time Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor warning levels from Normal to Critical with instant updates and notifications
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10">
                    <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Water Level Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track water levels across multiple stations with detailed historical data
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warning Levels Info */}
          <Card className="mt-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Warning Levels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Normal</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Safe water levels</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700">
                  <div className="w-4 h-4 rounded-full bg-green-700" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">Advisory</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Monitor closely</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-200 dark:border-yellow-800">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <div>
                    <p className="font-semibold text-yellow-700 dark:text-yellow-300">Watch</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Elevated levels</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-300">Warning</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Take action</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
