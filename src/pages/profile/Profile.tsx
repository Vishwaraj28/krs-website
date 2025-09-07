import { SectionCard } from "@/components/blocks/profile/SectionCard";
import { FlexBox } from "@/components/blocks/common/FlexBox";

export default function Profile() {
  return (
    <div className="bg-primary-light/55 p-8">
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
        {/* <div>
          <Progress value={stats.percent} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {stats.done} of {stats.total} complete
          </p>
        </div> */}
      </FlexBox>

      {/* Profile Card */}
      {/* <Card className="mb-6 px-10 py-6">
        <FlexBox>
          <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-lg border-2 border-primary-light bg-muted/30">
            <img
              src={
                profile.avatarUrl ||
                "/placeholder.svg?height=112&width=112&query=person%20avatar"
              }
              alt="Profile avatar"
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div>
            <h4 className="text-primary">
              {profile.firstName || ""} {profile.lastName || ""}
            </h4>
            <p className="text-muted-foreground">{profile.email || "—"}</p>
          </div>
        </FlexBox>
      </Card> */}

      {/* Personal Information */}
      <SectionCard
        title="Personal Information"
        formFields={[
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
        ]}
        fieldColumn={3}
      />

      {/* Address Details */}
      <SectionCard
        title="Address Details"
        formFields={["currentAddress", "nativeAddress"]}
        fieldColumn={2}
      />

      {/* Other Details */}
      <SectionCard
        title="Mosal & Svasur Details"
        formFields={[
          "mosalName",
          "svasurName",
          "mosalAddress",
          "svasurAddress",
        ]}
        fieldColumn={2}
      />
      <SectionCard
        title="Education & Profession"
        formFields={[
          "qualification",
          "institution",
          "profession",
          "jobTitle",
          "employerName",
          "industry",
        ]}
        fieldColumn={2}
      />
    </div>
  );
}
