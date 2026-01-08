import { SectionCard } from "@/components/blocks/profile/SectionCard";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RegisteredFieldKey, WithRequiredMarker } from "@/types/form-types";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import { PlusCircle } from "lucide-react";
import { profileProgress } from "@/utils/utils";
import profilePlaceholderImage from "@/assets/profile-placeholder.svg";
import { useImageFromBucket } from "@/hooks/useImageFromBucket";
import { useMemo } from "react";

export type ProfileSections = {
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

  const { uploadProfileImage, loading } = useProfileImageUpload(
    userID,
    profile?.profile_picture
  );

  const { data: imageUrl } = useImageFromBucket(
    "krs-user-profiles",
    profile?.profile_picture,
    {
      signed: true,
      expiresIn: 600, // optional
    }
  );

  const profileSections: ProfileSections[] = [
    {
      title: "Personal Information",
      fields: [
        "firstName*",
        "middleName",
        "lastName*",
        "gender",
        "dob",
        "bloodGroup",
        "maritalStatus",
        "motherName",
        "fatherName",
        "phone*",
        "area*",
      ],
      col: 3,
    },
    {
      title: "Address Details",
      fields: ["currentAddress", "nativeAddress"],
      col: 2,
    },
    {
      title: "Emergency Contact Details",
      fields: ["emergencyName*", "emergencyPhone*"],
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

  const { totalFields, completedFields, percenProfileCompleted } =
    useMemo(() => {
      return profileProgress(profile, profileSections);
    }, [profile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await uploadProfileImage(e.target.files[0]);
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
          <h4 className="mb-2">Your Profile</h4>
          <p className="text-muted-foreground">
            Review and update your profile information
          </p>
        </div>
        <div>
          <Progress value={percenProfileCompleted} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {completedFields} of {totalFields} complete
          </p>
        </div>
      </FlexBox>

      {/* Profile Card */}
      <Card className="mb-6 px-10 py-6">
        <FlexBox>
          <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-lg border-2 border-primary-light bg-muted/30">
            <img
              src={imageUrl || profilePlaceholderImage}
              alt="Profile Image"
              className="object-cover h-full w-full"
            />
            <div className="opacity-0 hover:opacity-100 transition">
              {/* Hidden file input */}
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden" // hides input
              />

              {/* Label acts as the button */}
              <label
                htmlFor="profileImageUpload"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 text-white"
              >
                <PlusCircle className="mr-2" size={32} />
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-primary">
              {profile?.firstName || ""} {profile?.lastName || ""}
            </h4>
            <p className="text-muted-foreground">{profile?.email || "—"}</p>
          </div>
        </FlexBox>
      </Card>

      {profileSections.map((section) => {
        const { title, fields, col } = section;
        return (
          <SectionCard
            key={title}
            title={title}
            formFields={fields}
            profile={profile}
            loading={isLoading}
            fieldColumn={col}
          />
        );
      })}
    </>
  );
}
