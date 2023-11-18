import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ISvgProps } from "../../types/utils";

export const ListIcon = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
  </Svg>
);
