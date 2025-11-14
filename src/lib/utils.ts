import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jsPDF } from "jspdf"
import type { Observation } from "@/components/flood-map"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The timezone used throughout the application
 * UTC+7 Jakarta (Asia/Jakarta)
 */
export const APP_TIMEZONE = "Asia/Jakarta";

/**
 * Format a date to Jakarta timezone (UTC+7)
 * @param date - Date to format (Date object, string, or number)
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @returns Formatted date string in Jakarta timezone
 */
export function formatDateJakarta(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: APP_TIMEZONE,
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(dateObj);
}

/**
 * Format a date to Jakarta timezone with full date and time
 * Example: "1/13/2025, 2:30 PM"
 */
export function formatDateTimeJakarta(date: Date | string | number): string {
  return formatDateJakarta(date, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

/**
 * Format a date to Jakarta timezone with only date
 * Example: "1/13/2025"
 */
export function formatDateOnlyJakarta(date: Date | string | number): string {
  return formatDateJakarta(date, {
    dateStyle: "short",
    timeStyle: undefined,
  });
}

/**
 * Format a date to Jakarta timezone with full format
 * Example: "January 13, 2025 at 2:30:00 PM"
 */
export function formatDateTimeLongJakarta(date: Date | string | number): string {
  return formatDateJakarta(date, {
    dateStyle: "long",
    timeStyle: "medium",
  });
}

// RGB color palette for PDF (no LAB/oklch colors)
const PDF_COLORS = {
  // Primary colors
  primary: [33, 33, 36] as [number, number, number], // Dark gray
  primaryLight: [100, 100, 110] as [number, number, number],

  // Warning level colors
  normal: [34, 197, 94] as [number, number, number], // Green
  advisory: [22, 163, 74] as [number, number, number], // Dark green
  watch: [234, 179, 8] as [number, number, number], // Yellow
  warning: [239, 68, 68] as [number, number, number], // Red

  // UI colors
  background: [255, 255, 255] as [number, number, number], // White
  border: [229, 231, 235] as [number, number, number], // Light gray
  text: [31, 41, 55] as [number, number, number], // Dark gray
  textMuted: [107, 114, 128] as [number, number, number], // Medium gray

  // Table colors
  tableHeader: [249, 250, 251] as [number, number, number], // Very light gray
  tableRowEven: [255, 255, 255] as [number, number, number], // White
  tableRowOdd: [249, 250, 251] as [number, number, number], // Very light gray
};

/**
 * Get RGB color for warning level
 */
function getWarningLevelColor(warningLevel: string): [number, number, number] {
  switch (warningLevel) {
    case "Advisory":
      return PDF_COLORS.advisory;
    case "Watch":
      return PDF_COLORS.watch;
    case "Warning":
      return PDF_COLORS.warning;
    default:
      return PDF_COLORS.normal;
  }
}

/**
 * Export flood observations as a custom PDF template
 * Uses only RGB colors to avoid LAB/oklch color issues
 * @param observations - Array of flood observations
 * @param filename - The name of the PDF file (without extension)
 */
export async function exportToPDF(
  observations: Observation[],
  filename: string = "flood-warning-dashboard"
): Promise<void> {
  try {
    // Create PDF in portrait A4
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const usableWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // === HEADER SECTION ===
    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...PDF_COLORS.primary);
    pdf.text("Flood Warning System", margin, yPosition);
    yPosition += 8;

    // Subtitle
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...PDF_COLORS.textMuted);
    pdf.text("Real-time monitoring of water levels and flood warnings", margin, yPosition);
    yPosition += 5;

    // Generated timestamp
    const timestamp = formatDateTimeLongJakarta(new Date());
    pdf.text(`Generated: ${timestamp}`, margin, yPosition);
    yPosition += 10;

    // Divider line
    pdf.setDrawColor(...PDF_COLORS.border);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // === SUMMARY STATISTICS SECTION ===
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...PDF_COLORS.primary);
    pdf.text("Summary Statistics", margin, yPosition);
    yPosition += 8;

    // Calculate statistics
    const stats = {
      total: observations.length,
      normal: observations.filter((o) => o.warningLevel === "Normal").length,
      advisory: observations.filter((o) => o.warningLevel === "Advisory").length,
      watch: observations.filter((o) => o.warningLevel === "Watch").length,
      warning: observations.filter((o) => o.warningLevel === "Warning").length,
    };

    // Draw statistics boxes
    const boxWidth = (usableWidth - 10) / 3;
    const boxHeight = 20;
    let boxX = margin;

    // Total Locations box
    pdf.setFillColor(...PDF_COLORS.tableHeader);
    pdf.rect(boxX, yPosition, boxWidth, boxHeight, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...PDF_COLORS.primary);
    pdf.text(stats.total.toString(), boxX + boxWidth / 2, yPosition + 10, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...PDF_COLORS.textMuted);
    pdf.text("Total Locations", boxX + boxWidth / 2, yPosition + 16, { align: "center" });

    boxX += boxWidth + 5;

    // Warnings box
    pdf.setFillColor(...PDF_COLORS.tableHeader);
    pdf.rect(boxX, yPosition, boxWidth, boxHeight, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...PDF_COLORS.warning);
    pdf.text(stats.warning.toString(), boxX + boxWidth / 2, yPosition + 10, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...PDF_COLORS.textMuted);
    pdf.text("Warnings", boxX + boxWidth / 2, yPosition + 16, { align: "center" });

    boxX += boxWidth + 5;

    // Watch box
    pdf.setFillColor(...PDF_COLORS.tableHeader);
    pdf.rect(boxX, yPosition, boxWidth, boxHeight, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...PDF_COLORS.watch);
    pdf.text(stats.watch.toString(), boxX + boxWidth / 2, yPosition + 10, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...PDF_COLORS.textMuted);
    pdf.text("Watch", boxX + boxWidth / 2, yPosition + 16, { align: "center" });

    yPosition += boxHeight + 15;

    // === OBSERVATIONS TABLE SECTION ===
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...PDF_COLORS.primary);
    pdf.text("All Observations", margin, yPosition);
    yPosition += 8;

    // Table configuration
    const rowHeight = 10;
    const colWidths = {
      location: usableWidth * 0.3,
      level: usableWidth * 0.15,
      water: usableWidth * 0.15,
      weather: usableWidth * 0.2,
      updated: usableWidth * 0.2,
    };

    // Table header
    pdf.setFillColor(...PDF_COLORS.tableHeader);
    pdf.rect(margin, yPosition, usableWidth, rowHeight, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...PDF_COLORS.text);

    let colX = margin + 2;
    pdf.text("Location", colX, yPosition + 6);
    colX += colWidths.location;
    pdf.text("Level", colX, yPosition + 6);
    colX += colWidths.level;
    pdf.text("Water (m)", colX, yPosition + 6);
    colX += colWidths.water;
    pdf.text("Weather", colX, yPosition + 6);
    colX += colWidths.weather;
    pdf.text("Updated", colX, yPosition + 6);

    yPosition += rowHeight;

    // Table rows
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    observations.forEach((obs, index) => {
      // Check if we need a new page
      if (yPosition + rowHeight > pageHeight - margin - 15) {
        pdf.addPage();
        yPosition = margin;

        // Redraw table header on new page
        pdf.setFillColor(...PDF_COLORS.tableHeader);
        pdf.rect(margin, yPosition, usableWidth, rowHeight, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(...PDF_COLORS.text);

        colX = margin + 2;
        pdf.text("Location", colX, yPosition + 6);
        colX += colWidths.location;
        pdf.text("Level", colX, yPosition + 6);
        colX += colWidths.level;
        pdf.text("Water (m)", colX, yPosition + 6);
        colX += colWidths.water;
        pdf.text("Weather", colX, yPosition + 6);
        colX += colWidths.weather;
        pdf.text("Updated", colX, yPosition + 6);

        yPosition += rowHeight;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
      }

      // Alternate row background
      if (index % 2 === 0) {
        pdf.setFillColor(...PDF_COLORS.tableRowEven);
      } else {
        pdf.setFillColor(...PDF_COLORS.tableRowOdd);
      }
      pdf.rect(margin, yPosition, usableWidth, rowHeight, "F");

      // Row border
      pdf.setDrawColor(...PDF_COLORS.border);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);

      // Row data
      pdf.setTextColor(...PDF_COLORS.text);
      colX = margin + 2;

      // Location (truncate if too long)
      const locationText = obs.name.length > 25 ? obs.name.substring(0, 22) + "..." : obs.name;
      pdf.text(locationText, colX, yPosition + 6);
      colX += colWidths.location;

      // Warning Level (with color)
      pdf.setTextColor(...getWarningLevelColor(obs.warningLevel));
      pdf.text(obs.warningLevel, colX, yPosition + 6);
      pdf.setTextColor(...PDF_COLORS.text);
      colX += colWidths.level;

      // Water Level
      pdf.text(obs.waterLevel.toFixed(2), colX, yPosition + 6);
      colX += colWidths.water;

      // Weather
      const weatherText = obs.weather.length > 15 ? obs.weather.substring(0, 12) + "..." : obs.weather;
      pdf.text(weatherText, colX, yPosition + 6);
      colX += colWidths.weather;

      // Last Updated
      const updatedText = formatDateTimeJakarta(obs.lastUpdated);
      pdf.text(updatedText, colX, yPosition + 6);

      yPosition += rowHeight;
    });

    // Final border for table
    pdf.setDrawColor(...PDF_COLORS.border);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);

    // === FOOTER ON ALL PAGES ===
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Footer line
      pdf.setDrawColor(...PDF_COLORS.border);
      pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

      // Footer text
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...PDF_COLORS.textMuted);
      pdf.text(
        `Page ${i} of ${totalPages} | Generated by Flood Warning System`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      );
    }

    // Save PDF
    pdf.save(`${filename}-${new Date().toISOString().split("T")[0]}.pdf`);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}
