import { Alert, StyleSheet, View } from "react-native";
import { PageProps } from ".";
import { ms } from "react-native-size-matters";
import { DText } from "../../../../components/styled-rn/DText";
import { VolunteerInfoButton } from "./VolunteerInfoButton";
import { router } from "expo-router";
import { WideButton } from "../../../../components/buttons/WideButton";
import { useState } from "react";
import { Zinc } from "../../../../utils/styles/colors";
import { supabase } from "../../../../utils/supabase";
import { endEvent } from "react-native/Libraries/Performance/Systrace";

export function AdminSection({ event, numVolunteers, numApproved }: PageProps) {
  const [active, setActive] = useState(event.active);

  const onEndEvent = async () => {
    const res = await supabase
      .from("Event")
      .update({ active: false })
      .eq("id", event.id);
    if (res.error) {
      console.log(res.error);
      Alert.alert("Failed to end event", res.error.message);
      return;
    }

    setActive(false);
  };

  const onReviveEvent = async () => {
    const res = await supabase
      .from("Event")
      .update({ active: true })
      .eq("id", event.id);
    if (res.error) {
      console.log(res.error);
      Alert.alert("Failed to revive event", res.error.message);
      return;
    }

    setActive(true);
  };

  return (
    <View style={styles.body}>
      <VolunteerInfoButton
        text="Volunteers"
        numAlert={
          numVolunteers != undefined && numApproved != undefined
            ? numVolunteers - numApproved
            : undefined
        }
        onPress={() => router.push(`/event/${event.id}/volunteers`)}
      />
      <DText>{event.description}</DText>
      <WideButton
        style={{ backgroundColor: Zinc[600] }}
        onPress={() => router.push(`/dashboard/new-event/${event.id}`)}
      >
        <DText style={styles.buttonText}>Edit Event</DText>
      </WideButton>
      <WideButton
        style={{ backgroundColor: active ? "#ff0000" : Zinc[400] }}
        onPress={active ? onEndEvent : onReviveEvent}
      >
        <DText style={styles.buttonText}>
          {active ? "End Event" : "Continue event"}
        </DText>
      </WideButton>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "85%",
    alignSelf: "center",
    gap: ms(30),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: ms(18),
  },
});
