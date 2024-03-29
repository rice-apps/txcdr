import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ISvgProps } from "../../types/utils";

/**
 * SVG component for idle Home icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Unfilled Home icon
 */
export const HomeNormal = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={3}
      d="M14.513 29.262v-8.707h6.966v8.707c0 .958.784 1.742 1.742 1.742h5.224c.958 0 1.741-.784 1.741-1.742v-12.19h2.96c.802 0 1.185-.992.575-1.515L19.163 2.444a1.755 1.755 0 0 0-2.334 0L2.271 15.557c-.592.523-.227 1.515.575 1.515h2.96v12.19c0 .958.784 1.742 1.741 1.742h5.225c.958 0 1.741-.784 1.741-1.742Z"
    />
  </Svg>
);

/**
 * SVG component for active Home icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Filled Home icon
 */
export const HomeFilled = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M13.013 27.262v-8.707h6.966v8.707c0 .958.784 1.742 1.742 1.742h5.224c.958 0 1.741-.784 1.741-1.742v-12.19h2.96c.802 0 1.185-.992.575-1.515L17.663.444a1.755 1.755 0 0 0-2.334 0L.771 13.557c-.592.523-.227 1.515.574 1.515h2.961v12.19c0 .958.784 1.742 1.741 1.742h5.225c.958 0 1.741-.784 1.741-1.742Z"
    />
  </Svg>
);

/**
 * SVG component for idle List icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Unfilled List icon
 */
export const ListNormal = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M0 1.696A1.417 1.417 0 0 1 1.417.279h19.836a1.417 1.417 0 1 1 0 2.834H1.417A1.417 1.417 0 0 1 0 1.696Zm0 18.891a1.417 1.417 0 0 1 1.417-1.417h17.947a1.417 1.417 0 1 1 0 2.834H1.417A1.417 1.417 0 0 1 0 20.587ZM1.417 9.725a1.417 1.417 0 0 0 0 2.833h27.392a1.417 1.417 0 0 0 0-2.833H1.417Z"
    />
  </Svg>
);

/**
 * SVG component for active List icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Filled List icon
 */
export const ListFilled = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      stroke="#000"
      strokeWidth={2}
      d="M1 2.696a1.417 1.417 0 0 1 1.417-1.417h19.836a1.417 1.417 0 1 1 0 2.833H2.417A1.417 1.417 0 0 1 1 2.696Zm0 18.891a1.417 1.417 0 0 1 1.417-1.417h17.947a1.417 1.417 0 0 1 0 2.834H2.417A1.417 1.417 0 0 1 1 21.587Zm1.417-10.862a1.417 1.417 0 1 0 0 2.833h27.392a1.417 1.417 0 0 0 0-2.833H2.417Z"
    />
  </Svg>
);

/**
 * SVG component for idle Map icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Unfilled Map icon
 */
export const MapNormal = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.217}
      d="M18.785 5.837v19.167m0-19.167L27 2.004V21.17l-8.215 3.833m0-19.167-8.214-3.833m8.214 23-8.214-3.833m0-19.167L2.357 5.837v19.167l8.214-3.833m0-19.167V21.17"
    />
  </Svg>
);

/**
 * SVG component for active Map icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Filled Map icon
 */
export const MapFilled = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={27}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M18.786 5.837v19.167V5.837Zm0 0L27 2.004V21.17l-8.214 3.833m0-19.167L10.57 2.004l8.215 3.833Zm0 19.167L10.57 21.17l8.215 3.833ZM10.57 21.17l-8.214 3.833V5.837l8.215-3.833m0 19.167V2.004 21.17Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.217}
      d="M18.786 5.837v19.167m0-19.167L27 2.004V21.17l-8.214 3.833m0-19.167L10.57 2.004m8.215 23L10.57 21.17m0-19.167L2.357 5.837v19.167l8.215-3.833m0-19.167V21.17"
    />
  </Svg>
);

/**
 * SVG component for idle Profile icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Unfilled Profile icon
 */
export const ProfileNormal = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={2.713}
      d="M14.725 17.965h.001c1.84 0 3.652.216 5.435.648a25.028 25.028 0 0 1 5.283 1.949c.627.326 1.13.793 1.52 1.428.383.624.573 1.3.572 2.054V27.648H1.916v-3.602c0-.757.191-1.434.575-2.058a3.803 3.803 0 0 1 1.517-1.426 24.97 24.97 0 0 1 5.282-1.95 22.92 22.92 0 0 1 5.435-.647Zm.001-4.484c-1.585 0-2.909-.549-4.044-1.684C9.548 10.663 9 9.34 9 7.754s.549-2.909 1.683-4.044c1.135-1.134 2.459-1.683 4.044-1.683 1.585 0 2.909.549 4.043 1.683 1.135 1.135 1.684 2.459 1.684 4.044 0 1.585-.549 2.909-1.683 4.043-1.135 1.135-2.459 1.684-4.044 1.684Z"
    />
  </Svg>
);

/**
 * SVG component for active Profile icon in bottom nav bar
 * @param props More SVG props for customization
 * @returns Filled Profile icon
 */
export const ProfileFilled = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      stroke="#000"
      strokeWidth={2.713}
      d="M14.725 17.964h.001c1.84 0 3.652.217 5.436.65a25.02 25.02 0 0 1 5.283 1.948c.627.326 1.129.793 1.518 1.427.384.625.574 1.3.573 2.055V27.647H1.916v-3.602c0-.757.191-1.433.575-2.057a3.803 3.803 0 0 1 1.517-1.426 24.965 24.965 0 0 1 5.283-1.95 22.913 22.913 0 0 1 5.434-.648Zm.001-4.483c-1.585 0-2.908-.549-4.043-1.684-1.135-1.135-1.684-2.458-1.684-4.043 0-1.586.549-2.909 1.684-4.044 1.135-1.135 2.458-1.683 4.043-1.683 1.586 0 2.909.548 4.044 1.683 1.134 1.135 1.683 2.458 1.683 4.044 0 1.585-.549 2.908-1.683 4.043-1.135 1.135-2.458 1.684-4.044 1.684Z"
    />
  </Svg>
);
