import React, { JSX } from "react";
import { cn } from "@/lib/utils";

// Container wrapper for consistent spacing
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows using 'section', 'article', etc.
  wide?: boolean; // Optional maxWidth control
  style?: React.CSSProperties; // Optional inline styles
}

export const Container = ({
  className,
  children,
  style,
  as: Component = "div", // Default to 'div', but can be any HTML element
  wide = false,
}: ContainerProps) => {
  const maxWidthClass = "max-w-7xl w-full mx-auto";
  return wide ? (
    <Component style={style} className={cn("w-full", className)}>
      <div className={cn(maxWidthClass, "main_wrapper")}>{children}</div>
    </Component>
  ) : (
    <Component style={style} className={cn(maxWidthClass, className)}>
      {children}
    </Component>
  );
};

export default Container;
