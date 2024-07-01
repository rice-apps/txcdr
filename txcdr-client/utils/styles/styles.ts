import { TextStyle } from "react-native";
import { Blue, Zinc } from "./colors";
import { BASE_FONT_SIZE } from "./constants";
import { moderateScale } from "react-native-size-matters";

export const DefaultTextStyle: TextStyle = {
  color: Zinc[900],
  fontSize: moderateScale(BASE_FONT_SIZE, 0.1),
};

export const LinkTextStyle: TextStyle = {
  ...DefaultTextStyle,
  color: Blue[600],
};
