import { Link, router, useLocalSearchParams } from "expo-router";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
  ScrollView,
  ImageBackground,
  Button,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Severity } from "../dashboard/SeverityCard";
import CensusBlock from "./censusBlock";
import { fetchEvent } from "../../../mock-api/events";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";
import { supabase } from "../../../utils/supabase";
import { useRole } from "../../../utils/hooks/useRole";
import { SafeAreaFlex } from "../../../components/SafeAreaFlex";
import { VolunteerPage } from "./VolunteerPage";
import { AdminPage } from "./AdminPage";

export default function Page() {
  const local = useLocalSearchParams();
  const [role, loading] = useRole();

  const [event, setEvent] = useState<Tables<"Event">>();
  const [numVolunteers, setNumVolunteers] = useState<number>();
  const [numSurveyed, setNumSurveyed] = useState<number>();
  const [numAddresses, setNumAddresses] = useState<number>();
  const [eventCreator, setEventCreator] =
    useState<Pick<Tables<"User2">, "id" | "name" | "email" | "phone">>();

  // Get the event information
  useEffect(() => {
    const func = async () => {
      const event = await supabase
        .from("Event")
        .select(
          `
          *,
          User2 ( id, name, email, phone ),
          EventAddress ( id, claimerId )`,
        )
        .eq("id", parseInt(local.slug as string))
        .single();
      if (event.error) {
        console.log(event.error);
        Alert.alert("Failed to fetch event", event.error.message);
        router.back();
        return;
      }

      console.log(event.data);
      setEvent(event.data);
      setEventCreator(event.data.User2 ?? undefined);

      let numClaimed = 0;
      let numTotal = 0;
      for (const address of event.data.EventAddress) {
        numTotal++;
        numClaimed += +(address.claimerId != null);
      }

      setNumSurveyed(numClaimed);
      setNumAddresses(numTotal);
    };
    func();
  }, []);

  // Get number of volunteers
  useEffect(() => {
    const func = async () => {
      if (event) {
        // Get the number of volunteers
        const numVolunteers = await supabase
          .from("EventVolunteer")
          .select("*", { count: "exact" })
          .eq("eventId", event.id)
          .eq("approved", true);
        if (numVolunteers.error || numVolunteers.count == null) {
          console.log(numVolunteers.error);
          Alert.alert(
            "Failed to fetch number of volunteers",
            numVolunteers?.error?.message ??
              "Unknown error, couldn't fetch exact number of volunteers",
          );
          router.back();
          return;
        }

        setNumVolunteers(numVolunteers.count);
      }
    };
    func();
  }, [event]);

  if (!event || loading) {
    return (
      <SafeAreaFlex style={{ justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaFlex>
    );
  }

  const props = {
    event,
    eventCreator,
    numVolunteers,
    numAddresses,
    numSurveyed,
  };

  return role === "USER" ? (
    <VolunteerPage {...props} />
  ) : (
    <AdminPage {...props} />
  );
}
