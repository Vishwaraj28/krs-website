"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { FlexBox } from "../layout/FlexBox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "@/store/thunk/logoutThunk";
import { AppDispatch } from "@/store/store";

type UserData = {
  name: string;
};

type Props = {
  userData: UserData;
};

export default function UnderReviewPage({ userData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/", { replace: true });
  };

  return (
    <FlexBox orientation="column" className="min-h-screen justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="flex justify-center">
          <FlexBox className="aspect-square size-16 justify-center rounded-xl bg-primary text-primary-foreground">
            <User className="size-8" />
          </FlexBox>
        </div>
        <h4>Account Under Review</h4>
        <Card>
          <FlexBox orientation="column" className="text-center gap-1">
            <CardTitle>{`Hello ${userData ?? "User"} !`}</CardTitle>
            <h5 className="mt-2">Your account is currently under review</h5>
          </FlexBox>

          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <h5>
                Thank you for registering! Our team is currently reviewing your
                account details. You'll receive an SMS notification once your
                account has been approved.
              </h5>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 size-4" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </FlexBox>
  );
}
