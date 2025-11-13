import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
