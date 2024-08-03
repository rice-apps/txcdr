import { StyleSheet, View } from "react-native";
import { PageProps } from ".";
import { ms } from "react-native-size-matters";
import { DText } from "../../../../components/styled-rn/DText";
import { VolunteerInfoButton } from "./VolunteerInfoButton";
import { router } from "expo-router";

export function AdminSection({ event, numVolunteers, numApproved }: PageProps) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "85%",
    alignSelf: "center",
    gap: ms(30),
  },
});
