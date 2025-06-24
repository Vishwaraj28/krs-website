import type { FieldConfig } from "@/types/form-types";

// Define a registry of common form fields with multilingual support
export const fieldRegistry: Record<string, FieldConfig> = {
  // Personal information fields
  fullName: {
    name: "fullName",
    label: {
      en: "Full Name",
      gu: "પૂરું નામ",
    },
    type: "text",
    placeholder: {
      en: "Enter your full name",
      gu: "પૂરું નામ",
    },
    validations: [{ type: "required" }, { type: "min", value: 2 }],
  },
  email: {
    name: "email",
    label: {
      en: "Email Address",
      gu: "ઈમેલ એડ્રેસ",
    },
    type: "email",
    placeholder: {
      en: "your.email@example.com",
      gu: "તમારું.ઈમેલ@example.com",
    },
    validations: [{ type: "required" }, { type: "email" }],
  },
  phoneNumber: {
    name: "mobile",
    label: {
      en: "Phone Number",
      gu: "મોબાઈલ નંબર",
    },
    type: "tel",
    placeholder: {
      en: "Enter your phone number",
      gu: "મોબાઈલ નંબર",
    },
    validations: [
      { type: "required" },
      {
        type: "regex",
        value: /^\d{10}$/,
        message: {
          en: "Please enter a valid 10-digit phone number",
          gu: "માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો.",
        },
      },
    ],
  },
  address: {
    name: "address",
    label: {
      en: "Address",
      gu: "વર્તમાન સરનામુ",
    },
    type: "textarea",
    placeholder: {
      en: "Enter your address",
      gu: "વર્તમાન સરનામુ",
    },
    validations: [{ type: "required" }, { type: "min", value: 5 }],
  },
  hometown: {
    name: "hometown",
    label: {
      en: "Hometown",
      gu: "મૂળ વતન",
    },
    type: "textarea",
    placeholder: {
      en: "Enter your hometown",
      gu: "મૂળ વતન",
    },
    validations: [{ type: "required" }, { type: "min", value: 2 }],
  },
  subject: {
    name: "subject",
    label: {
      en: "Subject",
      gu: "વિષય",
    },
    type: "select",
    placeholder: {
      en: "Select a subject",
      gu: "વિષય પસંદ કરો",
    },
    options: [
      {
        label: { en: "General Inquiry", gu: "સામાન્ય પૂછપરછ" },
        value: "general",
      },
      { label: { en: "Support", gu: "સપોર્ટ" }, value: "support" },
      { label: { en: "Feedback", gu: "પ્રતિસાદ" }, value: "feedback" },
      { label: { en: "Other", gu: "અન્ય" }, value: "other" },
    ],
    validations: [{ type: "required" }],
  },
  message: {
    name: "message",
    label: {
      en: "Message",
      gu: "સંદેશ",
    },
    type: "textarea",
    placeholder: {
      en: "Your message",
      gu: "તમારો સંદેશ",
    },
    validations: [{ type: "required" }, { type: "min", value: 10 }],
  },
  password: {
    name: "password",
    label: {
      en: "Password",
      gu: "પાસવર્ડ",
    },
    type: "password",
    placeholder: {
      en: "Enter your password",
      gu: "પાસવર્ડ દાખલ કરો",
    },
    validations: [
      { type: "required" },
      {
        type: "min",
        value: 8,
      },
      { type: "password_uppercase" },
      { type: "password_lowercase" },
      { type: "password_digit" },
      { type: "password_special" },
    ],
  },
  area: {
    name: "area",
    label: {
      en: "Area",
      gu: "વિસ્તાર",
    },
    type: "select",
    placeholder: {
      en: "Select your area",
      gu: "તમારો વિસ્તાર પસંદ કરો",
    },
    options: [
      { label: { en: "Downtown", gu: "ડાઉનટાઉન" }, value: "downtown" },
      { label: { en: "Uptown", gu: "અપટાઉન" }, value: "uptown" },
      { label: { en: "Midtown", gu: "મિડટાઉન" }, value: "midtown" },
      { label: { en: "West Side", gu: "વેસ્ટ સાઇડ" }, value: "westside" },
      { label: { en: "East Side", gu: "ઈસ્ટ સાઇડ" }, value: "eastside" },
      { label: { en: "North Side", gu: "નોર્થ સાઇડ" }, value: "northside" },
      { label: { en: "South Side", gu: "સાઉથ સાઇડ" }, value: "southside" },
    ],
    validations: [{ type: "required" }],
  },
};

export type RegisteredFieldKey = keyof typeof fieldRegistry;
// Function to get a field from the registry with optional overrides
export function getRegisteredField(
  fieldName: string,
  overrides: Partial<FieldConfig> = {}
): FieldConfig {
  const baseField = fieldRegistry[fieldName as keyof typeof fieldRegistry];

  if (!baseField) {
    // If the field doesn't exist in the registry, create a new field from the overrides
    if (
      Object.keys(overrides).length &&
      overrides.name &&
      overrides.type &&
      overrides.label
    ) {
      return overrides as FieldConfig;
    }
    throw new Error(`Field "${fieldName}" not found in registry`);
  }

  // Deep merge the base field with overrides
  return {
    ...baseField,
    ...overrides,
    // Handle nested properties like validations
    validations: overrides.validations || baseField.validations,
    options: overrides.options || baseField.options,
  };
}
