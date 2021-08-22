import React from 'react';

import Slider from '@material-ui/core/Slider';

type FontSliderProps = {
  disabled: boolean;
  onChange: (e: any) => void;
}

export default function FontSlider({ disabled, onChange }: FontSliderProps): JSX.Element {

  // const marks = [
  //   {
  //     value: 10,
  //     label: '10px',
  //   },
  //   {
  //     value: 20,
  //     label: '20px',
  //   },
  //   {
  //     value: 30,
  //     label: '30px',
  //   },
  //   {
  //     value: 40,
  //     label: '40px',
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
      />
    </ >
  );
}
