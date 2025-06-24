import React, { ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

// Define the types for props
interface FlexProps {
  children: ReactNode;
  firstColWidth?: string;
  secondColWidth?: string;
  className?: string;
  orientation?: "row" | "column"; // Add orientation prop
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
    <div
      className={cn(
        "flex gap-4 w-full items-center ",
        orientation === "column" ? "flex-col" : "flex-row",
        className
      )}
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
    </div>
  );
};
