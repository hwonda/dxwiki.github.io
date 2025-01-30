'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface SliderProps {
  displayLevels: string[];
  range: [number, number];
  onRangeChange: (newRange: [number, number])=> void;
}

const Slider = ({ displayLevels, range, onRangeChange }: SliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<'start' | 'end' | null>(null);

  const getPositionFromValue = (value: number) => {
    return (value / (displayLevels.length - 1)) * 100;
  };

  const handleMouseDown = (e: React.MouseEvent, handle: 'start' | 'end') => {
    e.preventDefault();
    setIsDragging(true);
    setActiveHandle(handle);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !activeHandle) return;

    const getValueFromPosition = (position: number) => {
      const bounds = sliderRef.current?.getBoundingClientRect();
      if (!bounds) return 0;

      const percent = Math.max(0, Math.min(100, (position - bounds.left) / bounds.width * 100));
      const index = Math.round((percent / 100) * (displayLevels.length - 1));
      return Math.max(0, Math.min(displayLevels.length - 1, index));
    };

    const newValue = getValueFromPosition(e.clientX);
    const newRange: [number, number] = [...range];

    if (activeHandle === 'start') {
      newRange[0] = Math.min(newValue, range[1]);
    } else {
      newRange[1] = Math.max(newValue, range[0]);
    }

    onRangeChange(newRange);
  }, [isDragging, activeHandle, range, onRangeChange, displayLevels.length]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
  };

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const percent = Math.max(0, Math.min(100, (e.clientX - bounds.left) / bounds.width * 100));
    const clickedValue = Math.round((percent / 100) * (displayLevels.length - 1));

    // 각 핸들과 클릭 위치 간의 거리 계산
    const distanceToStart = Math.abs(clickedValue - range[0]);
    const distanceToEnd = Math.abs(clickedValue - range[1]);

    const newRange: [number, number] = [...range];
    if (distanceToStart <= distanceToEnd) {
      newRange[0] = clickedValue;
    } else {
      newRange[1] = clickedValue;
    }

    onRangeChange(newRange);
  }, [range, onRangeChange, displayLevels.length]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeHandle, handleMouseMove]);

  return (
    <div className="relative w-full h-12 px-2">
      {/* Start Level Label */}
      <div
        className="absolute top-1 text-center text-xs text-primary w-10"
        style={{
          left: `${ getPositionFromValue(range[0]) + 4.5 }%`,
          transform: 'translateX(-50%)',
        }}
      >
        {displayLevels[range[0]]}
      </div>

      {/* End Level Label */}
      <div
        className="absolute top-1 text-center text-xs text-primary w-10"
        style={{
          left: `${ getPositionFromValue(range[1]) + 4.5 }%`,
          transform: 'translateX(-50%)',
        }}
      >
        {displayLevels[range[1]]}
      </div>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="absolute top-6 w-full h-1 bg-gray2 rounded-full"
        onClick={handleTrackClick}
      >
        {/* Selected Range */}
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${ getPositionFromValue(range[0]) }%`,
            right: `${ 100 - getPositionFromValue(range[1]) }%`,
          }}
        />

        {/* Handles */}
        <div
          className="absolute size-3 mt-[-4px] ml-[-6px] bg-primary rounded-full cursor-pointer"
          style={{ left: `${ getPositionFromValue(range[0]) }%` }}
          onMouseDown={(e) => handleMouseDown(e, 'start')}
        />
        <div
          className="absolute size-3 mt-[-4px] ml-[-6px] bg-primary rounded-full cursor-pointer"
          style={{ left: `${ getPositionFromValue(range[1]) }%` }}
          onMouseDown={(e) => handleMouseDown(e, 'end')}
        />
      </div>
    </div>
  );
};

export default Slider;
