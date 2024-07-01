import { Text, TextProps } from "react-native";
import { DefaultTextStyle } from "../../utils/styles/styles";

/**
 * Returns a <Text> component with some predetermined default styles such as color and font. Default styles can be overriden with the `style` prop.
 * @param props Same props as Text
 * @returns <Text> component with default styles
 */
export function DText(props: TextProps) {
  const { style, children, ...rest } = props;
  return (
    <Text style={[DefaultTextStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
