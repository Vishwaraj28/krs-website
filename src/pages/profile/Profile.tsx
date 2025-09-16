import { SectionCard } from "@/components/blocks/profile/SectionCard";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RegisteredFieldKey, WithRequiredMarker } from "@/types/form-types";

type ProfileSections = {
  title: string;
  fields: WithRequiredMarker<RegisteredFieldKey>[];
  col: number;
};

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id: userID } = user || {};
  // Fetch profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("krs_user_profiles")
        .select("*")
        .eq("id", userID)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userID,
  });

  const profileSections: ProfileSections[] = [
    {
      title: "Personal Information",
      fields: [
        "firstName",
        "middleName",
        "lastName",
        "maritalStatus",
        "gender",
        "dob",
        "bloodGroup",
        "motherName",
        "fatherName",
        "phone",
        "area",
      ],
      col: 3,
    },
    {
      title: "Address Details",
      fields: ["currentAddress", "nativeAddress"],
      col: 2,
    },
    {
      title: "Mosal & Svasur Details",
      fields: ["mosalName", "svasurName", "mosalAddress", "svasurAddress"],
      col: 2,
    },
    {
      title: "Education & Profession",
      fields: [
        "qualification",
        "institution",
        "profession",
        "jobTitle",
        "employerName",
        "industry",
      ],
      col: 2,
    },
  ];

  // Total count across all sections:
  const total = profileSections.reduce((sum, s) => sum + s.fields.length, 0);

  // Done count:
  const done = profile
    ? profileSections
        .flatMap((s) => s.fields)
        .filter((f) => profile[f] !== null && profile[f] !== "").length
    : 0;

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      {/* Header */}
      <FlexBox
        className="justify-between mb-8 px-2"
        firstColWidth="80"
        secondColWidth="20"
      >
        <div>
          <h4 className="mb-2">Your Profile</h4>
          <p className="text-muted-foreground">
            Review and update your profile information
          </p>
        </div>
        <div>
          <Progress value={percent} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {done} of {total} complete
          </p>
        </div>
      </FlexBox>

      {/* Profile Card */}
      <Card className="mb-6 px-10 py-6">
        <FlexBox>
          <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-lg border-2 border-primary-light bg-muted/30">
            <img
              src={
                profile?.avatarUrl ||
                "/placeholder.svg?height=112&width=112&query=person%20avatar"
              }
              alt="Profile avatar"
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div>
            <h4 className="text-primary">
              {profile?.firstName || ""} {profile?.lastName || ""}
            </h4>
            <p className="text-muted-foreground">{profile?.email || "—"}</p>
          </div>
        </FlexBox>
      </Card>

      {profileSections.map((section) => (
        <SectionCard
          key={section.title}
          title={section.title}
          formFields={section.fields}
          profile={profile}
          loading={isLoading}
          fieldColumn={section.col}
        />
      ))}
    </>
  );
}
