import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

type ApproveUserPayload = {
  userID: string;
  area?: string;
};

type ApproveUserResponse = {
  message: string;
};

export function useApproveUser(): UseMutationResult<
  ApproveUserResponse,
  Error,
  ApproveUserPayload
> {
  const queryClient = useQueryClient();

  return useMutation<ApproveUserResponse, Error, ApproveUserPayload>({
    mutationFn: async ({ userID, area }) => {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      const approveUserFn = import.meta.env
        .VITE_SUPABASE_EDGE_FUNCTION_USER_APPROVAL!;
      const response = await fetch(approveUserFn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userID, area }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to approve user");
      }

      return result;
    },
    mutationKey: ["approveUser"],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["pending-users"] }),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ["pending-users"] }),
  });
}
