import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function useProfileImageUpload(
  userID?: string,
  currentImagePath?: string
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  async function uploadProfileImage(file: File) {
    if (!userID) {
      setError("No user ID");
      return;
    }

    setLoading(true);
    toast.loading("Uploading profile picture...");
    setError(null);
    setSuccess(false);

    try {
      // Generate unique name
      const ext = file.name.split(".").pop();
      const uniqueName = `${userID}-${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const filePath = `users/${uniqueName}`;

      // Upload to private bucket
      const { error: uploadError } = await supabase.storage
        .from("krs-user-profiles")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        toast.dismiss();
        toast.error(`Failed to upload: ${uploadError.message}`);
        throw uploadError;
      }

      // Update DB record
      const { error: updateError } = await supabase
        .from("krs_user_profiles")
        .update({ profile_picture: filePath })
        .eq("id", userID);

      if (updateError) {
        toast.dismiss();
        toast.error(`Failed to update profile. Please try again.`);
        throw updateError;
      }

      if (currentImagePath && currentImagePath !== filePath) {
        const { error: deleteError } = await supabase.storage
          .from("krs-user-profiles")
          .remove([currentImagePath]);

        if (deleteError) {
          console.warn("Failed to delete old image:", deleteError);
        }
      }

      toast.dismiss();
      setSuccess(true);
      toast.success("Profile picture updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile", userID] });

      return filePath; // return the path for caller if needed
    } catch (err: any) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.error("Profile upload failed:", err);
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return { uploadProfileImage, loading, error, success };
}
