import { Controller, Control, FieldValues, Path } from "react-hook-form";

import TextField from "@mui/material/TextField";

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  rows?: number;
};

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  label,
  rows,
  type = 'text'
}: ControlledTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          type={type}
          multiline={!!rows}
          helperText={error?.message}
          rows={rows}
          fullWidth
        />
      )}
    />
  );
};

export default ControlledTextField;
