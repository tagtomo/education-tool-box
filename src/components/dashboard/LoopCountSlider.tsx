import React from 'react';
import Slider from '@mui/material/Slider';

type LoopCountSliderProps = {
  disabled: boolean;
  onChange: (e: any) => void;
}

export default function LoopCountSlider({ disabled, onChange }: LoopCountSliderProps): JSX.Element {
  const valuetext = (value: number) => {
    return `${value}px`;
  }

  return (
    <Slider
      disabled={disabled}
      defaultValue={1}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-custom"
      step={1}
      min={1}
      max={5}
      valueLabelDisplay="auto"
      onChange={onChange}
    />
  );
}
