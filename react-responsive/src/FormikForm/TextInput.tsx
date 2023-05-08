import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

import type { FormField, FormValues } from "./formelements";

const TextInput = ({
  field,
  dependentFields,
}: {
  field: FormField;
  dependentFields: string[];
}) => {
  const { name, label, type, isDependentOn, placeholder, required } = field;
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();

  console.log(dependentFields);
  return (
    <div>
      <TextField
        disabled={Boolean(values[isDependentOn]) !== true}
        margin="normal"
        key={name}
        id={name}
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        required={required}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
        fullWidth
      />
    </div>
  );
};

export default TextInput;
