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
  { config: FormConfig; col?: number }
>(({ config, col: fieldColumn = 1 }, ref) => {
  const {
    id: formId,
    fields: fie,
    submitButtonText,
    submitButtonClassName,
    onSubmitSuccess,
    language: formLanguage = "en",
    readOnly,
  } = config;

  const processedFields: FieldConfig[] = fie.map((fieldRef) =>
    getRegisteredField(fieldRef, formLanguage)
  );

  const formSchema = buildZodSchema(processedFields, formLanguage);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const renderField = (fieldConfig: FieldConfig) => {
    const {
      name: fieldName,
      label: fieldLabel,
      placeholder: fieldPlaceholder,
    } = fieldConfig;

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field: rhfField }) => (
          <FormItem className={`${readOnly ? "gap-1" : ""}`}>
            <FormLabel className={`${readOnly ? "text-primary/65" : ""}`}>
              {fieldLabel}
            </FormLabel>
            <FormControl>
              {fieldConfig.type === "textarea" ? (
                <Textarea
                  placeholder={fieldPlaceholder}
                  className={`${fieldConfig.className || ""}`}
                  {...rhfField} // connect to RHF
                  readOnly={readOnly}
                />
              ) : fieldConfig.type === "select" ? (
                <FormSelect
                  value={rhfField.value || ""}
                  onChange={rhfField.onChange}
                  options={fieldConfig.options || []}
                  placeholder={fieldPlaceholder}
                  className={fieldConfig.className}
                  language={formLanguage}
                  disabled={readOnly}
                  name={fieldName}
                />
              ) : fieldConfig.type === "date" ? (
                <FormDatePicker
                  value={rhfField.value || ""}
                  onChange={rhfField.onChange}
                  placeholder={fieldPlaceholder}
                  className={fieldConfig.className}
                  disabled={readOnly}
                />
              ) : (
                <Input
                  type={fieldConfig.type}
                  placeholder={fieldPlaceholder}
                  className={`${fieldConfig.className || ""}`}
                  {...rhfField} // connect to RHF
                  readOnly={readOnly}
                  value={rhfField.value || ""} // ensure controlled input
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
          className={`grid w-full gap-9 
            grid-cols-${fieldColumn} ${
            fieldColumn > 1 ? "gap-y-9" : "gap-y-6"
          }`}
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
