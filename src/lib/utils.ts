import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

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

/**
 * Export an HTML element as a PDF file
 * @param elementId - The ID of the HTML element to export
 * @param filename - The name of the PDF file (without extension)
 */
export async function exportToPDF(elementId: string, filename: string = "dashboard"): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  try {
    // Pre-compute all styles from the original elements before cloning
    // This is necessary because Tailwind CSS 4 uses modern color functions (oklch, lab, etc.)
    // that html2canvas doesn't support
    const originalElements = element.querySelectorAll("*");
    const styleMap = new Map<Element, { bg: string; color: string; border: string }>();

    originalElements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el as HTMLElement);
      styleMap.set(el, {
        bg: computedStyle.backgroundColor,
        color: computedStyle.color,
        border: computedStyle.borderColor,
      });
    });

    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        // Apply pre-computed RGB styles to cloned elements
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          const clonedElements = clonedElement.querySelectorAll("*");

          // Also handle the root element
          const rootStyle = window.getComputedStyle(element);
          clonedElement.style.backgroundColor = rootStyle.backgroundColor;
          clonedElement.style.color = rootStyle.color;
          clonedElement.style.borderColor = rootStyle.borderColor;

          // Handle all child elements
          clonedElements.forEach((clonedEl, index) => {
            const htmlEl = clonedEl as HTMLElement;
            const originalEl = originalElements[index];
            const styles = styleMap.get(originalEl);

            if (styles) {
              htmlEl.style.backgroundColor = styles.bg;
              htmlEl.style.color = styles.color;
              htmlEl.style.borderColor = styles.border;
            }
          });
        }
      },
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? "portrait" : "landscape",
      unit: "mm",
      format: "a4",
    });

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(`${filename}-${new Date().toISOString().split("T")[0]}.pdf`);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}
