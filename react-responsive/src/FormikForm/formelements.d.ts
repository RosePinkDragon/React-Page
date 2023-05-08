export interface FormValues {
  [key: string]: string;
}

export type FormFieldTypes =
  | "text"
  | "textArea"
  | "email"
  | "password"
  | "confirmPassword"
  | "checkbox"
  | "date"
  | "number"
  | "tel"
  | "radio"
  | "select"
  | "multi-select"
  | "boolean";

export type FormFieldTypesWithBoolean = `boolean-${FormFieldTypes}`;
export type FormFieldTypesWithAsync = `async-${FormFieldTypes}`;

export interface FormField {
  name: string;
  label: string;
  type: FormFieldTypes | FormFieldTypesWithBoolean | FormFieldTypesWithAsync;
  placeholder?: string;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  maxlen?: number;
  minlen?: number;
  options?: { label: string; value: string }[];
  initialValue?: string | boolean | number;
  value?: string;
  isDependentOn?: string;
  api?: string;
}

export interface FormSection {
  name: string;
  label: string;
  formFields: FormField[];
}

export interface FormSchema {
  sections: FormSection[];
}
