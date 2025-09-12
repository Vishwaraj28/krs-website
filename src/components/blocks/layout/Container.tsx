import React, { JSX } from "react";
import { cn } from "@/lib/utils";

// Container wrapper for consistent spacing
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows using 'section', 'article', etc.
  wide?: boolean; // Optional maxWidth control
}

export const Container = ({
  className,
  children,
  as: Component = "div", // Default to 'div', but can be any HTML element
  wide = false,
  ...props
}: ContainerProps) => {
  const maxWidthClass = "max-w-7xl w-full mx-auto";
  const sectionClass = Component == "section" && "my-4 py-10";
  return wide ? (
    <Component {...props} className={cn("w-full", sectionClass, className)}>
      <div className={cn(maxWidthClass, "main_wrapper")}>{children}</div>
    </Component>
  ) : (
    <Component
      {...props}
      className={cn(maxWidthClass, sectionClass, className)}
    >
      {children}
    </Component>
  );
};

export default Container;
