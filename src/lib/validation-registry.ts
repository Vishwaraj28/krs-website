// Define the message template function type
export type MessageTemplate = (params: {
  label: string;
  value?: any;
  fieldName?: string;
}) => string;

// Supported languages
export type Language = "en" | "gu";

// Validation messages organized by type and language
type ValidationMessages = Record<
  string,
  Partial<Record<Language, MessageTemplate>>
>;

// Registry of validation message templates
export const validationMessages: ValidationMessages = {
  required: {
    en: ({ label }) => `${label} is required`,
    gu: ({ label }) => `${label} આવશ્યક છે`,
  },
  min: {
    en: ({ label, value }) => `${label} must be at least ${value} characters`,
    gu: ({ label, value }) => `${label} ઓછામાં ઓછું ${value} અક્ષર હોવું જોઈએ`,
  },
  max: {
    en: ({ label, value }) => `${label} must not exceed ${value} characters`,
    gu: ({ label, value }) => `${label} ${value} અક્ષરથી વધુ ન હોવું જોઈએ`,
  },
  email: {
    en: ({ label }) => `Please enter a valid email address for ${label}`,
    gu: ({ label }) => `કૃપા કરીને ${label} માટે માન્ય ઈમેલ એડ્રેસ દાખલ કરો`,
  },
  regex: {
    en: ({ label }) => `Please enter a valid format for ${label}`,
    gu: ({ label }) => `કૃપા કરીને ${label} માટે માન્ય ફોર્મેટ દાખલ કરો`,
  },
  url: {
    en: ({ label }) => `Please enter a valid URL for ${label}`,
    gu: ({ label }) => `કૃપા કરીને ${label} માટે માન્ય URL દાખલ કરો`,
  },
  numeric: {
    en: ({ label }) => `${label} must contain only numbers`,
    gu: ({ label }) => `${label} માં ફક્ત નંબર હોવા જોઈએ`,
  },
  plain_text: {
    en: ({ label }) => `${label} must contain only letters and spaces`,
    gu: ({ label }) => `${label} માં ફક્ત અક્ષરો અને જગ્યા હોવી જોઈએ`,
  },
  alphanumeric: {
    en: ({ label }) => `${label} must contain only letters and numbers`,
    gu: ({ label }) => `${label} માં ફક્ત અક્ષરો અને નંબરો હોવા જોઈએ`,
  },
  password_uppercase: {
    en: ({ label }) => `${label} must contain at least one uppercase letter`,
    gu: ({ label }) => `${label} માં ઓછામાં ઓછું એક મોટું અક્ષર હોવું જોઈએ`,
  },
  password_lowercase: {
    en: ({ label }) => `${label} must contain at least one lowercase letter`,
    gu: ({ label }) => `${label} માં ઓછામાં ઓછું એક નાનું અક્ષર હોવું જોઈએ`,
  },
  password_digit: {
    en: ({ label }) => `${label} must contain at least one number`,
    gu: ({ label }) => `${label} માં ઓછામાં ઓછો એક નંબર હોવો જોઈએ`,
  },
  password_special: {
    en: ({ label }) => `${label} must contain at least one special character`,
    gu: ({ label }) => `${label} માં ઓછામાં ઓછો એક વિશેષ અક્ષર હોવો જોઈએ`,
  },
};

// Function to get a validation message
export function getValidationMessage(
  type: string,
  params: {
    label: string;
    value?: any;
    fieldName?: string;
    language?: Language;
  }
): string {
  const { language = "en" } = params;
  const templates = validationMessages[type];

  const template =
    templates?.[language] ||
    templates?.en || // Fallback to English
    (({ label }) => `${label} is invalid`); // Generic fallback

  return template(params);
}
