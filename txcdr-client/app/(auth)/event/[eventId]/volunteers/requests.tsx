import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { DText } from "../../../../../components/styled-rn/DText";
import { Header } from "../../../../../components/nav/Header";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Volunteer } from ".";
import { supabase } from "../../../../../utils/supabase";
import { VolunteerDetails } from "./VolunteerDetails";
import { ms } from "react-native-size-matters";
import { VolunteerApproval } from "./VolunteerApproval";

export default function Page() {
  const eventId = useLocalSearchParams().eventId as string;
  const [requests, setRequests] = useState<Volunteer[]>([]);

  useEffect(() => {
    const func = async () => {
      const res = await supabase
        .from("EventVolunteer")
        .select("approved, User2 (id, email, name, organizations)")
        .eq("eventId", eventId)
        .eq("approved", false);

      if (res.error) {
        console.log(res.error);
        Alert.alert("Failed to fetch volunteers", res.error.message);
        return;
      }

      setRequests(res.data);
    };
    func();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Volunteers" />
      <ScrollView contentContainerStyle={styles.body}>
        {requests ? (
          requests.map(
            (v) =>
              v.User2 && (
                <VolunteerApproval
                  eventId={eventId}
                  user={v.User2}
                  key={v.User2.id}
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
    alignItems: "center",
  },
  body: {
    width: "85%",
  },
});
