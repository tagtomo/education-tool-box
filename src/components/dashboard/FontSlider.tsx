import React from 'react';
import Slider from '@mui/material/Slider';

type FontSliderProps = {
  disabled: boolean;
  onChange: (e: any) => void;
}

export default function FontSlider({ disabled, onChange }: FontSliderProps): JSX.Element {

  // const marks = [
  //   {
  //     value: 100,
  //     label: '100px',
  //   },
  //   {
  //     value: 200,
  //     label: '200px',
  //   },
  //   {
  //     value: 300,
  //     label: '300px',
  //   },
  //   {
  //     value: 400,
  //     label: '400px',
  //   },
  // ];


  const valuetext = (value: number) => {
    return `${value}px`;
  }

  return (
    <>
      <Slider
        disabled={disabled}
        defaultValue={300}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={100}
        min={100}
        max={1000}
        valueLabelDisplay="auto"
        onChange={onChange}
        // marks={marks}
        sx={{ width: "50%" }}

      />
    </ >
  );
}
