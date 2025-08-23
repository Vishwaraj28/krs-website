import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";

type UserAction = "approve" | "decline";

interface UserActionPayload {
  userID: string;
}

interface UserActionResponse {
  message: string;
  error?: string;
}

interface UseManageUserOptions {
  action: UserAction;
}

const actionConfig: Record<
  UserAction,
  {
    envKey: string;
    successMsg: string;
    errorMsg: string;
    mutationKey: string;
  }
> = {
  approve: {
    envKey: "VITE_SUPABASE_EDGE_FUNCTION_USER_APPROVAL",
    successMsg: "User approved successfully!",
    errorMsg: "Failed to approve. Please try again.",
    mutationKey: "approveUser",
  },
  decline: {
    envKey: "VITE_SUPABASE_EDGE_FUNCTION_USER_DECLINE",
    successMsg: "User removed successfully!",
    errorMsg: "Failed to remove. Please try again.",
    mutationKey: "declineUser",
  },
};

export function useManageUser({
  action,
}: UseManageUserOptions): UseMutationResult<
  UserActionResponse,
  Error,
  UserActionPayload
> {
  const queryClient = useQueryClient();
  const config = actionConfig[action];

  return useMutation<UserActionResponse, Error, UserActionPayload>({
    mutationFn: async ({ userID }) => {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      const edgeFn = import.meta.env[config.envKey] as string;

      const response = await fetch(edgeFn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || config.errorMsg);
      }

      return result;
    },
    mutationKey: [config.mutationKey],
    onSuccess: () => {
      toast.success(config.successMsg);
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
    onError: () => {
      toast.error(config.errorMsg);
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
  });
}
