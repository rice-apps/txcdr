import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { useState } from "react";
import { ModeButton } from "./ModeButton";
import { Blue } from "../../../utils/styles/colors";
import { router } from "expo-router";
import { ms } from "react-native-size-matters";
import { SectionProps } from ".";
import { EventCard } from "./EventCard";

export function AdminSection({ events }: SectionProps) {
  const [mode, setMode] = useState<"ACTIVE" | "PAST">("ACTIVE");
  return (
    <>
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
      {events ? (
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.eventList}
          bounces={false}
        >
          {events
            .filter((event) => {
              if (mode == "ACTIVE") {
                return event.active;
              } else {
                return !event.active;
              }
            })
            .map(
              (
                e,
                i, // TODO: filter by active column
              ) => (
                <EventCard
                  id={e.id}
                  registered={e.approved}
                  severity={e.severity}
                  title={e.title}
                  key={e.id}
                />
              ),
            )}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          style={{
            justifyContent: "center",
            height: "100%",
          }}
        />
      )}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => router.push("/dashboard/new-event")}
          style={{
            alignContent: "flex-end",
            backgroundColor: Blue[500],
            borderRadius: 20,
            marginBottom: ms(20),
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
    </>
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
    marginTop: ms(20),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  scroller: {
    paddingBottom: 50,
    marginTop: ms(20),
    overflow: "visible",
  },
  eventList: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
});
