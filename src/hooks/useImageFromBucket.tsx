import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

/**
 * Fetches a public image URL from a Supabase Storage bucket
 * @param bucket - name of the Supabase storage bucket
 * @param path - full path to the image inside the bucket (e.g., "events/myimage.jpg")
 * @param options - optional settings like `enabled` to control when the query runs
 */
export const useImageFromBucket = (
  bucket: string,
  path: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["image-url", bucket, path],
    queryFn: async () => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);

      if (!data?.publicUrl) {
        throw new Error("Public URL could not be generated.");
      }

      return data.publicUrl;
    },
    enabled: options?.enabled ?? (!!bucket && !!path),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
