import * as Yup from "yup";

import type { FormField, FormSchema, FormValues } from "./formelements";

const isFieldText = (field: { type: string }) =>
  field.type === "text" ||
  field.type === "textarea" ||
  field.type === "tel" ||
  field.type === "email" ||
  field.type === "tel" ||
  field.type === "password";

const getField = (schema: FormSchema, key: string) =>
  schema.sections.flatMap((s) => s.formFields).find((f) => f.name === key);

function textRuleGenerator(field: FormField) {
  let rule = Yup.string();

  if (field.type === "email") {
    rule = rule.email("A valid email is required");
  }

  if (field.type === "password") {
    rule = rule
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      );
  }
  if (field.type === "confirmPassword") {
    rule = rule
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required");
  }
  if (field.type === "text" || field.type === "textArea") {
    if (field.maxlen) {
      rule = rule.max(
        field.maxlen,
        `Maximum length is ${field.maxlen} characters`
      );
    }
    if (field.minlen) {
      rule = rule.min(
        field.minlen,
        `Minimum length is ${field.minlen} characters`
      );
    }
  }
  if (field.type === "tel") {
    rule = Yup.string();
    rule = rule.matches(
      /^(?:\+91|0)?[1-9]\d{9}$/,
      "Please enter a valid phone number"
    );
  }
  return rule;
}

function dateRuleGenerator(field: FormField) {
  let rule = Yup.date();
  if (field.minDate && field.maxDate) {
    rule = rule
      .min(field.minDate, `Date must be after ${field.minDate}`)
      .max(field.maxDate, `Date must be before ${field.maxDate}`);
  } else if (field.minDate) {
    rule = rule.min(field.minDate, `Date must be after ${field.minDate}`);
  } else if (field.maxDate) {
    rule = rule.max(field.maxDate, `Date must be before ${field.maxDate}`);
  }
  return rule;
}

const baseSchemaGenerator = (schema: FormSchema, obj: FormValues) => {
  const baseSchema = Object.keys(obj).reduce((prev, key) => {
    const fild = getField(schema, key);
    if (!fild) return prev;

    let rule = null;

    if (isFieldText(fild)) {
      rule = textRuleGenerator(fild);
    }
    if (fild.type === "date") {
      rule = dateRuleGenerator(fild);
    }

    if (fild.type === "boolean") {
      rule = Yup.bool().oneOf([true], `${fild.name} is required`);
    }

    if (fild.type === "number") {
      rule = Yup.number()
        .typeError(`${fild.name} must be a number`)
        .positive(`${fild.name} must be a positive number`)
        .integer(`${fild.name} must be a whole number`);
    }
    if (rule && fild.required) {
      rule = rule.required(`Please enter ${fild.label.toLowerCase()}`);
    }

    if (rule) {
      return { ...prev, [key]: rule };
    }
    return prev;
  }, {});
  return Yup.object(baseSchema);
};

const createValidationSchema = (
  schema: FormSchema,
  extensionSchema?: Yup.AnyObject
) => {
  return Yup.lazy((obj: FormValues) => {
    const baseSchema = baseSchemaGenerator(schema, obj);

    console.log(baseSchema);
    console.log("baseSchema");
    console.log(extensionSchema);
    if (extensionSchema) {
      const mergedSchema = extensionSchema.concat(baseSchema);
      console.log("mergeSchema");
      console.log(mergedSchema);
      return mergedSchema;
    }

    return baseSchema;
  });
};

export default createValidationSchema;
