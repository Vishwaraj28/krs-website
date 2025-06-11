/**
 * Formats a given date string to "Month Day, Year" format (e.g., "January 8, 2023").
 *
 * @param {string} dateStr - The date string in YYYY-MM-DD format.
 * @returns {string} - The formatted date.
 * @throws {Error} - Throws an error if the date is invalid.
 */
export function formatDate(dateStr: string): string {
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

export const sortByDate = (
  news: any[] | undefined,
  direction?: "latestFirst" | "oldestFirst"
): any[] => {
  if (!news) {
    return []; // If news is undefined, return an empty array
  }

  if (!Array.isArray(news)) return [];

  return [...news].sort((a, b) => {
    const dateA = new Date(a?.date ?? 0).getTime();
    const dateB = new Date(b?.date ?? 0).getTime();

    return direction === "latestFirst" ? dateB - dateA : dateA - dateB;
  });
};

export function isValidValue(value: unknown): boolean {
  return (
    value !== null &&
    value !== undefined &&
    value !== "null" &&
    value !== "undefined"
  );
}
