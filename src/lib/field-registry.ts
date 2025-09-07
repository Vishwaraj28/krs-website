import type {
  FieldConfig,
  RegisteredFieldKey,
  FieldType,
  SupportedLanguage,
  ValidationRule,
} from "@/types/form-types";
import { getAreas } from "@/utils/utils";

// Represents one field's structure inside fields
type RegistryField = {
  label: Record<SupportedLanguage, string>;
  placeholder: Record<SupportedLanguage, string>;
  options?:
    | { label: Record<SupportedLanguage, string>; value: string }[]
    | (() => any);
  defaultValue?: string;
  message?: Record<SupportedLanguage, string>;
};

// One registry group (like textRegistry, selectRegistry, etc.)
type RegistryEntry = {
  type: FieldType;
  validations: ValidationRule[];
  fields: Record<string, RegistryField>;
};

// Full field registry
type FieldRegistry = Record<string, RegistryEntry>;

export const fieldRegistry: FieldRegistry = {
  textRegistry: {
    type: "text",
    validations: [{ type: "min", value: 2 }],
    fields: {
      fullName: {
        label: { en: "Full Name", gu: "પૂરું નામ" },
        placeholder: { en: "Enter your full name", gu: "પૂરું નામ દાખલ કરો" },
      },
      firstName: {
        label: { en: "First Name", gu: "નામ" },
        placeholder: { en: "Enter your first name", gu: "નામ દાખલ કરો" },
      },
      middleName: {
        label: { en: "Middle Name", gu: "પિતાનું નામ" },
        placeholder: {
          en: "Enter your first name",
          gu: "પિતાનું નામ દાખલ કરો",
        },
      },
      lastName: {
        label: { en: "Last Name", gu: "અટક" },
        placeholder: { en: "Enter your last name", gu: "અટક દાખલ કરો" },
      },
      fatherName: {
        label: { en: "Father's Name", gu: "પિતાનું નામ" },
        placeholder: {
          en: "Enter your father's full name",
          gu: "પિતાનું પૂરું નામ દાખલ કરો",
        },
      },
      motherName: {
        label: { en: "Mother's Name", gu: "માતાનું પૂરું નામ" },
        placeholder: {
          en: "Enter your mother's full name",
          gu: "માતાનું નામ દાખલ કરો",
        },
      },
      mosalName: {
        label: { en: "Mosal Paksh's Details", gu: "મોસાળ પક્ષની વિગતો" },
        placeholder: {
          en: "Enter Mosal Paksh's name",
          gu: "મોસાળ પક્ષનું નામ દાખલ કરો",
        },
      },
      svasurName: {
        label: { en: "Svasur Paksh's Details", gu: "સસર પક્ષની વિગતો" },
        placeholder: {
          en: "Enter Svasur Paksh's name",
          gu: "સસર પક્ષનું નામ દાખલ કરો",
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
        placeholder: {
          en: "Enter employer name",
          gu: "નિયામકનું નામ દાખલ કરો",
        },
      },
      industry: {
        label: { en: "Industry/Field of Work", gu: "ઉદ્યોગ/કાર્યક્ષેત્ર" },
        placeholder: {
          en: "Enter industry or field",
          gu: "ઉદ્યોગ અથવા ક્ષેત્ર દાખલ કરો",
        },
      },
    },
  },
  textAreaRegistry: {
    type: "textarea",
    validations: [{ type: "min", value: 5 }],
    fields: {
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
      mosalAddress: {
        label: { en: "Mosal Paksh's Address", gu: "મોસાળ પક્ષનું સરનામું" },
        placeholder: {
          en: "Enter Mosal Paksh's address",
          gu: "મોસાળ પક્ષનું સરનામું દાખલ કરો",
        },
      },
      svasurAddress: {
        label: { en: "Svasur Paksh's Address", gu: "સસર પક્ષનું સરનામું" },
        placeholder: {
          en: "Enter Svasur Paksh's address",
          gu: "સસર પક્ષનું સરનામું દાખલ કરો",
        },
      },
    },
  },
  selectRegistry: {
    type: "select",
    validations: [],
    fields: {
      area: {
        label: {
          en: "Area",
          gu: "વિસ્તાર",
        },
        placeholder: {
          en: "Select your area",
          gu: "તમારો વિસ્તાર પસંદ કરો",
        },
        options: getAreas,
      },
      maritalStatus: {
        label: {
          en: "Marital Status",
          gu: "લગ્ન સ્થિતિ",
        },
        placeholder: {
          en: "Select your marital status",
          gu: "તમારી લગ્ન સ્થિતિ પસંદ કરો",
        },
        options: [
          { label: { en: "Single", gu: "એકલો" }, value: "single" },
          { label: { en: "Married", gu: "લગ્નિત" }, value: "married" },
        ],
      },
      gender: {
        label: {
          en: "Gender",
          gu: "લિંગ",
        },
        placeholder: {
          en: "Select your gender",
          gu: "તમારું લિંગ પસંદ કરો",
        },
        options: [
          { label: { en: "Male", gu: "પુરુષ" }, value: "male" },
          { label: { en: "Female", gu: "સ્ત્રી" }, value: "female" },
          { label: { en: "Other", gu: "અન્ય" }, value: "other" },
        ],
      },
      bloodGroup: {
        label: {
          en: "Blood Group",
          gu: "લોહી જૂથ",
        },
        placeholder: {
          en: "Select your blood group",
          gu: "તમારું લોહી જૂથ પસંદ કરો",
        },
        options: [
          { label: { en: "A+", gu: "A+" }, value: "A+" },
          { label: { en: "A-", gu: "A-" }, value: "A-" },
          { label: { en: "B+", gu: "B+" }, value: "B+" },
          { label: { en: "B-", gu: "B-" }, value: "B-" },
          { label: { en: "AB+", gu: "AB+" }, value: "AB+" },
          { label: { en: "AB-", gu: "AB-" }, value: "AB-" },
          { label: { en: "O+", gu: "O+" }, value: "O+" },
          { label: { en: "O-", gu: "O-" }, value: "O-" },
        ],
      },
    },
  },
  emailRegisrty: {
    type: "email",
    validations: [{ type: "email" }],
    fields: {
      email: {
        label: {
          en: "Email Address",
          gu: "ઈમેલ એડ્રેસ",
        },
        placeholder: {
          en: "your.email@example.com",
          gu: "તમારું.ઈમેલ@example.com",
        },
      },
    },
  },
  phoneRegistry: {
    type: "tel",
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
    fields: {
      phone: {
        label: {
          en: "Phone Number",
          gu: "મોબાઈલ નંબર",
        },
        placeholder: {
          en: "Enter your phone number",
          gu: "મોબાઈલ નંબર દાખલ કરો",
        },
      },
    },
  },
  dateRegistry: {
    type: "date",
    validations: [],
    fields: {
      dob: {
        label: { en: "Date of Birth", gu: "જન્મતારીખ" },
        placeholder: { en: "Select Date of Birth", gu: "જન્મતારીખ પસંદ કરો" },
      },
    },
  },
  passWordRegistry: {
    type: "password",
    validations: [
      { type: "min", value: 8 },
      { type: "password_uppercase" },
      { type: "password_lowercase" },
      { type: "password_digit" },
      { type: "password_special" },
    ],
    fields: {
      password: {
        label: { en: "Password", gu: "પાસવર્ડ" },
        placeholder: { en: "Enter your password", gu: "પાસવર્ડ દાખલ કરો" },
      },
    },
  },
};

function getDataByItemKey(
  obj: FieldRegistry,
  itemKey: RegisteredFieldKey
): RegistryEntry {
  for (const registryKey in obj) {
    if (obj[registryKey].fields.hasOwnProperty(itemKey)) {
      return obj[registryKey];
    }
  }
  throw new Error(`Field not found in registry`);
}

// Function to get a field from the registry with optional overrides
export function getRegisteredField(
  fieldName: string,
  language: SupportedLanguage
): FieldConfig {
  const isRequired = fieldName.endsWith("*");
  const cleanFieldName = isRequired ? fieldName.slice(0, -1) : fieldName;
  const typeRegistry = getDataByItemKey(
    fieldRegistry,
    cleanFieldName as RegisteredFieldKey
  );
  if (typeRegistry) {
    const { type, validations, fields } = typeRegistry;
    const { label, placeholder, options, defaultValue } =
      fields[cleanFieldName];

    return {
      type,
      name: cleanFieldName,
      label: isRequired ? `${label[language]}*` : label[language],
      placeholder: placeholder[language],
      validations: isRequired
        ? [{ type: "required" }, ...(validations || [])]
        : validations || [],
      options: options || [],
      defaultValue: defaultValue || "",
    };
  } else {
    throw new Error(`Field "${fieldName}" not found in registry`);
  }
}
