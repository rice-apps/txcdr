import { router, useLocalSearchParams } from "expo-router";
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { Severity } from "../../dashboard/SeverityCard";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Tables } from "../../../../types/supabase";
import { supabase } from "../../../../utils/supabase";
import { useRole } from "../../../../utils/hooks/useRole";
import { SafeAreaFlex } from "../../../../components/SafeAreaFlex";
import { VolunteerSection } from "./VolunteerSection";
import { AdminSection } from "./AdminSection";
import { ms } from "react-native-size-matters";
import { Blue } from "../../../../utils/styles/colors";
import { Header } from "../../../../components/nav/Header";

type EventCreator = Pick<Tables<"User2">, "id" | "name" | "email" | "phone">;
type Address = Pick<Tables<"EventAddress">, "id" | "claimerId" | "blockId">;

export interface PageProps {
  event: Tables<"Event">;
  eventCreator?: EventCreator;
  numVolunteers?: number;
  numApproved?: number;
  numAddresses?: number;
  addresses?: Address[];
  numSurveyed?: number;
}

export default function Page() {
  const local = useLocalSearchParams();
  const [role, loading] = useRole();

  const [event, setEvent] = useState<Tables<"Event">>();
  const [numVolunteers, setNumVolunteers] = useState<number>();
  const [numApproved, setNumApproved] = useState<number>();
  const [numSurveyed, setNumSurveyed] = useState<number>();
  const [numAddresses, setNumAddresses] = useState<number>();
  const [addresses, setAddresses] = useState<Address[]>();
  const [eventCreator, setEventCreator] = useState<EventCreator>();

  // Get the event information
  useEffect(() => {
    const func = async () => {
      const event = await supabase
        .from("Event")
        .select(
          `
          *,
          User2 ( id, name, email, phone ),
          EventAddress ( id, claimerId, blockId )`,
        )
        .eq("id", parseInt(local.eventId as string))
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
      setAddresses(event.data.EventAddress);
    };
    func();
  }, []);

  // Get number of volunteers
  useEffect(() => {
    const func = async () => {
      if (event) {
        // Get the number of volunteers
        const volunteersRes = await supabase
          .from("EventVolunteer")
          .select("approved", { count: "exact" })
          .eq("eventId", event.id);
        if (volunteersRes.error) {
          console.log(volunteersRes.error);
          Alert.alert(
            "Failed to fetch number of volunteers",
            volunteersRes?.error?.message ??
              "Unknown error, couldn't fetch exact number of volunteers",
          );
          router.back();
          return;
        }

        let total = 0;
        let approved = 0;
        for (const volunteer of volunteersRes.data) {
          total++;
          approved += +volunteer.approved;
        }

        setNumVolunteers(total);
        setNumApproved(approved);
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
    numApproved,
    numAddresses,
    numSurveyed,
    addresses,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title={event?.title!} />
      <ImageBackground
        style={styles.map}
        source={require("../../../../assets/map.png")}
      >
        <Severity
          appendedText=" Damage"
          style={{ alignSelf: "flex-end", right: ms(15), top: ms(10) }}
          text={event?.severity!}
        ></Severity>
      </ImageBackground>
      <View style={styles.statBoxRow}>
        <View style={styles.statBox}>
          <View style={styles.statHeaderRow}>
            <Octicons name="home" color="white" size={32} />
            <Text style={styles.statHeaderText}>
              {numSurveyed}/{numAddresses}
            </Text>
          </View>
          <Text style={styles.statSubtext}>surveyed addresses</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statHeaderRow}>
            <FontAwesome5 name="user" color="white" size={32} />
            <Text style={styles.statHeaderText}>{numApproved}</Text>
          </View>
          <Text style={styles.statSubtext}>registered volunteers</Text>
        </View>
      </View>
      {role === "USER" ? (
        <VolunteerSection {...props} />
      ) : (
        <AdminSection {...props} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(30),
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: ms(24),
    alignSelf: "center",
  },
  map: {
    width: "100%",
    height: ms(175),
  },
  statBox: {
    backgroundColor: Blue[500],
    borderRadius: ms(10),
    padding: ms(12),
    alignItems: "center",
    justifyContent: "center",
    gap: ms(5),
  },
  statBoxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    gap: ms(10),
  },
  statHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  statHeaderText: { color: "white", fontWeight: "bold", fontSize: ms(18) },
  statSubtext: { color: "white", fontWeight: "bold", fontSize: ms(12) },
});
