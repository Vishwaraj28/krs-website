import React, { ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

// Define the types for props
interface FlexProps {
  children: ReactNode; // Allow any type of child (string, number, React elements)
  firstColWidth?: string; // e.g., "20%"
  secondColWidth?: string; // e.g., "80%"
  className?: string;
}

// More precise typing for the style prop
type ChildrenProps = {
  readonly style: React.CSSProperties;
};

export const FlexBox = ({
  children,
  firstColWidth: first,
  secondColWidth: second,
  className,
}: FlexProps) => {
  const childrenArray = React.Children.toArray(children);

  // Logic to determine styles based on firstColWidth, secondColWidth, and number of children
  const getChildStyles = (index: number) => {
    if (first && second) {
      // If both first and second are defined, handle like traditional flex layout
      if (index === 0) {
        return { flex: `0 1 ${first}` }; // Apply flex to the first child
      } else if (index === 1) {
        return { flex: `0 1 ${second}` }; // Apply flex to the second child
      }
    }

    if (first && !second) {
      // If first is defined but second is not, share remaining space
      if (index === 0) {
        return { flex: `0 1 ${first}` }; // First child gets defined width
      } else {
        return { flex: "1 1 auto" }; // Remaining children take up equal space
      }
    }

    // If no widths provided, apply equal space to all children
    if (childrenArray.length > 3) {
      return { flex: "1 1 auto" };
    }

    return { flex: "0 1 auto" }; // Default behavior
  };

  return (
    <div className={cn("flex gap-4 w-full", className)}>
      {childrenArray.map((child, index) => {
        // Check if the child is a valid React element
        if (React.isValidElement(child)) {
          // Assert the type of child to ReactElement<ChildrenProps>
          const childElement = child as ReactElement<ChildrenProps>;

          // Get existing inline styles of the child, if any
          const childStyle = (childElement.props.style ||
            {}) as React.CSSProperties;

          // Merge existing style with the new style from getChildStyles
          const mergedStyle = { ...childStyle, ...getChildStyles(index) };
          console.log("Merged style for child at index", mergedStyle);
          // Only pass merged style to valid ReactElement children
          return React.cloneElement(childElement, {
            style: mergedStyle,
          });
        }

        // If not a ReactElement, return the child as-is (e.g., strings, numbers, etc.)
        return child;
      })}
    </div>
  );
};
