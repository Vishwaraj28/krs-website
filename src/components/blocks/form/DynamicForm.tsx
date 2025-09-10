"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useImperativeHandle, forwardRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  type FieldConfig,
  type FormConfig,
  buildZodSchema,
  getLocalizedText,
} from "@/types/form-types";
import { getRegisteredField } from "@/lib/field-registry";
import { FormSelect } from "./FormSelect";
import { FormDatePicker } from "./FormDatePicker";

export interface DynamicFormHandle {
  submit: () => void;
  reset: (values?: Record<string, any>) => void;
}

export const DynamicForm = forwardRef<
  DynamicFormHandle,
  { config: FormConfig; col?: number }
>(({ config, col = 1 }, ref) => {
  const language = config.language ?? "en";
  const processedFields: FieldConfig[] = config.fields.map((fieldRef) =>
    getRegisteredField(fieldRef, language)
  );
  const formSchema = buildZodSchema(processedFields, language);

  // Default values
  const defaultValues = processedFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {} as Record<string, any>);

  // RHF
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Expose submit/reset methods
  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(onSubmit)(),
    reset: (values) => form.reset(values ?? defaultValues),
  }));

  // Handle submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (config.onSubmitSuccess) {
      config.onSubmitSuccess(values, form); // 🚀 pass form methods
    }
  }

  const renderField = (field: FieldConfig) => {
    const {
      name: fieldName,
      label: fieldLabel,
      placeholder: fieldPlaceHolder,
    } = field;

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field: formField }) => (
          <FormItem className={`${config.readOnly ? "gap-1" : ""}`}>
            <FormLabel
              className={`${config.readOnly ? "text-primary/65" : ""}`}
            >
              {fieldLabel}
            </FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  {...formField}
                  placeholder={fieldPlaceHolder}
                  readOnly={config.readOnly}
                  className={`${
                    formField.value
                      ? ""
                      : "read-only:placeholder:text-light-foreground"
                  }`}
                />
              ) : field.type === "select" ? (
                <FormSelect
                  value={formField.value || ""}
                  onChange={formField.onChange}
                  options={field.options || []}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  language={language}
                  disabled={config.readOnly}
                  name={fieldName}
                />
              ) : field.type === "date" ? (
                <FormDatePicker
                  value={formField.value || ""}
                  onChange={formField.onChange}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  disabled={config.readOnly}
                />
              ) : (
                <Input
                  {...formField}
                  type={field.type}
                  placeholder={fieldPlaceHolder}
                  readOnly={config.readOnly}
                  value={formField.value || ""}
                  className={`${
                    formField.value
                      ? ""
                      : "read-only:placeholder:text-light-foreground"
                  }`}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const gridCols: Record<string, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid w-full gap-9 ${
          gridCols[String(col)] || "grid-cols-1"
        } ${col > 1 ? "gap-y-9" : "gap-y-6"}`}
      >
        {processedFields.map(renderField)}

        {config.submitButtonText && (
          <div className="flex justify-end col-span-full">
            <Button
              type="submit"
              className={`${config.submitButtonClassName || ""}`}
            >
              {getLocalizedText(config.submitButtonText, language)}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
});
DynamicForm.displayName = "DynamicForm";
