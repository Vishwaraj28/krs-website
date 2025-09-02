"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormState, FieldValues } from "react-hook-form";
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

export type DynamicFormHandle<TFieldValues extends FieldValues = any> = {
  submit: () => void;
  getValues: () => any;
  reset: (values?: any) => void;
  formState: FormState<TFieldValues>;
};

export const DynamicForm = forwardRef<
  DynamicFormHandle,
  { config: FormConfig; col?: Number }
>(({ config, col: fieldColumn = 1 }, ref) => {
  const {
    id: formId,
    fields: formField,
    submitButtonText,
    submitButtonClassName,
    onSubmitSuccess,
    language: formLanguage = "en",
    readOnly,
  } = config;

  const processedFields: FieldConfig[] = formField.map((fieldRef) =>
    getRegisteredField(fieldRef, formLanguage)
  );
  const formSchema = buildZodSchema(processedFields, formLanguage);

  // default values
  const defaultValues = processedFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // expose form methods via ref
  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(onSubmit)(),
    getValues: () => form.getValues(),
    reset: (values) => form.reset(values),
    formState: form.formState,
  }));

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmitSuccess) {
      onSubmitSuccess(values);
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
          <FormItem className={`${readOnly ? "gap-1" : ""}`}>
            <FormLabel className={`${readOnly ? "text-primary/65" : ""}`}>
              {fieldLabel}
            </FormLabel>
            <FormControl>
              {field.type === "textarea" ? (
                <Textarea
                  placeholder={fieldPlaceHolder}
                  className={`${field.className || ""}`}
                  {...formField}
                  readOnly={readOnly}
                />
              ) : field.type === "select" ? (
                <FormSelect
                  value={formField.value}
                  onChange={formField.onChange}
                  options={field.options || []}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  language={formLanguage}
                  disabled={readOnly}
                  name={fieldName}
                />
              ) : field.type === "date" ? (
                <FormDatePicker
                  value={formField.value}
                  onChange={formField.onChange}
                  placeholder={fieldPlaceHolder}
                  className={field.className}
                  disabled={readOnly}
                />
              ) : (
                <Input
                  type={field.type}
                  placeholder={fieldPlaceHolder}
                  className={`${field.className || ""}`}
                  {...formField}
                  readOnly={readOnly}
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        id={formId}
      >
        <div
          className={`grid w-full grid-cols-1 gap-4 ${
            Number(fieldColumn) > 1 ? "gap-y-9" : "gap-y-6"
          } sm:grid-cols-${fieldColumn}`}
        >
          {processedFields.map(renderField)}
        </div>

        {submitButtonText && (
          <div className="flex justify-end">
            <Button type="submit" className={`${submitButtonClassName || ""}`}>
              {getLocalizedText(submitButtonText, formLanguage)}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
});
DynamicForm.displayName = "DynamicForm";
