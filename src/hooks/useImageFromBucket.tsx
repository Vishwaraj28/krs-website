import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

interface UseImageOptions {
  enabled?: boolean;
  signed?: boolean; // if true, generate a signed URL for private buckets
  expiresIn?: number; // expiration for signed URL (seconds)
}

/**
 * Fetches a public or signed image URL from a Supabase Storage bucket
 * @param bucket - name of the Supabase storage bucket
 * @param path - full path to the image inside the bucket (e.g., "users/abc.jpg")
 * @param options - optional settings like `enabled`, `signed` (private bucket), and `expiresIn`
 */
export const useImageFromBucket = (
  bucket: string,
  path: string,
  options?: UseImageOptions
) => {
  return useQuery({
    queryKey: ["image-url", bucket, path, options?.signed],
    queryFn: async () => {
      if (!bucket || !path) return null;

      if (options?.signed) {
        // Private bucket — create signed URL
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(path, options.expiresIn ?? 60 * 10); // default 10 min

        if (error || !data?.signedUrl) {
          throw new Error(error?.message || "Could not create signed URL");
        }

        return data.signedUrl;
      } else {
        // Public bucket — get public URL
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);

        if (!data?.publicUrl) {
          throw new Error("Public URL could not be generated.");
        }

        return data.publicUrl;
      }
    },
    enabled: options?.enabled ?? (!!bucket && !!path),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
