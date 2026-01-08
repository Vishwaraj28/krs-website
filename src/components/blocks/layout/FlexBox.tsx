import React, { ReactNode, ReactElement, JSX } from "react";
import { cn } from "@/lib/utils";

// Define the types for props
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  firstColWidth?: string;
  secondColWidth?: string;
  className?: string;
  orientation?: "row" | "column"; // Add orientation prop
  as?: keyof JSX.IntrinsicElements; // Allows using 'section', 'article', etc.
  rotational?: boolean; // Add rotational prop
}

type ChildrenProps = {
  readonly style: React.CSSProperties;
};

export const FlexBox = ({
  children,
  firstColWidth: first,
  secondColWidth: second,
  className,
  orientation = "row", // Default to row
  as: Component = "div",
  rotational = false, // Default to false
  ...props
}: FlexProps) => {
  const childrenArray = React.Children.toArray(children);

  const getChildStyles = (index: number) => {
    if (orientation === "row") {
      if (first && second) {
        if (index === 0) {
          return { flex: `0 1 ${first}%` };
        } else if (index === 1) {
          return { flex: `0 1 ${second}%` };
        }
      }

      if (first && !second) {
        if (index === 0) {
          return { flex: `0 1 ${first}%` };
        } else {
          return { flex: "1 1 auto" };
        }
      }

      if (childrenArray.length > 3) {
        return { flex: "1 1 auto" };
      }

      return { flex: "0 1 auto" };
    }
    // For column orientation, let items stack naturally
    return {};
  };

  return (
    <Component
      className={cn(
        "flex gap-3 sm:gap-4 w-full items-center",
        orientation === "column" ? "flex-col" : "flex-row",
        rotational
          ? `md:${orientation === "column" ? "flex-row" : "flex-col"}`
          : "",
        className
      )}
      {...(props as any)}
    >
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          const childElement = child as ReactElement<ChildrenProps>;
          const childStyle = (childElement.props.style ||
            {}) as React.CSSProperties;
          const mergedStyle = { ...childStyle, ...getChildStyles(index) };
          return React.cloneElement(childElement, {
            style: mergedStyle,
          });
        }
        return child;
      })}
    </Component>
  );
};
