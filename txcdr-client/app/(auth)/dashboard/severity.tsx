import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProgressBarProps = {
  text: String;
};

export function Severity(props: ProgressBarProps) {
  const { text } = props;

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
    <View style={styles.padding}>
      <View
        style={[
          styles.severityBackground,
          { backgroundColor },
          { width },
          { left },
        ]}
      >
        <Text style={styles.severityLabel}>{props.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingTop: 20,
    height: 10,
  },
  severityBackground: {
    width: 60,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    paddingTop: 0,
    top: -10,
  },

  severityLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
});
