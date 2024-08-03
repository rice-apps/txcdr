import { StyleSheet, View } from "react-native";
import { PageProps } from "./[slug]";
import { ms } from "react-native-size-matters";
import { DText } from "../../../components/styled-rn/DText";
import { VolunteerInfoButton } from "./VolunteerInfoButton";

export function AdminSection({ event, volunteers }: PageProps) {
  return (
    <View style={[styles.container, styles.body]}>
      <VolunteerInfoButton
        text="Volunteers"
        numAlert={volunteers?.filter((v) => !v.approved).length}
      />
      <DText>{event.description}</DText>
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
