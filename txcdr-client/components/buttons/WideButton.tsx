import { PressableProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { BORDER_RADIUS } from "../../utils/styles/constants";
import { Zinc } from "../../utils/styles/colors";
import { ms } from "react-native-size-matters";
import { OpacityPressable } from "../styled-rn/OpacityPressable";

export interface WideButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function WideButton(props: WideButtonProps) {
  const { style, children, ...rest } = props;
  return (
    <OpacityPressable style={[styles.pressable, style]} {...rest}>
      {children}
    </OpacityPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    borderRadius: ms(BORDER_RADIUS),
    padding: ms(10),
    backgroundColor: Zinc[800],
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
