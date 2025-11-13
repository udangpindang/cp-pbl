import { db } from "@/lib/db";
import { observations } from "@/lib/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allObservations = await db
      .select()
      .from(observations)
      .orderBy(desc(observations.lastUpdated));

    return NextResponse.json(allObservations);
  } catch (error) {
    console.error("Error fetching observations:", error);
    return NextResponse.json(
      { error: "Failed to fetch observations" },
      { status: 500 }
    );
  }
}
