import { z } from "zod";
import { getValidationMessage } from "@/lib/validation-registry";

// Define supported languages
export type SupportedLanguage = "en" | "gu";

// Define multilingual text properties
export type MultilingualText = {
  en: string;
  gu?: string;
  [key: string]: string | undefined;
};

// Define all possible field types
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "textarea"
  | "select"
  | "date";

export type WithRequiredMarker<T extends string> = `${T}*` | T;
export type RegisteredFieldKey =
  | "fullName"
  | "firstName"
  | "lastName"
  | "fatherName"
  | "motherName"
  | "mosalName"
  | "mosalAddress"
  | "svasurName"
  | "svasurAddress"
  | "qualification"
  | "institution"
  | "profession"
  | "jobTitle"
  | "employerName"
  | "industry"
  | "address"
  | "currentAddress"
  | "nativeAddress"
  | "area"
  | "text"
  | "email"
  | "phone"
  | "textarea"
  | "password"
  | "select";

// Define simplified validation rules
export type ValidationRule =
  | { type: "required"; message?: string | MultilingualText }
  | { type: "min"; value: number; message?: string | MultilingualText }
  | { type: "max"; value: number; message?: string | MultilingualText }
  | { type: "regex"; value: RegExp; message?: string | MultilingualText }
  | { type: "email"; message?: string | MultilingualText }
  | { type: "url"; message?: string | MultilingualText }
  | { type: "numeric"; message?: string | MultilingualText }
  | { type: "alphanumeric"; message?: string | MultilingualText }
  | { type: "password_uppercase"; message?: string | MultilingualText }
  | { type: "password_lowercase"; message?: string | MultilingualText }
  | { type: "password_digit"; message?: string | MultilingualText }
  | { type: "password_special"; message?: string | MultilingualText }
  | { type: "custom"; value: any; message: string | MultilingualText };

// Define options for select fields
export type SelectOption = {
  id: string;
  label: string | MultilingualText;
  value: string;
};

export type UnProcessedFieldConfig = {
  name: string;
  label: MultilingualText;
  type: FieldType;
  placeholder: MultilingualText;
  validations?: ValidationRule[];
  options?: any[]; // For select fields
  defaultValue?: any;
  className?: string;
};

// Define a single field configuration
export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder: string;
  validations?: ValidationRule[];
  options?: any[]; // For select fields
  defaultValue?: any;
  className?: string;
};

// Define the entire form configuration
export type FormConfig = {
  id: string;
  fields: WithRequiredMarker<RegisteredFieldKey>[];
  submitButtonText?: string | MultilingualText;
  submitButtonClassName?: string;
  onSubmitSuccess?: (data: any) => void;
  language?: SupportedLanguage; // Required language for the form
  readOnly?: boolean; // If true, all fields are read-only
};

// Helper function to get text in the current language
export function getLocalizedText(
  text: string | MultilingualText | undefined,
  language: SupportedLanguage,
  fallback = ""
): string {
  if (!text) return fallback;
  if (typeof text === "string") return text;

  // Return the text in the requested language, or fall back to English, or use the fallback
  return text[language] || text.en || fallback;
}

// Helper function to process validation rules and generate messages if not provided
export function processValidationRules(
  field: FieldConfig,
  language: SupportedLanguage
): ValidationRule[] {
  const {
    label: fieldLabel,
    validations: fieldValidations,
    name: fieldName,
  } = field;
  if (!fieldValidations) return [];
  return fieldValidations.map((rule) => {
    // If message is already provided, use it (either as string or get localized version)
    if (rule.message) {
      const message = getLocalizedText(rule.message, language);
      return { ...rule, message };
    }

    // Otherwise, generate a message based on the rule type and field properties
    const message = getValidationMessage(rule.type, {
      label: fieldLabel.endsWith("*") ? fieldLabel.slice(0, -1) : fieldLabel,
      value: "value" in rule ? rule.value : undefined,
      fieldName: fieldName,
      language,
    });

    return { ...rule, message };
  });
}

// Helper function to build zod schema from field configs
export function buildZodSchema(
  fields: FieldConfig[],
  language: SupportedLanguage
) {
  const schemaMap: Record<string, any> = {};

  fields.forEach((field) => {
    let fieldSchema = z.string();
    // Process validation rules to ensure all have messages
    const validations = processValidationRules(field, language);
    if (validations) {
      validations.forEach((validation) => {
        switch (validation.type) {
          case "required":
            fieldSchema = fieldSchema.min(1, {
              message: validation.message as string,
            });
            break;
          case "min":
            fieldSchema = fieldSchema.min(validation.value, {
              message: validation.message as string,
            });
            break;
          case "max":
            fieldSchema = fieldSchema.max(validation.value, {
              message: validation.message as string,
            });
            break;
          case "regex":
            fieldSchema = fieldSchema.regex(validation.value, {
              message: validation.message as string,
            });
            break;
          case "email":
            fieldSchema = fieldSchema.email({
              message: validation.message as string,
            });
            break;
          case "url":
            fieldSchema = fieldSchema.url({
              message: validation.message as string,
            });
            break;
          case "numeric":
            fieldSchema = fieldSchema.regex(/^\d+$/, {
              message: validation.message as string,
            });
            break;
          case "alphanumeric":
            fieldSchema = fieldSchema.regex(/^[a-zA-Z0-9]+$/, {
              message: validation.message as string,
            });
            break;
          case "password_uppercase":
            fieldSchema = fieldSchema.regex(/[A-Z]/, {
              message: validation.message as string,
            });
            break;
          case "password_lowercase":
            fieldSchema = fieldSchema.regex(/[a-z]/, {
              message: validation.message as string,
            });
            break;
          case "password_digit":
            fieldSchema = fieldSchema.regex(/\d/, {
              message: validation.message as string,
            });
            break;
          case "password_special":
            fieldSchema = fieldSchema.regex(/[^A-Za-z0-9]/, {
              message: validation.message as string,
            });
            break;
        }
      });
    }

    schemaMap[field.name] = fieldSchema;
  });
  return z.object(schemaMap);
}
