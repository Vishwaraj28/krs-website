"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

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

export function DynamicForm({ config }: { config: FormConfig }) {
  const language = config.language ?? "en";
  const processedFields: FieldConfig[] = config.fields.map((fieldRef) =>
    getRegisteredField(fieldRef, language)
  );
  const formSchema = buildZodSchema(processedFields, language);

  // Create default values from field configurations
  const defaultValues = processedFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {} as Record<string, any>);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    //Add Loading state
    if (config.onSubmitSuccess) {
      config.onSubmitSuccess(values);
    }
  }

  // Render the appropriate field based on type
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
          <FormItem>
            <FormLabel>{fieldLabel}</FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  placeholder={fieldPlaceHolder}
                  className={`${field.className || ""}`}
                  {...formField}
                  readOnly={config.readOnly}
                />
              ) : field.type === "select" ? (
                <FormSelect
                  value={formField.value}
                  onChange={formField.onChange}
                  options={field.options || []}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  language={language}
                  disabled={config.readOnly}
                />
              ) : field.type === "date" ? (
                <FormDatePicker
                  value={formField.value}
                  onChange={formField.onChange}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  disabled={config.readOnly}
                />
              ) : (
                <Input
                  type={field.type}
                  placeholder={fieldPlaceHolder}
                  className={`${field.className || ""}`}
                  {...formField}
                  readOnly={config.readOnly}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {processedFields.map(renderField)}

        {config.submitButtonText && (
          <div className="flex justify-end">
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
}
