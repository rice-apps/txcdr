import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(30),
    marginTop: ms(20),
  },
});
