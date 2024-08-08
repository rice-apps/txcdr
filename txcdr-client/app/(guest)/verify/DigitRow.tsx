import { ReactElement, useState } from "react";
import { DigitBlock } from "./DigitBlock";
import { StyleSheet, TextInput, View } from "react-native";
import { ms } from "react-native-size-matters";

interface Props {
  numDigits: number;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

export function DigitRow(props: Props) {
  const [input, setInput] = useState<(string | undefined)[]>([, , , , ,]);

  const onChange = (s: string) => {
    const inputCopy = [...input];
    for (let i = 0; i < props.numDigits; i++) {
      inputCopy[i] = i < s.length ? s[i] : undefined;
    }
    setInput(inputCopy);
    props.setter(inputCopy.join(""));
  };

  const digits: ReactElement[] = [];
  for (let i = 0; i < props.numDigits; i++) {
    digits.push(<DigitBlock key={i} digit={input[i]} />);
  }

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.overlayTextInput}
        onChangeText={onChange}
        maxLength={props.numDigits}
        keyboardType="number-pad"
        selectTextOnFocus={false}
        caretHidden
      />
      {digits}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: ms(13),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  overlayTextInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    color: "rgba(255, 255, 255, 0.0)", // Semi-transparent background
    padding: 10,
    zIndex: 10,
  },
});
