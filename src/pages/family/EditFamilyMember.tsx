import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import FamilyMemberForm from "@/components/blocks/family/FamilyMemberForm";

export default function EditFamilyMember() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["familyMember", memberId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("krs_family_member")
        .select("*")
        .eq("id", memberId)
        .single();
      if (error) {
        navigate("/family", { replace: true });
        throw error;
      }
      return data;
    },
    enabled: !!memberId,
  });

  if (isLoading) return <p>Loading member info...</p>;

  return (
    <FamilyMemberForm
      userID={user?.id!}
      mode="edit"
      memberId={memberId}
      initialData={data}
    />
  );
}
