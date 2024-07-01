import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BORDER_RADIUS } from "../../utils/styles/constants";
import { Zinc } from "../../utils/styles/colors";
import { msc } from "../../utils/size-matters-aliases";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function WideButton(props: Props) {
  const { style, children, ...rest } = props;
  return (
    <Pressable style={[styles.pressable, style]} {...rest}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    borderRadius: msc(BORDER_RADIUS),
    padding: msc(10),
    backgroundColor: Zinc[800],
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
