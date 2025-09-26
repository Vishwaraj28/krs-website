import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FamilyMemberForm from "@/components/blocks/family/FamilyMemberForm";

export default function AddFamilyMember() {
  const { user } = useSelector((state: RootState) => state.auth);
  return <FamilyMemberForm userID={user?.id!} mode="add" />;
}
