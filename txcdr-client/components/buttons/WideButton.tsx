import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { BORDER_RADIUS } from "../../utils/styles/constants";
import { Zinc } from "../../utils/styles/colors";
import { ms } from "react-native-size-matters";
import { useRef } from "react";

export interface WideButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function WideButton(props: WideButtonProps) {
  const animated = useRef(new Animated.Value(1.0)).current;
  const { style, children, ...rest } = props;
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={{ opacity: animated, width: "100%" }}>
      <Pressable
        style={[styles.pressable, style]}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
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
