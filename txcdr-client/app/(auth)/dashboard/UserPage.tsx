import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import Card from "./card";
import { fetchEvent } from "../../../mock-api/events";
import { useEffect, useState } from "react";
import { EventDetails } from "../../../types/event";

export function UserPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDetails[]>([]);

  useEffect(() => {
    for (let i = 1; i < 6; i++) {
      setEvents([...events, fetchEvent(i)]);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* TODO: replace mock API calls with real ones */}
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {events.map((e, i) => (
              <Card event={e} key={Math.random()} />
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  scroller: {
    paddingBottom: 50,
    width: "100%",
  },

  footer: {
    // textAlign: "center",
    height: 60,
  },
});
