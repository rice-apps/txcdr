import { StyleSheet, View } from "react-native";
import {
  WideButton,
  WideButtonProps,
} from "../../../../components/buttons/WideButton";
import { DText } from "../../../../components/styled-rn/DText";
import { ms } from "react-native-size-matters";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Blue } from "../../../../utils/styles/colors";

interface Props extends WideButtonProps {
  text: string;
  numAlert?: number;
}

export function VolunteerInfoButton(props: Props) {
  const { text, numAlert, ...rest } = props;
  return (
    <WideButton style={styles.container} {...rest}>
      <View style={[styles.pair, { gap: ms(20) }]}>
        <FontAwesome name="user" size={ms(42)} color={Blue[600]} />
        <DText style={styles.text}>{text}</DText>
      </View>
      <View style={[styles.pair, { gap: ms(10) }]}>
        <View style={styles.circle}>
          <DText style={styles.circleText}>{numAlert}</DText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={ms(24)} color="black" />
      </View>
    </WideButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(15),
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    justifyContent: "space-between",
    alignContent: "center",
    shadowOffset: { height: 0, width: 0 },
  },
  pair: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(15),
    paddingVertical: ms(5),
  },
  text: {
    fontSize: ms(18),
    fontWeight: "600",
  },
  circle: {
    backgroundColor: "#ff0000",
    borderRadius: ms(100),
    alignSelf: "center",
  },
  circleText: {
    color: "#fff",
    fontSize: ms(12),
    fontWeight: "bold",
    alignSelf: "center",
    padding: ms(7),
  },
});
