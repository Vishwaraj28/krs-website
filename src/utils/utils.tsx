/**
 * Formats a given date string to "Month Day, Year" format (e.g., "January 8, 2023").
 *
 * @param {string} dateStr - The date string in YYYY-MM-DD format.
 * @returns {string} - The formatted date.
 * @throws {Error} - Throws an error if the date is invalid.
 */
export default function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toLocaleDateString("gu-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
