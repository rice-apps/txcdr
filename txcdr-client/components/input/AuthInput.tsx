import { TextInputProps, View, StyleSheet } from "react-native";
import { DText } from "../styled-rn/DText";
import { DTextInput } from "../styled-rn/DTextInput";
import { Zinc } from "../../utils/styles/colors";
import { BORDER_RADIUS } from "../../utils/styles/constants";
import { ms } from "react-native-size-matters";

interface Props extends TextInputProps {
  labelText: string;
  icon: React.ReactElement;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * DefaultText and TextInput pair for login and signup pages
 * @param props Extends `TextInputProps`. `keyboardAppearance` is already set.
 * @returns
 */
export function AuthInput(props: Props) {
  const { labelText, setter, icon, style, ...textInputProps } = props;

  return (
    <View style={{ gap: 2, width: "100%" }}>
      <DText style={styles.label}>{labelText}</DText>
      <View style={styles.row}>
        {icon}
        <DTextInput
          onChangeText={(s) => setter(s)}
          keyboardAppearance="dark"
          {...textInputProps}
          placeholderTextColor={Zinc[600]}
          style={[styles.input, style]}
          hitSlop={ms(20)}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "500",
    color: Zinc[800],
  },
  row: {
    marginTop: ms(7),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Zinc[200],
    backgroundColor: Zinc[50],
    borderRadius: ms(BORDER_RADIUS),
    flexDirection: "row",
    gap: ms(8),
    alignItems: "center",
    padding: ms(10),
  },
  input: {
    flex: 1,
  },
});
