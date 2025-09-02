import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm read-only:cursor-not-allowed read-only:border-0 raad-only:bg-transparent read-only:focus:ring-0 read-only:focus:ring-offset-0 read-only:shadow-none read-only:p-0 read-only:text-lg read-only:placeholder:text-black",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
