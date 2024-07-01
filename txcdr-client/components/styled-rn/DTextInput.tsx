import { TextInput, TextInputProps } from "react-native";
import { DefaultTextStyle } from "../../utils/styles/styles";

/**
 * Returns a <TextInput> component with some predetermined default styles such as color and font. Default styles can be overriden with the `style` prop.
 * @param props Same props as TextInput
 * @returns <TextInput> component with default styles
 */
export function DTextInput(props: TextInputProps) {
  const { style, ...rest } = props;
  return <TextInput style={[DefaultTextStyle, style]} {...rest} />;
}
