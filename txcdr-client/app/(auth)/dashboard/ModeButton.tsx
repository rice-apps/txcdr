import { Pressable, StyleSheet } from "react-native";
import { Blue, Zinc } from "../../../utils/styles/colors";
import { DText } from "../../../components/styled-rn/DText";
import { ms } from "react-native-size-matters";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function ModeButton(props: Props) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <DText
        style={[
          props.selected
            ? { color: Zinc[50], backgroundColor: Blue[500] }
            : { color: Zinc[900] },
          styles.text,
        ]}
      >
        {props.label}
      </DText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
  },
});
