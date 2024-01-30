import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function Add(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3 10v8a2 2 0 002 2h6M3 10V6a2 2 0 012-2h14a2 2 0 012 2v4M3 10h18m0 0v3M17 14v3m0 3v-3m0 0h-3m3 0h3"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={6} cy={7} r={1} fill="#000" />
      <Circle cx={9} cy={7} r={1} fill="#000" />
    </Svg>
  );
}

export default Add;
