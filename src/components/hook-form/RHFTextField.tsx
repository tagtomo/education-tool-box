// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFTextField({
  name,
  ...other
}: IProps & TextFieldProps) {
  const { control, register } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          inputRef={field.ref}
          {...register(name)}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
