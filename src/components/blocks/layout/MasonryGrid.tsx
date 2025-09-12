"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: number;
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

      // Responsive column count based on container width
      if (containerWidth < 640) {
        setColumnCount(1);
      } else if (containerWidth < 768) {
        setColumnCount(2);
      } else if (containerWidth < 1024) {
        setColumnCount(3);
      } else {
        setColumnCount(columns);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, [columns]);

  // Create column arrays
  const columnItems: React.ReactNode[][] = Array.from(
    { length: columnCount },
    () => []
  );

  // Distribute children among columns
  const childrenArray = React.Children.toArray(children);
  childrenArray.forEach((child, index) => {
    const columnIndex = index % columnCount;
    columnItems[columnIndex].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((columnChildren, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {columnChildren}
        </div>
      ))}
    </div>
  );
}
