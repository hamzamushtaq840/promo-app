import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
const Email = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_18_363"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_18_363)">
      <Path
        d="M4.3 19.5C3.8 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.2 2.5 17.7V6.3C2.5 5.8 2.675 5.375 3.025 5.025C3.375 4.675 3.8 4.5 4.3 4.5H19.7C20.2 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.8 21.5 6.3V17.7C21.5 18.2 21.325 18.625 20.975 18.975C20.625 19.325 20.2 19.5 19.7 19.5H4.3ZM12 12.55L4 7.45V17.7C4 17.7833 4.02933 17.8543 4.088 17.913C4.146 17.971 4.21667 18 4.3 18H19.7C19.7833 18 19.8543 17.971 19.913 17.913C19.971 17.8543 20 17.7833 20 17.7V7.45L12 12.55ZM12 11L19.85 6H4.15L12 11ZM4 7.45V6V17.7C4 17.7833 4.02933 17.8543 4.088 17.913C4.146 17.971 4.21667 18 4.3 18H4V17.7V7.45Z"
        fill="#959597"
      />
    </G>
  </Svg>
);
export default Email;
