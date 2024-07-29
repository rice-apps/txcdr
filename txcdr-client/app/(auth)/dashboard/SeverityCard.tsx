import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DText } from "../../../components/styled-rn/DText";

interface Props extends ViewProps {
  text: string;
}

export function Severity(props: Props) {
  const { text, style, ...viewProps } = props;

  const backgroundColor =
    text === "Severe"
      ? "red"
      : text === "Moderate"
      ? "orange"
      : text === "Low"
      ? "green"
      : "transparent";
  const width =
    text === "Severe" ? 60 : text === "Moderate" ? 70 : text === "Low" ? 40 : 0;
  const left =
    text === "Severe"
      ? 260
      : text === "Moderate"
      ? 250
      : text === "Low"
      ? 280
      : 0;

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...viewProps}>
      <DText style={styles.text}>{props.text}</DText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "flex-start",
    flexWrap: "wrap",
  },
  text: {
    color: "white",
    padding: 5,
    fontSize: 12,
  },
});
