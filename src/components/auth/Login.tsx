import React, { useState } from "react";
import { DynamicForm } from "../blocks/form/DynamicForm";
import { FormConfig } from "@/types/form-types";
import { FlexBox } from "../blocks/common/FlexBox";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginThunk } from "@/store/thunk/loginThunk";
import { navThunk } from "@/store/thunk/navThunk";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const formConfig: FormConfig = {
    id: "login-form",
    fields: ["email", "password"],
    language: "en",
    submitButtonText: "Login",
    onSubmitSuccess: async (data) => {
      const result = await dispatch(loginThunk(data));

      if (loginThunk.rejected.match(result)) {
        setError(result.payload as string);
      } else {
        // const userId = result.payload.user.id;
        navigate("/dashboard");
        // // const navResult = await dispatch(navThunk(userId));

        // //set error wont work
        // if (navThunk.rejected.match(navResult)) {
        //   setError("Failed to load navigation items");
        //   return;
        // }
      }
    },
  };

  return (
    <FlexBox orientation="column" className={className} {...props}>
      <FlexBox orientation="column" className="gap-2 text-center">
        <h4 className="font-bold">Login to your account</h4>
        <p>Enter your email below to login to your account</p>
      </FlexBox>

      <div className="grid gap-6 w-full">
        <DynamicForm config={formConfig} />
      </div>

      {error && <p className="text-red-700 text-center">{error}</p>}

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate("/signup")}
          className="underline underline-offset-4 px-1"
        >
          Sign up
        </Button>
      </div>
    </FlexBox>
  );
}
