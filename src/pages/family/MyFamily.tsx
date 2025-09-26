import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { supabase } from "@/utils/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { PlusSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { FamilyMemberCard } from "@/components/blocks/family/FamilyMemberCard";
import { FamilyMember } from "@/types/form-types";
import { MasonryGrid } from "@/components/blocks/layout/MasonryGrid";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function MyFamily() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id: userID } = user || {};
  const navigate = useNavigate();

  // Fetch family members
  const {
    data: familyMembers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<FamilyMember[]>({
    queryKey: ["familyMember", userID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("krs_family_member")
        .select("*")
        .eq("user_id", userID)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as FamilyMember[];
    },
    enabled: !!userID,
  });

  const handleEdit = (member: FamilyMember) => {
    navigate(`${member.id}/edit`);
  };

  const handleDelete = async (member: FamilyMember) => {
    const { error } = await supabase
      .from("krs_family_member")
      .delete()
      .eq("id", member.id);

    if (!error) {
      toast.success("Member Deleted Successfully.");
      refetch();
    } else {
      toast.error("Failed to remove Family member, Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <FlexBox
        className="justify-between mb-8 px-2"
        firstColWidth="80"
        secondColWidth="20"
      >
        <div>
          <h4 className="mb-2">My Family</h4>
          <p className="text-muted-foreground">
            Add and manage your family members.
          </p>
        </div>
        <FlexBox className="justify-end">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {isLoading
                ? "Loading..."
                : `${familyMembers.length} Members Added`}
            </Badge>
          </div>
          <Button
            type="button"
            size="lg"
            onClick={() => navigate("/family/add")}
          >
            <PlusSquare className="h-12 w-12" />
            Add Member
          </Button>
        </FlexBox>
      </FlexBox>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* {Array.from({ length: 3 }).map((_, idx) => (
            <UserApprovalCardSkeleton key={idx} />
          ))} */}
        </div>
      )}
      {isError && (
        <p>Oops..!! We are facing some issue. Please try again later.</p>
      )}

      {!isLoading && !isError && (
        <MasonryGrid columns={3} gap={20}>
          {familyMembers.length === 0 ? (
            <FlexBox
              orientation="column"
              className="col-span-full py-12 text-center"
            >
              <PlusSquare className="h-12 w-12 text-primary mb-4" />
              <h3>Add Family Member</h3>
              <p className="text-muted-foreground">
                No Family Member Added at the moment.
              </p>
            </FlexBox>
          ) : (
            familyMembers.map((member) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                onEdit={() => handleEdit(member)}
                onDelete={() => handleDelete(member)}
              />
            ))
          )}
        </MasonryGrid>
      )}
    </>
  );
}
