import { MaterialIcons } from "@expo/vector-icons";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { PageProps } from "./[slug]";
import { Blue, Zinc } from "../../../utils/styles/colors";
import { ms, s } from "react-native-size-matters";
import * as Linking from "expo-linking";
import { WideButton } from "../../../components/buttons/WideButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useUser } from "../../../utils/hooks/useUser";
import { DText } from "../../../components/styled-rn/DText";

type RegistrationState = "APPLIED" | "APPROVED" | "NONE";
export function VolunteerSection({ event, eventCreator }: PageProps) {
  const [registration, setRegistration] = useState<RegistrationState>("NONE");
  const user = useUser();

  useEffect(() => {
    const func = async () => {
      if (!user) return;
      const res = await supabase
        .from("EventVolunteer")
        .select("approved")
        .eq("eventId", event?.id)
        .eq("volunteerId", user.id)
        .single();

      if (!res.error && res.data) {
        setRegistration(res.data.approved ? "APPROVED" : "APPLIED");
      }

      console.log(res);
    };
    func();
  }, [user]);

  const onRegister = async () => {
    if (!user) return;

    const res = await supabase.from("EventVolunteer").insert({
      eventId: event?.id,
      volunteerId: user.id,
      approved: false,
    });

    if (res.error) {
      console.log(res.error);
      return;
    }

    setRegistration("APPLIED");
  };

  return (
    <View style={[styles.container, styles.body]}>
      <DText>{event?.description}</DText>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactInfoHeader}>Created by</Text>
        <View style={styles.contactInfoRow}>
          <View style={styles.contactInfoPair}>
            <MaterialIcons name="account-circle" size={ms(48)} />
            <Text style={styles.contactName}>{eventCreator?.name}</Text>
          </View>
          <View style={styles.contactInfoPair}>
            <Pressable
              style={[
                styles.contactButton,
                eventCreator?.email ? {} : { backgroundColor: "gray" },
              ]}
              onPress={() => Linking.openURL(`mailto:${eventCreator?.email}`)}
              disabled={!eventCreator?.email}
            >
              <MaterialIcons name="mail" color="white" size={ms(18)} />
            </Pressable>
            <Pressable
              style={[
                styles.contactButton,
                eventCreator?.phone ? {} : { backgroundColor: "gray" },
              ]}
              onPress={() => Linking.openURL(`tel:${eventCreator?.phone}`)}
              disabled={!eventCreator?.phone}
            >
              <MaterialIcons name="call" color="white" size={ms(18)} />
            </Pressable>
          </View>
        </View>
      </View>
      <WideButton
        style={{
          backgroundColor: registration == "NONE" ? Blue[400] : Zinc[400],
        }}
        onPress={onRegister}
        disabled={registration != "NONE"}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: ms(18) }}>
          {registration == "NONE"
            ? "Register"
            : registration == "APPLIED"
            ? "Pending"
            : "Registered"}
        </Text>
      </WideButton>
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

  contactInfoContainer: {
    width: "100%",
    alignSelf: "center",
    gap: ms(10),
  },
  contactInfoHeader: {
    color: Blue[500],
    fontSize: ms(18),
    fontWeight: "bold",
  },
  contactInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactInfoPair: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  contactName: {
    fontSize: ms(18),
    fontWeight: "bold",
  },
  contactButton: {
    backgroundColor: Blue[400],
    borderRadius: ms(50),
    padding: ms(10),
  },
});
