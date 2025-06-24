import { AppSidebar } from "@/components/dashboard/AppSideBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user?.role) {
      dispatch(navThunk(user.id));
    }
  }, [user?.role, dispatch]);

  return (
    <>
      <aside>
        {isAuthenticated ? <p>Welcome, {user?.email}</p> : <p>Please log in</p>}
      </aside>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-primary">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary">
                      Data Fetching
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-background">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-secondary" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="flex flex-wrap gap-4 p-4">
                <div className="w-24 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                  Primary
                </div>
                <div className="w-24 h-12 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center">
                  Secondary
                </div>
                <div className="w-24 h-12 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
                  Muted
                </div>
                <div className="w-24 h-12 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                  Accent
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
