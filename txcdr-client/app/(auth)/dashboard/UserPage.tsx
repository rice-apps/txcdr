import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { Tables } from "../../../types/supabase";
import { SafeAreaFlex } from "../../../components/SafeAreaFlex";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../../utils/styles/colors";
import { ms } from "react-native-size-matters";

type Event = Pick<Tables<"Event">, "id" | "title" | "severity"> & {
  approved: boolean | null;
};
export function UserPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const func = async () => {
      const user = await supabase.auth.getUser();
      if (user.error) {
        console.log(user.error);
        Alert.alert("Failed to fetch user", user.error.message);
        return;
      }

      const events = await supabase.from("Event").select("id, title, severity");
      if (events.error) {
        console.log(events.error);
        Alert.alert("Failed to fetch events", events.error.message);
        return;
      }

      const eventMap: Record<number, (typeof events.data)[0]> = {};
      events.data.forEach((e) => (eventMap[e.id] = e));

      console.log(events.data, eventMap);
      const approvals = await supabase
        .from("EventVolunteer")
        .select("eventId, approved")
        .eq("volunteerId", user.data.user.id);
      if (approvals.error) {
        console.log(approvals.error);
        Alert.alert("Failed to fetch approvals", approvals.error.message);
        return;
      }

      const approvalsMap: Record<number, (typeof approvals.data)[0]> = {};
      approvals.data.forEach((a) => (approvalsMap[a.eventId] = a));

      const processedEvents: Event[] = [];
      for (const event of events.data) {
        processedEvents.push({
          ...event,
          approved: approvalsMap[event.id]?.approved,
        });
      }

      setEvents(processedEvents);
      setLoading(false);
    };
    // for (let i = 1; i < 6; i++) {
    //   setEvents([...events, fetchEvent(i)]);
    // }
    func();
  }, []);

  return (
    <SafeAreaFlex style={styles.container}>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={Zinc[400]} />
        <TextInput
          placeholder="Search for events..."
          hitSlop={20}
          style={styles.searchInput}
          onChangeText={setQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            justifyContent: "center",
            height: "100%",
          }}
        />
      ) : (
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.eventList}
        >
          {events
            .filter(
              (event) => !query || event.title.toLowerCase().includes(query),
            )
            .map((e, i) => (
              <EventCard
                id={e.id}
                registered={e.approved}
                severity={e.severity}
                title={e.title}
                key={e.id}
              />
            ))}
        </ScrollView>
      )}
    </SafeAreaFlex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  searchContainer: {
    borderRadius: ms(15),
    borderColor: Zinc[400],
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    gap: ms(10),
  },
  searchInput: { width: "100%" },
  scroller: {
    paddingBottom: 50,
    marginTop: ms(20),
  },
  eventList: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },

  footer: {
    // textAlign: "center",
    height: 60,
  },
});
