import React, { useState } from 'react';

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
};

export function RangeSlider({ min, max, step = 1 }: RangeSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full text-sm">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
      <div className="relative w-full">
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none"
          style={{ zIndex: minValue === maxValue ? 1 : 0 }}
        />
        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          step={step}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none"
        />
      </div>
    </div>
  );
}