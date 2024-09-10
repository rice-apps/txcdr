import { Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { router } from "expo-router";
import { OpacityPressable } from "../../../components/styled-rn/OpacityPressable";
import { MaterialIcons } from "@expo/vector-icons";
import { ms, s } from "react-native-size-matters";
import { Zinc } from "../../../utils/styles/colors";

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function PageButton(props: Props) {
  return (
    <OpacityPressable
      style={styles.container}
      onPress={() => router.navigate(props.href)}
    >
      <View style={styles.left}>
        {props.icon}
        <DText style={styles.label}>{props.label}</DText>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={ms(20)} color={Zinc[700]} />
    </OpacityPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: ms(10),
  },
  label: {
    fontSize: ms(16),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
});
