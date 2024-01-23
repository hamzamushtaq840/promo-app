import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Eye = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16px"
    height="16px"
    viewBox="0 0 1.28 1.28"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={0.1}
      strokeMiterlimit={10}
      d="M0.02 0.64s0.22 0.3 0.62 0.3 0.62 -0.3 0.62 -0.3 -0.22 -0.3 -0.62 -0.3S0.02 0.64 0.02 0.64z"
    />
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={0.1}
      strokeMiterlimit={10}
      cx={32}
      cy={32}
      r={7}
      d="M0.78 0.64A0.14 0.14 0 0 1 0.64 0.78A0.14 0.14 0 0 1 0.5 0.64A0.14 0.14 0 0 1 0.78 0.64z"
    />
  </Svg>
);
export default Eye;
