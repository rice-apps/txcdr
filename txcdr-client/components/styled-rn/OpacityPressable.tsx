import { useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface OpacityPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function OpacityPressable(props: OpacityPressableProps) {
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
        style={style}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
