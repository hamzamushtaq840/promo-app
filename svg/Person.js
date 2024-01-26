import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Person = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={3}
    stroke="#D9D9D9"
    fill="none"
    {...props}>
    <Circle cx={32} cy={18.14} r={11.14} />
    <Path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
  </Svg>
);
export default Person;
