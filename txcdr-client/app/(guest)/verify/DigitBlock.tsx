import { StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { Zinc } from "../../../utils/styles/colors";
import { BORDER_RADIUS } from "../../../utils/styles/constants";
import { ms } from "react-native-size-matters";

interface Props {
  digit?: string;
}

export function DigitBlock(props: Props) {
  return (
    <View style={styles.view}>
      <DText style={styles.digit}>{props.digit}</DText>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    height: ms(55),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Zinc[100],
    borderRadius: ms(BORDER_RADIUS),
    borderWidth: 1,
    borderColor: Zinc[700],
  },
  digit: {},
});
