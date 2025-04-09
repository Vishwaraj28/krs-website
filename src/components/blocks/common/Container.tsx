import React, { JSX } from "react";
import { cn } from "@/lib/utils";

// Container wrapper for consistent spacing
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows using 'section', 'article', etc.
  padding?: boolean; // Optional padding control
  maxWidth?: string; // Optional maxWidth control
}

export const Container = ({
  className,
  children,
  as: Component = "div", // Default to 'div', but can be any HTML element
  padding = false, // Default to true (to apply padding)
  maxWidth = "7xl", // Default to max width '7xl'
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        `max-w-${maxWidth} w-full mx-auto ${
          padding ? "px-4 sm:px-6 lg:px-8" : ""
        }`,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
