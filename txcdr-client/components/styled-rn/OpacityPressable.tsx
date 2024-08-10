import { useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    <AnimatedPressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      style={[{ opacity: animated }, style]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
