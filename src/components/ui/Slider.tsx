'use client';

import { useState } from 'react';

interface SliderProps {
  displayLevels: string[];
  range: [number, number];
  onRangeChange: (newRange: [number, number])=> void;
}

export default function Slider({ displayLevels, range, onRangeChange }: SliderProps) {
  const [selectingStart, setSelectingStart] = useState<number | null>(null);

  const isFullRangeSelected = range[0] === 0 && range[1] === displayLevels.length - 1;

  const handleLevelClick = (index: number) => {
    if (selectingStart === null) {
      setSelectingStart(index);
      onRangeChange([index, index]);
    } else {
      const start = Math.min(selectingStart, index);
      const end = Math.max(selectingStart, index);
      onRangeChange([start, end]);
      setSelectingStart(null);
    }
  };

  const isSelected = (index: number) => {
    return index >= range[0] && index <= range[1];
  };

  const isSelecting = (index: number) => {
    if (selectingStart === null) return false;
    const start = Math.min(selectingStart, index);
    const end = Math.max(selectingStart, index);
    return index >= start && index <= end;
  };

  return (
    <div className="w-full">
      <div className="flex">
        {displayLevels.map((level, index) => (
          <button
            key={level}
            onClick={() => handleLevelClick(index)}
            className={`
              flex-1 py-2 text-sm ${ index === range[1] + 1 ? 'border-l-primary' : '' }
              ${ isFullRangeSelected
            ? 'border border-primary bg-gray4 text-primary hover:bg-gray3'
            : isSelected(index)
              ? 'border border-primary bg-gray4 text-primary hover:bg-gray3'
              : isSelecting(index)
                ? 'border border-gray2 text-sub'
                : 'border border-gray2 text-sub hover:bg-gray3 hover:text-primary'
          }
              ${ index !== 0 ? '-ml-px' : '' }
              transition-colors
            `}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}
