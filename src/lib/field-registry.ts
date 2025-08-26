import type {
  FieldConfig,
  RegisteredFieldKey,
  SupportedLanguage,
  UnProcessedFieldConfig,
} from "@/types/form-types";
import { getAreasFromStorage } from "@/utils/utils";

export const textRegistry: Record<
  string,
  Pick<UnProcessedFieldConfig, "label" | "placeholder">
> = {
  fullName: {
    label: { en: "Full Name", gu: "પૂરું નામ" },
    placeholder: { en: "Enter your full name", gu: "પૂરું નામ દાખલ કરો" },
  },
  firstName: {
    label: { en: "First Name", gu: "પૂરું નામ" },
    placeholder: { en: "Enter your first name", gu: "પૂરું નામ દાખલ કરો" },
  },
  lastName: {
    label: { en: "Last Name", gu: "પૂરું નામ" },
    placeholder: { en: "Enter your last name", gu: "પૂરું નામ દાખલ કરો" },
  },
  fatherName: {
    label: { en: "Father's Name", gu: "પિતાનું નામ" },
    placeholder: { en: "Enter your father's name", gu: "પિતાનું નામ દાખલ કરો" },
  },
  motherName: {
    label: { en: "Mother's Name", gu: "માતાનું નામ" },
    placeholder: { en: "Enter your mother's name", gu: "માતાનું નામ દાખલ કરો" },
  },
  mosalName: {
    label: { en: "Mosal Paksh's Details", gu: "મોસાળ પક્ષની વિગતો" },
    placeholder: {
      en: "Enter Mosal Paksh's name",
      gu: "મોસાળ પક્ષનું નામ દાખલ કરો",
    },
  },
  mosalAddress: {
    label: { en: "Mosal Paksh's Address", gu: "મોસાળ પક્ષનું સરનામું" },
    placeholder: {
      en: "Enter Mosal Paksh's address",
      gu: "મોસાળ પક્ષનું સરનામું દાખલ કરો",
    },
  },
  svasurName: {
    label: { en: "Svasur Paksh's Details", gu: "સસર પક્ષની વિગતો" },
    placeholder: {
      en: "Enter Svasur Paksh's name",
      gu: "સસર પક્ષનું નામ દાખલ કરો",
    },
  },
  svasurAddress: {
    label: { en: "Svasur Paksh's Address", gu: "સસર પક્ષનું સરનામું" },
    placeholder: {
      en: "Enter Svasur Paksh's address",
      gu: "સસર પક્ષનું સરનામું દાખલ કરો",
    },
  },
  qualification: {
    label: {
      en: "Highest Qualification/Degree Achieved",
      gu: "સર્વોચ્ચ લાયકાત/ડિગ્રી",
    },
    placeholder: { en: "Enter qualification", gu: "લાયકાત દાખલ કરો" },
  },
  institution: {
    label: {
      en: "Name of Institution/University",
      gu: "સંસ્થા/વિશ્વવિદ્યાલયનું નામ",
    },
    placeholder: {
      en: "Enter institution/university name",
      gu: "સંસ્થા/વિશ્વવિદ્યાલયનું નામ દાખલ કરો",
    },
  },
  profession: {
    label: { en: "Profession", gu: "વ્યવસાય" },
    placeholder: { en: "Enter your profession", gu: "વ્યવસાય દાખલ કરો" },
  },
  jobTitle: {
    label: { en: "Current/Last Job Title", gu: "હાલનું/છેલ્લું પદ" },
    placeholder: { en: "Enter job title", gu: "પદ દાખલ કરો" },
  },
  employerName: {
    label: { en: "Employer Name", gu: "નિયામકનું નામ" },
    placeholder: { en: "Enter employer name", gu: "નિયામકનું નામ દાખલ કરો" },
  },
  industry: {
    label: { en: "Industry/Field of Work", gu: "ઉદ્યોગ/કાર્યક્ષેત્ર" },
    placeholder: {
      en: "Enter industry or field",
      gu: "ઉદ્યોગ અથવા ક્ષેત્ર દાખલ કરો",
    },
  },
};

export const textAreaRegistry: Record<
  string,
  Pick<UnProcessedFieldConfig, "label" | "placeholder">
> = {
  address: {
    label: { en: "Address", gu: "વર્તમાન સરનામુ" },
    placeholder: {
      en: "Enter your address",
      gu: "વર્તમાન સરનામુ",
    },
  },
  currentAddress: {
    label: { en: "Permanent/Current Address", gu: "કાયમી/હાલનું સરનામું" },
    placeholder: {
      en: "Enter current address",
      gu: "કાયમી/હાલનું સરનામું દાખલ કરો",
    },
  },
  nativeAddress: {
    label: { en: "Native Place Address", gu: "મૂળ વતનનું સરનામું" },
    placeholder: {
      en: "Enter native address",
      gu: "મૂળ વતનનું સરનામું દાખલ કરો",
    },
  },
};

export const selectRegistry: Record<
  string,
  Pick<UnProcessedFieldConfig, "label" | "placeholder" | "options">
> = {
  area: {
    label: {
      en: "Area",
      gu: "વિસ્તાર",
    },
    placeholder: {
      en: "Select your area",
      gu: "તમારો વિસ્તાર પસંદ કરો",
    },
    options: getAreasFromStorage() || [],
  },
};

// Define a registry of common form fields with multilingual support
export const fieldRegistry: Record<string, UnProcessedFieldConfig> = {
  text: {
    name: "text",
    label: { en: "Text", gu: "ટેક્સ્ટ" },
    placeholder: { en: "Enter text", gu: "ટેક્સ્ટ દાખલ કરો" },
    type: "text",
    validations: [{ type: "min", value: 2 }],
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
    validations: [{ type: "email" }],
  },
  phone: {
    name: "phone",
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
  textarea: {
    name: "textarea",
    label: { en: "Text", gu: "ટેક્સ્ટ" },
    placeholder: { en: "Enter text", gu: "ટેક્સ્ટ દાખલ કરો" },
    type: "textarea",
    validations: [{ type: "min", value: 5 }],
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
  select: {
    name: "select",
    label: { en: "Select Option", gu: "વિકલ્પ પસંદ કરો" },
    placeholder: { en: "Select an option", gu: "વિકલ્પ પસંદ કરો" },
    type: "select",
    options: [],
    validations: [],
  },
};

// Function to get a field from the registry with optional overrides
export function getRegisteredField(
  fieldName: string,
  language: SupportedLanguage
): FieldConfig {
  const isRequired = fieldName.endsWith("*");
  const cleanFieldName = isRequired ? fieldName.slice(0, -1) : fieldName;
  const baseField = fieldRegistry[cleanFieldName as RegisteredFieldKey];
  if (baseField) {
    return {
      ...baseField,
      label: isRequired
        ? `${baseField.label[language]}*`
        : baseField.label[language] || "Field Label",
      validations: isRequired
        ? [{ type: "required" }, ...(baseField.validations || [])]
        : baseField.validations || [],
      placeholder: baseField.placeholder[language] || "Enter value",
    };
  }

  const registryMap: Array<{
    registry: Record<string, any>;
    templateKey: RegisteredFieldKey;
  }> = [
    { registry: textRegistry, templateKey: "text" },
    { registry: textAreaRegistry, templateKey: "textarea" },
    { registry: selectRegistry, templateKey: "select" },
  ];

  for (const { registry, templateKey } of registryMap) {
    if (registry[cleanFieldName]) {
      const baseField = fieldRegistry[templateKey];
      const fieldLabel = isRequired
        ? `${registry[cleanFieldName].label[language]}*`
        : registry[cleanFieldName].label[language];
      return {
        ...baseField,
        name: cleanFieldName,
        label: fieldLabel,
        placeholder: registry[cleanFieldName].placeholder[language],
        validations: isRequired
          ? [{ type: "required" }, ...(baseField.validations || [])]
          : baseField.validations || [],
        options: registry[cleanFieldName].options || [],
      };
    }
  }

  throw new Error(`Field "${fieldName}" not found in registry`);
}
