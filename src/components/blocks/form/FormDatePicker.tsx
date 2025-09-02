"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface FormDatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function FormDatePicker({
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: FormDatePickerProps) {
  const selectedDate = value ? new Date(value) : undefined;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "justify-between text-black border-primary-light",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? format(new Date(value), "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          onSelect={(date) => {
            onChange(date ? date.toISOString() : "");
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
