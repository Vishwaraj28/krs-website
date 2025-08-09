import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexBox } from "../common/FlexBox";
import { useLocation } from "react-router";

function BreadcrumbSkeleton() {
  return (
    <FlexBox className="space-x-2">
      <Skeleton className="h-4 w-24" />
      <div className="text-muted-foreground">/</div>
      <Skeleton className="h-4 w-20" />
    </FlexBox>
  );
}

export default function HeaderBreadcrumb() {
  const {
    navMain: navigationData,
    loading: navigationLoading,
    error: navigationError,
  } = useSelector((state: RootState) => state.navigation);

  const location = useLocation();
  const currentPath = location.pathname;

  // Find the active group (section) based on current URL
  const activeItemGroup = navigationData?.find((group) =>
    group.items.some((item) => item.url === currentPath)
  );

  // Find the active item inside the group
  const activeItem =
    activeItemGroup?.items.find((item) => item.url === currentPath) ?? null;

  // Fallback to first active item if direct match not found
  const fallbackItem =
    activeItemGroup?.items.find((item) => item.isActive) ?? null;

  const SectionTitle = activeItemGroup?.title ?? "Section";
  const PageTitle = activeItem?.title ?? fallbackItem?.title ?? "Page";

  return (
    <Breadcrumb>
      {navigationLoading || navigationError ? (
        <BreadcrumbSkeleton />
      ) : (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-primary">
              {SectionTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {PageTitle}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}