"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLocalizedText, SupportedLanguage } from "@/types/form-types";

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
  placeholder?: string;
  language?: SupportedLanguage;
  className?: string;
  disabled?: boolean;
}

export function FormSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  language = "en",
  disabled,
}: FormSelectProps) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={value}
      value={value}
      disabled={disabled}
    >
      <SelectTrigger className={`${className || ""} w-full`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {getLocalizedText(option.label, language)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
