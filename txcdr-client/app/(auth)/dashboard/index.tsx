import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import { useRole } from "../../../utils/hooks/useRole";
import { UserSection } from "./UserSection";
import { AdminSection } from "./AdminSection";
import { SafeAreaFlex } from "../../../components/SafeAreaFlex";
import { Tables } from "../../../types/supabase";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

export type Event = Pick<Tables<"Event">, "id" | "title" | "severity"> & {
  approved: boolean | null;
};

export interface SectionProps {
  events: Event[];
}

export default function Page() {
  const [role, loading] = useRole();
  const [events, setEvents] = useState<Event[]>([]);

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
    };
    func();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaFlex style={styles.container}>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      {role == "USER" ? (
        <UserSection events={events} />
      ) : (
        <AdminSection events={events} />
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
});
