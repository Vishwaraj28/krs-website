import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

interface DeclineUserPayload {
  userID: string;
}

interface DeclineUserResponse {
  message: string;
  error?: string;
}

export function useDeclineUser(): UseMutationResult<
  DeclineUserResponse,
  Error,
  DeclineUserPayload
> {
  const queryClient = useQueryClient();
  return useMutation<DeclineUserResponse, Error, DeclineUserPayload>({
    mutationFn: async ({ userID }) => {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      const declineUserFn = import.meta.env
        .VITE_SUPABASE_EDGE_FUNCTION_USER_DECLINE!;
      const response = await fetch(declineUserFn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to decline user");
      }

      return result;
    },
    mutationKey: ["declineUser"],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["pending-users"] }),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ["pending-users"] }),
  });
}
