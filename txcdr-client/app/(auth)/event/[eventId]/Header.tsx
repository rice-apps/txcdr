import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { ms } from "react-native-size-matters";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <>
      <Pressable style={styles.backIcon} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={ms(30)} color="black" />
      </Pressable>
      <Text style={styles.pageTitle}>{title}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(30),
    marginTop: ms(20),
  },
  backIcon: {
    position: "absolute",
    left: ms(20),
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: ms(24),
    alignSelf: "center",
  },
});
