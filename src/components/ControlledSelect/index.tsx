import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Option } from "../../types/common";
import { EMPTY_STRING } from "../../constants";

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: Option[];
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} value={field.value ?? EMPTY_STRING}>
            {(options ?? []).map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
