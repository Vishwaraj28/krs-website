import type React from "react";
import { Button } from "@/components/ui/button";
import { FormConfig } from "@/types/form-types";
import { DynamicForm } from "@/components/blocks/form/DynamicForm";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { useNavigate } from "react-router";
import { signupThunk } from "@/store/thunk/signupThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "@/store/store";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const formConfig: FormConfig = {
    id: "Signup-form",
    fields: [
      "firstName*",
      "lastName*",
      "email*",
      "password*",
      "phone*",
      "area*",
    ],
    language: "en", // Explicitly set English language
    submitButtonText: "Create Account",
    submitButtonClassName: "w-full mt-2",
    onSubmitSuccess: async (data) => {
      const result = await dispatch(signupThunk(data));
      if (signupThunk.rejected.match(result)) {
        setError(result.payload as string);
      } else {
        navigate("/dashboard");
      }
    },
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

      {error && <p className="text-red-700 text-center">{error}</p>}

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
