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
import { Outlet } from "react-router";
import { FlexBox } from "../common/FlexBox";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import UnderReviewPage from "../auth/UnderReview";

export default function ShellLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

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
    return <UnderReviewPage userData={userMetaData?.fullName} />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <FlexBox as="header" className="h-16 shrink-0 gap-2 border-b">
            <FlexBox className="gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <HeaderBreadcrumb />
            </FlexBox>
          </FlexBox>
          <main>
            <div className="right_container min-h-screen min-w-0 z-3 relative px-4">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
