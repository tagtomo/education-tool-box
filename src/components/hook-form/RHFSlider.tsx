// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Slider, SliderProps, FormControlLabel, FormControlLabelProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = Omit<FormControlLabelProps, "control">;

interface Props extends IProps {
  name: string;
}

export default function RHFSlider({ name, min, max, step, ...other }: Props & SliderProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Slider
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            step={step}
          />
          }
        />
      }
      {...other}
    />
  );
}
