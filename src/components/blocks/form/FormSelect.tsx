"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getLocalizedText,
  SelectOption,
  SupportedLanguage,
} from "@/types/form-types";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 shadcn skeleton

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[] | (() => Promise<SelectOption[]>); // can be static or async
  placeholder?: string;
  language?: SupportedLanguage;
  className?: string;
  disabled?: boolean;
  name?: string;
}

const LoadingSkeleton = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="px-2 py-1.5">
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    ))}
  </>
);

export function FormSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  language = "en",
  disabled,
  name,
}: FormSelectProps) {
  let optionsData: SelectOption[] = [];
  let optionLoading = false;

  if (typeof options === "function") {
    const query = useQuery({
      queryKey: ["form-select-options"],
      queryFn: options,
    });
    optionsData = query.data ?? [];
    optionLoading = query.isLoading;
  } else {
    optionsData = options;
  }

  return (
    <Select
      onValueChange={onChange}
      value={value}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger className={`${className || ""} w-full`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optionLoading ? (
          <LoadingSkeleton />
        ) : (
          optionsData.map(({ id, label, value }, index) => (
            <SelectItem key={id ?? index} value={id ?? value}>
              {getLocalizedText(label, language)}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
