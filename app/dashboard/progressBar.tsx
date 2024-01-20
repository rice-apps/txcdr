import {
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProgressBarProps = {

};

export default function ProgressBar(props: ProgressBarProps) {
  return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.progressBar}>
              <SafeAreaView style={styles.progressBarFilled}>

              </SafeAreaView>
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
    width: 160,
    paddingBottom: -10,
    paddingTop: -20,
    borderRadius: 10,
  },

  progressBarFilled: {
    paddingTop: -10,
    backgroundColor: "green",
    width: 150,
    height: 1,
    alignSelf: "auto",
    borderRadius: 10,

  },
});
