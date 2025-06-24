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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast";

import {
  type FieldConfig,
  type FormConfig,
  buildZodSchema,
  getLocalizedText,
} from "@/types/form-types";
import { fieldRegistry, getRegisteredField } from "@/lib/field-registry";

export function DynamicForm({ config }: { config: FormConfig }) {
  const language = config.language;
  // Process field references to get actual field configs
  const processedFields: FieldConfig[] = config.fields.map((fieldRef) => {
    if (typeof fieldRef === "string") {
      return getRegisteredField(fieldRef);
    } else {
      if (fieldRef.name && fieldRef.name in fieldRegistry) {
        return getRegisteredField(fieldRef.name, fieldRef);
      }
      return fieldRef as FieldConfig;
    }
  });
  // Build the zod schema from the processed field configurations
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
    console.log("Form submitted with values:", form.formState);
    //Add Loading state
    if (config.onSubmitSuccess) {
      config.onSubmitSuccess(values);
    }
  }

  // Render the appropriate field based on type
  const renderField = (field: FieldConfig) => {
    const localizedLabel = getLocalizedText(field.label, language);
    const localizedPlaceholder = getLocalizedText(field.placeholder, language);
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{localizedLabel}</FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  placeholder={localizedPlaceholder}
                  className={`${field.className || ""}`}
                  {...formField}
                />
              ) : field.type === "select" ? (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger className={`${field.className || ""}`}>
                    <SelectValue placeholder={localizedPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {getLocalizedText(option.label, language)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type}
                  placeholder={localizedPlaceholder}
                  className={`${field.className || ""}`}
                  {...formField}
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

        <div className="flex justify-end">
          <Button
            type="submit"
            className={`${config.submitButtonClassName || ""}`}
          >
            {getLocalizedText(config.submitButtonText, language)}
          </Button>
        </div>
      </form>
    </Form>
  );
}
