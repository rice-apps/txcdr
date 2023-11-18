import { SvgProps } from "react-native-svg";

/**
 * Extended interface for SVGProps for React Native compatibility
 */
export interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
}
