import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import { CheckCircle, Clock } from "lucide-react";
import {
  UserApprovalCard,
  UserApprovalCardSkeleton,
} from "@/components/blocks/cards/UserApprovalCard";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { Badge } from "@/components/ui/badge";

type PendingUser = {
  id: string;
  firstname: string;
  lastname: string;
  created_at: string;
  area: { en: string; gu?: string };
  email: string;
};

const fetchPendingUsers = async (): Promise<PendingUser[]> => {
  const { data, error } = await supabase.rpc("get_pending_users");
  if (error) throw error;
  return data;
};

const NewUserApproval = () => {
  const {
    data: pendingUsers = [],
    isLoading,
    isError,
  } = useQuery<PendingUser[]>({
    queryKey: ["pending-users"],
    queryFn: fetchPendingUsers,
  });

  return (
    <>
      <FlexBox className="justify-between mb-8">
        <div>
          <h4 className="mb-2">User Approvals</h4>
          <p className="text-muted-foreground">
            Review and approve pending user registrations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-primary" />
          <Badge variant="outline">
            {isLoading ? "Loading..." : `${pendingUsers.length} Pending`}
          </Badge>
        </div>
      </FlexBox>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <UserApprovalCardSkeleton key={idx} />
          ))}
        </div>
      )}
      {isError && (
        <p>Oops..!! We are facing some issue. Please try again later.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingUsers.length === 0 ? (
            <FlexBox
              orientation="column"
              className="col-span-full py-12 text-center"
            >
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3>All caught up!</h3>
              <p className="text-muted-foreground">
                No pending user approvals at the moment.
              </p>
            </FlexBox>
          ) : (
            pendingUsers.map((pendingUser) => (
              <UserApprovalCard key={pendingUser.id} {...pendingUser} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default NewUserApproval;
