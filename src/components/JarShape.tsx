import React from 'react';

type Props = {
  waterLevel: number;  // від 0 до 1
  label: string;
};

export const JarShape = ({ waterLevel, label }: Props) => {
  // Розміри viewBox SVG (точно з оригінального шейпу)
  const W = 3000;
  const H = 4000;

  // Відступи зверху/знизу (5%)
  const padRatio = 0.05;
  const padPx = H * padRatio;                // 200
  const innerHeight = H - 2 * padPx;         // 3600

  // Висота та Y-координата "вода"
  const waterHeight = innerHeight * waterLevel;
  const waterY = padPx + (innerHeight - waterHeight);

  // Контур банки з potrace
  const pathData = `
    M439 3737 c-44 -29 -69 -80 -69 -140 0 -97 49 -157 127 -157 l45 0
    -7 -52 c-10 -79 -23 -98 -101 -149 -88 -58 -167 -139 -217 -221 -77 -127 -71
    -36 -75 -1258 -2 -699 1 -1122 7 -1171 20 -154 79 -253 193 -328 122 -81 56
    -76 1118 -76 987 0 1000 0 1085 43 96 47 186 146 215 237 7 22 18 46 24 54 16
    20 16 2342 0 2362 -6 8 -17 32 -24 53 -35 110 -133 225 -257 302 -78 49 -99
    80 -104 154 l-4 45 47 5 c78 9 128 71 128 157 0 60 -25 111 -69 140 l-34 23
    -997 0 -997 0 -34 -23z
  `;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="120"
      height="160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="jarClip" clipPathUnits="userSpaceOnUse">
          {/* Обрізаємо за інверсованим шляхом */}
          <path
            d={pathData}
            transform={`translate(0, ${H}) scale(1, -1)`}
          />
        </clipPath>
      </defs>

      {/* 1) Вода, обрізана clipPath-ом */}
      <rect
        x={0}
        y={waterY}
        width={W}
        height={waterHeight}
        fill="#add8e6"
        clipPath="url(#jarClip)"
      />

      {/* 2) Контур банки */}
      <path
        d={pathData}
        transform={`translate(0, ${H}) scale(1, -1)`}
        fill="none"
        stroke="#000"
        strokeWidth={100}
      />

      {/* 3) Текст чітко по центру банки */}
      <text
        x={W / 2}
        y={H / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={750}
        fontWeight="bold"
        fill="#000"
      >
        {label}
      </text>
    </svg>
  );
};
