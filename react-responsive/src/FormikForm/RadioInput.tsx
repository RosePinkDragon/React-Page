import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormikContext } from "formik";

import type { FormField, FormSchema, FormValues } from "./formelements";
import { fetchCountries } from "./SelectInput";

function RadioInput({
  field,
  dependentFields,
}: {
  field: FormField;
  dependentFields?: string[];
}) {
  const {
    values,
    errors,
    touched,
    handleChange: formikHandleChange,
  } = useFormikContext<FormValues>();

  const queryClient = useQueryClient();

  const { name, label, options, isDependentOn } = field;

  const addTodoToMutation = useMutation<string[], unknown, string>({
    onMutate: (dependentField: string) => {
      const previousTodos = queryClient.getQueryData<FormSchema>([
        "formSchema",
      ]);
      if (previousTodos) {
        queryClient.setQueryData(
          [dependentField],
          fetchCountries(
            "localhost:3000/api/countries",
            field.name,
            values[field.name]
          )
        );
        return [dependentField];
      }
      return [dependentField];
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dependentFields) return formikHandleChange(event);
    dependentFields.forEach((dependentField) => {
      addTodoToMutation.mutate(dependentField);
    });
    return formikHandleChange(event);
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={values[name]}
        onChange={handleChange}
      >
        {options?.map((option) => (
          <FormControlLabel
            key={option.value + option.label}
            value={option.value}
            disabled={
              isDependentOn ? Boolean(values[isDependentOn]) !== true : false
            }
            control={<Radio color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {touched[name] && errors[name] && (
        <FormHelperText error>{errors[name]}</FormHelperText>
      )}
    </>
  );
}

export default RadioInput;
