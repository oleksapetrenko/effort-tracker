import React from 'react';

type Slice = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  slices: Slice[];
};

export const CircleChart = ({ slices }: Props) => {
  const radius = 40;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * radius;

  let total = slices.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) total = 1;

  let offset = 0;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {slices.map((slice, i) => {
        const valuePercent = slice.value / total;
        const dash = valuePercent * circumference;
        const dashArray = `${dash} ${circumference - dash}`;
        const circle = (
          <circle
            key={i}
            r={radius}
            cx={cx}
            cy={cy}
            fill="transparent"
            stroke={slice.color}
            strokeWidth="10"
            strokeDasharray={dashArray}
            strokeDashoffset={-offset}
            transform="rotate(-90 50 50)"
          />
        );
        offset += dash;
        return circle;
      })}
      <circle
        r="30"
        cx={cx}
        cy={cy}
        fill="white"
      />
    </svg>
  );
};