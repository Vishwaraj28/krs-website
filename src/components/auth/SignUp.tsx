import type React from "react";
import { Button } from "@/components/ui/button";
import { FormConfig } from "@/types/form-types";
import { DynamicForm } from "../blocks/form/DynamicForm";
import { FlexBox } from "../blocks/common/FlexBox";
import { useNavigate } from "react-router";
import { handlePendingSignup } from "@/lib/handle-submission";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();

  const formConfig: FormConfig = {
    id: "login-form",
    fields: ["fullName", "email", "password", "area"],
    language: "en", // Explicitly set English language
    submitButtonText: "Create Account",
    onSubmitSuccess: (data) => handlePendingSignup(data),
  };

  return (
    <FlexBox orientation="column" className={className} {...props}>
      <FlexBox orientation="column" className="gap-2 text-center">
        <h4 className="font-bold">Create an account</h4>
        <p>Enter your information below to create your account</p>
      </FlexBox>
      <div className="grid gap-6 w-full">
        <DynamicForm config={formConfig} />
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate("/login")}
          className="underline underline-offset-4 px-1"
        >
          Login
        </Button>
      </div>
    </FlexBox>
  );
}
