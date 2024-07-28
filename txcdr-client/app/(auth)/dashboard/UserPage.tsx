import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { EventCard2 } from "./EventCard2";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { Tables } from "../../../types/supabase";

type Event = Pick<Tables<"Event">, "id" | "title" | "severity"> & {
  approved: boolean | null;
};
export function UserPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  // const [events, setEvents] = useState<EventDetails[]>([]);

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
    <>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {events.map((e, i) => (
              <EventCard2
                id={e.id}
                registered={e.approved}
                severity={e.severity}
                title={e.title}
                key={e.id}
              />
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
