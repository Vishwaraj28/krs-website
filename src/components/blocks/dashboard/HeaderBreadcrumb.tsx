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

function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-4 w-24" />
      <div className="text-muted-foreground">/</div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export default function HeaderBreadcrumb() {
  const {
    // navMain: navigationData,
    loading: navigationLoading,
    error: navigationError,
  } = useSelector((state: RootState) => state.navigation);

  return (
    <>
      <Breadcrumb>
        {navigationLoading || navigationError ? (
          <BreadcrumbSkeleton />
        ) : (
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
        )}
      </Breadcrumb>
    </>
  );
}
