/* eslint-disable complexity */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { FaPhoneAlt } from "react-icons/fa";

import TodoList from "../pages/testCache";

import type { FormSchema, FormValues } from "./formelements";
import createValidationSchema from "./generateValidationSchema";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

function FormGenerator({ formData }: { formData: FormSchema }) {
  const validationSchema = createValidationSchema(formData);

  const formSchema: FormSchema = formData;
  const initialValues: FormValues = {};
  const dependentFieldsData: Record<string, { name: string; api: string }[]> =
    {};

  formSchema.sections.forEach((section) => {
    section.formFields.forEach((field) => {
      if (field.initialValue) {
        initialValues[field.name] = field.initialValue.toString();
      } else {
        initialValues[field.name] = "";
      }
    });
  });

  formSchema.sections.forEach((section) => {
    section.formFields.forEach((field) => {
      if (field.isDependentOn) {
        if (dependentFieldsData[field.isDependentOn]) {
          dependentFieldsData[field.isDependentOn].push({
            name: field.name,
            api: field.api || "",
          });
        } else {
          dependentFieldsData[field.isDependentOn] = [
            {
              name: field.name,
              api: field.api || "",
            },
          ];
        }
      }
    });
  });

  console.log(dependentFieldsData);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          <TodoList />
          {formSchema.sections.map((section) => (
            <div key={section.name}>
              <h3>{section.name}</h3>
              {section.formFields.map((field) => {
                switch (field.type) {
                  case "text":
                  case "boolean-text":
                  case "async-text":
                  case "email":
                  case "boolean-email":
                  case "async-email":
                  case "password":
                  case "boolean-password":
                  case "async-password":
                    return (
                      <TextInput
                        field={field}
                        dependentFields={dependentFieldsData[field.name]}
                      />
                    );
                  case "checkbox":
                    return (
                      <FormGroup>
                        {field.options?.map((option) => (
                          <FormControlLabel
                            key={option.label + option.value}
                            control={
                              <Checkbox
                                id={option.label}
                                name={field.name}
                                value={option.value}
                                checked={Boolean(
                                  values[field.name].includes(option.value)
                                )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color="primary"
                                required={field.required}
                              />
                            }
                            label={option.label}
                          />
                        ))}
                      </FormGroup>
                    );
                  case "date":
                    return (
                      <FormControl key={field.name}>
                        <DatePicker
                          label={field.label}
                          value={
                            values[field.name]
                              ? dayjs(values[field.name])
                              : null
                          }
                          onChange={(date) =>
                            setFieldValue(
                              field.name,
                              date?.format("YYYY-MM-DD")
                            )
                          }
                        />
                        {errors[field.name] && (
                          <FormHelperText error>
                            {errors[field.name]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  case "tel":
                    return (
                      <FormControl key={field.name}>
                        <TextField
                          margin="normal"
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          type="tel"
                          placeholder={field.placeholder}
                          required={field.required}
                          fullWidth
                          variant="outlined"
                          value={values[field.name]}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaPhoneAlt />
                              </InputAdornment>
                            ),
                          }}
                          error={
                            touched[field.name] && Boolean(errors[field.name])
                          }
                        />
                        {errors[field.name] && (
                          <FormHelperText error>
                            {errors[field.name]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  case "radio":
                    return <RadioInput field={field} />;
                  case "select":
                    return (
                      <SelectInput
                        field={field}
                        dependentFields={dependentFieldsData[field.name]}
                      />
                    );
                  case "boolean":
                    return (
                      <FormControlLabel
                        key={field.name}
                        control={
                          <Switch
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[field.name]}
                          />
                        }
                        label={field.label}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
          <Button type="submit" variant="contained" role="button">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormGenerator;
