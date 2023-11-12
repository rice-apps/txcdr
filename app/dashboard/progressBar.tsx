import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProgressBarProps = {

};

export default function ProgressBar(props: ProgressBarProps) {
  return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.progressBar}>
            </SafeAreaView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 90,

  },
  progressBar: {
    backgroundColor: "black",
    width: 120,
    height: 3,
  },

  progressBarFilled: {
    backgroundColor: "red",
    width: 120,
    height: 1,
    alignSelf: "auto",

  },
});
