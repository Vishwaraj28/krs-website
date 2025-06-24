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
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexBox } from "../blocks/common/FlexBox";

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
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
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
              {navigationData.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            // isActive={item.isActive}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => navigate(item.url)}
                            >
                              {item.title}
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
