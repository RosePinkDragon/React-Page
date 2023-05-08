import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError } from "axios";
import { useFormikContext } from "formik";

import type { FormField, FormValues } from "./formelements";

export type ICountriesResponse = {
  name: string;
  states: string[];
};

const fetchCountries = (api: string): Promise<ICountriesResponse[]> =>
  axios.get(api).then((res) => res.data);

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

  const {
    data: fieldOptions = options,
    isLoading,
    error,
    refetch,
    isInitialLoading,
  } = useQuery<ICountriesResponse[], AxiosError>({
    queryKey: [name, api],
    queryFn: () => fetchCountries(api),
    enabled: false,
  });

  const doesNotHaveOptions = !fieldOptions || fieldOptions.length === 0;
  console.log(
    "🚀 ~ file: SelectInput.tsx:60 ~ doesNotHaveOption:",
    doesNotHaveOptions
  );

  const isDisabled =
    doesNotHaveOptions ||
    (isDependentOn ? Boolean(values[isDependentOn]) : false);
  console.log("🚀 ~ file: SelectInput.tsx:63 ~ isDisabled:", isDisabled);

  const handleChange = (event: SelectChangeEvent) => {
    if (!dependentFields) return formikHandleChange(event);
    refetch();
    if (fieldOptions && fieldOptions.length > 0) {
      const newOptions = data
        .find(
          (country: { name: string }) => country.name === event.target.value
        )
        ?.states.map((state: string) => ({
          label: state,
          value: state,
        }));
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
          {placeholder}
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
