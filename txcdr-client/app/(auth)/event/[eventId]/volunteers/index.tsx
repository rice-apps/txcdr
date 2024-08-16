import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Tables } from "../../../../../types/supabase";
import { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabase";
import { ms } from "react-native-size-matters";
import { Header } from "../../../../../components/nav/Header";
import { VolunteerInfoButton } from "../VolunteerInfoButton";
import { VolunteerAssignment } from "./VolunteerAssignment";

export type User = Pick<
  Tables<"User2">,
  "id" | "email" | "name" | "organizations"
>;

export type Volunteer = {
  User2: User | null;
};

export default function Page() {
  const local = useLocalSearchParams();
  const eventId = local.eventId as string;

  const [approved, setApproved] = useState<Volunteer[]>([]);
  const [numRequests, setNumRequests] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const func = async () => {
    setLoading(true);
    const res = await supabase
      .from("EventVolunteer")
      .select("approved, User2 (id, email, name, organizations)")
      .eq("eventId", eventId);

    if (res.error) {
      console.log(res.error);
      return;
    }

    const approved: Volunteer[] = [];
    let n = 0;
    for (const v of res.data) {
      if (v.approved) {
        approved.push(v);
      } else {
        n++;
      }
    }

    setApproved(approved);
    setNumRequests(n);
    setLoading(false);
  };

  useEffect(() => {
    func();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Header title="Volunteers" />
      <View style={styles.body}>
        <VolunteerInfoButton
          text="Requests"
          numAlert={numRequests}
          onPress={() => router.push(`/event/${eventId}/volunteers/requests`)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {approved ? (
          approved.map(
            (v) =>
              v.User2 && (
                <VolunteerAssignment
                  eventId={eventId}
                  user={v.User2}
                  key={v.User2.id}
                  onDelete={() => {
                    supabase
                      .from("EventVolunteer")
                      .delete()
                      .eq("volunteerId", v.User2!.id)
                      .eq("eventId", Number(eventId))
                      .then(
                        (res) => {
                          console.log("Volunteer removed from event");
                          func();
                        },
                        (err) => {
                          console.log(err);
                        },
                      );
                  }}
                />
              ),
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(30),
  },
  body: {
    width: "85%",
    alignSelf: "center",
  },
});
