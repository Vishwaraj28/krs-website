import { AppSidebar } from "@/components/blocks/dashboard/AppSideBar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { navThunk } from "@/store/thunk/navThunk";
import { Outlet, useNavigate } from "react-router";
import { FlexBox } from "../layout/FlexBox";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import UnderReviewPage from "../auth/UnderReview";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutThunk } from "@/store/thunk/logoutThunk";

export default function ShellLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    role: userRole,
    id: userID,
    user_metadata: userMetaData,
  } = user || {};

  useEffect(() => {
    if (userRole && userID) {
      dispatch(navThunk());
    }
  }, [userRole, userID, dispatch]);

  const isApproved = userMetaData?.is_approved === true;

  if (!isApproved) {
    return <UnderReviewPage userData={userMetaData?.firstName} />;
  }

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/", { replace: true });
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <FlexBox as="header" className="gap-2 border-b p-6">
            <FlexBox className="gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="text-black bg-black mr-2 h-4"
              />
              <HeaderBreadcrumb />
            </FlexBox>
            <FlexBox className="gap-2 px-3 justify-end">
              <p className="text-primary text-xl mr-4">
                Welcome, {userMetaData?.firstName || "User"}
              </p>
              <Button onClick={() => handleLogout()} size="sm">
                <LogOut className="mr-0.5 h-4 w-4" />
                Logout
              </Button>
            </FlexBox>
          </FlexBox>
          <main>
            <div className="min-h-screen min-w-0 z-3 relative bg-primary-light/55 p-8">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
        <Toaster richColors position="top-right" />
      </SidebarProvider>
    </>
  );
}
