import { Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { useState } from "react";
import { ModeButton } from "./ModeButton";
import { Blue } from "../../../utils/styles/colors";
import { router } from "expo-router";
import { ms } from "react-native-size-matters";

export function AdminPage() {
  const [mode, setMode] = useState<"ACTIVE" | "PAST">("ACTIVE");
  return (
    <View style={styles.container}>
      <View style={styles.modeSelector}>
        <ModeButton
          label="Active"
          selected={mode == "ACTIVE"}
          onPress={() => setMode("ACTIVE")}
        />
        <ModeButton
          label="Past"
          selected={mode == "PAST"}
          onPress={() => setMode("PAST")}
        />
      </View>
      <DText>Event Dashboard</DText>
      <View style={{ flex: 1 }}>
        <DText>Filler</DText>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => router.push("/dashboard/new-event")}
          style={{
            alignContent: "flex-end",
            marginRight: ms(20),
            marginBottom: ms(20),
            backgroundColor: Blue[500],
            borderRadius: 20,
          }}
        >
          <DText
            style={{
              color: "#ffffff",
              paddingHorizontal: ms(20),
              paddingVertical: ms(15),
            }}
          >
            + New Event
          </DText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: ms(10),
    flex: 1,
    height: "100%",
  },
  modeSelector: {
    flexDirection: "row",
    gap: ms(10),
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
