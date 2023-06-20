import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

import type { FormField, FormValues } from "./formelements";

const TextInput = ({ field }: { field: FormField }) => {
  const { name, label, type, isDependentOn, placeholder, required } = field;
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();

  return (
    <div>
      <TextField
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
