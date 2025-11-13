import { db } from "@/lib/db";
import { observations } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { warningLevel, waterLevel } = body;

    if (!warningLevel || waterLevel === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: warningLevel and waterLevel" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(observations)
      .set({
        warningLevel,
        waterLevel,
        lastUpdated: new Date(),
      })
      .where(eq(observations.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Observation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating observation:", error);
    return NextResponse.json(
      { error: "Failed to update observation" },
      { status: 500 }
    );
  }
}
