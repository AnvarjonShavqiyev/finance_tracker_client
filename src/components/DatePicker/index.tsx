import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

interface ControlledDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
}

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
}: ControlledDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.toDate() : null)}
          disabled={disabled}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error?.message,
              fullWidth: true,
            },
          }}
        />
      )}
    />
  );
}
