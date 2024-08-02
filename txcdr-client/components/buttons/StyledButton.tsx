import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Blue } from "../../utils/styles/colors";
import { ms } from "react-native-size-matters";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function StyledButton(props: Props) {
  const { style, children, ...rest } = props;

  return (
    <Pressable style={[styles.container, style]} {...rest}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Blue[500],
    alignItems: "center",
    justifyContent: "center",
    padding: ms(15),
    borderRadius: 30,
  },
});
