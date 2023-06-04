import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";

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

const SelectInput = ({ field }: { field: FormField }) => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();

  const { name, label, options, isDependentOn, required, placeholder } = field;

  const dependentFieldValue = isDependentOn ? values[isDependentOn] : "";

  const doesNotHaveOptions = !options || options.length === 0;

  const booleanRegex = /^boolean-/;
  const isBooleanDependent = booleanRegex.test(field.type) && isDependentOn;

  const isDisabled =
    doesNotHaveOptions ||
    (isBooleanDependent ? Boolean(dependentFieldValue) : false);

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
        {options?.map((option) => (
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
