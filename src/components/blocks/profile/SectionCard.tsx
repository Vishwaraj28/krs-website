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
import React, { useState } from "react";

type SectionCardProps = {
  title: string;
  formFields: WithRequiredMarker<RegisteredFieldKey>[];
  className?: string;
  fieldColumn?: Number;
};

export function SectionCard({
  title,
  formFields,
  className,
  fieldColumn = 1,
}: SectionCardProps) {
  const formRef = React.useRef<DynamicFormHandle>(null);
  const [editing, setediting] = useState(false);
  const formConfig: FormConfig = {
    id: title,
    fields: formFields,
    readOnly: !editing,
    onSubmitSuccess: async (data) => {
      console.log("Form submitted with data:", data);
      setediting(false);
      // const result = await dispatch(signupThunk(data));
      // if (signupThunk.rejected.match(result)) {
      //   setError(result.payload as string);
      // } else {
      //   navigate("/dashboard");
      // }
    },
  };
  const onEdit = () => {
    setediting(true);
  };

  const onCancel = async () => {
    setediting(false);
  };

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
