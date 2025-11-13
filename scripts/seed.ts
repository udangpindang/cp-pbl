import { db } from "../src/lib/db";
import { observations } from "../src/lib/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing observations
    await db.delete(observations);

    // Create timestamp for 07:00 UTC+7 (Jakarta time)
    const today = new Date();
    const lastUpdated = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0);

    // Insert 25 dummy observation points
    // Using coordinates across Indonesia
    const dummyData = [
      {
        name: "Station A - Ciliwung River, Jakarta",
        latitude: -6.2088,
        longitude: 106.8456,
        warningLevel: "Normal",
        waterLevel: 2.1,
        lastUpdated,
      },
      {
        name: "Station B - Citarum River, Bandung",
        latitude: -6.9175,
        longitude: 107.6191,
        warningLevel: "Normal",
        waterLevel: 2.3,
        lastUpdated,
      },
      {
        name: "Station C - Brantas River, Surabaya",
        latitude: -7.2575,
        longitude: 112.7521,
        warningLevel: "Normal",
        waterLevel: 2.5,
        lastUpdated,
      },
      {
        name: "Station D - Musi River, Palembang",
        latitude: -2.9760,
        longitude: 104.7754,
        warningLevel: "Normal",
        waterLevel: 2.8,
        lastUpdated,
      },
      {
        name: "Station E - Deli River, Medan",
        latitude: 3.5952,
        longitude: 98.6722,
        warningLevel: "Normal",
        waterLevel: 1.9,
        lastUpdated,
      },
      {
        name: "Station F - Garang River, Semarang",
        latitude: -6.9932,
        longitude: 110.4203,
        warningLevel: "Normal",
        waterLevel: 2.2,
        lastUpdated,
      },
      {
        name: "Station G - Jeneberang River, Makassar",
        latitude: -5.1477,
        longitude: 119.4327,
        warningLevel: "Normal",
        waterLevel: 2.4,
        lastUpdated,
      },
      {
        name: "Station H - Mahakam River, Samarinda",
        latitude: -0.4949,
        longitude: 117.1436,
        warningLevel: "Normal",
        waterLevel: 3.1,
        lastUpdated,
      },
      {
        name: "Station I - Kapuas River, Pontianak",
        latitude: -0.0263,
        longitude: 109.3425,
        warningLevel: "Normal",
        waterLevel: 3.5,
        lastUpdated,
      },
      {
        name: "Station J - Cisadane River, Tangerang",
        latitude: -6.1781,
        longitude: 106.6319,
        warningLevel: "Normal",
        waterLevel: 2.0,
        lastUpdated,
      },
      {
        name: "Station K - Serayu River, Banjarnegara",
        latitude: -7.3706,
        longitude: 109.6844,
        warningLevel: "Normal",
        waterLevel: 2.6,
        lastUpdated,
      },
      {
        name: "Station L - Bengawan Solo River, Solo",
        latitude: -7.5756,
        longitude: 110.8243,
        warningLevel: "Normal",
        waterLevel: 2.9,
        lastUpdated,
      },
      {
        name: "Station M - Kampar River, Pekanbaru",
        latitude: 0.5071,
        longitude: 101.4478,
        warningLevel: "Normal",
        waterLevel: 2.7,
        lastUpdated,
      },
      {
        name: "Station N - Progo River, Yogyakarta",
        latitude: -7.7956,
        longitude: 110.3695,
        warningLevel: "Normal",
        waterLevel: 2.3,
        lastUpdated,
      },
      {
        name: "Station O - Widas River, Madiun",
        latitude: -7.6298,
        longitude: 111.5239,
        warningLevel: "Normal",
        waterLevel: 2.1,
        lastUpdated,
      },
      {
        name: "Station P - Batanghari River, Jambi",
        latitude: -1.6101,
        longitude: 103.6131,
        warningLevel: "Normal",
        waterLevel: 3.0,
        lastUpdated,
      },
      {
        name: "Station Q - Pesanggrahan River, Jakarta Selatan",
        latitude: -6.2615,
        longitude: 106.7829,
        warningLevel: "Normal",
        waterLevel: 1.8,
        lastUpdated,
      },
      {
        name: "Station R - Barito River, Banjarmasin",
        latitude: -3.3194,
        longitude: 114.5906,
        warningLevel: "Normal",
        waterLevel: 3.3,
        lastUpdated,
      },
      {
        name: "Station S - Asahan River, Tanjung Balai",
        latitude: 2.9667,
        longitude: 99.8000,
        warningLevel: "Normal",
        waterLevel: 2.4,
        lastUpdated,
      },
      {
        name: "Station T - Banjaran River, Banyumas",
        latitude: -7.5200,
        longitude: 109.2900,
        warningLevel: "Normal",
        waterLevel: 2.2,
        lastUpdated,
      },
      {
        name: "Station U - Siak River, Riau",
        latitude: 0.8894,
        longitude: 101.6806,
        warningLevel: "Normal",
        waterLevel: 2.8,
        lastUpdated,
      },
      {
        name: "Station V - Kali Mas River, Surabaya Utara",
        latitude: -7.2104,
        longitude: 112.7688,
        warningLevel: "Normal",
        waterLevel: 2.3,
        lastUpdated,
      },
      {
        name: "Station W - Cimanuk River, Indramayu",
        latitude: -6.4867,
        longitude: 108.3200,
        warningLevel: "Normal",
        waterLevel: 2.1,
        lastUpdated,
      },
      {
        name: "Station X - Rokan River, Rokan Hulu",
        latitude: 1.1333,
        longitude: 100.4667,
        warningLevel: "Normal",
        waterLevel: 2.6,
        lastUpdated,
      },
      {
        name: "Station Y - Pemali River, Brebes",
        latitude: -6.8750,
        longitude: 109.0403,
        warningLevel: "Normal",
        waterLevel: 2.0,
        lastUpdated,
      },
    ];

    await db.insert(observations).values(dummyData);

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Inserted ${dummyData.length} observation points in Indonesia`);
    console.log(`⏰ All stations set to Normal status, last updated: ${lastUpdated.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }

  process.exit(0);
}

seed();
