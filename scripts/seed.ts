import { db } from "../src/lib/db";
import { observations } from "../src/lib/schema";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing observations
    await db.delete(observations);

    // Insert 10 dummy observation points
    // Using coordinates around Cape Town, South Africa area
    const dummyData = [
      {
        name: "Station A - Berg River",
        latitude: -33.7128,
        longitude: 18.9964,
        warningLevel: "Warning",
        waterLevel: 8.5,
      },
      {
        name: "Station B - Liesbeek River",
        latitude: -33.9456,
        longitude: 18.4653,
        warningLevel: "Watch",
        waterLevel: 6.2,
      },
      {
        name: "Station C - Salt River",
        latitude: -33.9249,
        longitude: 18.4687,
        warningLevel: "Normal",
        waterLevel: 2.1,
      },
      {
        name: "Station D - Kuils River",
        latitude: -33.9721,
        longitude: 18.6892,
        warningLevel: "Advisory",
        waterLevel: 4.3,
      },
      {
        name: "Station E - Eerste River",
        latitude: -34.0082,
        longitude: 18.7308,
        warningLevel: "Watch",
        waterLevel: 6.8,
      },
      {
        name: "Station F - Diep River",
        latitude: -34.0292,
        longitude: 18.4456,
        warningLevel: "Normal",
        waterLevel: 2.8,
      },
      {
        name: "Station G - Black River",
        latitude: -33.9806,
        longitude: 18.4736,
        warningLevel: "Advisory",
        waterLevel: 4.9,
      },
      {
        name: "Station H - Silvermine River",
        latitude: -34.0975,
        longitude: 18.4339,
        warningLevel: "Watch",
        waterLevel: 7.1,
      },
      {
        name: "Station I - Sand River",
        latitude: -33.8889,
        longitude: 18.6167,
        warningLevel: "Warning",
        waterLevel: 9.2,
      },
      {
        name: "Station J - Lotus River",
        latitude: -34.0125,
        longitude: 18.5236,
        warningLevel: "Normal",
        waterLevel: 3.4,
      },
    ];

    await db.insert(observations).values(dummyData);

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Inserted ${dummyData.length} observation points`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }

  process.exit(0);
}

seed();
