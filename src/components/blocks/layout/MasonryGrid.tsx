"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  /** How many columns on desktop */
  columns?: number;
  /** Gap between items in px */
  gap?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  columns = 4,
  gap = 16,
  className,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(columns);

  useEffect(() => {
    const updateColumnCount = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;

      // Set column counts by breakpoints
      if (containerWidth < 640) {
        setColumnCount(1); // mobile
      } else if (containerWidth < 1024) {
        setColumnCount(2); // tablet
      } else {
        setColumnCount(columns); // desktop
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [columns]);

  // Create columns arrays
  const columnItems: React.ReactNode[][] = Array.from(
    { length: columnCount },
    () => []
  );

  React.Children.toArray(children).forEach((child, index) => {
    columnItems[index % columnCount].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={cn("flex w-full", className)}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((columnChildren, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col flex-1"
          style={{ gap: `${gap}px` }}
        >
          {columnChildren}
        </div>
      ))}
    </div>
  );
}
