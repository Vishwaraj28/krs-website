import type * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexBox } from "@/components/blocks/layout/FlexBox";

function SidebarSkeleton() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon={false} />
            <SidebarMenuSub>
              {Array.from({ length: Math.floor(Math.random() * 4) + 2 }).map(
                (_, subIndex) => (
                  <SidebarMenuSubItem key={subIndex}>
                    <FlexBox className="space-x-2 px-2 py-1">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </FlexBox>
                  </SidebarMenuSubItem>
                )
              )}
            </SidebarMenuSub>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    navMain: navigationData,
    loading: navigationLoading,
    error: navigationError,
  } = useSelector((state: RootState) => state.navigation);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="hover:bg-primary/10">
                <FlexBox className="aspect-square size-8 justify-center rounded-lg bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </FlexBox>
                <span className="font-semibold">KRS Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationLoading ? (
          <SidebarSkeleton />
        ) : navigationError ? (
          <div className="rounded-xl bg-accent p-7 mx-4 my-5">
            Oops..! We are cuurently facing issue while fetching Data
          </div>
        ) : (
          <SidebarGroup>
            <SidebarMenu>
              {navigationData.map((navGroup) => (
                <SidebarMenuItem key={navGroup.title}>
                  <SidebarMenuButton asChild>
                    <span className="font-medium">{navGroup.title}</span>
                  </SidebarMenuButton>
                  {navGroup.items?.length ? (
                    <SidebarMenuSub>
                      {navGroup.items
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((navItem, index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton
                              asChild
                              current={pathname == navItem.url}
                              isActive={navItem.isActive}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => navigate(navItem.url)}
                              >
                                {navItem.title}
                              </Button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
