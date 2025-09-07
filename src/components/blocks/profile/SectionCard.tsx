import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DynamicForm, DynamicFormHandle } from "../form/DynamicForm";
import {
  FormConfig,
  RegisteredFieldKey,
  WithRequiredMarker,
} from "@/types/form-types";
import { FlexBox } from "../common/FlexBox";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type SectionCardProps = {
  title: string;
  formFields: WithRequiredMarker<RegisteredFieldKey>[];
  className?: string;
  fieldColumn?: number;
};

export function SectionCard({
  title,
  formFields,
  className,
  fieldColumn = 1,
}: SectionCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id: userID } = user || {};
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id, title],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("krs_user_profiles")
        .select(formFields.join(","))
        .eq("id", userID)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const formRef = React.useRef<DynamicFormHandle>(null);
  const [editing, setediting] = useState(false);
  useEffect(() => {
    if (profile && formRef.current) {
      formRef.current.reset(profile); // populate on load
    }
  }, [profile]);

  const formConfig: FormConfig = {
    id: title,
    fields: formFields,
    readOnly: !editing,
    onSubmitSuccess: async (data) => {
      console.log("Form submitted with data:", data);

      const { error } = await supabase
        .from("krs_user_profiles")
        .update(data)
        .eq("id", userID);

      if (error) {
        console.error("Failed to update profile:", error);
      } else {
        setediting(false);
      }
    },
  };

  const onCancel = async () => {
    if (profile && formRef.current) {
      formRef.current.reset(profile); // rollback values
    }
    setediting(false);
  };

  const onEdit = () => {
    setediting(true);
  };
  // console.log("Profile data:", profile);
  return (
    <Card className={cn("mb-6 px-10 py-6", className)}>
      <FlexBox className="mb-1 justify-between">
        <h4 className="text-primary/75">{title}</h4>
        {!editing ? (
          <Button size="sm" onClick={onEdit}>
            Edit
            <Edit />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => formRef.current?.submit()}>
              Save changes
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
      </FlexBox>
      <Separator className="bg-primary-light p-0.25 mb-2" />
      <DynamicForm ref={formRef} config={formConfig} col={fieldColumn} />
    </Card>
  );
}
