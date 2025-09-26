import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { RegisteredFieldKey, WithRequiredMarker } from "@/types/form-types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DynamicForm,
  DynamicFormHandle,
} from "@/components/blocks/form/DynamicForm";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusSquare, Undo2, Save } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { sanitizeValues } from "@/utils/utils";

export type ProfileSections = {
  title: string;
  fields: WithRequiredMarker<RegisteredFieldKey>[];
  col: number;
};

interface FamilyMemberFormProps {
  userID: string;
  mode: "add" | "edit";
  initialData?: Record<string, any>;
  memberId?: string; // for edit
}

export default function FamilyMemberForm({
  userID,
  mode,
  initialData = {},
  memberId,
}: FamilyMemberFormProps) {
  const navigate = useNavigate();

  const profileSections: ProfileSections[] = [
    {
      title: "Personal Information",
      fields: [
        "firstName*",
        "middleName*",
        "lastName*",
        "gender*",
        "dob*",
        "bloodGroup*",
        "maritalStatus*",
        "phone",
        "relation*",
      ],
      col: 3,
    },
    {
      title: "Mosal & Svasur Details",
      fields: ["mosalName*", "svasurName", "mosalAddress*", "svasurAddress"],
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

  const formRefs = profileSections.map(() => useRef<DynamicFormHandle>(null));

  useEffect(() => {
    for (const ref of formRefs) {
      if (ref.current) {
        ref.current.reset(initialData);
      }
    }
  }, [initialData]);

  const handleSubmitAll = async () => {
    let allValid = true;
    const collectedData: Record<string, any> = {};

    for (const ref of formRefs) {
      const isValid = await ref.current?.trigger();
      if (!isValid) {
        allValid = false;
      }
    }

    if (!allValid) {
      toast.error(
        "Please fix validation errors in all sections before submitting."
      );
      return;
    }

    for (const ref of formRefs) {
      const values = ref.current?.getValues() || {};
      Object.assign(collectedData, values);
    }

    collectedData.user_id = userID;

    try {
      if (mode === "add") {
        const { error } = await supabase
          .from("krs_family_member")
          .insert([sanitizeValues(collectedData)]);

        if (error) throw error;
        toast.success("Family member added successfully!");
      } else {
        // Edit mode: update record
        const { error } = await supabase
          .from("krs_family_member")
          .update(sanitizeValues(collectedData))
          .eq("id", memberId);

        if (error) throw error;
        toast.success("Family member updated successfully!");
      }

      navigate("/family");
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <FlexBox
        className="justify-between mb-8 px-2"
        firstColWidth="80"
        secondColWidth="20"
      >
        <div>
          <h4 className="mb-2">
            {mode === "add" ? "Add Family Member" : "Edit Family Member"}
          </h4>
          <p className="text-muted-foreground">
            {mode === "add"
              ? "Fill in the details to add a new family member to your profile."
              : "Update the details of this family member."}
          </p>
        </div>
        <FlexBox className="justify-end gap-2">
          <Button type="button" size="lg" onClick={handleSubmitAll}>
            {mode === "add" ? (
              <>
                <PlusSquare className="h-12 w-12" />
                Add Member
              </>
            ) : (
              <>
                <Save className="h-12 w-12" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            variant="outline"
            type="button"
            size="lg"
            onClick={() => navigate("/family")}
          >
            <Undo2 className="h-12 w-12" />
            Back to Manage Family
          </Button>
        </FlexBox>
      </FlexBox>

      {profileSections.map(({ title, fields, col }, idx) => (
        <Card key={title} className="mb-6 p-10">
          <h4 className="text-primary/75">{title}</h4>
          <Separator className="bg-primary-light p-0.25 mb-2" />
          <DynamicForm
            ref={formRefs[idx]}
            config={{
              id: title,
              fields,
              //   defaultValues: initialData, // pre-fill values in edit mode
            }}
            col={col}
          />
        </Card>
      ))}
    </>
  );
}
