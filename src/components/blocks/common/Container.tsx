import { cn } from "@/lib/utils";
import React from "react";

// Container wrapper for consistent spacing
export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

interface FlexProps {
  children: React.ReactNode;
  firstColWidth?: string; // e.g., "20%"
  secondColWidth?: string; // e.g., "80%"
  className?: string;
}

export const Flex = ({ children, className }: FlexProps) => {
  return (
    <div className={cn("flex gap-4", className)}>
      {React.Children.map(children, (child) => (
        <div className="flex-[0_1_auto] [&>svg]:text-primary">{child}</div>
      ))}
    </div>
  );
};
