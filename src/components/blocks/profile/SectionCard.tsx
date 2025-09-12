"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DynamicForm, DynamicFormHandle } from "../form/DynamicForm";
import {
  FormConfig,
  RegisteredFieldKey,
  WithRequiredMarker,
} from "@/types/form-types";
import { FlexBox } from "../layout/FlexBox";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sanitizeValues } from "@/utils/utils";
import { toast } from "sonner";

type SectionCardProps = {
  title: string;
  formFields: WithRequiredMarker<RegisteredFieldKey>[];
  className?: string;
  fieldColumn: number;
  profile: Record<string, any> | null;
  loading?: boolean;
};

export function SectionCard({
  title,
  formFields,
  className,
  fieldColumn = 1,
  profile,
  loading = false,
}: SectionCardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id: userID } = user || {};
  const formRef = React.useRef<DynamicFormHandle>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (profile && formRef.current) {
      const sectionValues = Object.fromEntries(
        formFields.map((f) => [f, profile[f] ?? ""])
      );
      formRef.current.reset(sectionValues);
    }
  }, [profile]);

  const onSubmitSuccess = async (data, methods) => {
    const dirtyKeys = Object.keys(methods.formState.dirtyFields);
    const updates = Object.fromEntries(
      dirtyKeys
        .filter((key) => data[key] !== null && data[key] !== undefined)
        .map((key) => [key, data[key]])
    );
    console.log("Updating profile with:", updates);
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from("krs_user_profiles")
        .update(updates)
        .eq("id", userID)
        .select();
      if (error) {
        toast.error(`Failed to update profile. Please try again.`);
      } else {
        toast.success("Profile updated successfully!");
        setEditing(false);
        methods.reset({ ...methods.getValues(), ...updates }); // sync form state
      }
    } else {
      setEditing(false);
    }
  };
  const onEdit = () => setEditing(true);
  const onCancel = () => {
    setEditing(false);
    if (profile) {
      formRef.current?.reset(sanitizeValues(profile)); // rollback to original profile
    }
  };

  return (
    <Card className={cn("mb-6 p-10", className)}>
      <FlexBox className="mb-1 justify-between">
        <h4 className="text-primary/75">{title}</h4>
        {!editing ? (
          <Button size="sm" onClick={onEdit}>
            Edit <Edit />
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
      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : (
        <DynamicForm
          ref={formRef}
          config={{
            id: title,
            fields: formFields,
            readOnly: !editing,
            onSubmitSuccess,
          }}
          col={fieldColumn}
        />
      )}
    </Card>
  );
}
