import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { Blue, Zinc } from "../utils/styles/colors";
import { DText } from "./styled-rn/DText";

interface Props {
  name: string | null | undefined;
  subtext: string | null | undefined;
}

export function UserInfo(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pfp} />
      <View style={styles.infoColumn}>
        <DText style={styles.name}>{props.name ?? "No name given"}</DText>
        <DText style={styles.org}>{props.subtext ?? "No organization"}</DText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: ms(10),
    alignItems: "center",
  },
  pfp: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(100),
    backgroundColor: Zinc[200],
  },
  infoColumn: {
    flexDirection: "column",
    gap: ms(5),
  },
  name: {
    fontSize: ms(14),
  },
  org: {
    fontSize: ms(12),
    color: Zinc[400],
  },
});
