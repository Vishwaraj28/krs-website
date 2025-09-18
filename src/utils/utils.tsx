/**
 * Formats a given date string to "Month Day, Year" format (e.g., "January 8, 2023").
 *
 * @param {string} dateStr - The date string in YYYY-MM-DD format.
 * @returns {string} - The formatted date.
 * @throws {Error} - Throws an error if the date is invalid.
 */
import { ProfileSections } from "@/pages/profile/Profile";
import { SelectOption } from "@/types/form-types";
import { supabase } from "@/utils/supabaseClient";

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

export async function getAreas(): Promise<SelectOption[]> {
  try {
    // Step 1: Check localStorage
    const stored = localStorage.getItem("areas");
    if (stored) {
      return JSON.parse(stored);
    }

    // Step 2: Fetch from Supabase (always all columns)
    const { data: areas, error } = await supabase.from("krs_area").select("*");

    if (error) throw new Error(error.message);

    // Step 4: Store in localStorage
    localStorage.setItem("areas", JSON.stringify(areas));

    return areas;
  } catch (err) {
    console.error("Error fetching areas:", err);
    return [];
  }
}

export function sanitizeValues(
  values: Record<string, any>
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value ?? ""])
  );
}

export function profileProgress(
  profile: any,
  profileSections: ProfileSections[]
) {
  // Total count across all sections:
  const totalFields = profileSections.reduce(
    (sum, s) => sum + s.fields.length,
    0
  );

  // Done count:
  const completedFields = profile
    ? profileSections
        .flatMap((s) => s.fields)
        .filter((f) => profile[f] !== null && profile[f] !== "").length
    : 0;

  const percenProfileCompleted =
    totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  return { totalFields, completedFields, percenProfileCompleted };
}
