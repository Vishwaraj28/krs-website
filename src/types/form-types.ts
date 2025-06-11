import { z } from "zod"
import { getValidationMessage } from "@/lib/validation-registry"
import { Cone } from "lucide-react"
import { RegisteredFieldKey } from "@/lib/field-registry"

// Define supported languages
export type SupportedLanguage = "en" | "gu"

// Define multilingual text properties
export type MultilingualText = {
  en: string
  gu?: string
  [key: string]: string | undefined
}

// Define all possible field types
export type FieldType = "text" | "email" | "password" | "number" | "tel" | "textarea" | "select" | "date"

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
  | { type: "custom"; value: any; message: string | MultilingualText }

// Define options for select fields
export type SelectOption = {
  label: string | MultilingualText
  value: string
}

// Define a single field configuration
export type FieldConfig = {
  name: string
  label: string | MultilingualText
  type: FieldType
  placeholder?: string | MultilingualText
  validations?: ValidationRule[]
  options?: SelectOption[] // For select fields
  defaultValue?: any
  className?: string
}


// Define a field reference (either a registered field name or a custom field config)
export type FieldReference = RegisteredFieldKey | FieldConfig

// Define the entire form configuration
export type FormConfig = {
  id: string
  fields: FieldReference[]
  submitButtonText: string | MultilingualText
  submitButtonClassName?: string
  onSubmitSuccess?: (data: any) => void
  language: SupportedLanguage // Required language for the form
}

// Helper function to get text in the current language
export function getLocalizedText(
  text: string | MultilingualText | undefined,
  language: SupportedLanguage,
  fallback = "",
): string {
  if (!text) return fallback
  if (typeof text === "string") return text

  // Return the text in the requested language, or fall back to English, or use the fallback
  return text[language] || text.en || fallback
}

// Helper function to process validation rules and generate messages if not provided
export function processValidationRules(field: FieldConfig, language: SupportedLanguage): ValidationRule[] {
  if (!field.validations) return []

  const fieldLabel = getLocalizedText(field.label, language)

  return field.validations.map((rule) => {
    // If message is already provided, use it (either as string or get localized version)
    if (rule.message) {
      const message = getLocalizedText(rule.message, language)
      return { ...rule, message }
    }

    // Otherwise, generate a message based on the rule type and field properties
    const message = getValidationMessage(rule.type, {
      label: fieldLabel,
      value: "value" in rule ? rule.value : undefined,
      fieldName: field.name,
      language,
    })

    return { ...rule, message }
  })
}

// Helper function to build zod schema from field configs
export function buildZodSchema(fields: FieldConfig[], language: SupportedLanguage) {
  const schemaMap: Record<string, any> = {}

  fields.forEach((field) => {
    let fieldSchema = z.string()

    // Process validation rules to ensure all have messages
    const validations = processValidationRules(field, language)
    console.log(validations)
    if (validations) {
      validations.forEach((validation) => {
        switch (validation.type) {
          case "required":
            fieldSchema = fieldSchema.min(1, { message: validation.message as string })
            break
          case "min":
            fieldSchema = fieldSchema.min(validation.value, { message: validation.message as string })
            break
          case "max":
            fieldSchema = fieldSchema.max(validation.value, { message: validation.message as string })
            break
          case "regex":
            fieldSchema = fieldSchema.regex(validation.value, { message: validation.message as string })
            break
          case "email":
            fieldSchema = fieldSchema.email({ message: validation.message as string })
            break
          case "url":
            fieldSchema = fieldSchema.url({ message: validation.message as string })
            break
          case "numeric":
            fieldSchema = fieldSchema.regex(/^\d+$/, { message: validation.message as string })
            break
          case "alphanumeric":
            fieldSchema = fieldSchema.regex(/^[a-zA-Z0-9]+$/, { message: validation.message as string })
            break
        }
      })
    }

    schemaMap[field.name] = fieldSchema
  })
  return z.object(schemaMap)
}
