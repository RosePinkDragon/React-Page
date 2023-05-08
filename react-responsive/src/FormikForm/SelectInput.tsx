import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError } from "axios";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

import type { FormField, FormValues } from "./formelements";

export type ICountriesResponse = {
  country: string;
  states: string[];
};

export const fetchCountries = (
  api: string,
  value: string,
  isDependentOn: string
): Promise<ICountriesResponse[]> => {
  const url = `${api}?${isDependentOn}=${value}`;
  return axios.get(url).then((res) => res.data);
};

const SelectInput = ({
  field,
  dependentFields,
}: {
  field: FormField;
  dependentFields: string[];
}) => {
  const {
    values,
    errors,
    touched,
    handleChange: formikHandleChange,
    handleBlur,
  } = useFormikContext<FormValues>();

  const {
    name,
    label,
    options,
    isDependentOn,
    required,
    placeholder,
    api = "",
  } = field;

  const [fieldOptions, setFieldOptions] = useState(options || []);

  const dependentFieldValue = isDependentOn ? values[isDependentOn] : "";

  const { data, error, refetch, isInitialLoading } = useQuery<
    ICountriesResponse[],
    AxiosError
  >({
    queryKey: [name, api, dependentFieldValue, isDependentOn],
    queryFn: () =>
      fetchCountries(api, dependentFieldValue, isDependentOn || ""),
  });

  useEffect(() => {
    if (data && isDependentOn)
      setFieldOptions(
        data
          .find((d) => d.country === values[isDependentOn])
          ?.states.map((s) => {
            return { label: s, value: s };
          }) || []
      );
  }, [data, isDependentOn, values]);

  const doesNotHaveOptions = !fieldOptions || fieldOptions.length === 0;

  const booleanRegex = /^boolean-/;
  const isBooleanDependent = booleanRegex.test(field.type) && isDependentOn;

  const isDisabled =
    doesNotHaveOptions ||
    (isBooleanDependent ? Boolean(values[isDependentOn]) : false);

  const handleChange = (event: SelectChangeEvent) => {
    if (!dependentFields) return formikHandleChange(event);
    refetch();
    if (data && isDependentOn) {
      const newOptions: { label: string; value: string }[] | undefined = data
        .find((d) => d.country === values[isDependentOn])
        ?.states.map((s) => {
          return { label: s, value: s };
        });
      if (newOptions) setFieldOptions(newOptions);
    }
    return formikHandleChange(event);
  };

  if (isInitialLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <FormControl key={name} fullWidth margin="normal">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && Boolean(errors[name])}
        required={required}
        disabled={isDisabled}
      >
        <MenuItem value="" disabled>
          {placeholder || `Select ${label}`}
        </MenuItem>
        {fieldOptions?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText error>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
