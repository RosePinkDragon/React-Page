import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormikContext } from "formik";

import type { FormField, FormValues } from "./formelements";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onMutate: (newTodo: string) => {
      const previousTodos = queryClient.getQueryData<ITodos>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);
        return [...previousTodos, newTodo];
      }
      return [newTodo];
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dependentFields) return formikHandleChange(event);

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
