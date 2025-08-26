import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Mail, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexBox } from "@/components/blocks/common/FlexBox";
import { useManageUser } from "@/hooks/useManageUser";

export interface UserApprovalCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  firstname: string;
  lastname: string;
  created_at: string;
  area: { en: string; gu?: string };
  email: string;
}

export const UserApprovalCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="px-0">
        <FlexBox className="justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-16" />
        </FlexBox>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FlexBox>
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </FlexBox>
          <FlexBox>
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </FlexBox>
          <FlexBox>
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </FlexBox>
        </div>
      </CardContent>
    </Card>
  );
};

export const UserApprovalCard = ({
  id: userID,
  firstname,
  lastname,
  created_at,
  area,
  email,
  ...props
}: UserApprovalCardProps) => {
  const approveUser = useManageUser({ action: "approve" });
  const declineUser = useManageUser({ action: "decline" });

  return (
    <Card {...props} className="hover:shadow-md transition-shadow gap-3">
      <CardHeader className="px-0">
        <FlexBox className="justify-between">
          <div>
            <CardTitle className="text-lg text-primary mb-1">
              {`${firstname} ${lastname}`}
            </CardTitle>
            <CardDescription>
              Registered on {new Date(created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        </FlexBox>
      </CardHeader>
      <CardContent className="gap-0">
        <Badge variant="ghost">
          <Mail />
          <span>{email}</span>
        </Badge>
        <Badge variant="ghost">
          <MapPin />
          <span>{area?.en}</span>
        </Badge>
      </CardContent>
      <CardFooter className="px-0">
        <FlexBox>
          <Button
            onClick={() => approveUser.mutate({ userID })}
            disabled={approveUser.status === "pending"}
            size="sm"
          >
            <CheckCircle />
            {approveUser.status === "pending" ? "Approving..." : "Approve"}
          </Button>
          <Button
            onClick={() => declineUser.mutate({ userID })}
            disabled={declineUser.status === "pending"}
            variant="outline"
            size="sm"
          >
            <XCircle />
            {declineUser.status === "pending" ? "Declining..." : "Decline"}
          </Button>
        </FlexBox>
      </CardFooter>
    </Card>
  );
};
